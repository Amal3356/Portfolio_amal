import { useState, type PointerEvent } from "react";
import { Scheduler } from "../lib/scheduler";
import { profile } from "../data/profile";
import { RtosTimeline } from "./RtosTimeline";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function Hero() {
  const [scheduler] = useState(() => {
    const s = new Scheduler();
    s.warmUp();
    return s;
  });
  const [redrawKey, setRedrawKey] = useState(0);
  const reduced = useReducedMotion();

  const fire = () => {
    scheduler.fire();
    if (reduced) {
      for (let i = 0; i < 10; i++) scheduler.step();
      setRedrawKey((k) => k + 1);
    }
  };

  const onPointerDown = (e: PointerEvent) => {
    if (!(e.target as HTMLElement).closest("button")) fire();
  };

  return (
    <header
      onPointerDown={onPointerDown}
      className="relative h-[min(82vh,680px)] min-h-[560px] cursor-crosshair overflow-hidden border-b border-line sm:min-h-[520px]"
    >
      <RtosTimeline scheduler={scheduler} redrawKey={redrawKey} />
      <div className="pointer-events-none relative mx-auto flex h-full max-w-5xl flex-col justify-end px-6 pb-10">
        <h1 className="font-display text-[clamp(48px,10vw,116px)] font-black tracking-tight [font-stretch:112%]">
          {profile.name}
        </h1>
        <p className="mt-4 max-w-[34em] text-[clamp(17px,2.2vw,21px)]">{profile.headline}</p>
        <button
          type="button"
          onClick={fire}
          className="pointer-events-auto mt-5 w-fit cursor-pointer rounded-md bg-signal-bg px-5 py-2.5 font-medium text-on-signal"
        >
          Fire an interrupt
        </button>
        <small className="mt-3 text-sm text-muted">
          The timeline above is an illustrative RTOS scheduler. Click anywhere on it to raise an interrupt and watch it
          preempt the tasks.
        </small>
      </div>
    </header>
  );
}
