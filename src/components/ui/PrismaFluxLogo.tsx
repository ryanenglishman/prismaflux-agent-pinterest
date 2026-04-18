import { cn } from "@/lib/utils";

interface PrismaFluxLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const SIZES = {
  sm: { icon: 28, text: "text-lg" },
  md: { icon: 36, text: "text-xl" },
  lg: { icon: 48, text: "text-2xl" },
};

export function PrismaFluxLogo({
  size = "sm",
  showText = false,
  className,
}: PrismaFluxLogoProps) {
  const s = SIZES[size];

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="PrismaFlux"
      >
        <defs>
          <linearGradient id="pf-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF1744" />
            <stop offset="50%" stopColor="#FF4569" />
            <stop offset="100%" stopColor="#FF6B6B" />
          </linearGradient>
          <linearGradient id="pf-shine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Background shape */}
        <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#pf-grad)" />
        {/* P letter */}
        <path
          d="M16 12h10c4.418 0 8 3.582 8 8s-3.582 8-8 8H22v8h-6V12z M22 17v6h4c1.657 0 3-1.343 3-3s-1.343-3-3-3h-4z"
          fill="white"
          fillRule="evenodd"
        />
        {/* Shine overlay */}
        <rect x="2" y="2" width="44" height="22" rx="12" fill="url(#pf-shine)" />
      </svg>
      {showText && (
        <span className={cn("font-bold tracking-tight", s.text)}>
          <span className="text-brand">Prisma</span>
          <span className="text-text">Flux</span>
        </span>
      )}
    </span>
  );
}
