"use client";

import { useEffect } from "react";

export default function GlobalEffects() {
  useEffect(() => {
    const selector = ".tilt";
    const elements = new Set<HTMLElement>();

    const onEnter = (el: HTMLElement) => {
      el.style.transition = "transform 200ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 200ms ease";
      el.style.transformStyle = "preserve-3d";
      el.style.perspective = "800px";
    };

    const onMove = (e: MouseEvent) => {
      const target = (e.currentTarget || e.target) as HTMLElement;
      const el = target.closest(selector) as HTMLElement | null;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const midX = rect.width / 2;
      const midY = rect.height / 2;
      const rotateY = ((x - midX) / midX) * 6; // max 6deg
      const rotateX = -((y - midY) / midY) * 6;
      el.style.transform = `translateY(-6px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      el.style.boxShadow = "0 24px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08)";
    };

    const onLeave = (e: MouseEvent) => {
      const target = (e.currentTarget || e.target) as HTMLElement;
      const el = target.closest(selector) as HTMLElement | null;
      if (!el) return;
      el.style.transform = "translateY(0) scale(1) rotateX(0) rotateY(0)";
      el.style.boxShadow = "";
    };

    const attach = (root: ParentNode) => {
      const found = root.querySelectorAll<HTMLElement>(selector);
      found.forEach((el) => {
        if (elements.has(el)) return;
        elements.add(el);
        el.addEventListener("mouseenter", () => onEnter(el));
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    attach(document);

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) attach(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      elements.forEach((el) => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      });
      elements.clear();
    };
  }, []);

  return null;
}
