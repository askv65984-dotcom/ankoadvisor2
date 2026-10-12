import Link from "next/link";
import { cacheLife } from "next/cache";
import { insights } from "@/content/insights";
import { services } from "@/content/services";
import { getSiteSettings } from "@/lib/data";
import { telHref } from "@/lib/format";
import { legalNav, mainNav } from "@/lib/site";
import { BrandLogo } from "./logo";
import { NewsletterForm } from "./newsletter-form";

async function currentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

const companyLinks = [
  ...mainNav,
  { href: "/book", label: "Book a consultation" },
  { href: "/credits", label: "Photo credits" },
];

function FooterHeading({ children }: { children: string }) {
  return <h2 className="text-[1.0625rem] font-bold text-white">{children}</h2>;
}

const linkClass = "text-white no-underline decoration-white/60 underline-offset-4 hover:underline";

/** The footer: a teal-to-blue gradient with the newsletter, four columns of links and a darker bar for the small print. */
export async function SiteFooter() {
  const [settings, year] = await Promise.all([getSiteSettings(), currentYear()]);
  const email = settings.contact_email;

  return (
    <footer className="text-white">
      <div className="bg-[linear-gradient(30deg,#0b5271_0%,#0d6489_55%,#127cab_100%)]">
        {/* Brand and newsletter */}
        <div className="page-container grid gap-10 border-b border-white/20 py-12 md:py-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex no-underline">
              <BrandLogo className="h-14 w-auto" />
            </Link>
            <p className="mt-4 max-w-sm text-[0.9375rem] text-white">
              Operations consulting for healthcare practices, telehealth programs and pharmacies across the United States.
            </p>
          </div>
          <div className="lg:col-span-7">
            <h2 className="text-[1.375rem] font-bold text-white">Notes on running better healthcare operations</h2>
            <p className="mt-2 mb-5 max-w-xl text-[0.9375rem] text-white">
              Practical ideas on patient access, virtual care and pharmacy workflow, sent occasionally. No sales sequences.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Directory */}
        <div className="page-container grid gap-10 py-12 text-[0.9375rem] sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <FooterHeading>Contact Us</FooterHeading>
            <p className="mt-3 font-bold">Anoka Advisors</p>
            <dl className="mt-4 space-y-1.5">
              <div>
                <dt className="inline font-bold">Email: </dt>
                <dd className="inline">
                  <a href={`mailto:${email}`} className={`${linkClass} break-all`}>
                    {email}
                  </a>
                </dd>
              </div>
              {settings.contact_phone ? (
                <div>
                  <dt className="inline font-bold">Phone: </dt>
                  <dd className="inline">
                    <a href={telHref(settings.contact_phone)} className={linkClass}>
                      {settings.contact_phone}
                    </a>
                  </dd>
                </div>
              ) : null}
              {settings.office_hours ? (
                <div>
                  <dt className="inline font-bold">Hours: </dt>
                  <dd className="inline">{settings.office_hours}</dd>
                </div>
              ) : null}
              <div>
                <dt className="inline font-bold">Service area: </dt>
                <dd className="inline">Serving clients nationwide, by video and on site</dd>
              </div>
            </dl>
            {settings.linkedin_url ? (
              <a
                href={settings.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex size-10 items-center justify-center bg-white/15 text-white transition-colors hover:bg-gold hover:text-on-gold"
              >
                <span className="sr-only">Anoka Advisors on LinkedIn</span>
                <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-current">
                  <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.3-.02-3-1.83-3-1.84 0-2.12 1.43-2.12 2.9V21H9z" />
                </svg>
              </a>
            ) : null}
          </div>

          <nav aria-label="Services" className="lg:col-span-3">
            <FooterHeading>Consulting Services</FooterHeading>
            <ul className="mt-3 space-y-1.5">
              <li>
                <Link href="/services" className={linkClass}>
                  All consulting services
                </Link>
              </li>
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className={linkClass}>
                    {service.heading}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/pricing" className={linkClass}>
                  Packages and fees
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Company" className="lg:col-span-2">
            <FooterHeading>Quick Links</FooterHeading>
            <ul className="mt-3 space-y-1.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Guides" className="lg:col-span-2">
            <FooterHeading>Guides</FooterHeading>
            <ul className="mt-3 space-y-1.5">
              {insights.map((insight) => (
                <li key={insight.slug}>
                  <Link href={`/insights/${insight.slug}`} className={linkClass}>
                    {insight.shortTitle}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/insights" className={linkClass}>
                  All insights
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Legal" className="lg:col-span-2">
            <FooterHeading>Legal</FooterHeading>
            <ul className="mt-3 space-y-1.5">
              {legalNav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-l-4 border-gold bg-white/10 p-4 text-[0.875rem]">
              <p className="flex items-center gap-2 font-bold">
                <svg viewBox="0 0 20 20" aria-hidden="true" className="size-4 text-gold">
                  <rect x="4" y="9" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <path d="M7 9V6.5a3 3 0 016 0V9" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
                Secure payments
              </p>
              <p className="mt-1">Checkout is processed by Stripe. Card details never touch our servers.</p>
            </div>
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-brand-deep">
        <div className="page-container flex flex-col gap-4 py-5 text-[0.8125rem] md:flex-row md:items-center md:justify-between">
          <p className="max-w-3xl font-bold">
            &copy; {year} Anoka Advisors | All Rights Reserved. We provide operations consulting and do not provide legal,
            medical, billing or tax advice.
          </p>
          <a href="#top" className="inline-flex items-center gap-2 self-start font-bold whitespace-nowrap text-white no-underline hover:underline md:self-auto">
            Back to top
            <svg viewBox="0 0 20 20" aria-hidden="true" className="size-4">
              <path d="M10 16V5M5 9l5-5 5 5" stroke="currentColor" strokeWidth="1.75" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
