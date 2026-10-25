import { useState } from "react";
import { profile } from "../data/profile";

export function Contact() {
  const [status, setStatus] = useState("");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setStatus("Email address copied.");
    } catch {
      setStatus("Copy failed. Select the address above and copy it.");
    }
  };
  const btn = "cursor-pointer rounded-md border border-ink bg-surface px-5 py-2.5 font-medium text-ink";
  return (
    <>
      <a
        href={`mailto:${profile.email}`}
        className="break-all font-display text-[clamp(22px,5vw,44px)] font-extrabold leading-[1.1] underline decoration-signal-bg decoration-4 underline-offset-[6px]"
      >
        {profile.email}
      </a>
      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" onClick={copy} className={`${btn} !border-signal-bg !bg-signal-bg !text-on-signal`}>
          Copy email address
        </button>
        <a href={profile.linkedin} target="_blank" rel="noopener" className={btn}>
          LinkedIn
        </a>
        {profile.github && (
          <a href={profile.github} target="_blank" rel="noopener" className={btn}>
            GitHub
          </a>
        )}
      </div>
      <p role="status" className="mt-3 min-h-[1.6em] text-muted">
        {status}
      </p>
    </>
  );
}
