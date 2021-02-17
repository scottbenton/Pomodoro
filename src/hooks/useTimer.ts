import { useCallback, useEffect, useRef, useState } from "react";

export enum TIMER_STATUSES {
  RUNNING,
  READY,
  PAUSED,
  COMPLETE,
}

interface TimerState {
  remainingTime: number;
  lastPolledTime?: number;
  status: TIMER_STATUSES;
}

function getInitialState(time: number) {
  const initialState: TimerState = {
    remainingTime: time,
    status: TIMER_STATUSES.READY,
  };
  return initialState;
}

export function useTimer(totalTimeInSeconds: number) {
  const totalTime = totalTimeInSeconds * 1000;
  const [timerState, setTimerState] = useState<TimerState>(
    getInitialState(totalTime)
  );
  const timerInterval = useRef<NodeJS.Timeout>();

  const stop = useCallback(() => {
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
      timerInterval.current = undefined;
      setTimerState((prevState) => ({
        status: TIMER_STATUSES.PAUSED,
        remainingTime: prevState.remainingTime,
      }));
    }
  }, [timerInterval]);

  const start = useCallback(() => {
    setTimerState((prevTimerState) => ({
      ...prevTimerState,
      status: TIMER_STATUSES.RUNNING,
      lastPolledTime: new Date().getTime(),
    }));

    if (timerInterval.current) return;

    timerInterval.current = setInterval(() => {
      setTimerState((prevTimerState) => {
        const currentTime = new Date().getTime();
        let timeDifference = 0;

        if (prevTimerState.lastPolledTime) {
          timeDifference = currentTime - prevTimerState.lastPolledTime;
        }
        const remainingTime = prevTimerState.remainingTime - timeDifference;

        if (remainingTime > 0) {
          return {
            status: TIMER_STATUSES.RUNNING,
            lastPolledTime: currentTime,
            remainingTime: remainingTime,
          };
        } else {
          stop();
          return {
            status: TIMER_STATUSES.COMPLETE,
            remainingTime: 0,
          };
        }
      });
    }, 1000);
  }, [stop]);

  const reset = useCallback(() => {
    setTimerState(getInitialState(totalTime));
  }, [totalTime]);

  useEffect(() => {
    reset();
  }, [reset]);

  return {
    start,
    stop,
    reset,
    remainingTime: timerState.remainingTime,
    status: timerState.status,
    totalTime,
  };
}
