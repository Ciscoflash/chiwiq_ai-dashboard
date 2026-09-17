"use client";

import { useRef } from "react";
import Script from "next/script";

const AGENT_ID = "agent_1301m2p162gkfmbbpmnrztzj5ehv";

export function HeroCta() {
  const convaiRef = useRef<HTMLElement | null>(null);

  const getTrigger = () => {
    const el = convaiRef.current;
    const sr = el?.shadowRoot;
    if (!sr) return null;
    return sr.querySelector<HTMLElement>('button[aria-label^="Start a call"]');
  };

  const startCall = () => {
    const trigger = getTrigger();
    if (trigger) {
      trigger.click();
      return;
    }
    const startedAt = Date.now();
    const timer = window.setInterval(() => {
      const ready = getTrigger();
      if (ready) {
        window.clearInterval(timer);
        ready.click();
      } else if (Date.now() - startedAt > 4000) {
        window.clearInterval(timer);
      }
    }, 150);
  };

  return (
    <>
      <button
        type="button"
        onClick={startCall}
        className="inline-block cursor-pointer rounded-md bg-white px-8 py-3 text-sm font-semibold tracking-[-0.01em] text-black transition-colors duration-200 hover:bg-white/85"
        style={{ border: "1px solid rgba(255,255,255,0.50)" }}
      >
        Make reservations
      </button>

      <elevenlabs-convai
        ref={convaiRef}
        agent-id={AGENT_ID}
      ></elevenlabs-convai>

      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        strategy="afterInteractive"
      />
    </>
  );
}