import { createContext } from "react";

interface IPomodoroTimerContext {
  handleCycleStart: () => void;
  handleCyclePause: () => void;
  handleCycleRestart: () => void;
  reset: () => void;
}

export const PomodoroTimerContext = createContext<IPomodoroTimerContext>({
  handleCycleStart: () => {},
  handleCyclePause: () => {},
  handleCycleRestart: () => {},
  reset: () => {},
});
