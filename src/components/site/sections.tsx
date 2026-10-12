import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { FaqList } from "./faq-list";
import { FaqTabs } from "./faq-tabs";
import { Photo, type PhotoKey } from "./photo";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** Section backgrounds: white (the default), light grey, and pale blue. */
export type Tone = "base" | "deep" | "walnut";
const toneClass: Record<Tone, string> = { base: "bg-base", deep: "bg-deep", walnut: "bg-walnut" };

/** Square icon tiles and number badges cycle through the brand's accent colors. */
export const tileColors = ["bg-gold text-on-gold", "bg-bright text-[#062b40]", "bg-coral text-white", "bg-ocean text-white"];

export function tileColor(index: number) {
  return tileColors[index % tileColors.length];
}

/** The practice-area color for a label such as "Telehealth", "Pharmacy" or "All practice areas". */
export function practiceTone(label: string) {
  if (/^all\b/i.test(label)) return "tone-all";
  if (/tele/i.test(label)) return "tone-telehealth";
  if (/pharm/i.test(label)) return "tone-pharmacy";
  return "tone-healthcare";
}

/** A label with a dot in its practice-area color. */
export function Tag({ label, className = "" }: { label: string; className?: string }) {
  return <span className={`tag ${practiceTone(label)} ${className}`}>{label}</span>;
}

