"use client";

import { useLocale } from "next-intl";
import { useState } from "react";
import Image from "next/image";
import { contact } from "@/content/about";

const COPY = {
  es: {
    title: "¡Trabajemos juntas!",
    sub: "Demos vida a tu visión, construyamos algo con impacto.",
    name: "Nombre",
    namePh: "Compañera de viaje",
    email: "Email",
    emailPh: "hola@ejemplo.com",
    msg: "¿En qué te puedo ayudar...?",
    msgPh: "Hola, nos gustaría trabajar contigo.",
    send: "Enviar",
  },
  en: {
    title: "Let's Work Together!",
    sub: "Let's bring your vision to life, build something impactful together.",
    name: "Name",
    namePh: "Fellow Traveler",
    email: "Email",
    emailPh: "hello@example.com",
    msg: "What Can I Help You...",
    msgPh: "Hey, we would like to hire you!",
    send: "Send",
  },
} as const;

/**
 * Recurring "Let's Work Together!" contact block — photo + green hand
 * accent + a mailto form. Appears at the bottom of every page in the Figma.
 */
export function WorkTogether({
  photo = "/figma/home/portrait.jpg",
}: {
  photo?: string;
}) {
  const locale = useLocale();
  const t = COPY[locale === "en" ? "en" : "es"];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio · ${name || "Hola"}`);
    const body = encodeURIComponent(
      `${msg}\n\n${name}${email ? ` (${email})` : ""}`,
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section className="bg-white px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-12 md:flex-row md:items-stretch md:justify-center md:gap-16">
        {/* Photo + hand */}
        <div className="relative shrink-0">
          <div className="relative h-[360px] w-[266px] overflow-hidden rounded-[16px] shadow-[0_8px_22px_rgba(0,0,0,0.12)] sm:h-[390px] sm:w-[286px]">
            <Image
              src={photo}
              alt=""
              fill
              sizes="286px"
              className="object-cover object-center"
            />
          </div>
          <div className="bg-green absolute -bottom-5 -left-5 flex size-[72px] items-center justify-center rounded-full text-[28px] shadow-lg sm:size-[83px] sm:text-[30px]">
            ✋
          </div>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="w-full max-w-[520px]">
          <h2 className="font-inter text-ink2 text-[34px] leading-tight font-bold sm:text-[48px]">
            {t.title}
          </h2>
          <p className="font-inter text-muted mt-3 max-w-[400px] text-[16px] leading-[24px] sm:text-[17px]">
            {t.sub}
          </p>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <label className="flex flex-1 flex-col gap-[6px]">
              <span className="font-inter text-green-soft text-[13px] font-medium">
                {t.name}
              </span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.namePh}
                className="bg-field font-inter text-ink2 placeholder:text-field-text focus:ring-green/40 h-[46px] rounded-[8px] px-[14px] text-[14px] outline-none focus:ring-2"
              />
            </label>
            <label className="flex flex-1 flex-col gap-[6px]">
              <span className="font-inter text-green-soft text-[13px] font-medium">
                {t.email}
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPh}
                className="bg-field font-inter text-ink2 placeholder:text-field-text focus:ring-green/40 h-[46px] rounded-[8px] px-[14px] text-[14px] outline-none focus:ring-2"
              />
            </label>
          </div>

          <label className="mt-4 flex flex-col gap-[6px]">
            <span className="font-inter text-green-soft text-[13px] font-medium">
              {t.msg}
            </span>
            <textarea
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder={t.msgPh}
              rows={4}
              className="bg-field font-inter text-ink2 placeholder:text-field-text focus:ring-green/40 rounded-[8px] px-[14px] py-3 text-[14px] outline-none focus:ring-2"
            />
          </label>

          <button
            type="submit"
            className="border-green font-inter text-green hover:bg-green mt-5 rounded-full border-[1.5px] px-[28px] py-[11px] text-[15px] font-semibold transition-colors hover:text-white"
          >
            {t.send}
          </button>
        </form>
      </div>
    </section>
  );
}
