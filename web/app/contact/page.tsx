"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronRight, MapPin, Send, CheckCircle } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/lib/i18n";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  langPref: "fr" | "en";
}

// ─── FAQ Accordion ────────────────────────────────────────────────────────────

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b" style={{ borderColor: "#1E2E28" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full py-4 text-left gap-4"
      >
        <span className="font-body font-medium text-sm" style={{ color: "#F5FAF7" }}>
          {question}
        </span>
        <motion.span
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
          style={{ color: "#4A6358" }}
        >
          <ChevronRight size={16} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-4 font-body text-sm leading-relaxed" style={{ color: "#4A6358" }}>
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const { lang } = useLanguage();
  const faqRef = useRef<HTMLElement>(null);
  const faqInView = useInView(faqRef, { once: true, margin: "-60px" });

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
    langPref: lang,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, lang }),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };

      if (!res.ok || !data.success) {
        throw new Error(data.error ?? "Unknown error");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Server error. Please try again.");
    }
  }

  const subjects = [
    t("contact.subject.general", lang),
    t("contact.subject.partnership", lang),
    t("contact.subject.press", lang),
    t("contact.subject.instructor", lang),
    t("contact.subject.bug", lang),
    t("contact.subject.other", lang),
  ];

  const faqs = [
    { q: t("contact.faq.q1", lang), a: t("contact.faq.a1", lang) },
    { q: t("contact.faq.q2", lang), a: t("contact.faq.a2", lang) },
    { q: t("contact.faq.q3", lang), a: t("contact.faq.a3", lang) },
    { q: t("contact.faq.q4", lang), a: t("contact.faq.a4", lang) },
    { q: t("contact.faq.q5", lang), a: t("contact.faq.a5", lang) },
  ];

  return (
    <div style={{ backgroundColor: "#0A0F0E", color: "#F5FAF7" }}>
      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl space-y-3"
          >
            <h1 className="font-heading font-semibold text-4xl sm:text-5xl">
              {t("contact.headline", lang)}
            </h1>
            <p className="font-body text-lg" style={{ color: "#4A6358" }}>
              {t("contact.subtext", lang)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form + Info columns */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Contact form */}
            <div className="lg:col-span-2">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl border p-10 flex flex-col items-center text-center gap-4"
                  style={{ backgroundColor: "#111915", borderColor: "#1E2E28" }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "rgba(15,110,86,0.15)" }}
                  >
                    <CheckCircle size={28} style={{ color: "#1D9E75" }} />
                  </div>
                  <h2 className="font-heading font-semibold text-xl">
                    {lang === "fr" ? "Message envoyé !" : "Message sent!"}
                  </h2>
                  <p className="font-body text-sm" style={{ color: "#4A6358" }}>
                    {t("contact.form.success", lang)}
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl border p-6 sm:p-8 space-y-5"
                  style={{ backgroundColor: "#111915", borderColor: "#1E2E28" }}
                >
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field
                      label={t("contact.form.name", lang)}
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                    <Field
                      label={t("contact.form.email", lang)}
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label className="font-body font-medium text-sm" style={{ color: "rgba(245,250,247,0.6)" }}>
                      {t("contact.form.subject", lang)}
                    </label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full rounded-xl px-4 py-3 font-body text-sm outline-none focus:ring-1 transition"
                      style={{
                        backgroundColor: "#0A0F0E",
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderColor: "#1E2E28",
                        color: form.subject ? "#F5FAF7" : "#4A6358",
                      }}
                    >
                      <option value="">{lang === "fr" ? "Sélectionner…" : "Select…"}</option>
                      {subjects.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="font-body font-medium text-sm" style={{ color: "rgba(245,250,247,0.6)" }}>
                      {t("contact.form.message", lang)} *
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full rounded-xl px-4 py-3 font-body text-sm outline-none resize-none focus:ring-1 transition"
                      style={{
                        backgroundColor: "#0A0F0E",
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderColor: "#1E2E28",
                        color: "#F5FAF7",
                      }}
                    />
                  </div>

                  {/* Language preference */}
                  <div className="space-y-2">
                    <p className="font-body font-medium text-sm" style={{ color: "rgba(245,250,247,0.6)" }}>
                      {t("contact.form.langPref", lang)}
                    </p>
                    <div className="flex gap-3">
                      {(["fr", "en"] as const).map((l) => (
                        <button
                          key={l}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, langPref: l }))}
                          className="px-4 py-2 rounded-lg font-mono text-xs font-medium transition-colors border"
                          style={{
                            backgroundColor: form.langPref === l ? "#0F6E56" : "transparent",
                            borderColor: form.langPref === l ? "#0F6E56" : "#1E2E28",
                            color: form.langPref === l ? "#F5FAF7" : "#4A6358",
                          }}
                        >
                          {l.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Error */}
                  {status === "error" && (
                    <p className="font-body text-sm" style={{ color: "#ff6b4a" }}>
                      {errorMsg}
                    </p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-heading font-semibold text-sm transition-opacity disabled:opacity-60"
                    style={{ backgroundColor: "#0F6E56", color: "#F5FAF7" }}
                  >
                    {status === "loading" ? (
                      <span className="font-mono text-xs animate-pulse">
                        {lang === "fr" ? "Envoi en cours…" : "Sending…"}
                      </span>
                    ) : (
                      <>
                        <Send size={16} />
                        {t("contact.form.submit", lang)}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact info */}
            <div className="space-y-6">
              {[
                {
                  label: "Twitter / X",
                  value: "@fundi3hq",
                  href: "https://twitter.com/fundi3hq",
                },
                {
                  label: "Email",
                  value: "hello@fundi3.xyz",
                  href: "mailto:hello@fundi3.xyz",
                },
                {
                  label: "Discord",
                  value: "discord.gg/fundi3",
                  href: "https://discord.gg/fundi3",
                },
              ].map(({ label, value, href }) => (
                <div
                  key={label}
                  className="rounded-xl border p-4 space-y-1"
                  style={{ backgroundColor: "#111915", borderColor: "#1E2E28" }}
                >
                  <p className="font-mono text-xs" style={{ color: "#4A6358" }}>
                    {label}
                  </p>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body font-medium text-sm transition-colors hover:text-primary"
                    style={{ color: "#F5FAF7" }}
                  >
                    {value}
                  </a>
                </div>
              ))}

              <div
                className="rounded-xl border p-4 space-y-1"
                style={{ backgroundColor: "#111915", borderColor: "#1E2E28" }}
              >
                <p className="font-mono text-xs" style={{ color: "#4A6358" }}>
                  {lang === "fr" ? "Localisation" : "Location"}
                </p>
                <div className="flex items-center gap-2">
                  <MapPin size={14} style={{ color: "#4A6358" }} />
                  <span className="font-body font-medium text-sm" style={{ color: "#F5FAF7" }}>
                    Buea, Cameroon 🇨🇲
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        ref={faqRef}
        className="py-24 border-t"
        style={{ borderColor: "#1E2E28" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-heading font-semibold text-3xl mb-10"
          >
            {t("contact.faq.headline", lang)}
          </motion.h2>

          <div className="space-y-0">
            {faqs.map(({ q, a }) => (
              <FaqItem key={q} question={q} answer={a} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Shared form field ────────────────────────────────────────────────────────

function Field({
  label,
  name,
  type,
  value,
  onChange,
  required,
}: {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="font-body font-medium text-sm" style={{ color: "rgba(245,250,247,0.6)" }}>
        {label} {required && "*"}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-xl px-4 py-3 font-body text-sm outline-none focus:ring-1 transition"
        style={{
          backgroundColor: "#0A0F0E",
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "#1E2E28",
          color: "#F5FAF7",
        }}
      />
    </div>
  );
}
