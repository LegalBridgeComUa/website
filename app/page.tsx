import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LegalBridge — Міст між вами та Україною",
  description:
    "Допомагаємо українцям за кордоном дистанційно вирішувати документальні, адміністративні та юридичні питання в Україні.",
  alternates: {
    canonical: "/",
  },
};
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
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9b6a24]">
              LegalBridge
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
              Міст між вами та Україною
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
              Допомагаємо українцям за кордоном дистанційно вирішувати документальні,
              адміністративні та юридичні питання в Україні — спокійно, зрозуміло й без
              зайвої бюрократії.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/submit-request"
                className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                Подати заявку
              </a>

              <a
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:border-zinc-400"
              >
                Отримати консультацію
              </a>
            </div>
          </div>

          <div
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

      <section className="mt-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9b6a24]">
              Чому нам довіряють
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              Досвід, який працює на ваш результат
            </h2>

            <p className="mt-6 text-lg leading-8 text-zinc-600">
              Понад 10 років працюємо з документальними процесами в Україні та знаємо, як пройти їх спокійно, професійно й без помилок.  
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[
              "Понад 10 років практичного досвіду",
              "Виросли завдяки рекомендаціям та довірі, а не рекламі",
              "Пояснюємо складне просто і зрозуміло",
              "Супроводжуємо до результату та несемо відповідальність",
            ].map((item) => (
              <div
                key={item}
                className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-zinc-200/70"
              >
                <p className="text-base font-medium text-zinc-900">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="services"
        className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-16"
      >
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9b6a24]">
            Послуги
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
            З чим ми можемо допомогти
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-600">
            Окремі документи, комплексні запити та супровід процесів в Україні — від приватних звернень до партнерської співпраці.
          </p>
        </div>

        <div className="mt-10 flex snap-x gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible">
          {getActiveServices().map((service) => {
            const Icon = getIcon(service.icon);
            return (
              <a
                key={service.contentId}
                href={`/services/${service.contentId}`}
                className="group min-w-[260px] snap-start rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f7f3ec]">
                  <Icon className="h-6 w-6 text-[#9b6a24]" />
                </div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="mt-4 text-sm leading-6 text-zinc-600">
                  {service.shortDescription}
                </p>
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#9b6a24]">
                  <span>Детальніше</span>
                  <span className="transition group-hover:translate-x-1">→</span>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      <section id="process" className="scroll-mt-24 mx-auto max-w-7xl px-6 py-24 md:px-10 lg:px-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9b6a24]">
            Як це працює
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
            Простий і зрозумілий процес
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-600">
            Ми побудували процес так, щоб вам не доводилося розбиратися в деталях
            самостійно. Пояснюємо, що потрібно, перевіряємо документи та супроводжуємо
            запит до результату.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[
            {
              step: "01",
              title: "Ви залишаєте заявку",
              text: "Коротко описуєте запит і надсилаєте документи в зручному форматі.",
            },
            {
              step: "02",
              title: "Ми перевіряємо деталі",
              text: "Уточнюємо, що саме потрібно, перевіряємо документи та пропонуємо оптимальний варіант.",
            },
            {
              step: "03",
              title: "Беремо процес у роботу",
              text: "Подаємо запити, супроводжуємо оформлення та контролюємо проходження процесу в Україні.",
            },
            {
              step: "04",
              title: "Ви отримуєте готові документи",
              text: "Узгоджуємо найзручніший спосіб доставки: по Україні, за кордон, через перевізників, поштою або з отриманням у Братиславі.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-zinc-200/70"
            >
              <p className="text-sm font-semibold text-[#9b6a24]">{item.step}</p>
              <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-zinc-600">{item.text}</p>
            </div>
          ))}
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
        <a
          href="/submit-request"
          className="mt-10 inline-flex rounded-full bg-zinc-900 px-8 py-4 text-sm font-semibold text-white transition hover:bg-zinc-800"
        >
          Подати заявку
        </a>
      </section>
    </main>
  );
}