export function CheckIcon({ className = "size-3 text-accent" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={className}>
      <path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={className}>
      <path d="M4 10h11M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.75" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** A white check in a bright blue circle, for lists of what is included. */
export function CheckBadge() {
  return (
    <span aria-hidden="true" className="mt-[0.28rem] grid size-[1.125rem] shrink-0 place-items-center rounded-full bg-bright">
      <CheckIcon className="size-2.5 text-white" />
    </span>
  );
}

/** A large opening quotation mark, as on the reference site's testimonial. */
export function QuoteMark({ className = "h-11 w-12 text-[#45464d]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 40" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M10.6 40C4.3 40 0 35.3 0 28.4 0 16.9 7.5 6.2 19.4 0l2.4 3.6C14.4 8.6 10.3 14.4 9.6 20.6c.8-.3 1.8-.4 2.9-.4 5.3 0 9 3.9 9 9.4 0 5.9-4.5 10.4-10.9 10.4zm26.2 0c-6.3 0-10.6-4.7-10.6-11.6 0-11.5 7.5-22.2 19.4-28.4L48 3.6c-7.4 5-11.5 10.8-12.2 17 .8-.3 1.8-.4 2.9-.4 5.3 0 9 3.9 9 9.4 0 5.9-4.5 10.4-10.9 10.4z"
      />
    </svg>
  );
}

/**
 * A headline that rises into view word by word. Each word slides up out of its own mask, so the
 * text is in the HTML for crawlers and wraps normally.
 */
export function RevealWords({ text, start = 0, step = 55 }: { text: string; start?: number; step?: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, index) => (
        <span key={index}>
          <span className="word-mask">
            <span className="word" style={{ "--wd": `${start + index * step}ms` } as CSSProperties}>
              {word}
            </span>
          </span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}

/** How long a RevealWords headline takes to finish, so what follows can come in after it. */
export function revealEnd(text: string, start = 0, step = 55) {
  return start + text.split(" ").length * step;
}

/**
 * The top of every inner page: a deep teal band with the title, then a navy band with the photo in a
 * white frame beside the introduction and buttons.
 */
export function PageHero({
  image,
  title,
  lede,
  breadcrumbs,
  children,
  compact = false,
}: {
  image: PhotoKey;
  title: string;
  lede?: string;
  breadcrumbs?: ReactNode;
  children?: ReactNode;
  compact?: boolean;
}) {
  const after = revealEnd(title, 150);
  const words = Boolean(lede || children);
  return (
    <section className="pt-[4.5rem] lg:pt-24">
      <div className="theme-dark bg-base">
        <div className={`page-container text-center ${compact ? "py-8 md:py-10" : "py-9 md:py-12"}`}>
          {breadcrumbs ? <div className="rise mb-3 flex justify-center [&_ol]:justify-center">{breadcrumbs}</div> : null}
          <h1 className="mx-auto max-w-[28ch] text-display font-bold text-fg">
            <RevealWords text={title} start={150} />
          </h1>
        </div>
      </div>
      <div className="theme-dark theme-navy bg-base">
        <div
          className={`page-container grid items-center gap-8 lg:gap-14 ${words ? "lg:grid-cols-2" : ""} ${
            compact ? "py-8 md:py-10" : "py-10 md:py-14"
          }`}
        >
          <div
            className={`relative overflow-hidden border-[6px] border-white bg-panel ${
              words ? "aspect-[16/10]" : compact ? "aspect-[16/9] md:aspect-[24/7]" : "aspect-[16/9] md:aspect-[21/8]"
            }`}
          >
            <Photo name={image} alt="" priority sizes={words ? "(min-width: 1024px) 46vw, 100vw" : "100vw"} className="kenburns object-cover" />
          </div>
          {words ? (
            <div>
              {lede ? (
                <p className="rise text-[1.1875rem] leading-relaxed text-fg md:text-[1.3125rem]" style={delay(after)}>
                  {lede}
                </p>
              ) : null}
              {children ? (
                <div className={`rise flex flex-wrap gap-3 ${lede ? "mt-8" : ""}`} style={delay(after + 150)}>
                  {children}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  title,
  intro,
  center = false,
  id,
}: {
  title: string;
  intro?: ReactNode;
  center?: boolean;
  id?: string;
}) {
  return (
    <div data-reveal className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <h2 id={id} className="text-section text-fg">
        {title}
      </h2>
      {intro ? <div className={`mt-4 max-w-[44rem] text-lede text-fg-muted ${center ? "mx-auto" : ""}`}>{intro}</div> : null}
    </div>
  );
}

/**
 * Copy on one side and a photo filling the other half of the band, fading into it at the inner edge.
 * Reversed, the photo sits on the right.
 */
export function SplitSection({
  image,
  imageAlt,
  reverse = false,
  tone = "base",
  tag,
  title,
  children,
  id,
}: {
  image: PhotoKey;
  imageAlt?: string;
  reverse?: boolean;
  tone?: Tone;
  /** A practice area, shown above the title in its color. */
  tag?: string;
  title: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={`relative scroll-mt-28 overflow-hidden ${toneClass[tone]}`}>
      <div
        className={`relative aspect-[16/10] sm:aspect-[2/1] lg:absolute lg:inset-y-0 lg:aspect-auto lg:w-[48%] ${reverse ? "lg:right-0" : "lg:left-0"}`}
      >
        <Photo
          name={image}
          alt={imageAlt}
          sizes="(min-width: 1024px) 48vw, 100vw"
          className={`object-cover ${reverse ? "fade-to-left" : "fade-to-right"}`}
        />
      </div>
      <div className="page-container relative grid py-14 md:py-20 lg:min-h-[34rem] lg:grid-cols-2 lg:items-center lg:py-24">
        <div data-reveal className={reverse ? "lg:pr-14" : "lg:col-start-2 lg:pl-14"}>
          {tag ? <Tag label={tag} className="mb-3" /> : null}
          <h2 className="text-section text-fg">{title}</h2>
          <div className="mt-5 space-y-4 text-fg-muted">{children}</div>
        </div>
      </div>
    </section>
  );
}

/** A list with small bright blue bullets, in one or two columns. */
export function CheckList({ items, columns = 1 }: { items: string[]; columns?: 1 | 2 }) {
  return (
    <ul className={`dot-list grid gap-x-10 gap-y-1.5 ${columns === 2 ? "sm:grid-cols-2" : ""}`}>
      {items.map((item) => (
        <li key={item} className="text-fg-muted">
          {item}
        </li>
      ))}
    </ul>
  );
}

/**
 * What clients tell us, set as quotations under a large quote mark. An optional reply from us closes
 * it, signed like a testimonial.
 */
export function Conversation({ lines, reply }: { lines: string[]; reply?: ReactNode }) {
  return (
    <div>
      <QuoteMark />
      <ul className="mt-5 space-y-3.5">
        {lines.map((line, index) => (
          <li key={line} data-reveal style={delay(index * 70)} className="text-[1.0625rem] text-fg-muted italic">
            &ldquo;{line}&rdquo;
          </li>
        ))}
      </ul>
      {reply ? (
        <div data-reveal style={delay(lines.length * 70 + 80)} className="mt-8 border-l-4 border-gold pl-5">
          <p className="text-[0.875rem] font-bold tracking-[0.04em] text-fg-soft uppercase">Anoka Advisors</p>
          <div className="mt-1 text-[1.125rem] font-bold text-fg">{reply}</div>
        </div>
      ) : null}
    </div>
  );
}

/** A full section built around a Conversation: the heading across the top, a photo on one side and the quotes on the other. */
export function ConversationSection({
  id,
  title,
  intro,
  image,
  lines,
  reply,
  tone = "base",
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  image: PhotoKey;
  lines: string[];
  reply?: ReactNode;
  tone?: Tone;
  children?: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className={`py-16 md:py-24 ${toneClass[tone]}`}>
      <div className="page-container">
        <SectionHeading center id={id} title={title} intro={intro} />
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div data-reveal="zoom" className="relative aspect-[4/3] overflow-hidden bg-panel">
            <Photo name={image} alt="" sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
          <div>
            <Conversation lines={lines} reply={reply} />
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export type ImageCardItem = { image: PhotoKey; title: string; body?: string; href?: string; meta?: string };

/** A grey card with the photo across the top and the words underneath. Linked cards end in a gold button. */
export function ImageCard({
  item,
  sizes = "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw",
  ratio = "aspect-[16/9]",
}: {
  item: ImageCardItem;
  sizes?: string;
  ratio?: string;
}) {
  const inner = (
    <>
      <div className={`relative ${ratio} overflow-hidden`}>
        <Photo name={item.image} alt="" sizes={sizes} className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
      </div>
      <div className="flex flex-1 flex-col px-4 pt-5 pb-7 sm:px-5">
        {item.meta ? <Tag label={item.meta} className="mb-2" /> : null}
        <h3 className="text-[1.3125rem] leading-snug font-bold text-fg transition-colors group-hover:text-ocean">{item.title}</h3>
        {item.body ? <p className="mt-2 text-fg-muted">{item.body}</p> : null}
        {item.href ? (
          <span className="mt-auto pt-6">
            <span className="btn btn-accent min-h-10 px-7 py-2.5 text-[0.8125rem]">Learn more</span>
          </span>
        ) : null}
      </div>
    </>
  );
  return item.href ? (
    <Link href={item.href} className="group flex h-full flex-col bg-panel no-underline">
      {inner}
    </Link>
  ) : (
    <div className="group flex h-full flex-col bg-panel">{inner}</div>
  );
}

export function ImageCardGrid({ items, columns = 3 }: { items: ImageCardItem[]; columns?: 2 | 3 | 4 }) {
  const cols = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[columns];
  return (
    <div className={`grid gap-5 ${cols}`}>
      {items.map((item, index) => (
        <div key={item.title} data-reveal style={delay(index * 80)}>
          <ImageCard item={item} />
        </div>
      ))}
    </div>
  );
}

/** Cards with the photo across the top, the title in teal and the description below. */
export function FeatureCards({ items, columns = 3 }: { items: ImageCardItem[]; columns?: 2 | 3 | 4 }) {
  const cols = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[columns];
  return (
    <div className={`grid gap-5 ${cols}`}>
      {items.map((item, index) => (
        <article key={item.title} data-reveal style={delay(index * 80)} className="group relative flex flex-col bg-panel">
          <div className="relative aspect-[16/9] overflow-hidden">
            <Photo
              name={item.image}
              alt=""
              sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          </div>
          <div className="px-4 pt-5 pb-7 sm:px-5">
            {item.meta ? <Tag label={item.meta} className="mb-2" /> : null}
            <h3 className="text-[1.3125rem] leading-snug font-bold text-fg">
              {item.href ? (
                <Link href={item.href} className="text-fg no-underline after:absolute after:inset-0 hover:text-ocean">
                  {item.title}
                </Link>
              ) : (
                item.title
              )}
            </h3>
            {item.body ? <p className="mt-2 text-fg-muted">{item.body}</p> : null}
          </div>
        </article>
      ))}
    </div>
  );
}

/** A sequence of steps as cards, each with a photo and a numbered colored tile. Only for content that really is a sequence. */
export function Steps({ steps }: { steps: { image: PhotoKey; title: string; body: string }[] }) {
  const four = steps.length > 3;
  return (
    <ol className={`grid gap-5 sm:grid-cols-2 ${four ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
      {steps.map((step, index) => (
        <li key={step.title} data-reveal style={delay(index * 110)} className="flex flex-col bg-panel">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Photo name={step.image} alt="" sizes={four ? "(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw" : "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"} className="object-cover" />
          </div>
          <div className="relative px-5 pt-10 pb-7">
            <span className={`absolute -top-6 left-5 grid size-12 place-items-center rounded-md text-[1.375rem] font-black ${tileColor(index)}`}>
              {index + 1}
            </span>
            <h3 className="text-[1.25rem] leading-snug font-bold text-fg">{step.title}</h3>
            <p className="mt-2 text-fg-muted">{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** A full-width photo under a deep teal wash, like the reference site's hero. Children sit on top, in white. */
export function PhotoBand({ image, children, className = "" }: { image: PhotoKey; children: ReactNode; className?: string }) {
  return (
    <section className={`theme-dark relative isolate overflow-hidden bg-base ${className}`}>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Photo name={image} alt="" sizes="100vw" className="parallax object-cover" />
        <div className="absolute inset-0 bg-linear-to-r from-brand from-25% via-brand/90 to-brand/60" />
      </div>
      {children}
    </section>
  );
}

/** The closing invitation: a deep teal band, the words centered in one half and a photo filling the other. */
export function CtaBand({
  image = "cta-consult",
  title = "Let’s talk about what’s getting in the way.",
  body = "Tell us what is happening. We will tell you plainly whether we can help and what it would take.",
}: {
  image?: PhotoKey;
  title?: string;
  body?: string;
}) {
  return (
    <section className="theme-dark bg-base">
      <div className="grid lg:grid-cols-2">
        <div data-reveal className="flex items-center justify-center px-6 py-14 text-center sm:px-12 md:py-20">
          <div className="max-w-[34rem]">
            <h2 className="text-section text-fg">{title}</h2>
            <p className="mt-4 text-lede text-fg-muted">{body}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/book" className="btn btn-accent">
                Book a consultation
              </Link>
              <Link href="/pricing" className="btn btn-ghost">
                See packages and fees
              </Link>
            </div>
          </div>
        </div>
        <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[26rem]">
          <Photo name={image} alt="" sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}

/**
 * Common questions. From large screens up they are a list of tabs with the answer beside it; smaller
 * screens get an accordion. On the grey tone the tabs sit in a pale blue box, with the selected
 * question in navy; on pale blue and white they are ruled lines.
 */
export function FaqSection({
  image,
  title,
  intro,
  faqs,
  tone = "deep",
}: {
  image: PhotoKey;
  title: string;
  intro?: string;
  faqs: { question: string; answer: string }[];
  tone?: Tone;
}) {
  const boxed = tone === "deep";
  return (
    <section aria-labelledby="faq-heading" className={`py-16 md:py-24 ${boxed ? "bg-base" : toneClass[tone]}`}>
      <div className="page-container">
        <SectionHeading center title={title} id="faq-heading" intro={intro} />
        <div data-reveal className="mt-12 hidden lg:block">
          <FaqTabs
            faqs={faqs}
            boxed={boxed}
            media={
              <div className="relative aspect-[16/7] overflow-hidden">
                <Photo name={image} alt="" sizes="40rem" className="object-cover" />
              </div>
            }
          />
        </div>
        <div className="mt-10 lg:hidden">
          <FaqList faqs={faqs} />
        </div>
      </div>
    </section>
  );
}

/** An endless strip of short phrases in capitals: deep teal with gold dots, or bright blue with navy dots. */
export function Marquee({ items, tone = "deep" }: { items: string[]; tone?: Tone }) {
  const row = [...items, ...items];
  return (
    <div className={`relative overflow-hidden bg-base py-4 ${tone === "deep" ? "theme-dark" : "theme-bright"}`} aria-label="Focus areas">
      <ul className="flex w-max animate-marquee gap-8 hover:[animation-play-state:paused]">
        {row.map((item, index) => (
          <li
            key={`${item}-${index}`}
            aria-hidden={index >= items.length}
            className="flex items-center gap-8 text-[0.9375rem] font-bold tracking-[0.06em] whitespace-nowrap text-fg uppercase"
          >
            {item}
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** A red announcement ribbon across the page, as under the reference site's hero. */
export function AlertRibbon({ children }: { children: ReactNode }) {
  return (
    <div className="bg-alert text-white">
      <p className="page-container py-3.5 text-center text-[1rem] [&_a]:font-bold [&_a]:text-white [&_a]:underline [&_a]:underline-offset-4">
        {children}
      </p>
    </div>
  );
}
