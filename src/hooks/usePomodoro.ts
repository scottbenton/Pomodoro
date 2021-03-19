import { useCallback, useEffect, useReducer } from "react";
import { usePomodoroSettings } from "../globalState/globalPomodoroSettings";

export enum CYCLE_TYPES {
    WORK = "work",
    BREAK = "break",
    LONG_BREAK = "long break",
}

export interface PomodoroCycleState {
    type: CYCLE_TYPES;
    count: number;
    length: number;
}

enum CYCLE_ACTIONS {
    NEXT_CYCLE,
    UPDATE_VALUES,
}

export function usePomodoro() {
    const pomodoroSettings = usePomodoroSettings();
    const settings = pomodoroSettings.get();
    const {
        workLengthInMinutes,
        breakLengthInMinutes,
        longBreakLengthInMinutes,
        cyclesBeforeLongBreak,
        longBreaksEnabled,
    } = settings;

    const reducer = (prevState: PomodoroCycleState, action: CYCLE_ACTIONS) => {
        const { type } = prevState;
        let newState = { ...prevState };

        switch (action) {
            case CYCLE_ACTIONS.NEXT_CYCLE:
                switch (type) {
                    case CYCLE_TYPES.WORK:
                        newState.count = prevState.count + 1;
                        const isLongBreakNext =
                            longBreaksEnabled &&
                            newState.count % cyclesBeforeLongBreak === 0;

                        console.debug(isLongBreakNext);

                        newState.type = isLongBreakNext
                            ? CYCLE_TYPES.LONG_BREAK
                            : CYCLE_TYPES.BREAK;
                        newState.length = isLongBreakNext
                            ? longBreakLengthInMinutes
                            : breakLengthInMinutes;
                        break;
                    case CYCLE_TYPES.LONG_BREAK:
                        newState.count = 0;
                        newState.type = CYCLE_TYPES.WORK;
                        newState.length = workLengthInMinutes;
                        break;
                    case CYCLE_TYPES.BREAK:
                        newState.type = CYCLE_TYPES.WORK;
                        newState.length = workLengthInMinutes;
                        break;
                }
                break;
            case CYCLE_ACTIONS.UPDATE_VALUES:
                switch (type) {
                    case CYCLE_TYPES.WORK:
                        newState.length = workLengthInMinutes;
                        break;
                    case CYCLE_TYPES.BREAK:
                        newState.length = breakLengthInMinutes;
                        break;
                    case CYCLE_TYPES.LONG_BREAK:
                        newState.length = longBreakLengthInMinutes;
                        break;
                }
        }

        return newState;
    };

    const [cycleState, dispatch] = useReducer(reducer, {
        type: CYCLE_TYPES.WORK,
        length: workLengthInMinutes,
        count: 0,
    });

    const finishCycle = useCallback(() => {
        dispatch(CYCLE_ACTIONS.NEXT_CYCLE);
    }, []);

    useEffect(() => {
        dispatch(CYCLE_ACTIONS.UPDATE_VALUES);
    }, [
        workLengthInMinutes,
        breakLengthInMinutes,
        longBreakLengthInMinutes,
        cyclesBeforeLongBreak,
        longBreaksEnabled,
    ]);

    return {
        finishCycle,
        state: cycleState,
    };
}
