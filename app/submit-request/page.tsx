"use client";

import { useState, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";

import { getActiveServices, getServiceById } from "@/lib/service-content";
import { resolveServiceId } from "@/lib/service-resolver";
import type { OrderPayload } from "@/lib/order";

type TextInputFieldProps = {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  error?: string;
  type?: string;
  dataErrorField?: string;
};

type TextareaFieldProps = {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  rows?: number;
  helperText?: string;
};

type SelectFieldProps = {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  children: React.ReactNode;
  error?: string;
  className?: string;
  dataErrorField?: string;
};

type FileUploadBlockProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  selectedFiles: File[];
  removeFile: (fileName: string) => void;
};

type ServicePreviewBlockProps = {
  selectedServiceContent: ReturnType<typeof getServiceById> | null;
};

interface FieldErrors {
  customerName?: string;
  phone?: string;
  serviceGroup?: string;
  subjectFullName?: string;
  files?: string;
}

// Local helper components
function TextInputField({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  type = "text",
  dataErrorField,
}: TextInputFieldProps) {
  return (
    <div data-error-field={dataErrorField}>
      <label className="mb-2 block text-sm font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full rounded-2xl border px-4 py-3 outline-none transition focus:border-zinc-400 ${
          error ? "border-red-400" : "border-zinc-200"
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 5,
  helperText,
}: TextareaFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">{label}</label>
      <textarea
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-zinc-400"
      />
      {helperText && <p className="mt-2 text-xs leading-5 text-zinc-500">{helperText}</p>}
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  required = false,
  children,
  error,
  className = "",
  dataErrorField,
}: SelectFieldProps) {
  return (
    <div data-error-field={dataErrorField}>
      <label className="mb-2 block text-sm font-medium">{label}</label>
      <select
        value={value}
        required={required}
        onChange={onChange}
        className={`w-full rounded-2xl border px-4 py-3 outline-none transition focus:border-zinc-400 ${
          error ? "border-red-400" : "border-zinc-200"
        } ${className}`}
      >
        {children}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

function FileUploadBlock({
  onChange,
  error,
  selectedFiles,
  removeFile,
}: FileUploadBlockProps) {
  return (
    <div data-error-field="files">
      <label className="mb-2 block text-sm font-medium">Завантажити документи</label>
      <input
        type="file"
        multiple
        onChange={onChange}
        className="w-full rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-6 text-sm"
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {selectedFiles.length > 0 && (
        <div className="mt-4 rounded-2xl bg-[#f7f3ec] p-4">
          <p className="text-sm font-medium text-zinc-900">
            Обрано файлів: {selectedFiles.length}
          </p>
          <ul className="mt-3 space-y-2">
            {selectedFiles.map((file) => (
              <li
                key={`${file.name}-${file.lastModified}`}
                className="flex items-center justify-between gap-3 text-sm text-zinc-600"
              >
                <span className="truncate">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(file.name)}
                  className="shrink-0 text-xs font-medium text-[#9b6a24] hover:underline"
                >
                  Видалити
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function ServicePreviewBlock({
    selectedServiceContent,
  }: ServicePreviewBlockProps) {
  if (!selectedServiceContent) return null;
  return (
    <div className="mt-4 rounded-2xl bg-[#f7f3ec] p-4">
      <p className="text-sm font-medium text-zinc-900">
        {selectedServiceContent.shortDescription}
      </p>
      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#9b6a24]">
          Що підготувати
        </p>
        <ul className="mt-3 space-y-2">
          {selectedServiceContent.requiredDocuments.slice(0, 5).map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-zinc-600"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d6a75c]" />
              <span className="whitespace-pre-line">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-4 text-sm text-zinc-500">
        Орієнтовний строк: {selectedServiceContent.turnaroundText}
      </p>
    </div>
  );
}

function SubmitRequestForm() {
    const searchParams = useSearchParams();
    const selectedService = searchParams.get("service") ?? "";
    const [formData, setFormData] = useState<OrderPayload>({
      customerName: "",
      phone: "",
      serviceGroup: selectedService,
      serviceId: "",
      subjectFullName: "",
      note: "",
      intakeDetails: "",
      urgency: "urgent",
      apostille: "yes",
      translation: "none",
      extractType: "full",
      civilRegistryType: "duplicate",
      educationType: "standard",
      translationType: "clearance_sk",
      purposeCode: "Подання до установ іноземних держав",
      source: "website_form",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [submittedOrderId, setSubmittedOrderId] = useState("");
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const successRef = useRef<HTMLDivElement | null>(null);

    function updateField<K extends keyof OrderPayload>(
        field: K,
        value: OrderPayload[K]
        ) {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
        // Clear error when user starts typing
        if (fieldErrors[field as keyof FieldErrors]) {
            setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    }

    function isValidPhone(value: string) {
      const normalized = value.replace(/[^\d+]/g, "");
      const digits = normalized.replace(/\D/g, "");

      return digits.length >= 9 && digits.length <= 15;
    }

    function validateForm(): { errors: FieldErrors; firstErrorField: keyof FieldErrors | null } {
      const errors: FieldErrors = {};

      if (!formData.customerName.trim()) {
        errors.customerName = "Вкажіть ім’я.";
      }

      if (!formData.phone.trim()) {
        errors.phone = "Вкажіть телефон.";
      } else if (!isValidPhone(formData.phone)) {
        errors.phone = "Вкажіть коректний номер телефону.";
      }

      if (!formData.serviceGroup) {
        errors.serviceGroup = "Оберіть послугу.";
      }

      if (!formData.subjectFullName.trim()) {
        errors.subjectFullName = "Вкажіть прізвище та ім’я особи, для якої оформлюється документ.";
      }

      if (selectedFiles.length === 0) {
        errors.files = "Додайте хоча б один файл або фото документа.";
      }

      setFieldErrors(errors);

      // Find first error field for scrolling
      const errorFields: (keyof FieldErrors)[] = ["customerName", "phone", "serviceGroup", "subjectFullName", "files"];
      const firstErrorField = errorFields.find((field) => errors[field]) ?? null;

      return { errors, firstErrorField };
    }

    function prepareOrderPayload() {
      const resolvedServiceId = resolveServiceId(formData);
      return {
        ...formData,
        serviceId: resolvedServiceId,
        filesCount: selectedFiles.length,
      };
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();

      const { firstErrorField } = validateForm();

      if (!firstErrorField) {
        // Form is valid, proceed with submission
        submitForm();
        return;
      }

      // Scroll to first error field
      const errorElement = document.querySelector(`[data-error-field="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
        // Focus if it's an input element
        const input = errorElement.querySelector("input, select, textarea");
        if (input instanceof HTMLElement) {
          input.focus();
        }
      }
    }

    async function submitForm() {
      setIsSubmitting(true);

      const payload = prepareOrderPayload();

      if (!payload.serviceId) {
        setIsSubmitting(false);
        setFieldErrors((prev) => ({
          ...prev,
          serviceGroup: "Не вдалося визначити тип послуги. Перевірте параметри.",
        }));
        return;
      }

      console.info("Order prepared", {
        source: payload.source,
        serviceGroup: payload.serviceGroup,
        serviceId: payload.serviceId,
        filesCount: payload.filesCount,
      });

      const requestData = new FormData();

      requestData.append("customerName", payload.customerName);
      requestData.append("phone", payload.phone);
      requestData.append("subjectFullName", payload.subjectFullName);
      requestData.append("serviceGroup", payload.serviceGroup);
      requestData.append("serviceId", payload.serviceId);
      requestData.append("source", payload.source);
      requestData.append("intakeDetails", payload.intakeDetails ?? "");
      requestData.append("filesCount", String(selectedFiles.length));

      requestData.append("urgency", payload.urgency ?? "");
      requestData.append("apostille", payload.apostille ?? "");
      requestData.append("translation", payload.translation ?? "");
      requestData.append("extractType", payload.extractType ?? "");
      requestData.append("purposeCode", payload.purposeCode ?? "");

      selectedFiles.forEach((file) => {
        requestData.append("files", file);
      });

      const response = await fetch("/api/orders", {
        method: "POST",
        body: requestData,
      });

      const result = await response.json();

      if (!response.ok) {
        setIsSubmitting(false);
        setFieldErrors((prev) => ({
          ...prev,
          serviceGroup: result.error ?? "Не вдалося надіслати заявку. Спробуйте ще раз.",
        }));
        return;
      }

      setSubmittedOrderId(result.orderId ?? "");
      setIsSubmitting(false);
      setIsSuccess(true);

      requestAnimationFrame(() => {
        successRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        successRef.current?.focus();
      });
    }

    const selectedServiceContent = formData.serviceGroup
      ? getServiceById(formData.serviceGroup)
      : null;

    function handleFilesChange(event: React.ChangeEvent<HTMLInputElement>) {
      const files = Array.from(event.target.files ?? []);

      setSelectedFiles((prev) => [...prev, ...files]);

      // Clear files error when user adds files
      if (fieldErrors.files) {
        setFieldErrors((prev) => ({ ...prev, files: undefined }));
      }

      event.target.value = "";
    }

    function removeFile(fileName: string) {
      setSelectedFiles((prev) => prev.filter((file) => file.name !== fileName));
    }

    function getIntakeDetailsPlaceholder() {
      if (formData.serviceGroup === "ua_clearance") {
        return "Наприклад: попередні прізвища, особливі вимоги установи";
      }

      if (formData.serviceGroup === "pl_clearance") {
        return "Наприклад: прізвище при народженні, місце народження, адреса проживання, ім’я батька, ім’я матері, дівоче прізвище матері";
      }

      if (formData.serviceGroup === "hu_clearance") {
        return "Наприклад: прізвище при народженні, місце народження, адреса проживання, ім’я матері, дівоче прізвище матері";
      }

      if (formData.serviceGroup === "cz_clearance") {
        return "Наприклад: прізвище при народженні, місце народження, адреса проживання, додаткові дані зі свідоцтва про народження";
      }

      if (formData.serviceGroup === "driver_registry") {
        return "Наприклад: особливі вимоги установи";
      }

      if (formData.serviceGroup === "civil_registry") {
        return "Наприклад: особливі вимоги установи";
      }

      if (formData.serviceGroup === "education_apostille") {
        return "Наприклад: особливі вимоги установи";
      }

      if (formData.serviceGroup === "translation") {
        return "Наприклад: мова перекладу, країна подання, бажана транслітерація ПІБ, особливі вимоги установи";
      }

      return "Наприклад: країна подання, мета отримання документа або інші важливі дані";
    }

    function getPublicOrderNumber(orderId: string) {
      if (!orderId) return "";

      return `LB-${orderId.slice(-6).toUpperCase()}`;
    }

    if (isSuccess) {
      return (
        <main className="min-h-screen bg-[#f7f3ec] px-6 py-16 text-zinc-900 md:px-10 lg:px-16">
          <div 
            ref={successRef}
            tabIndex={-1}
            className="scroll-mt-28 mx-auto max-w-2xl rounded-3xl bg-white p-8 text-center shadow-sm"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9b6a24]">
              Заявку отримано
            </p>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              Дякуємо! Ми зв’яжемося з вами найближчим часом.
            </h1>

            <p className="mt-6 text-zinc-600">
              Ми перевіримо деталі заявки, документи та підкажемо наступні кроки.
            </p>

            {submittedOrderId && (
              <div className="mt-6 rounded-2xl bg-[#f7f3ec] px-4 py-3 text-sm text-zinc-700">
                Номер заявки:{" "}
                <span className="font-medium">{getPublicOrderNumber(submittedOrderId)}</span>
              </div>
            )}

            <a
              href="/"
              className="mt-8 inline-flex rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              На головну
            </a>
          </div>
        </main>
      );
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
          noValidate
          onSubmit={handleSubmit}
          className="mt-12 space-y-6 rounded-3xl bg-white p-6 shadow-sm md:p-8"
        >

          <div className="grid gap-6 md:grid-cols-2">
            <TextInputField
              label="Ім’я"
              value={formData.customerName}
              onChange={(event) => updateField("customerName", event.target.value)}
              placeholder="Ваше ім’я"
              required
              error={fieldErrors.customerName}
              dataErrorField="customerName"
            />
            <TextInputField
              label="Телефон"
              value={formData.phone}
              onChange={(event) =>
                updateField(
                  "phone",
                  event.target.value.replace(/[^\d+\-\s()]/g, "")
                )
              }
              placeholder="+421... або +380..."
              required
              error={fieldErrors.phone}
              type="tel"
              dataErrorField="phone"
            />
          </div>

          <SelectField
            label="Послуга"
            value={formData.serviceGroup}
            required
            onChange={(event) => {
              const value = event.target.value;

              setFormData((prev) => ({
                ...prev,
                serviceGroup: value,
                apostille: value === "driver_registry" ? "no" : "yes",
                translation: "none",
              }));

              if (fieldErrors.serviceGroup) {
                setFieldErrors((prev) => ({ ...prev, serviceGroup: undefined }));
              }
            }}
            error={fieldErrors.serviceGroup}
            dataErrorField="serviceGroup"
          >
            <option value="">Оберіть послугу</option>
            {getActiveServices().map((service) => (
              <option key={service.contentId} value={service.contentId}>
                {service.title}
              </option>
            ))}
          </SelectField>
          <ServicePreviewBlock selectedServiceContent={selectedServiceContent} />

          {formData.serviceGroup === "ua_clearance" && (
            <div className="space-y-6 rounded-3xl border border-[#d6a75c]/30 bg-[#f7f3ec] p-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#9b6a24]">
                  Уточнення для довідки про несудимість
                </p>
                <p className="mt-2 text-sm text-zinc-600">
                  Оберіть параметри — система сформує конкретний тип послуги для заявки.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">Терміновість</label>
                  <select
                    value={formData.urgency ?? "normal"}
                    onChange={(event) =>
                      updateField("urgency", event.target.value as "normal" | "urgent")
                    }
                    className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 outline-none transition focus:border-zinc-400"
                  >
                    <option value="normal">Стандартна</option>
                    <option value="urgent">Термінова</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Апостиль</label>
                  <select
                    value={formData.apostille ?? "yes"}
                    onChange={(event) =>
                      updateField("apostille", event.target.value as "yes" | "no")
                    }
                    className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 outline-none transition focus:border-zinc-400"
                  >
                    <option value="no">Без апостиля</option>
                    <option value="yes">З апостилем</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Переклад</label>
                  <select
                    value={formData.translation ?? "none"}
                    onChange={(event) =>
                      updateField(
                        "translation",
                        event.target.value as "none" | "sk" | "cz"
                      )
                    }
                    className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 outline-none transition focus:border-zinc-400"
                  >
                    <option value="none">Без перекладу</option>
                    <option value="sk">Переклад словацькою</option>
                    <option value="cz">Переклад чеською</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Тип витягу</label>
                  <select
                    value={formData.extractType ?? "full"}
                    onChange={(event) =>
                      updateField("extractType", event.target.value as "full" | "short")
                    }
                    className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 outline-none transition focus:border-zinc-400"
                  >
                    <option value="full">Повний витяг</option>
                    <option value="short">Скорочений витяг</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Мета отримання</label>
                <select
                  value={formData.purposeCode ?? "Подання до установ іноземних держав"}
                  onChange={(event) => updateField("purposeCode", event.target.value)}
                  className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 outline-none transition focus:border-zinc-400"
                >
                  <option value="Подання до установ іноземних держав">
                    Подання до установ іноземних держав
                  </option>
                  <option value="Оформлення візи для виїзду за кордон">
                    Оформлення візи для виїзду за кордон
                  </option>
                  <option value="Оформлення на роботу">Оформлення на роботу</option>
                  <option value="Оформлення набуття громадянства">
                    Оформлення набуття громадянства
                  </option>
                  <option value="Усиновлення / опіка / прийомна сім’я">
                    Усиновлення / опіка / прийомна сім’я
                  </option>
                  <option value="Публічна закупівля / тендер">
                    Публічна закупівля / тендер
                  </option>
                  <option value="Оформлення дозволу на зброю">
                    Оформлення дозволу на зброю
                  </option>
                  <option value="Ліцензія / діяльність з наркотичними речовинами">
                    Ліцензія / діяльність з наркотичними речовинами
                  </option>
                  <option value="Подання до ТЦК та СП">Подання до ТЦК та СП</option>
                  <option value="Пред’явлення за місцем вимоги">
                    Пред’явлення за місцем вимоги
                  </option>
                </select>
              </div>

              <p className="text-xs leading-5 text-zinc-500">
                За замовчуванням використовується повний витяг і мета “Подання до установ
                іноземних держав”. Якщо установа має інші вимоги — змініть параметри.
              </p>
            </div>
          )}

          <TextInputField
            label="Прізвище та ім’я (для документа)"
            value={formData.subjectFullName}
            onChange={(event) => updateField("subjectFullName", event.target.value)}
            placeholder="Прізвище та ім’я особи"
            required
            error={fieldErrors.subjectFullName}
            dataErrorField="subjectFullName"
          />

          {["pl_clearance", "hu_clearance", "cz_clearance"].includes(formData.serviceGroup) && (
            <div className="space-y-4 rounded-3xl border border-[#d6a75c]/30 bg-[#f7f3ec] p-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#9b6a24]">
                  Параметри оформлення
                </p>
                <p className="mt-2 text-sm text-zinc-600">
                  Оберіть параметри оформлення та нижче вкажіть додаткові дані для формування запиту.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Апостиль</label>
                <select
                  value={formData.apostille ?? "no"}
                  onChange={(event) =>
                    updateField("apostille", event.target.value as "yes" | "no")
                  }
                  className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 outline-none transition focus:border-zinc-400"
                >
                  <option value="no">Без апостиля</option>
                  <option value="yes">З апостилем</option>
                </select>
              </div>
            </div>
          )}

          {formData.serviceGroup === "driver_registry" && (
            <div className="space-y-4 rounded-3xl border border-[#d6a75c]/30 bg-[#f7f3ec] p-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#9b6a24]">
                  Параметри оформлення
                </p>
                <p className="mt-2 text-sm text-zinc-600">
                  Оберіть, чи потрібен апостиль та переклад для подання документа за кордоном.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">Апостиль</label>
                  <select
                    value={formData.apostille ?? "no"}
                    onChange={(event) =>
                      updateField("apostille", event.target.value as "yes" | "no")
                    }
                    className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 outline-none transition focus:border-zinc-400"
                  >
                    <option value="no">Без апостиля</option>
                    <option value="yes">З апостилем</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Переклад</label>
                  <select
                    value={formData.translation ?? "none"}
                    onChange={(event) =>
                      updateField("translation", event.target.value as "none" | "sk")
                    }
                    className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 outline-none transition focus:border-zinc-400"
                  >
                    <option value="none">Без перекладу</option>
                    <option value="sk">Переклад словацькою</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {formData.serviceGroup === "civil_registry" && (
            <div className="space-y-4 rounded-3xl border border-[#d6a75c]/30 bg-[#f7f3ec] p-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#9b6a24]">
                  Параметри оформлення
                </p>
                <p className="mt-2 text-sm text-zinc-600">
                  Оберіть, який документ РАЦС потрібно оформити та чи потрібні апостиль і
                  переклад.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Тип документа</label>
                <select
                  value={formData.civilRegistryType ?? "duplicate"}
                  onChange={(event) =>
                    updateField(
                      "civilRegistryType",
                      event.target.value as "duplicate" | "extract" | "apostille_only"
                    )
                  }
                  className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 outline-none transition focus:border-zinc-400"
                >
                  <option value="duplicate">Дублікат свідоцтва</option>
                  <option value="extract">Витяг з ДРАЦС</option>
                  <option value="apostille_only">Апостиль на ваше свідоцтво</option>
                </select>
              </div>

              {formData.civilRegistryType !== "apostille_only" && (
                <div>
                  <label className="mb-2 block text-sm font-medium">Апостиль</label>
                  <select
                    value={formData.apostille ?? "yes"}
                    onChange={(event) =>
                      updateField("apostille", event.target.value as "yes" | "no")
                    }
                    className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 outline-none transition focus:border-zinc-400"
                  >
                    <option value="yes">З апостилем</option>
                    <option value="no">Без апостиля</option>
                  </select>
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-medium">Переклад</label>
                <select
                  value={formData.translation ?? "none"}
                  onChange={(event) =>
                    updateField("translation", event.target.value as "none" | "sk")
                  }
                  className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 outline-none transition focus:border-zinc-400"
                >
                  <option value="none">Без перекладу</option>
                  <option value="sk">Переклад словацькою</option>
                </select>
              </div>
            </div>
          )}

          {formData.serviceGroup === "education_apostille" && (
            <div className="space-y-4 rounded-3xl border border-[#d6a75c]/30 bg-[#f7f3ec] p-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#9b6a24]">
                  Параметри оформлення
                </p>
                <p className="mt-2 text-sm text-zinc-600">
                  Оберіть тип оформлення освітнього документа.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Тип послуги</label>
                <select
                  value={formData.educationType ?? "standard"}
                  onChange={(event) =>
                    updateField(
                      "educationType",
                      event.target.value as
                        | "standard"
                        | "urgent"
                        | "institution_certificate"
                    )
                  }
                  className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 outline-none transition focus:border-zinc-400"
                >
                  <option value="standard">Апостиль освітнього документа — стандартно</option>
                  <option value="urgent">Апостиль освітнього документа — терміново</option>
                  <option value="institution_certificate">
                    Апостиль довідки з навчального закладу
                  </option>
                </select>
              </div>
            </div>
          )}

          {formData.serviceGroup === "translation" && (
            <div className="space-y-4 rounded-3xl border border-[#d6a75c]/30 bg-[#f7f3ec] p-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#9b6a24]">
                  Параметри перекладу
                </p>
                <p className="mt-2 text-sm text-zinc-600">
                  Оберіть тип документа та мову перекладу.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Тип перекладу</label>
                <select
                  value={formData.translationType ?? "clearance_sk"}
                  onChange={(event) =>
                    updateField(
                      "translationType",
                      event.target.value as
                        | "clearance_sk"
                        | "certificate_sk"
                        | "clearance_cz"
                    )
                  }
                  className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 outline-none transition focus:border-zinc-400"
                >
                  <option value="clearance_sk">Переклад довідки словацькою</option>
                  <option value="certificate_sk">Переклад свідоцтва словацькою</option>
                  <option value="clearance_cz">Переклад довідки чеською</option>
                </select>
              </div>
            </div>
          )}

          <TextareaField
              label="Додаткова інформація"
              value={formData.intakeDetails ?? ""}
              onChange={(event) => updateField("intakeDetails", event.target.value)}
              placeholder={getIntakeDetailsPlaceholder()}
              helperText="Це поле допомагає нам швидше перевірити заявку та зрозуміти вашу ситуацію."
            />

            <FileUploadBlock
              onChange={handleFilesChange}
              error={fieldErrors.files}
              selectedFiles={selectedFiles}
              removeFile={removeFile}
            />

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

export default function SubmitRequestPage() {
  return (
    <Suspense fallback={null}>
      <SubmitRequestForm />
    </Suspense>
  );
}