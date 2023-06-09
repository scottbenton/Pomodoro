import { PomodoroTimerContext } from "./PomodoroTimerContext";
import { useContext } from "react";

export function usePomodoroTimer() {
  return useContext(PomodoroTimerContext);
}
