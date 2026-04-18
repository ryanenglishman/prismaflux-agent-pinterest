import { cn } from "@/lib/utils";

interface ServiceIllustrationProps {
  serviceId: string;
  className?: string;
}

export function ServiceIllustration({ serviceId, className }: ServiceIllustrationProps) {
  return (
    <div className={cn("relative w-full min-h-[280px] rounded-2xl overflow-hidden bg-bg-surface", className)}>
      {serviceId === "creation-site-web" && <WebDesignIllustration />}
      {serviceId === "referencement-google" && <SEOIllustration />}
      {serviceId === "reseaux-sociaux" && <SocialIllustration />}
      {serviceId === "strategie-digitale" && <StrategyIllustration />}
      {serviceId === "spots-publicitaires" && <VideoIllustration />}
    </div>
  );
}

function WebDesignIllustration() {
  return (
    <div className="absolute inset-4 flex items-center justify-center">
      {/* Browser window */}
      <div className="w-full max-w-[280px] rounded-xl border border-border overflow-hidden bg-bg-card">
        {/* Title bar */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          <div className="ml-3 flex-1 h-4 rounded-full bg-bg-card-hover" />
        </div>
        {/* Content */}
        <div className="p-4 space-y-3">
          <div className="h-16 rounded-lg bg-gradient-to-r from-brand/20 to-brand/5" />
          <div className="grid grid-cols-3 gap-2">
            <div className="h-10 rounded bg-brand/10" />
            <div className="h-10 rounded bg-brand/15" />
            <div className="h-10 rounded bg-brand/10" />
          </div>
          <div className="space-y-1.5">
            <div className="h-2 rounded-full bg-border w-full" />
            <div className="h-2 rounded-full bg-border w-3/4" />
            <div className="h-2 rounded-full bg-border w-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SEOIllustration() {
  return (
    <div className="absolute inset-4 flex items-center justify-center">
      <div className="relative w-48 h-48">
        {/* Concentric circles */}
        <div className="absolute inset-0 rounded-full border-2 border-brand/10" />
        <div className="absolute inset-4 rounded-full border-2 border-brand/20" />
        <div className="absolute inset-8 rounded-full border-2 border-brand/30" />
        <div className="absolute inset-12 rounded-full bg-brand/10 flex items-center justify-center">
          {/* Center icon */}
          <div className="w-12 h-12 rounded-full bg-brand/20 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-brand" />
          </div>
        </div>
        {/* Bar chart overlay */}
        <div className="absolute bottom-0 right-0 flex items-end gap-1">
          <div className="w-3 h-8 rounded-t bg-brand/30" />
          <div className="w-3 h-14 rounded-t bg-brand/50" />
          <div className="w-3 h-20 rounded-t bg-brand/70" />
          <div className="w-3 h-12 rounded-t bg-brand" />
        </div>
      </div>
    </div>
  );
}

function SocialIllustration() {
  return (
    <div className="absolute inset-4 flex items-center justify-center">
      <div className="relative w-52 h-52">
        {/* Network nodes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-brand/20 border-2 border-brand/40" />
        <div className="absolute top-1/3 left-0 w-12 h-12 rounded-full bg-purple-500/20 border-2 border-purple-500/40" />
        <div className="absolute top-1/3 right-0 w-12 h-12 rounded-full bg-blue-500/20 border-2 border-blue-500/40" />
        <div className="absolute bottom-4 left-1/4 w-10 h-10 rounded-full bg-pink-500/20 border-2 border-pink-500/40" />
        <div className="absolute bottom-4 right-1/4 w-10 h-10 rounded-full bg-orange-500/20 border-2 border-orange-500/40" />
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
          <line x1="100" y1="28" x2="30" y2="80" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" />
          <line x1="100" y1="28" x2="170" y2="80" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" />
          <line x1="30" y1="80" x2="60" y2="165" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" />
          <line x1="170" y1="80" x2="140" y2="165" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" />
          <line x1="60" y1="165" x2="140" y2="165" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" />
        </svg>
        {/* Center glow */}
        <div className="absolute inset-[30%] rounded-full bg-brand/5 blur-xl" />
      </div>
    </div>
  );
}

function StrategyIllustration() {
  return (
    <div className="absolute inset-4 flex items-center justify-center">
      <div className="relative w-52 h-44">
        {/* Ascending chart */}
        <svg className="w-full h-full" viewBox="0 0 200 160" fill="none">
          {/* Grid lines */}
          <line x1="0" y1="40" x2="200" y2="40" stroke="currentColor" strokeOpacity="0.05" />
          <line x1="0" y1="80" x2="200" y2="80" stroke="currentColor" strokeOpacity="0.05" />
          <line x1="0" y1="120" x2="200" y2="120" stroke="currentColor" strokeOpacity="0.05" />
          {/* Area fill */}
          <path
            d="M0 140 L30 120 L70 100 L100 85 L130 50 L160 35 L200 15 L200 160 L0 160 Z"
            fill="url(#stratGrad)"
            opacity="0.3"
          />
          {/* Line */}
          <path
            d="M0 140 L30 120 L70 100 L100 85 L130 50 L160 35 L200 15"
            stroke="#FF1744"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Dots */}
          <circle cx="70" cy="100" r="4" fill="#FF1744" />
          <circle cx="130" cy="50" r="4" fill="#FF1744" />
          <circle cx="200" cy="15" r="5" fill="#FF1744" />
          <defs>
            <linearGradient id="stratGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF1744" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FF1744" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function VideoIllustration() {
  return (
    <div className="absolute inset-4 flex items-center justify-center">
      <div className="relative">
        {/* Glow ring */}
        <div className="absolute inset-[-20px] rounded-full bg-brand/10 animate-pulse" />
        <div className="absolute inset-[-10px] rounded-full border-2 border-brand/20" />
        {/* Play button */}
        <div className="w-24 h-24 rounded-full bg-brand/20 flex items-center justify-center border-2 border-brand/40">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M8 5.14v14l11-7-11-7z" fill="#FF1744" />
          </svg>
        </div>
      </div>
    </div>
  );
}
