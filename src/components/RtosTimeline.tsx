import { useEffect, useRef } from "react";
import { LANES, Scheduler } from "../lib/scheduler";
import { useReducedMotion } from "../hooks/useReducedMotion";

const TICK_MS = 16;
const PX = 3;
const LABEL_W = 64;
const ALPHA = [1, 0.9, 0.7, 0.6, 0.5];

interface Props {
  scheduler: Scheduler;
  /** Increments whenever the scheduler changes while animation is off. */
  redrawKey: number;
}

export function RtosTimeline({ scheduler, redrawKey }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let W = 0;
    let H = 0;
    let raf = 0;
    let last = 0;
    let acc = 0;

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const beam = getComputedStyle(document.documentElement).getPropertyValue("--beam").trim().replace(/\s+/g, ",");
      const laneH = Math.min(38, H * 0.085);
      const gap = laneH * 1.35;
      const top = 28;
      const visible = Math.floor((W - LABEL_W) / PX);
      const hist = scheduler.history;

      ctx.clearRect(0, 0, W, H);
      ctx.font = '13px "IBM Plex Mono", monospace';
      ctx.textBaseline = "middle";

      LANES.forEach((name, i) => {
        const y = top + i * gap;
        ctx.fillStyle = `rgba(${beam},.6)`;
        ctx.fillText(name, 16, y + laneH / 2);
        ctx.fillStyle = `rgba(${beam},.07)`;
        ctx.fillRect(LABEL_W, y, W - LABEL_W, laneH);
      });

      for (let n = Math.max(0, hist.length - visible); n < hist.length; n++) {
        const lane = hist[n];
        if (lane < 0) continue;
        ctx.fillStyle = lane === 0 ? "#F2B134" : `rgba(${beam},${ALPHA[lane]})`;
        ctx.fillRect(W - (hist.length - n) * PX, top + lane * gap, PX, laneH);
      }

      ctx.fillStyle = `rgba(${beam},.6)`;
      ctx.textAlign = "right";
      ctx.fillText(
        `CPU ${Math.round(scheduler.load() * 100)}%   IRQs ${scheduler.irqCount}`,
        W - 16,
        top + LANES.length * gap + 4,
      );
      ctx.textAlign = "left";
    };

    const frame = (t: number) => {
      acc += Math.min(t - last, 100);
      last = t;
      while (acc >= TICK_MS) {
        const tick = scheduler.step();
        acc -= TICK_MS;
        if (tick % 320 === 200) scheduler.fire(); // periodic demo interrupt
      }
      draw();
      raf = requestAnimationFrame(frame);
    };

    resize();
    draw();
    const onResize = () => {
      resize();
      draw();
    };
    addEventListener("resize", onResize);
    if (!reduced) {
      raf = requestAnimationFrame((t) => {
        last = t;
        frame(t);
      });
    }
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", onResize);
    };
  }, [scheduler, reduced, redrawKey]);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 block h-full w-full" />;
}
