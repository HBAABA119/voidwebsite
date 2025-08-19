"use client";

import { useEffect } from "react";

export default function ScrollRevealProvider() {
  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const observeAll = () => {
      const elements = document.querySelectorAll(".scroll-reveal");
      elements.forEach((el) => observer.observe(el));
    };

    // Apply ordered stagger to any container with class 'stagger'
    const applyStagger = () => {
      const containers = document.querySelectorAll<HTMLElement>('.stagger');
      containers.forEach((container) => {
        const start = Number(container.dataset.staggerStart || '0'); // ms
        const step = Number(container.dataset.staggerStep || '80'); // ms per item
        let i = 0;
        Array.from(container.children).forEach((child) => {
          if (!(child instanceof HTMLElement)) return;
          // Ensure child participates in our base animation
          child.classList.add('stagger-child');
          // Only set delay if not already explicitly defined
          const hasInlineDelay = child.style.animationDelay && child.style.animationDelay.length > 0;
          if (!hasInlineDelay) {
            child.style.animationDelay = `${start + i * step}ms`;
          }
          i += 1;
        });
      });
    };

    // Initial attach
    observeAll();
    applyStagger();

    // Cinematic scroll (lightweight parallax)
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let ticking = false;

    const applyParallax = () => {
      ticking = false;
      if (mediaQuery.matches) return;
      const cinematicEls = document.querySelectorAll<HTMLElement>('[data-cinematic]');
      const viewportH = window.innerHeight;
      const viewportCenter = window.scrollY + viewportH / 2;
      cinematicEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const elCenter = window.scrollY + rect.top + rect.height / 2;
        const depth = Number(el.dataset.depth || '0.2');
        const intensity = Number(el.dataset.intensity || '60'); // px movement range
        const progress = Math.max(-1, Math.min(1, (viewportCenter - elCenter) / viewportH));
        const translateY = progress * depth * intensity;
        const rotate = progress * depth * 1; // subtle tilt
        el.style.transform = `translate3d(0, ${translateY}px, 0) rotateX(${rotate}deg)`;
      });
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(applyParallax);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    // Re-run on route updates via mutation observer (covers client nav and late inserts)
    const mutationObserver = new MutationObserver(() => {
      observeAll();
      applyStagger();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // Cleanup
    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener('scroll', onScroll as EventListener);
      window.removeEventListener('resize', onScroll as EventListener);
    };
  }, []);

  return null;
}
