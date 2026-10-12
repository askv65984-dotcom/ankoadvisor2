"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

/** The hero's gold "I need help with" button, which opens a short list of where to go next. */
export function HelpPicker({ links }: { links: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        wrapper.current?.querySelector<HTMLButtonElement>("button")?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={wrapper}
      className="relative inline-block"
      onBlur={(event) => {
        if (!wrapper.current?.contains(event.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
        className="btn btn-accent min-w-[13rem] gap-3"
      >
        Choose an area
        <svg viewBox="0 0 12 12" aria-hidden="true" className={`size-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div id={id} hidden={!open} className="menu-in absolute top-full left-1/2 z-20 mt-2 w-[17rem] -translate-x-1/2 bg-white py-2 text-left shadow-[0_18px_40px_-14px_rgba(0,0,0,0.5)]">
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-5 py-2.5 text-[1rem] text-brand no-underline transition-colors hover:bg-ice hover:text-ocean"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
