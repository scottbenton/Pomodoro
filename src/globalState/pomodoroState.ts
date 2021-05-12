import { createState, useState } from "@hookstate/core";
import { CYCLES } from "./globalPomodoroSettings";

export enum TIMER_STATUSES {
  RUNNING = "running",
  READY = "ready",
  PAUSED = "paused",
  COMPLETE = "complete",
}

export interface IPomodoroState {
  currentCycleType: CYCLES;
  completedCycles: number;
  timer: {
    status: TIMER_STATUSES;
    remainingTime?: number;
    lastPolledTime?: number;
  };
}

export const DEFAULT_POMODORO_STATE: IPomodoroState = {
  currentCycleType: CYCLES.WORK,
  completedCycles: 0,
  timer: {
    status: TIMER_STATUSES.READY,
  },
};

const pomodoroState = createState<IPomodoroState>({
  ...DEFAULT_POMODORO_STATE,
});

export const usePomodoroState = () => useState(pomodoroState);
