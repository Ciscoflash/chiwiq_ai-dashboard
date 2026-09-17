/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";

const HERO_VIDEO =
  "https://res.cloudinary.com/dgciuf5do/video/upload/v1772912032/GettyImages-1367618091_1_bgcjbd.mp4";
const CTA_VIDEO =
  "https://res.cloudinary.com/dgciuf5do/video/upload/v1772913166/212404_medium_ggdaej.mp4";

const SOLUTIONS = [
  {
    index: "01",
    title: "AI & Automation",
    body: "We create intelligent systems that handle repetitive tasks, analyse data, and support decision-making — so your team can focus on work that truly matters.",
  },
  {
    index: "02",
    title: "Robotics & Physical Systems",
    body: "We connect digital intelligence to physical operations, enabling precise control, real-time coordination, and smarter execution on the ground.",
  },
  {
    index: "03",
    title: "Cloud & Infrastructure",
    body: "We build secure, reliable digital foundations that keep your systems running smoothly — with the flexibility to grow as your needs expand.",
  },
  {
    index: "04",
    title: "Software Platforms",
    body: "We develop custom enterprise platforms designed around your workflows, ensuring everything works together instead of in silos.",
  },
];

const INDUSTRIES = [
  {
    image: "/chiwiq/images/restaurant.jpg",
    alt: "Restaurant Platform",
    title: "Restaurant Platform",
    body: "A complete digital operations system for modern restaurants — from ordering and payments to kitchen coordination and customer engagement.",
  },
  {
    image: "/chiwiq/images/retail.jpg",
    alt: "Retail Automation",
    title: "Retail Automation",
    body: "Integrated POS, inventory control, and customer intelligence systems that help retailers operate smarter and sell better.",
  },
];

const QUALITIES = [
  {
    icon: "/chiwiq/icons/ethical-ai.svg",
    title: "Ethical and Responsible AI",
    body: "We design AI systems that are transparent, accountable, and built with long-term impact in mind.",
  },
  {
    icon: "/chiwiq/icons/human-centered.svg",
    title: "Human-Centered Design",
    body: "Technology should support people, not frustrate them. Our systems are built to be intuitive, practical, and easy to adopt.",
  },
  {
    icon: "/chiwiq/icons/secure.svg",
    title: "Secure by Default",
    body: "Security isn't an afterthought. Every solution is built with strong controls, clear access management, and protection at its core.",
  },
  {
    icon: "/chiwiq/icons/scalability.svg",
    title: "Built for Scalability",
    body: "Our systems are designed to handle growth — whether that means more users, more locations, or more complexity.",
  },
];

