import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { CarePathway } from "@/components/site/care-pathway";
import { Carousel } from "@/components/site/carousel";
import { ContactForm } from "@/components/site/contact-form";
import { CountUp } from "@/components/site/count-up";
import { FeeSchedule } from "@/components/site/fee-schedule";
import { HelpPicker } from "@/components/site/help-picker";
import { InsightCard } from "@/components/site/insight-card";
import { JsonLd } from "@/components/site/json-ld";
import {
  AlertRibbon,
  CheckBadge,
  CheckList,
  ConversationSection,
  CtaBand,
  FaqSection,
  ImageCard,
  RevealWords,
  SectionHeading,
  SplitSection,
  Steps,
  revealEnd,
  tileColor,
  type ImageCardItem,
} from "@/components/site/sections";
import { insights } from "@/content/insights";
import { engagementSteps, generalFaqs } from "@/content/services";
import { getActivePackages, getConsultationPackage } from "@/lib/data";
import { faqJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";
import { photoSrc } from "@/lib/photos";
import consultant from "@/assets/hero/consultant.webp";
import heroBackdrop from "@/assets/hero/hero-backdrop.webp";

export const metadata: Metadata = pageMetadata({
  title: "Healthcare, Telehealth & Pharmacy Consulting | Anoka Advisors",
  absoluteTitle: true,
  description:
    "Anoka Advisors helps US medical practices, telehealth programs and pharmacies fix patient access, workflow and compliance. Book a video consultation online.",
  path: "/",
});

// "How we can help": the three practice areas, then the ways to work with us.
const practiceTiles: ImageCardItem[] = [
  { image: "svc-row-healthcare", title: "Healthcare operations", body: "Access, workflow, staffing and reporting.", href: "/services/healthcare-operations-consulting" },
  { image: "th-overview", title: "Telehealth", body: "Virtual care that runs like an in-person visit.", href: "/services/telehealth-consulting" },
  { image: "svc-row-pharmacy", title: "Pharmacy operations", body: "Steadier days behind the counter.", href: "/services/pharmacy-operations-consulting" },
];
const offerTiles: ImageCardItem[] = [
  { image: "th-approach", title: "Initial consultation", body: "Start with a conversation, by video.", href: "/book#initial" },
  { image: "hc-deliverables", title: "Paid diagnostic call", body: "An expert read, with written priorities.", href: "/book#options" },
  { image: "hc-engage", title: "Monthly advisory retainer", body: "A senior sounding board, every month.", href: "/pricing#advisory-retainer" },
];
const wideTiles: ImageCardItem[] = [
  { image: "th-deliverables", title: "Focused projects", body: "Launch plans, workflow redesigns and SOP libraries.", href: "/pricing#operations-project" },
  { image: "pr-faq", title: "Insights and guides", body: "Practical reading for operations leaders.", href: "/insights" },
];

const audiences: ImageCardItem[] = [
  { image: "aud-practices", title: "Medical practices", body: "Independent and multi-site practices tightening access, workflow and staffing." },
  { image: "aud-telehealth", title: "Telehealth programs", body: "Practices, health systems and digital health companies growing virtual care." },
  { image: "aud-pharmacies", title: "Community pharmacies", body: "Independent pharmacies balancing service, margins and compliance." },
  { image: "aud-health-systems", title: "Health systems and MSOs", body: "Service line and operations leaders who want an experienced outside view." },
  { image: "aud-specialty", title: "Specialty clinics", body: "Therapy, specialty and ambulatory centers with complex scheduling." },
  { image: "aud-ltc", title: "Long-term care pharmacy", body: "Closed-door and long-term care operations serving facilities and residents." },
];

const focusAreas: ImageCardItem[] = [
  { image: "focus-scheduling", meta: "Healthcare", title: "Patient access and scheduling", body: "Templates, reminders and referral intake that match real capacity." },
  { image: "focus-workflow", meta: "Healthcare", title: "Clinical workflow", body: "Rooming, documentation and handoffs, mapped and simplified." },
  { image: "focus-staffing", meta: "Healthcare", title: "Staffing models", body: "Clear roles and coverage plans based on actual volume." },
  { image: "focus-reporting", meta: "All practice areas", title: "Performance reporting", body: "A short list of measures leadership reviews every month." },
  { image: "focus-platform", meta: "Telehealth", title: "Platform selection", body: "Requirements and a common scorecard to compare vendors." },
  { image: "focus-inventory", meta: "Pharmacy", title: "Inventory and purchasing", body: "Par levels, returns and slow-moving stock reviewed to free up cash." },
  { image: "focus-compliance", meta: "Pharmacy", title: "Inspection readiness", body: "Self-inspection checklists and SOPs that stay current." },
  { image: "focus-accreditation", meta: "Pharmacy", title: "Accreditation preparation", body: "Policies and evidence organized ahead of specialty reviews." },
];

const focusStrip = ["Patient access", "Clinical workflow", "Telehealth launch", "Platform selection", "Dispensing workflow", "Inventory", "Inspection readiness", "Staffing models", "Performance reporting"];

const problems = [
  "Patients wait weeks for appointments while the phones never stop",
  "Telehealth visits that feel improvised to patients and staff",
  "Prescriptions stall between the prescriber and the pharmacy counter",
  "Good people burning out on workarounds",
  "Inspections and audits that trigger a scramble",
  "Reports that nobody trusts or acts on",
];

const stats = [
  { value: 3, suffix: "", label: "Connected practice areas: healthcare, telehealth and pharmacy" },
  { value: 5, suffix: " days", label: "To written findings after an Operations Diagnostic" },
  { value: 50, suffix: " states", label: "Available to organizations in every US state, remotely or on site" },
];

const iconProps = { viewBox: "0 0 24 24", className: "size-6", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const principles: { title: string; body: string; icon: ReactNode }[] = [
  {
    title: "Senior attention",
    body: "The person you talk to on the first call is the person who does the work.",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
      </svg>
    ),
  },
  {
    title: "Fixed, published fees",
    body: "Every package lists what is included and what it costs before you commit.",
    icon: (
      <svg {...iconProps}>
        <path d="M3.5 12.5V5a1.5 1.5 0 011.5-1.5h7.5l8 8-9 9z" />
        <circle cx="8.5" cy="8.5" r="1.5" />
      </svg>
    ),
  },
  {
    title: "Built for your team",
    body: "Recommendations come with owners, a sequence and a realistic sense of effort.",
    icon: (
      <svg {...iconProps}>
        <circle cx="8" cy="9" r="2.75" />
        <circle cx="16.5" cy="9" r="2.75" />
        <path d="M3 19c.5-2.8 2.4-4.4 5-4.4s4.5 1.6 5 4.4M13 15.2c1-.4 2.1-.6 3.5-.6 2.6 0 4.5 1.6 5 4.4" />
      </svg>
    ),
  },
  {
    title: "Plain reporting",
    body: "Short documents, direct answers and no jargon.",
    icon: (
      <svg {...iconProps}>
        <path d="M6 3.5h8.5L19 8v12.5H6z" />
        <path d="M14 3.5V8h5M9 12.5h7M9 16h5" />
      </svg>
    ),
  },
];

// Topics people most often raise, beside the enquiry form.
const topics: { title: string; icon: ReactNode }[] = [
  {
    title: "Patient access and scheduling",
    icon: (
      <svg {...iconProps}>
        <rect x="3.5" y="5" width="17" height="15" rx="1.5" />
        <path d="M3.5 9.5h17M8 3v4M16 3v4M8 13.5h3M8 16.5h6" />
      </svg>
    ),
  },
  {
    title: "Telehealth launch and platform selection",
    icon: (
      <svg {...iconProps}>
        <rect x="2.5" y="6" width="13" height="12" rx="1.5" />
        <path d="M15.5 10.5l6-3.5v10l-6-3.5" />
      </svg>
    ),
  },
  {
    title: "Pharmacy workflow and inventory",
    icon: (
      <svg {...iconProps}>
        <rect x="4" y="9" width="16" height="11" rx="5.5" transform="rotate(-45 12 14.5)" />
        <path d="M9.2 11.7l5.6 5.6" />
      </svg>
    ),
  },
  {
    title: "Inspection readiness and accreditation",
    icon: (
      <svg {...iconProps}>
        <path d="M8 4.5h8M9 3h6v3H9z" />
        <path d="M6 4.5H5A1.5 1.5 0 003.5 6v14A1.5 1.5 0 005 21.5h14a1.5 1.5 0 001.5-1.5V6A1.5 1.5 0 0019 4.5h-1" />
        <path d="M8 13l2.5 2.5L16 10" />
      </svg>
    ),
  },
];

const welcomeNotes = [
  {
    title: "Video consultations",
    body: "Video consultations, booked online. Pick a time that suits you and join from your browser.",
    cta: { href: "/book", label: "Book a consultation" },
  },
  {
    title: "Fixed, published fees",
    body: "Every package lists what it includes and what it costs, so you know where you stand before you commit.",
    cta: { href: "/pricing", label: "See packages and fees" },
  },
  {
    title: "Remote or on site",
    body: "We work with teams in every US state, by video and in person when the work calls for it.",
    cta: { href: "/contact", label: "Contact us" },
  },
];

const helpLinks = [
  { href: "/services/healthcare-operations-consulting", label: "Healthcare operations" },
  { href: "/services/telehealth-consulting", label: "Telehealth" },
  { href: "/services/pharmacy-operations-consulting", label: "Pharmacy operations" },
  { href: "/pricing", label: "Packages and fees" },
  { href: "/book#initial", label: "Not sure yet? Talk it through" },
];

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const heroTitle = "Healthcare operations that work for your staff and your patients.";

export default async function HomePage() {
  const [packages, consultation] = await Promise.all([getActivePackages(), getConsultationPackage()]);
  // The paid session length comes from admin, for example "90-minute session and written summary".
  const minutes = Number(consultation?.duration_label.match(/(\d+)[-\s]*min/i)?.[1] ?? 0);
  const figures = [
    stats[0],
    minutes > 0
      ? { value: minutes, suffix: " min", label: `${consultation?.name} by video, booked and paid online` }
      : { value: 2, suffix: " ways", label: "To start: an initial consultation or a paid diagnostic" },
    ...stats.slice(1),
  ];
  const after = revealEnd(heroTitle, 200);

  return (
    <>
      {/* 1. Hero: a softly blurred pharmacy under a deep blue wash, a consultant cut out on the left and the words on the right */}
      <section aria-labelledby="hero-heading" className="theme-dark relative isolate z-10 bg-brand-deep pt-[4.5rem] lg:pt-24">
        <div aria-hidden="true" className="absolute inset-0 -z-20 overflow-hidden">
          <Image src={heroBackdrop} alt="" fill priority quality={85} sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,rgb(8_47_75/0.86)_0%,rgb(11_70_104/0.8)_50%,rgb(8_47_75/0.88)_100%)]" />
        </div>
        <div className="page-container grid lg:min-h-[34rem] lg:grid-cols-12">
          {/* The consultant stands at the foot of the hero, cut off at the waist like the reference design. */}
          <div aria-hidden="true" className="relative hidden overflow-hidden lg:col-span-5 lg:block">
            <Image
              src={consultant}
              alt=""
              priority
              quality={90}
              sizes="(min-width: 1280px) 420px, 34vw"
              className="rise absolute top-4 left-1/2 h-[128%] w-auto max-w-none -translate-x-1/2 [mask-image:linear-gradient(to_bottom,transparent,#000_4%)]"
            />
          </div>
          <div className="py-12 text-center md:py-16 lg:col-span-7 lg:py-16">
            <h1 id="hero-heading" className="mx-auto max-w-[24ch] text-[clamp(2.125rem,1.6rem+1.9vw,3rem)] leading-[1.12] font-bold text-fg">
              <RevealWords text={heroTitle} start={200} />
            </h1>
            <p className="rise mx-auto mt-5 max-w-[40rem] text-fg" style={delay(after + 60)}>
              Anoka Advisors is an operations consulting partner for medical practices, telehealth programs and
              pharmacies. We help you untangle the workflows behind patient access, prescriptions and compliance, so
              the days run calmer for your team and care feels clearer for patients.
            </p>
            <div className="rise relative z-20 mt-7" style={delay(after + 180)}>
              <p className="mb-3 font-bold text-fg">I need help with:</p>
              <HelpPicker links={helpLinks} />
            </div>
            <p className="rise mt-7 text-fg" style={delay(after + 300)}>
              Or let us tailor a solution for your specific needs:
              <br />
              <Link href="/book" className="font-bold text-accent underline-offset-4 hover:underline">
                Book a consultation
              </Link>
              <span aria-hidden="true" className="mx-2 text-fg-soft">
                |
              </span>
              <Link href="/pricing" className="font-bold text-accent underline-offset-4 hover:underline">
                See packages and fees
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* 2. Announcement ribbon */}
      <AlertRibbon>
        Video consultations are booked online: pick a time that suits you and join from your browser.{" "}
        <Link href="/book">See the options and book a consultation.</Link>
      </AlertRibbon>

      {/* 3. Introduction, beside a photo that fades into the page */}
      <SplitSection image="home-intro" reverse title="Hello, we’re Anoka Advisors.">
        <p className="text-lede">
          We’re an independent consulting firm focused on the operational side of care:{" "}
          <Link href="/services/healthcare-operations-consulting" className="text-link">
            how patients get scheduled and seen
          </Link>
          ,{" "}
          <Link href="/services/pharmacy-operations-consulting" className="text-link">
            how prescriptions move from order to pickup
          </Link>{" "}
          and{" "}
          <Link href="/services/telehealth-consulting" className="text-link">
            how virtual care fits with everything else
          </Link>
          .
        </p>
        <p className="text-[1.125rem] text-fg">
          We work alongside your team rather than handing over a binder. Every engagement ends with changes people can
          carry out on Monday morning.
        </p>
        <p className="pt-1 text-[1.125rem] text-fg">We can help with:</p>
        <CheckList columns={2} items={focusStrip} />
        <ul className="grid gap-2 pt-2">
          {["Independent advice focused on your goals", "Practical, written recommendations", "Support through implementation"].map((item) => (
            <li key={item} className="flex gap-3 font-bold text-fg">
              <CheckBadge />
              {item}
            </li>
          ))}
        </ul>
        <div className="pt-3">
          <Link href="/about" className="btn btn-accent">
            About the firm
          </Link>
        </div>
      </SplitSection>

      {/* 4. Three ways we make it easy, on the bright blue band */}
      <section className="theme-bright bg-base py-14 md:py-16">
        <div className="page-container grid gap-12 md:grid-cols-3 md:gap-10">
          {welcomeNotes.map((note, index) => (
            <div key={note.title} data-reveal style={delay(index * 100)} className="flex flex-col">
              <h2 className="text-section text-fg">{note.title}</h2>
              <p className="mt-4 flex-1 font-bold text-fg-muted">{note.body}</p>
              <div className="mt-7">
                <Link href={note.cta.href} className="btn btn-accent">
                  {note.cta.label}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. How we can help */}
      <section aria-labelledby="what-we-do" className="py-16 md:py-24">
        <div className="page-container">
          <div data-reveal className="mx-auto max-w-3xl text-center">
            <h2 id="what-we-do" className="text-section text-fg">
              How we can help
            </h2>
            <p className="mt-4 text-lede text-fg-muted">
              Three practice areas, one view of the patient&rsquo;s path, and simple ways to start working together.
            </p>
          </div>

          {/* Phones: one swipeable row of every card */}
          <div data-reveal className="mt-10 md:hidden">
            <Carousel label="What we do" slideClassName="basis-[84%]">
              {[...practiceTiles, ...offerTiles, ...wideTiles].map((tile) => (
                <ImageCard key={tile.href} item={tile} sizes="84vw" />
              ))}
            </Carousel>
          </div>

          {/* Tablets and desktops: the card grid */}
          <div className="hidden md:block">
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {practiceTiles.map((tile, index) => (
                <div key={tile.href} data-reveal style={delay(index * 80)}>
                  <ImageCard item={tile} ratio="aspect-[4/3]" sizes="(min-width: 1024px) 30vw, 33vw" />
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-5 md:grid-cols-3">
              {offerTiles.map((tile, index) => (
                <div key={tile.href} data-reveal style={delay(index * 80)}>
                  <ImageCard item={tile} ratio="aspect-[2/1]" sizes="(min-width: 1024px) 30vw, 33vw" />
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {wideTiles.map((tile, index) => (
                <div key={tile.href} data-reveal style={delay(index * 80)}>
                  <ImageCard item={tile} ratio="aspect-[5/2]" sizes="(min-width: 1024px) 45vw, 50vw" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link href="/services" className="btn btn-accent">
              All services
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Patient pathway */}
      <section className="bg-deep py-16 md:py-24">
        <div className="page-container">
          <SectionHeading title="Every patient takes one path. We help with all of it." />
          <div data-reveal className="mt-10">
            <CarePathway />
          </div>
        </div>
      </section>

      {/* 7. Questions and the enquiry form, on the deep teal band */}
      <section aria-labelledby="ask-heading" className="theme-dark bg-base py-16 md:py-20">
        <div className="page-container grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div data-reveal className="lg:col-span-7">
            <h2 id="ask-heading" className="text-[clamp(1.875rem,1.4rem+1.6vw,2.5rem)] leading-tight font-bold text-fg">
              Get answers to your top operations questions
            </h2>
            <p className="mt-3 text-[1.375rem] leading-snug text-fg">Talk with us about items such as:</p>
            <ul className="mt-8 space-y-5 sm:pl-8">
              {topics.map((topic, index) => (
                <li key={topic.title} className="flex items-center gap-5">
                  <span aria-hidden="true" className={`grid size-12 shrink-0 place-items-center rounded-md ${tileColor(index)}`}>
                    {topic.icon}
                  </span>
                  <span className="text-[1.1875rem] font-bold text-fg">{topic.title}</span>
                </li>
              ))}
            </ul>
            <Link href="/book" className="mt-10 inline-flex items-center gap-3 text-[clamp(1.375rem,1.1rem+1vw,1.875rem)] font-bold text-fg no-underline hover:text-accent">
              Book a video consultation now
              <ArrowLong />
            </Link>
          </div>
          <div data-reveal className="bg-panel p-6 sm:p-8 lg:col-span-5">
            <p className="mb-6 text-[1.25rem] font-bold text-fg">Send us a message</p>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* 8. Who we work with */}
      <section className="overflow-hidden bg-deep py-16 md:py-24">
        <div className="page-container">
          <SectionHeading center title="The people we work alongside" />
          <div data-reveal className="mt-12">
            <Carousel label="Organizations we work with">
              {audiences.map((item) => (
                <ImageCard key={item.title} item={item} ratio="aspect-[16/10]" />
              ))}
            </Carousel>
          </div>
        </div>
      </section>

      {/* 9. Problems we solve, as they are told to us */}
      <ConversationSection
        id="problems-heading"
        title="Does any of this sound like your week?"
        intro="This is what we hear on first calls, in one form or another."
        image="home-problems"
        lines={problems}
        reply="You’re not alone. An outside view usually pays for itself quickly."
      >
        <p data-reveal className="mt-8 text-fg-muted">
          Our guides on{" "}
          <Link href="/insights/reduce-patient-no-shows" className="text-link">
            reducing patient no-shows
          </Link>{" "}
          and{" "}
          <Link href="/insights/pharmacy-workflow-optimization" className="text-link">
            cutting pharmacy wait times
          </Link>{" "}
          show where to start.
        </p>
      </ConversationSection>

      {/* 10. Engagement steps, and the numbers behind them */}
      <section className="bg-deep py-16 md:py-24">
        <div className="page-container">
          <SectionHeading center title="Working together, one step at a time" intro="A simple path from the first conversation to lasting change." />
          <div className="mt-14">
            <Steps steps={engagementSteps} />
          </div>
          <dl className="mt-14 grid border-y border-line-strong/60 bg-base sm:grid-cols-2 lg:grid-cols-4">
            {figures.map((stat, index) => (
              <div
                key={stat.label}
                data-reveal
                style={delay(index * 100)}
                className="border-line-strong/60 px-6 py-7 text-center not-last:border-b sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:not-last:border-r"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-[2.75rem] leading-none font-black text-fg">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </dd>
                <dd className="mx-auto mt-3 max-w-[16rem] text-[0.9375rem] text-fg-muted">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 11. Why us, on the deep teal band */}
      <section aria-labelledby="why-heading" className="theme-dark bg-base">
        <div className="border-b border-line py-10 text-center">
          <h2 id="why-heading" data-reveal className="text-section page-container text-fg">
            A senior partner, not a slide deck
          </h2>
        </div>
        <ul className="page-container grid gap-x-12 gap-y-8 py-12 md:grid-cols-2 md:py-14">
          {principles.map((principle, index) => (
            <li key={principle.title} data-reveal style={delay(index * 90)} className="flex gap-5">
              <span aria-hidden="true" className={`grid size-12 shrink-0 place-items-center rounded-full ${tileColor(index)}`}>
                {principle.icon}
              </span>
              <div>
                <h3 className="text-[1.1875rem] font-bold text-fg">{principle.title}</h3>
                <p className="mt-1 text-fg-muted">{principle.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 12. Focus areas carousel */}
      <section className="overflow-hidden py-16 md:py-24">
        <div className="page-container">
          <SectionHeading center title="Where we roll up our sleeves" />
          <div data-reveal className="mt-12">
            <Carousel label="Focus areas" slideClassName="basis-[84%] sm:basis-1/2 lg:basis-1/4">
              {focusAreas.map((item) => (
                <ImageCard key={item.title} item={item} ratio="aspect-[16/10]" sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 84vw" />
              ))}
            </Carousel>
          </div>
        </div>
      </section>

      {/* 13. Packages */}
      <section id="packages" className="scroll-mt-24 bg-deep py-16 md:py-24">
        <div className="page-container">
          <SectionHeading
            center
            title="Simple packages, with the prices up front"
            intro={
              <>
                Not sure which fits?{" "}
                <Link href="/book#initial" className="text-link">
                  Request an initial consultation
                </Link>{" "}
                and we will recommend one.
              </>
            }
          />
          <div className="mt-12">
            <FeeSchedule packages={packages} />
          </div>
        </div>
      </section>

      {/* 14. Insights */}
      <section aria-labelledby="insights-heading" className="py-16 md:py-24">
        <div className="page-container">
          <SectionHeading
            center
            title="Reading for busy operations leaders"
            intro="Plain-spoken advice on patient access, virtual care and pharmacy operations."
            id="insights-heading"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {insights.slice(0, 3).map((insight, index) => (
              <InsightCard key={insight.slug} insight={insight} index={index} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/insights" className="btn btn-ghost">
              All insights
            </Link>
          </div>
        </div>
      </section>

      {/* 15. FAQ */}
      <FaqSection image="home-faq" title="Questions people often ask us" faqs={generalFaqs} tone="walnut" />

      {/* 16. Call to action */}
      <CtaBand />

      <JsonLd
        data={webPageJsonLd({
          path: "/",
          name: "Healthcare, Telehealth & Pharmacy Consulting",
          description: "Anoka Advisors helps US medical practices, telehealth programs and pharmacies fix patient access, workflow and compliance.",
          image: photoSrc("home-hero-1"),
          breadcrumb: false,
        })}
      />
      <JsonLd data={faqJsonLd(generalFaqs, "/")} />
    </>
  );
}

function ArrowLong() {
  return (
    <svg viewBox="0 0 40 20" aria-hidden="true" className="h-5 w-10">
      <path d="M2 10h34M28 3l8 7-8 7" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
