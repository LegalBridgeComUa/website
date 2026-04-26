"use client";

import { useState } from "react";
import { services } from "@/lib/services";
import type { OrderPayload } from "@/lib/order";
export default function SubmitRequestPage() {
    const [formData, setFormData] = useState<OrderPayload>({
        customerName: "",
        phone: "",
        serviceId: "",
        subjectFullName: "",
        note: "",
        source: "website_form",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    function updateField<K extends keyof OrderPayload>(
        field: K,
        value: OrderPayload[K]
        ) {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setIsSubmitting(true);

        console.log("Order payload:", formData);

        setTimeout(() => {
            setIsSubmitting(false);
            alert("Заявку підготовлено. Наступний крок — підключення Supabase.");
        }, 600);
    }

  return (
    <main className="min-h-screen bg-[#f7f3ec] px-6 py-16 text-zinc-900 md:px-10 lg:px-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9b6a24]">
          Подати заявку
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
          Залиште заявку
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
          Заповніть коротку форму — ми зв’яжемося з вами, перевіримо деталі та
          підкажемо оптимальний формат вирішення вашого запиту.
        </p>

        <form
            onSubmit={handleSubmit}
            className="mt-12 space-y-6 rounded-3xl bg-white p-6 shadow-sm md:p-8"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Ім’я</label>
              <input
                type="text"
                value={formData.customerName}
                onChange={(event) => updateField("customerName", event.target.value)}
                placeholder="Ваше ім’я"
                required
                className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-zinc-400"
                />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Телефон</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                placeholder="+421..."
                required
                className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-zinc-400"
                />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Послуга</label>
            <select
                value={formData.serviceId}
                required
                onChange={(event) => updateField("serviceId", event.target.value)}
                className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-zinc-400"
                >
                <option value="">Оберіть послугу</option>
                {services.map((service) => (
                    <option key={service.id} value={service.id}>
                    {service.title}
                    </option>
                ))}
                </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              ПІБ (для документа)
            </label>
            <input
                type="text"
                required
                value={formData.subjectFullName}
                onChange={(event) => updateField("subjectFullName", event.target.value)}
                placeholder="Повне ім’я особи"
                className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-zinc-400"
                />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Коментар</label>
            <textarea
                rows={5}
                value={formData.note ?? ""}
                onChange={(event) => updateField("note", event.target.value)}
                placeholder="Опишіть коротко вашу ситуацію"
                className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-zinc-400"
                />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Завантажити документи
            </label>
            <input
              type="file"
              required
              className="w-full rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-6 text-sm"
            />
          </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-zinc-900 px-6 py-4 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
                >
                {isSubmitting ? "Надсилаємо..." : "Надіслати заявку"}
            </button>
        </form>
      </div>
    </main>
  );
}