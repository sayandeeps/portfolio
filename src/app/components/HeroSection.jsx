"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { EnvelopeIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { profile, socials } from "../data/portfolio";

const EASE = [0.22, 1, 0.36, 1];

export default function HeroSection() {
  const reduce = useReducedMotion();

  const rise = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: EASE },
        };

  const tiltPortrait = (event) => {
    if (reduce || event.pointerType === "touch") return;

    const stage = event.currentTarget;
    const bounds = stage.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    stage.style.setProperty("--rotate-x", `${y * -24}deg`);
    stage.style.setProperty("--rotate-y", `${x * 26}deg`);
  };

  const resetPortrait = (event) => {
    event.currentTarget.style.removeProperty("--rotate-x");
    event.currentTarget.style.removeProperty("--rotate-y");
  };

  return (
    <section className="portfolio-hero border-b border-line py-16 lg:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <motion.div className="lg:col-span-7" {...rise(0)}>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-ember">
            {profile.eyebrow}
          </p>
          <h1 className="hero-name mt-5 font-display font-bold">
            {profile.firstName}<br /><span>{profile.name.slice(profile.firstName.length + 1)}</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-content-muted">
            {profile.role}
          </p>
          <p className="mt-5 max-w-xl leading-relaxed text-content-muted">
            {profile.intro}
          </p>
          <p className="mt-3 max-w-xl text-sm text-content-faint">
            {profile.introSecondary}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#experience" className="btn-primary">
              View experience
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#contact" className="btn-ghost">
              <EnvelopeIcon className="h-4 w-4" aria-hidden="true" />
              Contact me
            </a>
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="icon-btn"
                >
                  <Image
                    src={`/${social.name.toLowerCase()}-icon.svg`}
                    alt=""
                    width={20}
                    height={20}
                  />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div className="lg:col-span-5" {...rise(0.12)}>
          <div
            className="portrait-stage mx-auto max-w-[28rem]"
            onPointerMove={tiltPortrait}
            onPointerLeave={resetPortrait}
            onPointerCancel={resetPortrait}
          >
            <div className="portrait-scene">
              <div className="portrait-grid" aria-hidden="true" />
              <div className="portrait-orbit portrait-orbit-violet" aria-hidden="true" />
              <div className="portrait-orbit portrait-orbit-lime" aria-hidden="true" />
              <div className="portrait-photo">
                <Image
                  src="/images/hero-restored.png"
                  alt="Portrait of Sayandeep Sharma"
                  fill
                  priority
                  sizes="(max-width: 500px) calc(100vw - 48px), 448px"
                  className="object-contain object-bottom"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
