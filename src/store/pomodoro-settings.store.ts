import { produce } from "immer";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export enum CYCLES {
  WORK = "work",
  BREAK = "break",
  LONG_BREAK = "long-break",
}

export interface IPomodoroSettingsStore {
  playAudioOnCycleEnd: boolean;
  togglePlayAudioOnCycleEnd: (shouldPlayAudio: boolean) => void;

  keepScreenOnDuringCycles: boolean;
  toggleKeepScreenOnDuringCycles: (shouldKeepScreenOn: boolean) => void;

  autoStartCycles: boolean;
  toggleAutoStartCycles: (autoStartCycles: boolean) => void;

  [CYCLES.WORK]: {
    length: number;
  };
  [CYCLES.BREAK]: {
    length: number;
  };
  [CYCLES.LONG_BREAK]: {
    enabled: boolean;
    length: number;
    cyclesBeforeLongBreak: number;
  };

  setCycleLength: (cycle: CYCLES, length: number) => void;
  setLongBreakEnabled: (enabled: boolean) => void;
  setCyclesBeforeLongBreak: (cyclesBeforeLongBreak: number) => void;
}

export const usePomodoroSettings = create<IPomodoroSettingsStore>()(
  persist(
    (set) => ({
      playAudioOnCycleEnd: true,
      togglePlayAudioOnCycleEnd: (shouldPlayAudio) =>
        set(
          produce((state: IPomodoroSettingsStore) => {
            state.playAudioOnCycleEnd = shouldPlayAudio;
          })
        ),

      keepScreenOnDuringCycles: false,
      toggleKeepScreenOnDuringCycles: (keepScreenOnDuringCycles) =>
        set(
          produce((state: IPomodoroSettingsStore) => {
            state.keepScreenOnDuringCycles = keepScreenOnDuringCycles;
          })
        ),

      autoStartCycles: true,
      toggleAutoStartCycles: (autoStartCycles) =>
        set(
          produce((state: IPomodoroSettingsStore) => {
            state.autoStartCycles = autoStartCycles;
          })
        ),

      [CYCLES.WORK]: {
        length: 25,
      },
      [CYCLES.BREAK]: {
        length: 5,
      },
      [CYCLES.LONG_BREAK]: {
        enabled: true,
        length: 15,
        cyclesBeforeLongBreak: 4,
      },

      setCycleLength: (cycle, length) =>
        set(
          produce((state: IPomodoroSettingsStore) => {
            state[cycle].length = length;
          })
        ),
      setLongBreakEnabled: (enabled) =>
        set(
          produce((state: IPomodoroSettingsStore) => {
            state[CYCLES.LONG_BREAK].enabled = enabled;
          })
        ),
      setCyclesBeforeLongBreak: (cyclesBeforeLongBreak) =>
        set(
          produce((state: IPomodoroSettingsStore) => {
            state[CYCLES.LONG_BREAK].cyclesBeforeLongBreak =
              cyclesBeforeLongBreak;
          })
        ),
    }),
    {
      name: "pomodoro-timer-settings",
    }
  )
);
