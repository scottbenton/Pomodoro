import { useCallback, useEffect, useRef, useState } from "react";

export enum TIMER_STATUSES {
    RUNNING = "Running",
    READY = "Ready",
    PAUSED = "Paused",
    COMPLETE = "Complete",
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

export function useTimer(
    totalTimeInSeconds: number,
    resetKey: any,
    autoStart: boolean
) {
    const totalTime = totalTimeInSeconds * 1000;
    const [timerState, setTimerState] = useState<TimerState>(
        getInitialState(totalTime)
    );
    const timerInterval = useRef<NodeJS.Timeout>();

    const prevResetKey = useRef<any>(resetKey);

    const stopTimer = useCallback(() => {
        if (timerInterval.current) {
            clearInterval(timerInterval.current);
            timerInterval.current = undefined;
        }
    }, [timerInterval]);

    const pause = useCallback(() => {
        stopTimer();
        setTimerState((prevState) => ({
            ...prevState,
            lastPolledTime: undefined,
            status: TIMER_STATUSES.PAUSED,
        }));
    }, [stopTimer]);

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
                    timeDifference =
                        currentTime - prevTimerState.lastPolledTime;
                }
                const remainingTime =
                    prevTimerState.remainingTime - timeDifference;

                if (remainingTime > 0) {
                    return {
                        status: TIMER_STATUSES.RUNNING,
                        lastPolledTime: currentTime,
                        remainingTime: remainingTime,
                    };
                } else {
                    stopTimer();
                    return {
                        status: TIMER_STATUSES.COMPLETE,
                        remainingTime: 0,
                    };
                }
            });
        }, 1000);
    }, [stopTimer]);

    const reset = useCallback(() => {
        setTimerState(getInitialState(totalTime));
        if (autoStart) {
            start();
        }
    }, [totalTime, start, autoStart]);

    useEffect(() => {
        if (prevResetKey.current && prevResetKey.current !== resetKey) {
            reset();
        }
        prevResetKey.current = resetKey;
    }, [reset, resetKey]);

    return {
        start,
        pause,
        reset,
        remainingTime: timerState.remainingTime,
        status: timerState.status,
        totalTime,
    };
}
