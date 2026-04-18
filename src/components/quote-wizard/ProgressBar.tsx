const STEPS = [
  { num: 1, label: "Service" },
  { num: 2, label: "Details" },
  { num: 3, label: "Contact" },
  { num: 4, label: "Confirme" },
];

export function ProgressBar({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-between">
      {STEPS.map((s, i) => (
        <div key={s.num} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                s.num < currentStep
                  ? "wizard-step-done"
                  : s.num === currentStep
                    ? "wizard-step-active"
                    : "wizard-step-pending"
              }`}
            >
              {s.num < currentStep ? "✓" : s.num}
            </div>
            <span className="text-[10px] text-text-muted mt-1 hidden sm:block">
              {s.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`flex-1 h-px mx-2 ${
                s.num < currentStep ? "bg-brand" : "bg-border"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
