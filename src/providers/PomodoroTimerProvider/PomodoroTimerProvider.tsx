import { useRef, useEffect, PropsWithChildren } from "react";
import { PomodoroTimerContext } from "./PomodoroTimerContext";
import { usePomodoroSettings } from "store/pomodoro-settings.store";
import { TIMER_STATUSES, usePomodoro } from "store/pomodoro.store";

export function PomodoroTimerProvider(props: PropsWithChildren) {
  const { children } = props;

  const timerInterval = useRef<NodeJS.Timer>();

  const settings = usePomodoroSettings();
  const pomodoro = usePomodoro();

  const audio = useRef(
    new Audio(import.meta.env.BASE_URL + "notification.mp3")
  );
  console.debug(import.meta.env.BASE_URL + "notification.mp3");
  const audioReady = useRef<boolean>(false);

  useEffect(() => {
    const loadAudio = () => {
      console.debug("LOADING AUDIO");
      audio.current.load();
      document.removeEventListener("click", loadAudio);
      audioReady.current = true;
    };

    document.addEventListener("click", loadAudio);
  }, []);

  const clearTimer = () => {
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
      timerInterval.current = undefined;
    }
  };

  const handleCycleStart = () => {
    clearTimer();

    pomodoro.handleCycleStart();

    timerInterval.current = setInterval(() => {
      const result = pomodoro.tick();
      if (result === TIMER_STATUSES.COMPLETE) {
        handleCycleEnd();
      }
    }, 1000);
  };

  const handleCycleEnd = () => {
    clearTimer();

    pomodoro.handleCycleEnd();

    if (settings.playAudioOnCycleEnd) {
      audio.current.play();
    }

    if (settings.autoStartCycles) {
      handleCycleStart();
    }
  };

  const handleCyclePause = () => {
    clearTimer();
    pomodoro.handleCyclePause();
  };

  const handleCycleRestart = () => {
    pomodoro.handleCycleRestart();
  };

  const reset = () => {
    clearTimer();
    pomodoro.handleReset();
  };

  return (
    <PomodoroTimerContext.Provider
      value={{ handleCycleStart, handleCyclePause, handleCycleRestart, reset }}
    >
      {children}
    </PomodoroTimerContext.Provider>
  );
}
