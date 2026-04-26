import Link from "next/link";
import { getActiveServices } from "@/lib/service-content";
import { getIcon } from "@/lib/icons";

export const metadata = {
  title: "Послуги — LegalBridge",
  description: "Юридичні та документальні послуги для українців за кордоном. Довідки, апостиль, переклади, легалізація документів.",
};

export default function ServicesPage() {
  const services = getActiveServices();

  return (
    <main className="min-h-screen bg-[#f7f3ec] text-zinc-900">
      {/* Header */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9b6a24]">
          Послуги
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
          Основні напрямки роботи
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
          Ми допомагаємо українцям за кордоном вирішувати документальні,
          адміністративні та юридичні питання в Україні — без вашої присутності.
        </p>
      </section>

      {/* Services Grid */}
      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10 lg:px-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = getIcon(service.icon);
            return (
              <Link
                key={service.contentId}
                href={`/services/${service.contentId}`}
                className="group rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Icon */}
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f7f3ec] transition group-hover:bg-[#d6a75c]/10">
                  <Icon className="h-7 w-7 text-[#9b6a24]" />
                </div>

                {/* Title */}
                <h2 className="text-xl font-semibold">{service.title}</h2>

                {/* Short description */}
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  {service.shortDescription}
                </p>

                {/* Turnaround if available */}
                {service.turnaroundText && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-zinc-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#d6a75c]" />
                    <span>{service.turnaroundText}</span>
                  </div>
                )}

                {/* Link */}
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#9b6a24]">
                  <span>Детальніше</span>
                  <span className="transition group-hover:translate-x-1">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-zinc-900 px-6 py-16 text-white md:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold md:text-4xl">
            Не знаєте, яка послуга потрібна?
          </h2>
          <p className="mt-4 text-lg text-zinc-300">
            Залиште заявку — ми проконсультуємо та допоможемо обрати правильний формат.
          </p>
          <Link
            href="/submit-request"
            className="mt-8 inline-block rounded-full bg-[#d6a75c] px-8 py-4 text-sm font-semibold text-zinc-900 transition hover:bg-[#e5b768]"
          >
            Подати заявку
          </Link>
        </div>
      </section>
    </main>
  );
}