import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const customerName = String(formData.get("customerName") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const subjectFullName = String(formData.get("subjectFullName") ?? "").trim();
    const serviceGroup = String(formData.get("serviceGroup") ?? "").trim();
    const serviceId = String(formData.get("serviceId") ?? "").trim();

    if (!customerName || !phone || !subjectFullName || !serviceGroup || !serviceId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        customer_name: customerName,
        phone,
        subject_full_name: subjectFullName,
        service_group: serviceGroup,
        service_id: serviceId,
        source: "website_form",
        status: "new",
        intake_details: String(formData.get("intakeDetails") ?? "").trim() || null,
        files_count: Number(formData.get("filesCount") ?? 0),
        apostille: String(formData.get("apostille") ?? "") || null,
        urgency:
          serviceGroup === "ua_clearance"
            ? String(formData.get("urgency") ?? "") || null
            : null,
        translation:
          ["ua_clearance", "driver_registry", "civil_registry", "translation"].includes(
            serviceGroup
          )
          ? String(formData.get("translation") ?? "") || null
          : null,
        extract_type:
          serviceGroup === "ua_clearance"
            ? String(formData.get("extractType") ?? "") || null
            : null,
        purpose_code:
          serviceGroup === "ua_clearance"
            ? String(formData.get("purposeCode") ?? "") || null
            : null,
        customer_type: "b2c",
        payment_status: "unpaid",
      })
      .select("id")
      .single();

    if (orderError) {
      return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }

    const files = formData.getAll("files").filter((item) => item instanceof File);

    for (const file of files) {
      const safeFileName = file.name.replace(/[^\w.\-а-яА-ЯіІїЇєЄґҐ]/g, "_");
      const filePath = `${order.id}/${Date.now()}-${safeFileName}`;

      const { error: uploadError } = await supabaseAdmin.storage
        .from("order-files")
        .upload(filePath, file, {
          contentType: file.type || "application/octet-stream",
          upsert: false,
        });

      if (uploadError) {
        return NextResponse.json(
          { error: "Failed to upload file" },
          { status: 500 }
        );
      }

      const { error: fileRowError } = await supabaseAdmin.from("order_files").insert({
        order_id: order.id,
        file_name: file.name,
        file_path: filePath,
        file_type: file.type || null,
        file_size: file.size,
        source: "website_form",
      });

      if (fileRowError) {
        return NextResponse.json(
          { error: "Failed to save file metadata" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
    });
  } catch {
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}