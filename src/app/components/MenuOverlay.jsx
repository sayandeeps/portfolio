import NavLink from "./NavLink";

export default function MenuOverlay({ links, onNavigate }) {
  return (
    <ul className="flex flex-col gap-4 px-6 py-5">
      {links.map((link) => (
        <li key={link.path}>
          <NavLink
            href={link.path}
            title={link.title}
            onClick={onNavigate}
          />
        </li>
      ))}
    </ul>
  );
}
