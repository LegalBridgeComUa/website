import { getActiveServices } from "@/lib/service-content";
import { getIcon } from "@/lib/icons";

const steps = [
  "Залишаєте заявку",
  "Ми перевіряємо документи",
  "Подаємо запит в Україні",
  "Ви отримуєте результат",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f3ec] text-zinc-900">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#d6a75c33,transparent_35%),radial-gradient(circle_at_bottom_left,#1f293733,transparent_30%)]" />

        <div className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-12 px-6 py-10 md:grid-cols-2 md:px-10 lg:px-16">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#9b6a24]">
              Міст між вами та Україною
            </p>

            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl md:leading-tight">
              Юридичні та документальні питання в Україні — без вашої
              присутності
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-700">
              Допомагаємо українцям за кордоном вирішувати документальні,
              адміністративні та юридичні питання дистанційно.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm font-medium text-zinc-700">
              <span className="rounded-full bg-white/70 px-4 py-2 shadow-sm">
                10+ років досвіду
              </span>
              <span className="rounded-full bg-white/70 px-4 py-2 shadow-sm">
                20 000+ запитів
              </span>
              <span className="rounded-full bg-white/70 px-4 py-2 shadow-sm">
                По всій Україні
              </span>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="/submit-request"
                className="rounded-full bg-zinc-900 px-7 py-4 text-center text-sm font-semibold text-white transition hover:bg-zinc-800">
                Подати заявку
              </a>
              <a className="rounded-full border border-zinc-300 bg-white/60 px-7 py-4 text-center text-sm font-semibold transition hover:bg-white">
                Отримати консультацію
              </a>
            </div>
          </div>

          <div
            id="process"
            className="rounded-[2rem] border border-white/60 bg-white/60 p-6 shadow-2xl backdrop-blur"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9b6a24]">
              Як ми допомагаємо
            </p>
            <div className="mt-6 grid gap-4">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d6a75c] text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <p className="font-medium">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="services"
        className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-16"
      >
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9b6a24]">
            Послуги
          </p>
          <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
            Основні напрямки роботи
          </h2>
        </div>

        <div className="mt-10 flex snap-x gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible">
          {getActiveServices().map((service) => {
            const Icon = getIcon(service.icon);
            return (
              <div
                key={service.contentId}
                className="min-w-[260px] snap-start rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f7f3ec]">
                  <Icon className="h-6 w-6 text-[#9b6a24]" />
                </div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="mt-4 text-sm leading-6 text-zinc-600">
                  {service.shortDescription}
                </p>
                <a
                  href={`/services/${service.contentId}`}
                  className="mt-6 inline-flex text-sm font-semibold text-[#9b6a24]"
                >
                  Детальніше →
                </a>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-zinc-900 px-6 py-20 text-white md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
          <div>
            <p className="text-5xl font-semibold text-[#d6a75c]">20 000+</p>
            <p className="mt-3 text-zinc-300">оброблених запитів</p>
          </div>
          <div>
            <p className="text-5xl font-semibold text-[#d6a75c]">10+</p>
            <p className="mt-3 text-zinc-300">років практичного досвіду</p>
          </div>
          <div>
            <p className="text-5xl font-semibold text-[#d6a75c]">UA + EU</p>
            <p className="mt-3 text-zinc-300">
              клієнти в Україні та за кордоном
            </p>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="mx-auto max-w-5xl px-6 py-24 text-center md:px-10"
      >
        <h2 className="text-3xl font-semibold md:text-5xl">
          Ви за кордоном — ми діємо в Україні
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
          LegalBridge виріс із 10+ років практики, партнерських рекомендацій та
          тисяч успішно вирішених запитів. Тепер ми робимо цей сервіс доступним
          публічно.
        </p>
        <a className="mt-10 inline-flex rounded-full bg-zinc-900 px-8 py-4 text-sm font-semibold text-white transition hover:bg-zinc-800">
          Почати консультацію
        </a>
      </section>
    </main>
  );
}