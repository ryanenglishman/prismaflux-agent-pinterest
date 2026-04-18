"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  title?: string;
  badge?: string;
  schemaEnabled?: boolean;
}

export function FAQSection({
  faqs,
  title = "Questions frequentes",
  badge = "FAQ",
  schemaEnabled = true,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        {schemaEnabled && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        )}

        <div className="reveal">
          <SectionHeading badge={badge} title={title} />
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="reveal glass-card overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
              >
                <span className="text-sm font-semibold text-text pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-text-muted shrink-0 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`faq-answer ${openIndex === i ? "open" : ""}`}
              >
                <div className="px-5 pb-5 pt-0">
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
