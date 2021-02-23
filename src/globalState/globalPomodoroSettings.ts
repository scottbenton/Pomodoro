import { createState, useState } from "@hookstate/core";
import { Persistence } from "@hookstate/persistence";

export interface IPomodoroSettings {
  workLengthInMinutes: number;
  breakLengthInMinutes: number;
  longBreakLengthInMinutes: number;
  cyclesBeforeLongBreak: number;
  longBreaksEnabled: boolean;
  autoStartCycles: boolean;
}

const pomodoroSettingsState = createState<IPomodoroSettings>({
  workLengthInMinutes: 25,
  breakLengthInMinutes: 5,
  longBreakLengthInMinutes: 15,
  cyclesBeforeLongBreak: 4,
  longBreaksEnabled: true,
  autoStartCycles: true,
});

pomodoroSettingsState.attach(Persistence("pomodoro-settings-key"));

export const usePomodoroSettings = () => useState(pomodoroSettingsState);
