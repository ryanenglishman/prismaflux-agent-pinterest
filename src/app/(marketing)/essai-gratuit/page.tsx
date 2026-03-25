"use client";

import { useState } from "react";

export default function EssaiGratuitPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", concession: "", phone: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto px-5 py-24 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="text-2xl font-black text-white mb-3">C&apos;est parti !</h1>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
          Vous recevrez un email dans les prochaines minutes pour activer votre essai gratuit de 7 jours.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-5 py-16">
      <div className="text-center mb-8">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-4"
          style={{ background: "rgba(0,200,83,0.12)", color: "#00C853", border: "1px solid rgba(0,200,83,0.2)" }}
        >
          ✓ Aucune carte bancaire requise
        </div>
        <h1 className="text-3xl font-black text-white mb-2">7 jours gratuits</h1>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
          Accès complet à tous les copilotes. Annulable à tout moment.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-2xl p-6"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        {[
          { id: "name", label: "Votre prénom", type: "text", placeholder: "Jean" },
          { id: "concession", label: "Nom de la concession", type: "text", placeholder: "Garage Dupont" },
          { id: "email", label: "Email professionnel", type: "email", placeholder: "jean@garage-dupont.be" },
          { id: "phone", label: "Téléphone (optionnel)", type: "tel", placeholder: "+32 470 123 456" },
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
              required={f.id !== "phone"}
              className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none transition-all"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full py-3.5 rounded-2xl text-sm font-bold mt-2 transition-all active:scale-95"
          style={{ background: "var(--color-brand)", color: "white" }}
        >
          Activer mon essai gratuit →
        </button>

        <p className="text-center text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
          En vous inscrivant, vous acceptez nos conditions d&apos;utilisation.
        </p>
      </form>
    </div>
  );
}
