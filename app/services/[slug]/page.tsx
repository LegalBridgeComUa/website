import { notFound } from "next/navigation";
import Link from "next/link";
import { getServiceById, getActiveServices } from "@/lib/service-content";
import { getIcon } from "@/lib/icons";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const services = getActiveServices();
  return services.map((service) => ({
    slug: service.contentId,
  }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceById(slug);

  if (!service) {
    return {
      title: "Послуга не знайдена — LegalBridge",
    };
  }

  return {
    title: `${service.title} — LegalBridge`,
    description: service.shortDescription,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceById(slug);

  if (!service) {
    notFound();
  }

  const allServices = getActiveServices();
  const currentIndex = allServices.findIndex((s) => s.contentId === slug);
  const prevService = currentIndex > 0 ? allServices[currentIndex - 1] : null;
  const nextService = currentIndex < allServices.length - 1 ? allServices[currentIndex + 1] : null;

  return (
    <main className="min-h-screen bg-[#f7f3ec] text-zinc-900">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-6 py-4 md:px-10 lg:px-16">
        <nav className="flex items-center gap-2 text-sm text-zinc-500">
          <Link href="/" className="hover:text-[#9b6a24]">
            Головна
          </Link>
          <span>/</span>
          <Link href="/services" className="hover:text-[#9b6a24]">
            Послуги
          </Link>
          <span>/</span>
          <span className="text-zinc-900">{service.title}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-12 md:px-10 lg:px-16">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
          {(() => {
            const Icon = getIcon(service.icon);
            return <Icon className="h-8 w-8 text-[#9b6a24]" />;
          })()}
        </div>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
          {service.title}
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-8 text-zinc-600">
          {service.shortDescription}
        </p>
      </section>

      {/* Main content */}
      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10 lg:px-16">
        <div className="flex flex-col gap-12 lg:flex-row">
          {/* Left column - Details */}
          <div className="flex-1 space-y-12">
            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold uppercase tracking-[0.1em] text-[#9b6a24]">
                Про послугу
              </h2>
              <p className="mt-4 text-lg leading-8 text-zinc-700">
                {service.longDescription}
              </p>
            </div>

            {/* Who it is for */}
            <div>
              <h2 className="text-lg font-semibold uppercase tracking-[0.1em] text-[#9b6a24]">
                Для кого
              </h2>
              <ul className="mt-4 space-y-3">
                {service.whoItIsFor.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#d6a75c]" />
                    <span className="text-lg text-zinc-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Required documents */}
            <div>
              <h2 className="text-lg font-semibold uppercase tracking-[0.1em] text-[#9b6a24]">
                Що потрібно
              </h2>
              <ul className="mt-4 space-y-3">
                {service.requiredDocuments.map((doc, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#d6a75c]" />
                    <span className="whitespace-pre-line text-lg text-zinc-700">
                      {doc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column - Sidebar */}
          <div className="space-y-6 lg:w-[320px] lg:shrink-0 lg:sticky lg:top-[72px] lg:h-fit">
            {/* Result card */}
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-[#9b6a24]">
                Результат
              </h3>
              <p className="mt-3 text-lg font-medium">{service.resultText}</p>
            </div>

            {/* Turnaround card */}
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-[#9b6a24]">
                Строк
              </h3>
              <p className="mt-3 text-lg font-medium">{service.turnaroundText}</p>
            </div>

            {/* CTA */}
            <Link
              href={`/submit-request?service=${service.contentId}`}
              className="block rounded-3xl bg-zinc-900 px-6 py-4 text-center text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              Подати заявку
            </Link>
          </div>
        </div>
      </section>

      {/* Navigation between services */}
      <section className="border-t border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-7xl justify-between px-6 py-6 md:px-10 lg:px-16">
          {prevService ? (
            <Link
              href={`/services/${prevService.contentId}`}
              className="group flex items-center gap-3"
            >
              <span className="text-zinc-400 transition group-hover:text-[#9b6a24]">
                ←
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.1em] text-zinc-500">
                  Попередня
                </p>
                <p className="font-medium text-zinc-900 group-hover:text-[#9b6a24]">
                  {prevService.title}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextService ? (
            <Link
              href={`/services/${nextService.contentId}`}
              className="group flex items-center gap-3 text-right"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.1em] text-zinc-500">
                  Наступна
                </p>
                <p className="font-medium text-zinc-900 group-hover:text-[#9b6a24]">
                  {nextService.title}
                </p>
              </div>
              <span className="text-zinc-400 transition group-hover:text-[#9b6a24]">
                →
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>

      {/* FAQ Section */}
      {service.faq && service.faq.length > 0 && (
        <section className="mx-auto max-w-4xl px-6 py-20 md:px-10">
          <h2 className="text-2xl font-semibold">Питання та відповіді</h2>
          <div className="mt-8 space-y-6">
            {service.faq.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-zinc-200 bg-white p-6"
              >
                <h3 className="text-lg font-medium text-zinc-900">
                  {item.question}
                </h3>
                <p className="mt-3 text-zinc-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-zinc-900 px-6 py-16 text-white md:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold md:text-4xl">
            Готові оформити?
          </h2>
          <p className="mt-4 text-lg text-zinc-300">
            Залиште заявку — ми зв'яжемося з вами, перевіримо деталі та
            підкажемо оптимальний формат.
          </p>
          <Link
            href={`/submit-request?service=${service.contentId}`}
            className="mt-8 inline-block rounded-full bg-[#d6a75c] px-8 py-4 text-sm font-semibold text-zinc-900 transition hover:bg-[#e5b768]"
          >
            Подати заявку
          </Link>
        </div>
      </section>
    </main>
  );
}