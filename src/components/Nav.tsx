import { profile } from "../data/profile";

interface Props {
  onToggleTheme: () => void;
}

const links = [
  ["Experience", "#experience"],
  ["Projects", "#work"],
  ["Skills", "#skills"],
  ["Contact", "#contact"],
];

export function Nav({ onToggleTheme }: Props) {
  return (
    <nav className="sticky top-[env(safe-area-inset-top,0px)] z-10 border-b border-line bg-bg">
      <div className="mx-auto flex h-13 max-w-5xl items-center gap-5 overflow-x-auto px-6">
        <b className="mr-auto whitespace-nowrap font-display font-extrabold">{profile.name}</b>
        {links.map(([label, href]) => (
          <a key={href} href={href} className="whitespace-nowrap text-[15px] text-muted hover:text-ink">
            {label}
          </a>
        ))}
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label="Switch colour theme"
          className="cursor-pointer whitespace-nowrap text-[15px] text-muted hover:text-ink"
        >
          Theme
        </button>
      </div>
    </nav>
  );
}
