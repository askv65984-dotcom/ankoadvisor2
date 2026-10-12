import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/brand/anoka-advisors-logo.png";
import logoDark from "@/assets/brand/anoka-advisors-logo-dark.png";
import mark from "@/assets/brand/anoka-mark.png";

/**
 * The full logo: gold A mark, "Anoka" and "Advisors" in bronze. "Anoka" is white for dark bands
 * (the default) and deep teal on light ones (onLight).
 */
export function BrandLogo({
  className = "h-11 w-auto",
  priority = false,
  onLight = false,
}: {
  className?: string;
  priority?: boolean;
  onLight?: boolean;
}) {
  return <Image src={onLight ? logoDark : logo} alt="Anoka Advisors" priority={priority} sizes="200px" className={className} />;
}

/** The gold A mark on its own. Decorative unless alt is given. */
export function BrandMark({ className = "size-10", alt = "" }: { className?: string; alt?: string }) {
  return <Image src={mark} alt={alt} sizes="64px" className={className} />;
}

/** For light backgrounds (the admin sign-in page): the logo with "Anoka" in teal. */
export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center no-underline" aria-label="Anoka Advisors, home">
      <BrandLogo onLight className="h-12 w-auto" />
    </Link>
  );
}
