import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrowserMockupProps {
  category: string;
  clientName: string;
  siteUrl?: string;
  ogImage?: string;
  className?: string;
}

const GRADIENTS: Record<string, string> = {
  site: "from-brand/20 via-purple-500/15 to-blue-500/10",
  seo: "from-green-500/20 via-emerald-500/15 to-teal-500/10",
  social: "from-pink-500/20 via-orange-500/15 to-yellow-500/10",
  strategie: "from-blue-500/20 via-indigo-500/15 to-purple-500/10",
};

export function BrowserMockup({ category, clientName, siteUrl, ogImage, className }: BrowserMockupProps) {
  const gradient = GRADIENTS[category] || GRADIENTS.site;
  const domain = siteUrl
    ? siteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : `${clientName.toLowerCase().replace(/\s+/g, "")}.be`;

  return (
    <div className={cn("rounded-xl border border-border overflow-hidden bg-bg-card", className)}>
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border bg-bg-surface/50">
        <div className="w-2 h-2 rounded-full bg-red-400/60" />
        <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
        <div className="w-2 h-2 rounded-full bg-green-400/60" />
        <div className="ml-2 flex-1 h-3.5 rounded-full bg-bg-card text-[9px] text-text-muted flex items-center px-2 truncate">
          {domain}
        </div>
      </div>
      {/* Page content */}
      <div className="aspect-video relative overflow-hidden bg-gradient-to-br" style={{ backgroundImage: `linear-gradient(to bottom right, rgba(var(--brand-rgb), 0.2), rgba(168, 85, 247, 0.15), rgba(59, 130, 246, 0.1))` }}>
        {ogImage ? (
          <Image
            src={ogImage}
            alt={clientName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            quality={75}
            priority={false}
          />
        ) : (
          <div className="p-4">
            <div className="space-y-2">
              <div className="h-3 rounded-full bg-white/10 w-1/3" />
              <div className="h-6 rounded-lg bg-white/8 w-2/3" />
              <div className="h-2 rounded-full bg-white/5 w-full mt-3" />
              <div className="h-2 rounded-full bg-white/5 w-4/5" />
              <div className="mt-3 flex gap-2">
                <div className="h-5 w-16 rounded-full bg-brand/30" />
                <div className="h-5 w-14 rounded-full bg-white/8" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
