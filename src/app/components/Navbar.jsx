"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavLink from "./NavLink";
import MenuOverlay from "./MenuOverlay";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { navLinks, profile } from "../data/portfolio";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/80 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-content items-center justify-between px-6 py-4 sm:px-8"
      >
        <Link
          href="/"
          className="font-mono text-lg font-semibold tracking-tight text-content"
          aria-label={`${profile.name} — home`}
        >
          <span className="text-ember">{profile.initials}</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink href={link.path} title={link.title} />
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="icon-btn md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Bars3Icon className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-ink md:hidden">
          <MenuOverlay links={navLinks} onNavigate={() => setOpen(false)} />
        </div>
      )}
    </header>
  );
}
