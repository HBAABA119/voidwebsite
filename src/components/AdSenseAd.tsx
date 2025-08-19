"use client";

import { useEffect, useRef } from "react";

// Declare the adsbygoogle type on window
declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

interface AdSenseAdProps {
  slot: string; // Ad unit slot ID from AdSense
  style?: React.CSSProperties; // Optional custom style
  className?: string;
  format?: string; // e.g., "auto"
  fullWidthResponsive?: boolean; // true by default
}

export default function AdSenseAd({
  slot,
  style,
  className = "",
  format = "auto",
  fullWidthResponsive = true,
}: AdSenseAdProps) {
  const initializedRef = useRef(false);

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
      } catch (e) {
        // no-op
      }
    };

    if (!existing) {
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3190492570821815";
      s.crossOrigin = "anonymous";
      s.addEventListener("load", ensurePush);
      document.head.appendChild(s);
    } else {
      ensurePush();
    }
  }, []);

  return (
    <ins
      className={`adsbygoogle block ${className}`}
      style={{ display: "block", minHeight: 60, ...style }}
      data-ad-client="ca-pub-3190492570821815"
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
    />
  );
}
