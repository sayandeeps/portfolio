"use client";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { stats } from "../data/portfolio";

function CountUp({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    let raf;
    const start = performance.now();
    const duration = 900;
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value]);

  return (
    <span
      ref={ref}
      className="font-mono text-4xl font-semibold text-content sm:text-5xl"
    >
      {display}
      {suffix}
    </span>
  );
}

export default function AchievementsSection() {
  return (
    <section className="py-14" aria-label="Highlights">
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col bg-surface p-6">
            <dt className="order-2 mt-2 text-sm text-content-muted">
              {stat.label}
            </dt>
            <dd className="order-1">
              <CountUp value={stat.value} suffix={stat.suffix} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
