"use client";

import { useActionState } from "react";
import { subscribe, type NewsletterState } from "@/app/actions/newsletter";
import { SubmitButton } from "./submit-button";

const idle: NewsletterState = { status: "idle" };

export function NewsletterForm() {
  const [state, action] = useActionState(subscribe, idle);

  if (state.status === "success") {
    return (
      <p role="status" className="border-l-4 border-gold bg-white/10 px-5 py-4 font-bold text-white">
        {state.message}
      </p>
    );
  }

  return (
    <form action={action} noValidate>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@organization.com"
          aria-invalid={state.status === "error"}
          aria-describedby={state.status === "error" ? "newsletter-error" : undefined}
          className="field-input min-h-12 flex-1"
        />
        <SubmitButton label="Subscribe" pendingLabel="Subscribing…" className="btn btn-accent btn-square min-h-12" />
      </div>
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="newsletter-company">Leave this field empty</label>
        <input id="newsletter-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      {state.status === "error" ? (
        <p id="newsletter-error" role="alert" className="mt-3 text-sm font-bold text-[#ffd2d4]">
          {state.message}
        </p>
      ) : (
        <p className="mt-3 text-sm text-white/85">Occasional notes on healthcare operations. Unsubscribe any time.</p>
      )}
    </form>
  );
}
