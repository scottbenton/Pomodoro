import React, { useRef, useEffect } from "react";
import { PomodoroTimerContext } from "./PomodoroTimerContext";
import {
  usePomodoroSettingsState,
  CYCLES,
} from "globalState/globalPomodoroSettings";
import {
  usePomodoroState,
  TIMER_STATUSES,
  DEFAULT_POMODORO_STATE,
} from "globalState/pomodoroState";

export const PomodoroTimerProvider: React.FC = (props) => {
  const { children } = props;

  const timerInterval = useRef<NodeJS.Timeout>();

  const pomodoroSettings = usePomodoroSettingsState();
  const pomodoroState = usePomodoroState();

  const settings = pomodoroSettings.get();

  const audio = useRef(new Audio(process.env.PUBLIC_URL + "/notification.mp3"));
  const audioReady = useRef<boolean>(false);

  useEffect(() => {
    const playAudio = () => {
      audio.current.load();
      document.removeEventListener("click", playAudio);
      audioReady.current = true;
    };

    document.addEventListener("click", playAudio);
  }, []);

  const clearTimer = () => {
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
      timerInterval.current = undefined;
    }
  };

  const handleCycleStart = () => {
    clearTimer();

    pomodoroState.timer.set({
      status: TIMER_STATUSES.RUNNING,
      remainingTime:
        pomodoroState.timer.remainingTime.get() ??
        settings[pomodoroState.currentCycleType.get()].length * 1000 * 60,
      lastPolledTime: new Date().getTime(),
    });

    timerInterval.current = setInterval(() => {
      const currentTime = new Date().getTime();
      let timeDifference = 0;

      const lastPolledTime = pomodoroState.timer.lastPolledTime.get();
      if (lastPolledTime) {
        timeDifference = currentTime - lastPolledTime;
      }

      const remainingTime =
        (pomodoroState.timer.remainingTime.get() ?? 0) - timeDifference;

      if (remainingTime > 0) {
        pomodoroState.timer.set({
          status: TIMER_STATUSES.RUNNING,
          lastPolledTime: currentTime,
          remainingTime: remainingTime,
        });
      } else {
        pomodoroState.timer.set({
          status: TIMER_STATUSES.COMPLETE,
          remainingTime: 0,
        });
        handleCycleEnd();
      }
    }, 1000);
  };

  const handleCycleEnd = () => {
    clearTimer();
    const currentCycle = pomodoroState.currentCycleType.get();
    pomodoroState.batch((state) => {
      let nextCycle: CYCLES = CYCLES.WORK;
      switch (currentCycle) {
        case CYCLES.WORK:
          const newCycleCount = state.completedCycles.get() + 1;
          state.completedCycles.set(newCycleCount);

          if (
            settings[CYCLES.LONG_BREAK].enabled &&
            newCycleCount &&
            newCycleCount %
              settings[CYCLES.LONG_BREAK].cyclesBeforeLongBreak ===
              0
          ) {
            nextCycle = CYCLES.LONG_BREAK;
          } else {
            nextCycle = CYCLES.BREAK;
          }
          break;
        case CYCLES.BREAK:
          nextCycle = CYCLES.WORK;
          break;
        case CYCLES.LONG_BREAK:
          state.completedCycles.set(0);
          nextCycle = CYCLES.WORK;
          break;
      }
      state.currentCycleType.set(nextCycle);
      state.timer.remainingTime.set(settings[nextCycle].length * 1000 * 60);
      state.timer.lastPolledTime.set(undefined);
    }, "batch-context");

    if (settings.playAudioOnCycleEnd) {
      audio.current.play();
    }

    if (settings.autoStartCycles) {
      handleCycleStart();
    }
  };

  const handleCyclePause = () => {
    clearTimer();
    pomodoroState.timer.set({
      status: TIMER_STATUSES.PAUSED,
      remainingTime: pomodoroState.timer.remainingTime.get(),
    });
  };

  const handleCycleRestart = () => {
    pomodoroState.timer.set({
      status: TIMER_STATUSES.READY,
      remainingTime:
        settings[pomodoroState.currentCycleType.get()].length * 1000 * 60,
    });
  };

  const reset = () => {
    clearTimer();
    pomodoroState.set({ ...DEFAULT_POMODORO_STATE });
  };

  return (
    <PomodoroTimerContext.Provider
      value={{ handleCycleStart, handleCyclePause, handleCycleRestart, reset }}
    >
      {children}
    </PomodoroTimerContext.Provider>
  );
};
