"use client";

import { useLocale } from "next-intl";
import { useState } from "react";
import Image from "next/image";

const COPY = {
  es: {
    coffeeTitle: "Tomémonos un café",
    detailTitle: "¡Trabajemos juntas!",
    sub: "Demos vida a tu visión, construyamos algo con impacto.",
    name: "Nombre",
    namePh: "Compañera de viaje",
    email: "Email",
    emailPh: "hola@ejemplo.com",
    msg: "¿En qué te puedo ayudar...?",
    msgPh: "Hola, nos gustaría trabajar contigo.",
    send: "Enviar",
    sending: "Enviando...",
    sent: "¡Mensaje enviado!",
    error: "No se pudo enviar. Inténtalo de nuevo.",
  },
  en: {
    coffeeTitle: "Let's grab a coffee",
    detailTitle: "Let's work together",
    sub: "Let's talk ideas, projects, or working together: if something here resonated, I'd love to hear from you.",
    name: "Name",
    namePh: "Fellow Traveler",
    email: "Email",
    emailPh: "hello@example.com",
    msg: "What Can I Help You...",
    msgPh: "Hey, we would like to hire you!",
    send: "Send",
    sending: "Sending...",
    sent: "Message sent!",
    error: "Couldn't send it. Please try again.",
  },
} as const;

type WorkTogetherProps = {
  variant?: "coffee" | "detail";
};

/**
 * Recurring "Let's grab a coffee" contact block — photo + burgundy hand
 * accent + a contact form that emails the site owner via /api/contact.
 * Appears at the bottom of every page in the Figma.
 */
export function WorkTogether({ variant = "coffee" }: WorkTogetherProps) {
  const locale = useLocale();
  const t = COPY[locale === "en" ? "en" : "es"];
  const title = variant === "detail" ? t.detailTitle : t.coffeeTitle;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, msg }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("sent");
      setName("");
      setEmail("");
      setMsg("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="bg-white px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-12 md:flex-row md:items-stretch md:justify-center md:gap-16">
        {/* Photo + hand */}
        <div className="relative h-[360px] w-[266px] shrink-0 sm:h-[390px] sm:w-[286px]">
          <div className="absolute inset-0 overflow-hidden rounded-[16px] shadow-[0_8px_22px_rgba(0,0,0,0.12)]">
            <Image
              src="/shared/portraits/work-together.png"
              alt=""
              fill
              sizes="286px"
              preload
              className="object-cover object-center"
            />
          </div>
          <div className="absolute bottom-0 left-0 flex size-[72px] -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-[#7B173B] text-[28px] shadow-lg sm:size-[83px] sm:text-[30px]">
            ✋
          </div>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="w-full max-w-[520px]">
          <h2 className="font-inter text-ink2 text-[34px] leading-tight font-bold sm:text-[48px]">
            {title}
          </h2>
          <p className="font-inter text-muted mt-3 max-w-[400px] text-[16px] leading-[24px] sm:text-[17px]">
            {t.sub}
          </p>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <label className="flex flex-1 flex-col gap-[6px]">
              <span className="font-inter text-[#722F37] text-[13px] font-medium">
                {t.name}
              </span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.namePh}
                className="bg-field font-inter text-ink2 placeholder:text-field-text h-[46px] rounded-[8px] px-[14px] text-[14px] outline-none focus:ring-2 focus:ring-[#722F37]/40"
              />
            </label>
            <label className="flex flex-1 flex-col gap-[6px]">
              <span className="font-inter text-[#722F37] text-[13px] font-medium">
                {t.email}
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPh}
                className="bg-field font-inter text-ink2 placeholder:text-field-text h-[46px] rounded-[8px] px-[14px] text-[14px] outline-none focus:ring-2 focus:ring-[#722F37]/40"
              />
            </label>
          </div>

          <label className="mt-4 flex flex-col gap-[6px]">
            <span className="font-inter text-[#7B173B] text-[13px] font-medium">
              {t.msg}
            </span>
            <textarea
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder={t.msgPh}
              rows={4}
              className="bg-field font-inter text-ink2 placeholder:text-field-text rounded-[8px] px-[14px] py-3 text-[14px] outline-none focus:ring-2 focus:ring-[#722F37]/40"
            />
          </label>

          <button
            type="submit"
            disabled={status === "sending"}
            className="border-[#722F37] font-inter text-[#722F37] hover:bg-[#722F37] mt-5 rounded-full border-[1.5px] px-[28px] py-[11px] text-[15px] font-semibold transition-colors hover:text-white disabled:opacity-60"
          >
            {status === "sending" ? t.sending : t.send}
          </button>
          {status === "sent" && (
            <p className="font-inter mt-3 text-[14px] text-[#7B173B]">
              {t.sent}
            </p>
          )}
          {status === "error" && (
            <p className="font-inter mt-3 text-[14px] text-red-600">
              {t.error}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
