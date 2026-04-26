import Image from "next/image";

export default function Footer() {
  return (
    <footer
      id="contacts"
      className="border-t border-black/5 bg-white px-6 py-12 md:px-10 lg:px-16"
    >
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        <div>
          <Image
            src="/logo-main.png"
            alt="LegalBridge"
            width={160}
            height={60}
            className="h-auto w-32"
          />
          <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-600">
            LegalBridge — сервіс представництва в Україні для українців, які перебувають за кордоном, з питань документів, права та дистанційного супроводу.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Контакти
          </h3>
          <div className="mt-4 space-y-2 text-sm text-zinc-700">
            <p>Ужгород, Україна</p>
            <p>admin@legalbridge.com.ua</p>
            <p>Telegram / Viber / WhatsApp</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Навігація
          </h3>
          <div className="mt-4 space-y-2 text-sm text-zinc-700">
            <a href="/#services" className="block hover:text-[#9b6a24]">
              Послуги
            </a>
            <a href="/#about" className="block hover:text-[#9b6a24]">
              Про нас
            </a>
            <a href="/#contacts" className="block hover:text-[#9b6a24]">
              Контакти
            </a>
            <a href="/submit-request" className="block hover:text-[#9b6a24]">
              Подати заявку
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}