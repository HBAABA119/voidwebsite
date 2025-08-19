"use client";

import { useEffect, useMemo, useRef } from "react";

// Declare the adsbygoogle type on window
declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdSenseAdProps {
  slot: string; // Ad unit slot ID from AdSense
  style?: React.CSSProperties; // Optional custom style
  className?: string;
  format?: string; // e.g., "auto"
  fullWidthResponsive?: boolean; // true by default
  adTest?: boolean; // force test ads (adds data-adtest="on")
}

export default function AdSenseAd({
  slot,
  style,
  className = "",
  format = "auto",
  fullWidthResponsive = true,
  adTest,
}: AdSenseAdProps) {
  const initializedRef = useRef(false);
  const clientId = useMemo(() => {
    return process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-3190492570821815";
  }, []);
  const isProd = useMemo(() => process.env.NODE_ENV === "production", []);

  useEffect(() => {
    if (initializedRef.current) return;

    // Ensure the AdSense script is present
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src^="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]'
    );

    const ensurePush = () => {
      try {
        // Push a new ad request
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        initializedRef.current = true;
      } catch {
        // no-op
      }
    };

    if (!existing) {
      const s = document.createElement("script");
      s.async = true;
      s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
      s.crossOrigin = "anonymous";
      s.addEventListener("load", ensurePush);
      document.head.appendChild(s);
    } else {
      ensurePush();
    }
  }, [clientId]);

  return (
    <ins
      className={`adsbygoogle block ${className}`}
      style={{ display: "block", minHeight: 60, ...style }}
      data-ad-client={clientId}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
      {...((adTest || !isProd) ? { "data-adtest": "on" } as any : {})}
    />
  );
}
