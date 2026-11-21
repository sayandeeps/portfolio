import Link from "next/link";

export default function NavLink({ href, title, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block text-sm text-content-muted transition-colors hover:text-ember"
    >
      {title}
    </Link>
  );
}
