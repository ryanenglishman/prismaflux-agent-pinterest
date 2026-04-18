"use client";

import { useState } from "react";
import { StepService } from "./StepService";
import { StepDetails } from "./StepDetails";
import { StepContact } from "./StepContact";
import { StepConfirmation } from "./StepConfirmation";
import { ProgressBar } from "./ProgressBar";

export interface WizardData {
  service: string;
  budget: string;
  timeline: string;
  features: string[];
  message: string;
  name: string;
  email: string;
  phone: string;
  company: string;
}

const INITIAL: WizardData = {
  service: "",
  budget: "",
  timeline: "",
  features: [],
  message: "",
  name: "",
  email: "",
  phone: "",
  company: "",
};

export function QuoteWizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WizardData>(INITIAL);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const update = (partial: Partial<WizardData>) => setData((d) => ({ ...d, ...partial }));

  const handleSubmit = async () => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          service: data.service,
          budget: data.budget,
          timeline: data.timeline,
          features: data.features,
          message: data.message,
          source: "quote-wizard",
        }),
      });
      if (res.ok) {
        setStatus("sent");
        setStep(4);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="glass-card p-6 md:p-8">
      <ProgressBar currentStep={step} />

      <div className="mt-8">
        {step === 1 && (
          <StepService
            selected={data.service}
            onSelect={(s) => {
              update({ service: s });
              setStep(2);
            }}
          />
        )}
        {step === 2 && (
          <StepDetails
            data={data}
            onUpdate={update}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        )}
        {step === 3 && (
          <StepContact
            data={data}
            onUpdate={update}
            onBack={() => setStep(2)}
            onSubmit={handleSubmit}
            status={status}
          />
        )}
        {step === 4 && <StepConfirmation data={data} />}
      </div>
    </div>
  );
}
