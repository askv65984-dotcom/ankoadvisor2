"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { BrandLogo } from "./logo";

export type NavLink = { href: string; label: string; description?: string };

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true" className={`size-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
      <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** A menu item that opens a blue panel of links on click, hover or keyboard focus. */
function NavMenu({
  label,
  href,
  links,
  footer,
  pathname,
  linkClass,
}: {
  label: string;
  href: string;
  links: NavLink[];
  footer: NavLink;
  pathname: string;
  linkClass: string;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const wrapper = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const show = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hideSoon = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  return (
    <li
      ref={wrapper}
      className="relative"
      onPointerEnter={(event) => event.pointerType === "mouse" && show()}
      onPointerLeave={(event) => event.pointerType === "mouse" && hideSoon()}
      onBlur={(event) => {
        if (!wrapper.current?.contains(event.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-current={isActive(pathname, href) ? "page" : undefined}
        onClick={() => setOpen((value) => !value)}
        className={`${linkClass} ${open ? "is-open" : ""}`}
      >
        {label}
        <Chevron open={open} />
      </button>

      <div
        id={id}
        className={`absolute top-full left-0 w-[19rem] pt-3 transition-[opacity,translate] duration-200 ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <div className="bg-ocean px-6 py-5 shadow-[0_18px_40px_-18px_rgba(9,40,60,0.55)]">
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className="block py-2 text-[1rem] leading-snug text-white no-underline decoration-white/70 underline-offset-4 hover:underline aria-[current=page]:font-bold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={footer.href}
            onClick={() => setOpen(false)}
            className="mt-3 flex items-center gap-2 border-t border-white/25 pt-4 text-[0.9375rem] font-bold text-white no-underline decoration-white/70 underline-offset-4 hover:underline"
          >
            {footer.label}
            <svg viewBox="0 0 20 20" aria-hidden="true" className="size-4">
              <path d="M4 10h11M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.75" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </li>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 text-bright">
      <path fill="currentColor" d="M2 5.5A1.5 1.5 0 013.5 4h17A1.5 1.5 0 0122 5.5v13a1.5 1.5 0 01-1.5 1.5h-17A1.5 1.5 0 012 18.5zm2.2.5l7.8 6.2L19.8 6zM20 7.9l-7.4 5.9a1 1 0 01-1.2 0L4 7.9V18h16z" />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 text-bright">
      <path fill="currentColor" d="M3.5 5h11A1.5 1.5 0 0116 6.5v2.3l4.4-2.6a1 1 0 011.6.9v9.8a1 1 0 01-1.6.9L16 15.2v2.3a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 012 17.5v-11A1.5 1.5 0 013.5 5z" />
    </svg>
  );
}

/**
 * The site header. On the home page it sits transparent over the hero, with white type; once the
 * visitor scrolls, and on every other page, it turns white with dark type. Services and Insights open
 * blue panels of links; on phones everything moves into a menu that drops down below the bar.
 */
export function SiteHeader({ serviceLinks, insightLinks }: { serviceLinks: NavLink[]; insightLinks: NavLink[] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Transparent only while it sits over the home page's dark hero.
  const clear = pathname === "/" && !scrolled && !open;

  const linkClass = `inline-flex h-10 items-center gap-1 px-2.5 text-[1rem] no-underline transition-colors xl:px-3 ${
    clear
      ? "text-white hover:text-gold [&.is-open]:text-gold aria-[current=page]:text-gold"
      : "text-[#1d2731] hover:text-ocean [&.is-open]:text-ocean aria-[current=page]:text-ocean"
  }`;
  const utilityClass = `inline-flex items-center gap-2 text-[1rem] no-underline transition-colors ${
    clear ? "text-white hover:text-gold" : "text-[#1d2731] hover:text-ocean"
  }`;

  const mobileLinks: (NavLink & { children?: NavLink[] })[] = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/pricing", label: "Pricing" },
    { href: "/services", label: "Services", children: serviceLinks },
    { href: "/insights", label: "Insights", children: insightLinks },
    { href: "/contact", label: "Contact us" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        clear ? "bg-transparent" : "bg-white shadow-[0_2px_18px_-6px_rgba(9,40,60,0.18)]"
      }`}
    >
      <div aria-hidden="true" className="scroll-progress fixed inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gold" />
      <div
        className={`relative z-50 mx-auto flex max-w-[80rem] items-center justify-between gap-4 px-4 transition-[height] duration-300 sm:px-6 ${
          scrolled ? "h-[4.5rem] lg:h-20" : "h-[4.5rem] lg:h-24"
        }`}
      >
        <Link href="/" className="inline-flex shrink-0 items-center no-underline">
          <BrandLogo priority onLight={!clear} className="h-11 w-auto lg:h-[3.25rem]" />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center">
            <li>
              <Link href="/" aria-current={isActive(pathname, "/") ? "page" : undefined} className={linkClass}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" aria-current={isActive(pathname, "/about") ? "page" : undefined} className={linkClass}>
                About
              </Link>
            </li>
            <li>
              <Link href="/pricing" aria-current={isActive(pathname, "/pricing") ? "page" : undefined} className={linkClass}>
                Pricing
              </Link>
            </li>
            <NavMenu
              label="Services"
              href="/services"
              links={serviceLinks}
              footer={{ href: "/services", label: "All services" }}
              pathname={pathname}
              linkClass={linkClass}
            />
            <NavMenu
              label="Insights"
              href="/insights"
              links={insightLinks}
              footer={{ href: "/insights", label: "All insights and guides" }}
              pathname={pathname}
              linkClass={linkClass}
            />
          </ul>
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <Link href="/contact" aria-current={isActive(pathname, "/contact") ? "page" : undefined} className={utilityClass}>
            <MailIcon />
            Contact Us
          </Link>
          <Link href="/book" aria-current={isActive(pathname, "/book") ? "page" : undefined} className={utilityClass}>
            <VideoIcon />
            Book a Consultation
          </Link>
        </div>

        <button
          type="button"
          className={`inline-flex h-11 items-center gap-2.5 px-3 text-[1rem] font-bold lg:hidden ${clear ? "text-white" : "text-fg"}`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="relative block h-3.5 w-6" aria-hidden="true">
            <span className={`absolute left-0 h-0.5 w-6 bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute top-1.5 left-0 h-0.5 w-6 bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 h-0.5 w-6 bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <div id="mobile-menu" hidden={!open} className="fixed inset-x-0 top-[4.5rem] bottom-0 z-40 overflow-y-auto border-t border-line bg-white lg:hidden">
        <nav aria-label="Main" className="page-container flex min-h-full flex-col pb-8">
          <ul>
            {mobileLinks.map((item, index) => (
              <li key={item.href} className="rise border-b border-line" style={{ "--d": `${index * 50}ms` } as CSSProperties}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className="block py-4 text-[1.25rem] text-fg no-underline aria-[current=page]:font-bold aria-[current=page]:text-ocean"
                >
                  {item.label}
                </Link>
                {item.children ? (
                  <ul className="-mt-1 pb-4">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={() => setOpen(false)}
                          aria-current={pathname === child.href ? "page" : undefined}
                          className="block py-1.5 pl-4 text-fg-muted no-underline aria-[current=page]:font-bold aria-[current=page]:text-ocean"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-10">
            <Link href="/book" onClick={() => setOpen(false)} className="btn btn-accent w-full">
              Book a consultation
            </Link>
            <a href="mailto:info@anokaadvisors.com" className="mt-5 flex items-center justify-center gap-2 text-fg-muted no-underline">
              <MailIcon />
              info@anokaadvisors.com
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
