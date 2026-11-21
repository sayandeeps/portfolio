"use client";
import { useState } from "react";
import Image from "next/image";
import SectionHeading from "./SectionHeading";
import { profile, socials } from "../data/portfolio";

const fieldClass =
  "w-full rounded-lg border border-line bg-surface2 px-4 py-3 text-sm text-content placeholder:text-content-faint transition-colors focus:border-ember focus:outline-none";

export default function EmailSection() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const payload = {
      email: form.email.value,
      subject: form.subject.value,
      message: form.message.value,
    };

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Request failed");
      form.reset();
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-20">
      <SectionHeading title="Let's connect" />
      <div className="mt-10 grid gap-12 lg:grid-cols-2">
        <div>
          <p className="max-w-md leading-relaxed text-content-muted">
            {profile.connectBlurb}
          </p>
          <p className="mt-6 font-mono text-sm">
            <a
              href={`mailto:${profile.email}`}
              className="text-ember transition-colors hover:text-ember-soft"
            >
              {profile.email}
            </a>
          </p>
          <div className="mt-6 flex gap-3">
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-content-muted"
            >
              Your email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className={fieldClass}
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-content-muted"
            >
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              placeholder="Just saying hi"
              className={fieldClass}
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-content-muted"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              placeholder="Let's talk about…"
              className={fieldClass}
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-primary justify-center disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </button>

          <p role="status" aria-live="polite" className="min-h-[1.25rem] text-sm">
            {status === "success" && (
              <span className="text-ember">
                Thanks, your message is on its way.
              </span>
            )}
            {status === "error" && (
              <span className="text-red-400">
                Something went wrong. Email me directly at {profile.email}.
              </span>
            )}
          </p>
        </form>
      </div>
    </section>
  );
}
