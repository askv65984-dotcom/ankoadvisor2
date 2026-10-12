"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

/**
 * Questions as a vertical list of tabs, with the selected answer in the column beside it. Used from
 * large screens up; smaller screens get the accordion instead.
 */
export function FaqTabs({
  faqs,
  boxed = false,
  media,
}: {
  faqs: { question: string; answer: string }[];
  /** Set inside a light blue box, with the selected question in navy. */
  boxed?: boolean;
  /** Shown above the answer. */
  media?: ReactNode;
}) {
  const [active, setActive] = useState(0);
  const base = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number) => {
    const next = (index + faqs.length) % faqs.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const moves: Record<string, number> = { ArrowDown: index + 1, ArrowUp: index - 1, Home: 0, End: faqs.length - 1 };
    if (event.key in moves) {
      event.preventDefault();
      select(moves[event.key]);
    }
  };

  return (
    <div className={`grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-14 ${boxed ? "bg-ice p-5 pr-12" : ""}`}>
      <div role="tablist" aria-orientation="vertical" aria-label="Questions">
        {faqs.map((faq, index) => {
          const selected = index === active;
          return (
            <button
              key={faq.question}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${base}-tab-${index}`}
              aria-selected={selected}
              aria-controls={`${base}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={`block w-full border-b py-4 text-left text-[1.0625rem] leading-snug transition-colors ${
                boxed
                  ? `border-white px-6 ${selected ? "bg-navy font-bold text-white" : "font-bold text-fg hover:text-ocean"}`
                  : `border-line ${selected ? "font-bold text-fg" : "text-fg hover:text-ocean"}`
              }`}
            >
              {faq.question}
            </button>
          );
        })}
      </div>
      <div id={`${base}-panel`} role="tabpanel" aria-labelledby={`${base}-tab-${active}`} tabIndex={0} className="pt-2">
        {media}
        <p key={active} className={`rise text-fg-muted ${media ? "mt-6" : ""}`}>
          {faqs[active]?.answer}
        </p>
      </div>
    </div>
  );
}
