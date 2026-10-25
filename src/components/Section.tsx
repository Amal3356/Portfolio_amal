import type { ReactNode } from "react";

interface Props {
  id: string;
  title: string;
  children: ReactNode;
}

export function Section({ id, title, children }: Props) {
  return (
    <section id={id} className="border-b border-line py-14 sm:py-[72px]">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="mb-7 text-[clamp(30px,5vw,44px)] font-extrabold tracking-tight">{title}</h2>
        {children}
      </div>
    </section>
  );
}
