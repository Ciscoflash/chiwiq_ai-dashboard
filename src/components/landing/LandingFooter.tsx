import Link from "next/link";
import {
  WordmarkText,
  InstagramIcon,
  FacebookIcon,
  TwitterIcon,
} from "@/components/landing/landing-brand";

const SOCIALS = [
  { href: "#", label: "Instagram", Icon: InstagramIcon },
  { href: "#", label: "Facebook", Icon: FacebookIcon },
  { href: "#", label: "Twitter", Icon: TwitterIcon },
];

const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Solutions",
    links: [
      { href: "/solutions/restaurant", label: "Restaurant Platform" },
      { href: "/solutions", label: "Retail" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/", label: "Contact" },
      { href: "/agents", label: "AI Agents" },
      { href: "/admin/login", label: "Get Started" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/privacy", label: "Privacy Policy" },
      { href: "/legal/terms", label: "Terms of Service" },
      { href: "/legal/cookies", label: "Cookie Policy" },
      { href: "/legal/education-addendum", label: "Education Addendum" },
    ],
  },
];

export function LandingFooter() {
  return (
    <footer style={{ backgroundColor: "#000000", position: "relative", overflow: "hidden" }}>
      <div className="mx-auto max-w-[1440px] px-6 pb-6 pt-16 md:px-10 lg:px-[70px]">
        <div className="flex flex-col justify-between gap-12 md:flex-row md:gap-0">
          <div className="flex min-w-[130px] flex-col gap-4">
            <Link href="/">
              <WordmarkText className="text-[2.2rem] leading-none" />
            </Link>
            <div className="mt-1 flex items-center gap-3">
              {SOCIALS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-white/70 transition-colors hover:text-white"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-12 md:gap-24 lg:gap-32">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <span className="mb-5 block font-mono text-sm uppercase tracking-[0.05em] text-white/60">
                  {col.title}
                </span>
                <div className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="block text-sm font-medium leading-normal text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <span className="text-sm font-medium text-white/60">
            Copyright © 2026 ChiwiQ. All rights reserved
          </span>
        </div>
      </div>

      <div className="footer-watermark">
        <span
          className="gradient-text whitespace-nowrap"
          style={{
            fontFamily: "'Clash Display', ui-sans-serif, system-ui, sans-serif",
            fontSize: "clamp(80px, 25vw, 480px)",
            fontWeight: 700,
            lineHeight: 0.9,
            textAlign: "center",
            width: "100%",
            marginBottom: "-0.05em",
          }}
        >
          ChiwiQ
        </span>
      </div>
    </footer>
  );
}