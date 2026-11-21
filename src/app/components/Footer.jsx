import Link from "next/link";
import { navLinks, profile } from "../data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-content flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="font-mono text-sm text-content">
            <span className="text-ember">{profile.initials}</span> ·{" "}
            {profile.name}
          </p>
          <p className="mt-1 text-sm text-content-faint">
            © {year} All rights reserved.
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                href={link.path}
                className="text-sm text-content-muted transition-colors hover:text-ember"
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
