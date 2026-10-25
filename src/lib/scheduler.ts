/**
 * Illustrative fixed-priority preemptive scheduler used by the hero animation.
 * Lane 0 is an interrupt (highest priority); lanes 1-4 are periodic tasks.
 * The task set is made up for the visual and does not describe real projects.
 */
export const LANES = ["IRQ", "Control", "Sensor", "CAN tx", "Logger"] as const;
const PERIOD = [0, 20, 30, 50, 90];
const EXEC = [0, 4, 6, 8, 14];
const ISR_TICKS = 6;
const MAX_HISTORY = 1400;

export class Scheduler {
  history: number[] = []; // running lane per tick, -1 when idle
  irqCount = 0;
  private remaining = [0, 0, 0, 0, 0];
  private pendingIrq = 0;
  private tick = 0;

  step() {
    for (let i = 1; i < LANES.length; i++) {
      if (this.tick % PERIOD[i] === 0) this.remaining[i] += EXEC[i];
    }
    let running = -1;
    if (this.pendingIrq > 0) {
      this.pendingIrq--;
      running = 0;
    } else {
      for (let i = 1; i < LANES.length; i++) {
        if (this.remaining[i] > 0) {
          this.remaining[i]--;
          running = i;
          break;
        }
      }
    }
    this.history.push(running);
    if (this.history.length > MAX_HISTORY) this.history.shift();
    this.tick++;
    return this.tick;
  }

  fire() {
    this.pendingIrq += ISR_TICKS;
    this.irqCount++;
  }

  /** Share of non-idle ticks in the last `window` ticks, 0-1. */
  load(window = 200) {
    const slice = this.history.slice(-window);
    if (!slice.length) return 0;
    return slice.filter((r) => r >= 0).length / slice.length;
  }

  warmUp(ticks = 500) {
    for (let k = 0; k < ticks; k++) {
      this.step();
      if (k === 150 || k === 330) this.fire();
    }
  }
}
