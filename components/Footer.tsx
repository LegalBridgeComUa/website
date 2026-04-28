import Image from "next/image";

export default function Footer() {
  return (
    <footer
      id="contacts"
      className="border-t border-black/5 bg-white px-6 py-12 md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Image
              src="/logo-lb.png"
              alt="LegalBridge"
              width={160}
              height={60}
              className="mx-auto h-auto w-80 md:mx-0"
            />

            <p className="mt-4 text-sm font-medium text-zinc-900">
              Міст між вами та Україною
            </p>

            <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-600">
              Допомагаємо дистанційно вирішувати документальні,
              адміністративні та юридичні питання в Україні — спокійно,
              зрозуміло й професійно.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Навігація
            </h3>

            <div className="mt-4 space-y-2 text-sm text-zinc-700">
              <a href="/services" className="block transition hover:text-[#9b6a24]">
                Послуги
              </a>
              <a href="/#process" className="block transition hover:text-[#9b6a24]">
                Як це працює
              </a>
              <a href="/#about" className="block transition hover:text-[#9b6a24]">
                Про LegalBridge
              </a>
              <a
                href="/submit-request"
                className="block transition hover:text-[#9b6a24]"
              >
                Подати заявку
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Контакти
            </h3>

            <div className="mt-4 space-y-2 text-sm text-zinc-700">
              <p>Ужгород, Україна</p>
              <a
                href="mailto:info@legalbridge.com.ua"
                className="block transition hover:text-[#9b6a24]"
              >
                info@legalbridge.com.ua
              </a>
              <a
                href="tel:+380995057733"
                className="block transition hover:text-[#9b6a24]"
              >
                +380 99 505 77 33
              </a>

              <p>Telegram · Viber · WhatsApp</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-black/5 pt-6 text-sm text-zinc-500">
          © {new Date().getFullYear()} LegalBridge. Усі права захищені.
        </div>
      </div>
    </footer>
  );
}