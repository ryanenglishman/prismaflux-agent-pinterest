import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div className={cn(hover ? "glass-card" : "bg-bg-card border border-border rounded-[var(--radius-lg)]", "p-6 md:p-8", className)}>
      {children}
    </div>
  );
}
