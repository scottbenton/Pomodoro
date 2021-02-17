import { useCallback, useReducer } from "react";

export interface pomodoroSettings {
  workLengthInMinutes: number;
  breakLengthInMinutes: number;
  longBreakLengthInMinutes: number;
  cyclesBeforeLongBreak: number;
}

export enum CYCLE_TYPES {
  WORK = "work",
  BREAK = "break",
  LONG_BREAK = "long break",
}

interface CycleState {
  currentCycleType: CYCLE_TYPES;
  currentCycleCount: number;
  currentCycleLength: number;
}

enum CYCLE_ACTIONS {
  NEXT_CYCLE,
}

export function usePomodoro(settings: pomodoroSettings) {
  const {
    workLengthInMinutes,
    breakLengthInMinutes,
    longBreakLengthInMinutes,
    cyclesBeforeLongBreak,
  } = settings;

  const reducer = (prevState: CycleState, action: CYCLE_ACTIONS) => {
    const { currentCycleCount, currentCycleType } = prevState;
    let newState = { ...prevState };

    switch (action) {
      case CYCLE_ACTIONS.NEXT_CYCLE:
        switch (currentCycleType) {
          case CYCLE_TYPES.WORK:
            const isLongBreakNext =
              currentCycleCount % cyclesBeforeLongBreak === 0;
            newState.currentCycleType = isLongBreakNext
              ? CYCLE_TYPES.LONG_BREAK
              : CYCLE_TYPES.BREAK;
            newState.currentCycleLength = isLongBreakNext
              ? longBreakLengthInMinutes
              : breakLengthInMinutes;
            break;
          case CYCLE_TYPES.LONG_BREAK:
          case CYCLE_TYPES.BREAK:
            newState.currentCycleCount = prevState.currentCycleCount + 1;
            newState.currentCycleType = CYCLE_TYPES.WORK;
            newState.currentCycleLength = workLengthInMinutes;
        }
        break;
    }

    return newState;
  };

  const [cycleState, dispatch] = useReducer(reducer, {
    currentCycleType: CYCLE_TYPES.WORK,
    currentCycleLength: workLengthInMinutes,
    currentCycleCount: 1,
  });

  const finishCycle = useCallback(() => {
    dispatch(CYCLE_ACTIONS.NEXT_CYCLE);
  }, []);

  return {
    finishCycle,
    cycleCount: cycleState.currentCycleCount,
    currentCycleLength: cycleState.currentCycleLength,
    currentCycleType: cycleState.currentCycleType,
  };
}
