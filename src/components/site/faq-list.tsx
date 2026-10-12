import type { CSSProperties } from "react";

/** Questions as an accordion, with a plus that turns into a cross when open. */
export function FaqList({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <div className="border-t border-line">
      {faqs.map((faq, index) => (
        <details key={faq.question} data-reveal style={{ "--d": `${index * 60}ms` } as CSSProperties} className="group border-b border-line">
          <summary className="flex list-none items-start justify-between gap-6 py-4 text-left text-[1.0625rem] leading-snug text-fg transition-colors group-open:font-bold hover:text-ocean">
            <span>{faq.question}</span>
            <span className="grid size-7 shrink-0 place-items-center bg-ocean text-white transition-transform duration-300 group-open:rotate-45">
              <svg viewBox="0 0 20 20" aria-hidden="true" className="size-3">
                <path d="M10 3v14M3 10h14" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" fill="none" />
              </svg>
            </span>
          </summary>
          <p className="max-w-[62ch] pr-10 pb-5 text-fg-muted">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
