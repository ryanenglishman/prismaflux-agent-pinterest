"use client";

import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  if (sent) {
    return (
      <div className="max-w-md mx-auto px-5 py-24 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="text-2xl font-black text-white mb-3">Message envoyé !</h1>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
          Nous vous répondrons dans les 24h ouvrables.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-5 py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-2">Contactez-nous</h1>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
          Une question ? Un projet ? Notre équipe belge vous répond rapidement.
        </p>
      </div>

      <div className="flex flex-col gap-3 mb-8">
        {[
          { icon: "📧", label: "Email", value: "hello@prismaflux.be" },
          { icon: "📍", label: "Localisation", value: "Belgique" },
        ].map((c) => (
          <div
            key={c.label}
            className="flex items-center gap-3 rounded-xl px-4 py-3"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <span className="text-lg">{c.icon}</span>
            <div>
              <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{c.label}</div>
              <div className="text-sm text-white">{c.value}</div>
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); setSent(true); }}
        className="flex flex-col gap-4 rounded-2xl p-6"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        {[
          { id: "name", label: "Votre nom", type: "text", placeholder: "Jean Dupont" },
          { id: "email", label: "Email", type: "email", placeholder: "jean@garage.be" },
          { id: "subject", label: "Sujet", type: "text", placeholder: "Question sur Marcus..." },
        ].map((f) => (
          <div key={f.id}>
            <label className="text-xs font-semibold block mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>
              {f.label}
            </label>
            <input
              type={f.type}
              value={form[f.id as keyof typeof form]}
              onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
              placeholder={f.placeholder}
              required
              className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            />
          </div>
        ))}
        <div>
          <label className="text-xs font-semibold block mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>
            Message
          </label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Votre message..."
            required
            rows={4}
            className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none resize-none"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-2xl text-sm font-bold transition-all active:scale-95"
          style={{ background: "var(--color-brand)", color: "white" }}
        >
          Envoyer →
        </button>
      </form>
    </div>
  );
}
