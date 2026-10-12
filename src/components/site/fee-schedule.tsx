import Link from "next/link";
import type { CSSProperties } from "react";
import { priceDisplay } from "@/lib/format";
import type { Package } from "@/lib/types";
import { Photo, type PhotoKey } from "./photo";
import { CheckBadge } from "./sections";

// Packages have no photo field, so they take these in display order.
const packagePhotos: PhotoKey[] = ["pkg-1", "pkg-2", "pkg-3", "pkg-4", "pkg-5", "pkg-6"];

/** The photo for the package at this position in the list, also used on its order page. */
export function packagePhoto(index: number) {
  return packagePhotos[index % packagePhotos.length];
}

function defaultCta(pkg: Package) {
  if (pkg.billing === "monthly") return "Start the retainer";
  return "Buy now";
}

/**
 * Packages as grey cards: the photo across the top, then the name, fee and what is included, with a
 * square gold button across the foot. A package with a badge gets a teal band and the badge on its photo.
 */
export function FeeSchedule({ packages }: { packages: Package[] }) {
  if (packages.length === 0) {
    return (
      <div className="card border-t-4 border-gold p-8 md:p-10">
        <p className="max-w-[46rem] text-lede text-fg">
          Our packages are being updated. Book a video consultation and we will walk you through current options
          and fees.
        </p>
        <Link href="/book" className="btn btn-accent mt-6">
          Book a consultation
        </Link>
      </div>
    );
  }

  return (
    <div>
      <ul className={`grid gap-5 ${packages.length >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"} md:grid-cols-2`}>
        {packages.map((pkg, index) => {
          const price = priceDisplay(pkg.billing, pkg.price_cents);
          const ctaLabel = pkg.cta_label || defaultCta(pkg);
          const featured = Boolean(pkg.badge);
          return (
            <li
              key={pkg.id}
              id={pkg.slug}
              data-reveal
              style={{ "--d": `${index * 100}ms` } as CSSProperties}
              className={`group flex scroll-mt-28 flex-col bg-panel ${featured ? "border-t-[6px] border-brand" : ""}`}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Photo
                  name={packagePhoto(index)}
                  alt=""
                  sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                {pkg.badge ? (
                  <p className="absolute top-0 left-0 bg-coral px-4 py-1.5 text-[0.8125rem] font-bold tracking-[0.04em] text-white uppercase">{pkg.badge}</p>
                ) : null}
              </div>

              <div className="flex flex-1 flex-col px-5 pt-6 pb-7 sm:px-6">
                <h3 className="text-[1.5rem] leading-tight font-bold text-fg">{pkg.name}</h3>
                {pkg.duration_label ? <p className="mt-1.5 text-[0.9375rem] font-bold text-accent">{pkg.duration_label}</p> : null}
                {pkg.summary ? <p className="mt-3 text-fg-muted">{pkg.summary}</p> : null}

                <p className="mt-6 border-t border-line-strong/70 pt-5">
                  <span className="text-[2.5rem] leading-none font-black text-fg">{price.amount}</span>
                  <span className="ml-2 text-fg-soft">{price.unit}</span>
                </p>

                {pkg.features.length > 0 ? (
                  <>
                    <h4 className="sr-only">What is included in {pkg.name}</h4>
                    <ul className="mt-5 flex-1 space-y-2.5">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex gap-3 text-[0.975rem] text-fg-muted">
                          <CheckBadge />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <div className="flex-1" />
                )}
              </div>

              {pkg.billing === "custom" ? (
                <Link href="/book" className="btn btn-accent btn-square w-full">
                  {pkg.cta_label || "Book a consultation"}
                </Link>
              ) : (
                <Link href={`/checkout/${pkg.slug}`} className="btn btn-accent btn-square w-full">
                  {ctaLabel}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
      <p className="mt-8 flex items-center justify-center gap-2 text-center text-[0.9375rem] text-fg-soft">
        <svg viewBox="0 0 20 20" aria-hidden="true" className="size-4 shrink-0 text-accent">
          <rect x="4" y="9" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M7 9V6.5a3 3 0 016 0V9" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
        Secure checkout by Stripe. Prices are in US dollars.
      </p>
    </div>
  );
}
