import { produce } from "immer";
import { create } from "zustand";
import { CYCLES, usePomodoroSettings } from "./pomodoro-settings.store";

export enum TIMER_STATUSES {
  RUNNING = "running",
  READY = "ready",
  PAUSED = "paused",
  COMPLETE = "complete",
}

export interface IPomodoroStore {
  currentCycleType: CYCLES;
  completedCycles: number;
  timer: {
    status: TIMER_STATUSES;
    remainingTime?: number;
    lastPolledTime?: number;
  };

  handleCycleStart: () => void;
  tick: () => TIMER_STATUSES;
  handleCycleEnd: () => void;
  handleCyclePause: () => void;
  handleCycleRestart: () => void;

  handleReset: () => void;
}

export const usePomodoro = create<IPomodoroStore>()((set, getState) => ({
  currentCycleType: CYCLES.WORK,
  completedCycles: 0,
  timer: {
    status: TIMER_STATUSES.READY,
  },

  handleCycleStart: () =>
    set(
      produce((state: IPomodoroStore) => {
        state.timer.status = TIMER_STATUSES.RUNNING;
        state.timer.remainingTime =
          state.timer.remainingTime ??
          usePomodoroSettings.getState()[state.currentCycleType].length *
            1000 *
            60;
        state.timer.lastPolledTime = new Date().getTime();
      })
    ),

  tick: () => {
    const currentTime = new Date().getTime();
    let timeDifference = 0;

    const lastPolledTime = getState().timer.lastPolledTime;
    if (lastPolledTime) {
      timeDifference = currentTime - lastPolledTime;
    }

    const remainingTime =
      (getState().timer.remainingTime ?? 0) - timeDifference;

    if (remainingTime > 0) {
      set(
        produce((state: IPomodoroStore) => {
          state.timer.lastPolledTime = currentTime;
          state.timer.remainingTime = remainingTime;
        })
      );

      return TIMER_STATUSES.RUNNING;
    } else {
      set(
        produce((state: IPomodoroStore) => {
          state.timer.remainingTime = 0;
          state.timer.status = TIMER_STATUSES.COMPLETE;
        })
      );
      return TIMER_STATUSES.COMPLETE;
    }
  },
  handleCycleEnd: () =>
    set(
      produce((state: IPomodoroStore) => {
        const settings = usePomodoroSettings.getState();
        const currentCycle = state.currentCycleType;
        if (currentCycle === CYCLES.WORK) {
          state.completedCycles++;
          if (
            settings[CYCLES.LONG_BREAK].enabled &&
            state.completedCycles %
              settings[CYCLES.LONG_BREAK].cyclesBeforeLongBreak ===
              0
          ) {
            state.currentCycleType = CYCLES.LONG_BREAK;
          } else {
            state.currentCycleType = CYCLES.BREAK;
          }
        } else if (currentCycle === CYCLES.BREAK) {
          state.currentCycleType = CYCLES.WORK;
        } else if (currentCycle === CYCLES.LONG_BREAK) {
          state.completedCycles = 0;
          state.currentCycleType = CYCLES.WORK;
        }
        state.timer.remainingTime =
          settings[state.currentCycleType].length * 1000 * 60;
        state.timer.lastPolledTime = undefined;
      })
    ),
  handleCyclePause: () =>
    set(
      produce((state: IPomodoroStore) => {
        state.timer.status = TIMER_STATUSES.PAUSED;
        state.timer.lastPolledTime = undefined;
      })
    ),
  handleCycleRestart: () =>
    set(
      produce((state: IPomodoroStore) => {
        const settings = usePomodoroSettings.getState();
        state.timer.status = TIMER_STATUSES.READY;
        state.timer.lastPolledTime = undefined;
        state.timer.remainingTime =
          settings[state.currentCycleType].length * 1000 * 60;
      })
    ),

  handleReset: () =>
    set(
      produce((state: IPomodoroStore) => {
        (state.currentCycleType = CYCLES.WORK),
          (state.completedCycles = 0),
          (state.timer = {
            status: TIMER_STATUSES.READY,
          });
      })
    ),
}));