function SectionHeading({
  dotClass,
  eyebrow,
  title,
  sub,
  highlight,
}: {
  dotClass: string;
  eyebrow: string;
  title: string;
  sub: string;
  highlight: string;
}) {
  return (
    <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:gap-24 md:mb-16">
      <div className="flex-1">
        <div className="mb-5 flex items-center gap-2">
          <span
            className="size-1.5 shrink-0 rounded-full"
            style={{ backgroundColor: dotClass }}
          />
          <span className="font-mono text-[13px] uppercase tracking-[0.0875em] text-white/60">
            {eyebrow}
          </span>
        </div>
        <h2 className="font-display text-[clamp(36px,4vw,48px)] font-bold leading-[1.15] tracking-[-0.02em] text-white">
          {title} <span className="lg:block" style={{ color: "rgba(255,255,255,0.40)" }}>{highlight}</span>
        </h2>
      </div>
      <div className="shrink-0" style={{ maxWidth: 460 }}>
        <p
          className="pt-1 text-[18px] font-normal leading-[1.65] tracking-[-0.02em]"
          style={{ color: "rgba(255,255,255,0.60)" }}
        >
          {sub}
        </p>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh" }}>
      <LandingHeader />

      <main>
        {/* Hero */}
        <section
          style={{
            position: "relative",
            minHeight: "100vh",
            backgroundColor: "#000000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            paddingTop: 80,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url(/chiwiq/images/hero-bg.png)",
              backgroundSize: "cover",
              backgroundPosition: "center top",
            }}
          />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "55%" }}>
            <img
              src="/chiwiq/images/home-wireframe.png"
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, #000 0%, transparent 35%, transparent 70%, #000 100%)",
              }}
            />
          </div>
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              width: "100%",
              zIndex: 5,
              pointerEvents: "none",
              opacity: 0.6,
            }}
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>

          <div
            className="relative z-10 px-6 text-center md:px-12"
            style={{ maxWidth: 860, margin: "0 auto" }}
          >
            <h1
              className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[48px]"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                margin: 0,
                marginBottom: 24,
              }}
            >
              Your Operations,
              <br />
              Running on Intelligence
            </h1>
            <p
              className="mx-auto"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                color: "rgba(255,255,255,0.60)",
                lineHeight: 1.65,
                maxWidth: 520,
                marginBottom: 40,
                letterSpacing: "-0.02em",
              }}
            >
              We design AI, automation, and robotics systems that help organisations operate
              faster and smarter
            </p>
            <Link
              href="/admin/login"
              className="inline-block rounded-md bg-white px-8 py-3 text-sm font-semibold tracking-[-0.01em] text-black transition-colors duration-200 hover:bg-white/85"
              style={{ border: "1px solid rgba(255,255,255,0.50)" }}
            >
              Book a demo
            </Link>
          </div>
        </section>

        {/* What we do */}
        <section className="relative overflow-hidden bg-white/5 py-16 md:py-24">
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url(/chiwiq/images/hero-bg.png)",
              backgroundSize: "cover",
              backgroundPosition: "center top",
              opacity: 0.9,
              zIndex: 1,
            }}
          />
          <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-10 lg:px-[70px]">
            <SectionHeading
              dotClass="#00a425"
              eyebrow="What we do"
              title="Intelligent Systems."
              highlight="Real Impact."
              sub="We design and deploy intelligent systems that enable organizations to operate efficiently, securely, and at scale."
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {SOLUTIONS.map((s) => (
                <div
                  key={s.index}
                  className="flex flex-col bg-[#0d0d0d] p-7 pb-8 transition-colors duration-200 hover:bg-[rgba(255,255,255,0.06)]"
                  style={{ border: "1px solid rgba(255,255,255,0.15)", borderRadius: 6 }}
                >
                  <span
                    className="mb-10 font-mono text-2xl font-normal tracking-[-0.02em]"
                    style={{ color: "rgba(255,255,255,0.30)" }}
                  >
                    {s.index}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-white">
                      {s.title}
                    </h3>
                    <p
                      className="text-[15px] font-normal leading-[1.6] tracking-[-0.01em]"
                      style={{ color: "rgba(255,255,255,0.55)" }}
                    >
                      {s.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Platforms */}
        <section className="bg-black py-16 md:py-24">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-[70px]">
            <SectionHeading
              dotClass="#c3db27"
              eyebrow="Industry Platforms"
              title="Built for Your"
              highlight="Industry"
              sub="We deploy intelligent systems where precision and reliability matter most."
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {INDUSTRIES.map((item) => (
                <Link
                  key={item.title}
                  href="/solutions"
                  className="group flex flex-col overflow-hidden rounded-md bg-[rgba(255,255,255,0.03)] transition-transform duration-300"
                  style={{ border: "1px solid rgba(255,255,255,0.20)" }}
                >
                  <div style={{ height: 220, overflow: "hidden" }}>
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-7 pb-6">
                    <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-white">
                      {item.title}
                    </h3>
                    <p
                      className="flex-1 text-base font-normal leading-[1.6] tracking-[-0.02em]"
                      style={{ color: "rgba(255,255,255,0.60)" }}
                    >
                      {item.body}
                    </p>
                    <div className="mt-4 text-white/60 transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowRight className="size-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why ChiwiQ */}
        <section className="bg-white/10 py-16 md:py-24">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-[70px]">
            <SectionHeading
              dotClass="#c3db27"
              eyebrow="Why ChiwiQ"
              title="Technology With"
              highlight="Industry"
              sub="We don't just build technology. We build systems that organisations trust and rely on every day."
            />
            <div className="overflow-hidden rounded-lg border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {QUALITIES.map((q, i) => (
                  <div
                    key={q.title}
                    className={`flex flex-col gap-6 p-10 pb-12 ${
                      i % 2 === 0 ? "md:border-r md:border-white/20" : ""
                    } ${i < QUALITIES.length - 2 ? "max-md:border-b max-md:border-white/20 md:border-b md:border-white/20" : ""} ${i === QUALITIES.length - 2 ? "border-b border-white/20 max-md:border-white/20" : ""}`}
                  >
                    <img src={q.icon} alt="" style={{ width: 26, height: 26, objectFit: "contain" }} />
                    <div className="flex flex-col gap-2">
                      <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-white">
                        {q.title}
                      </h3>
                      <p
                        className="text-base font-normal leading-[1.6] tracking-[-0.02em]"
                        style={{ color: "rgba(255,255,255,0.60)" }}
                      >
                        {q.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ position: "relative", minHeight: 500, overflow: "hidden" }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 5,
              pointerEvents: "none",
              opacity: 0.6,
              filter: "grayscale(100%) brightness(0.45)",
            }}
          >
            <source src={CTA_VIDEO} type="video/mp4" />
          </video>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.10) 40%, rgba(0,0,0,0.25) 100%)",
            }}
          />
          <div
            className="relative z-10 flex min-h-[500px] flex-col items-center justify-center px-6 py-20 text-center"
          >
            <div className="mb-4 flex items-center justify-center gap-3">
              <img
                src="/chiwiq/icons/badge-247.svg"
                alt=""
                style={{ width: 38, height: 38, opacity: 0.85 }}
              />
              <span
                className="font-display font-bold leading-none tracking-[-0.03em] text-white"
                style={{ fontSize: "clamp(36px, 5vw, 60px)" }}
              >
                24/7
              </span>
            </div>
            <h2
              className="mb-10 font-display font-bold leading-[1.1] tracking-[-0.03em] text-white"
              style={{ fontSize: "clamp(36px, 5vw, 60px)" }}
            >
              Intelligence For Your
              <br />
              Business
            </h2>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <Link
                href="/get-started"
                className="rounded-md bg-white px-7 py-3 text-sm font-medium tracking-[-0.01em] text-black transition-colors hover:bg-white/85"
              >
                Talk to our team
              </Link>
              <Link
                href="/solutions"
                className="rounded-md px-7 py-3 text-sm font-medium tracking-[-0.01em] text-white transition-colors duration-200 hover:bg-white/10"
                style={{ border: "1px solid rgba(255,255,255,0.50)" }}
              >
                See our solutions
              </Link>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />

      <elevenlabs-convai agent-id="agent_1301m2p162gkfmbbpmnrztzj5ehv"></elevenlabs-convai>
      <script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        async
        type="text/javascript"
      ></script>
    </div>
  );
}