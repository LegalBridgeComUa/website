"use client";

import { useState } from "react";
import Image from "next/image";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <header className="sticky top-0 z-50 border-b border-black/5 bg-[#f7f3ec]/90 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10 lg:px-16">
                <a className="flex items-center gap-3" href="/">
                <Image
                    src="/logo-main.png"
                    alt="LegalBridge"
                    width={140}
                    height={50}
                    className="h-auto w-28 md:w-36"
                />
                </a>

                <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
                <a href="/#services" className="transition hover:text-[#9b6a24]">
                    Послуги
                </a>
                <a href="/#process" className="transition hover:text-[#9b6a24]">
                    Як працює
                </a>
                <a href="/#about" className="transition hover:text-[#9b6a24]">
                    Про нас
                </a>
                <a href="/#contacts" className="transition hover:text-[#9b6a24]">
                    Контакти
                </a>
                </nav>

                <a
                href="/submit-request"
                className="hidden rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 md:inline-flex"
                >
                Подати заявку
                </a>

                <button
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="inline-flex rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium md:hidden"
                    >
                    Меню
                </button>
            </div>
            {isOpen && (
                <div className="border-t border-black/5 px-6 py-4 md:hidden">
                    <nav className="flex flex-col gap-4 text-sm font-medium">
                    <a href="/#services" onClick={() => setIsOpen(false)}>
                        Послуги
                    </a>
                    <a href="/#process" onClick={() => setIsOpen(false)}>
                        Як працює
                    </a>
                    <a href="/#about" onClick={() => setIsOpen(false)}>
                        Про нас
                    </a>
                    <a href="/#contacts" onClick={() => setIsOpen(false)}>
                        Контакти
                    </a>
                    <a
                        href="/submit-request"
                        onClick={() => setIsOpen(false)}
                        className="rounded-full bg-zinc-900 px-5 py-3 text-center text-white"
                    >
                        Подати заявку
                    </a>
                    </nav>
                </div>
            )}
        </header>
    );
}