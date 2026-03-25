import { COPILOTS } from "@/lib/copilots";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return COPILOTS.map((c) => ({ id: c.id }));
}

export default async function CopilotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const copilot = COPILOTS.find((c) => c.id === id);
  if (!copilot) notFound();

  return (
    <div className="max-w-md mx-auto px-5 py-16">
      {/* Back */}
      <Link
        href="/home#copilotes"
        className="inline-flex items-center gap-2 text-sm mb-8 transition-colors"
        style={{ color: "rgba(255,255,255,0.4)" }}
      >
        ← Tous les copilotes
      </Link>

      {/* Avatar */}
      <div
        className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mb-5"
        style={{ background: `${copilot.color}20` }}
      >
        {copilot.emoji}
      </div>

      {/* Info */}
      <div className="flex items-center gap-3 mb-3">
        <h1 className="text-3xl font-black text-white">{copilot.name}</h1>
        <span
          className="text-sm font-bold px-3 py-1 rounded-full"
          style={{
            background: copilot.included ? "rgba(0,200,83,0.15)" : "rgba(255,23,68,0.12)",
            color: copilot.included ? "#00C853" : "var(--color-brand)",
          }}
        >
          {copilot.price}
        </span>
      </div>
      <p className="text-sm mb-2" style={{ color: copilot.color }}>{copilot.role}</p>
      <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.6)" }}>
        {copilot.description}
      </p>

      {/* CTA */}
      <Link
        href="/essai-gratuit"
        className="block text-center py-3.5 rounded-2xl text-sm font-bold"
        style={{ background: "var(--color-brand)", color: "white" }}
      >
        Essayer gratuitement →
      </Link>
    </div>
  );
}
