"use client";

import { useState } from "react";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export function LeadMagnet() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("sending");
    try {
      await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      setStatus("sent");
    } catch {
      setStatus("sent");
    }
  };

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="reveal relative glass-card p-8 md:p-12 overflow-hidden">
          {/* Gradient border top */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent" />

          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Left */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={20} className="text-brand" />
                <span className="text-sm font-medium text-brand">Gratuit</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-text mb-2">
                Audit de votre presence web
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Recevez un rapport complet de votre visibilite digitale sous 24h.
                Analyse SEO, performance, reseaux sociaux — tout est passe au crible.
              </p>
            </div>

            {/* Right - Form */}
            <div className="flex-1 w-full">
              {status === "sent" ? (
                <div className="text-center py-4">
                  <CheckCircle2 size={32} className="text-brand mx-auto mb-2" />
                  <p className="text-sm font-semibold text-text">
                    Merci ! Votre audit arrive sous 24h.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Votre nom"
                    aria-label="Votre nom"
                    className="w-full bg-bg-card border border-border rounded-xl px-4 py-3 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-brand transition-colors"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.be"
                    aria-label="Votre adresse email"
                    className="w-full bg-bg-card border border-border rounded-xl px-4 py-3 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-brand transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full btn-primary rounded-xl px-4 py-3 text-sm font-semibold inline-flex items-center justify-center cursor-pointer"
                  >
                    {status === "sending" ? "Envoi..." : (
                      <>
                        Recevoir mon audit gratuit
                        <ArrowRight size={16} className="ml-2" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
