import { createState, useState } from "@hookstate/core";
import { Persistence } from "@hookstate/persistence";

export enum CYCLES {
  WORK = "work",
  BREAK = "break",
  LONG_BREAK = "long-break",
}

export interface IPomodoroSettings {
  playAudioOnCycleEnd: boolean;
  keepScreenOnDuringCycles: boolean;
  autoStartCycles: boolean;
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
}

const pomodoroSettingsState = createState<IPomodoroSettings>({
  playAudioOnCycleEnd: true,
  keepScreenOnDuringCycles: false,
  autoStartCycles: true,
  [CYCLES.WORK]: {
    length: 25,
  },
  [CYCLES.BREAK]: {
    length: 5,
  },
  [CYCLES.LONG_BREAK]: {
    length: 15,
    enabled: true,
    cyclesBeforeLongBreak: 4,
  },
});

pomodoroSettingsState.attach(Persistence("pomodoro-settings-key-v2"));

export const usePomodoroSettingsState = () => useState(pomodoroSettingsState);
