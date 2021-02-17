import { useCallback, useEffect, useReducer } from "react";

export interface pomodoroSettings {
  workLengthInMinutes: number;
  breakLengthInMinutes: number;
  longBreakLengthInMinutes: number;
  cyclesBeforeLongBreak: number;
  longBreaksEnabled: boolean;
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
  UPDATE_VALUES,
}

export function usePomodoro(settings: pomodoroSettings) {
  const {
    workLengthInMinutes,
    breakLengthInMinutes,
    longBreakLengthInMinutes,
    cyclesBeforeLongBreak,
    longBreaksEnabled,
  } = settings;

  const reducer = (prevState: CycleState, action: CYCLE_ACTIONS) => {
    const { currentCycleCount, currentCycleType } = prevState;
    let newState = { ...prevState };

    switch (action) {
      case CYCLE_ACTIONS.NEXT_CYCLE:
        switch (currentCycleType) {
          case CYCLE_TYPES.WORK:
            const isLongBreakNext =
              longBreaksEnabled &&
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
      case CYCLE_ACTIONS.UPDATE_VALUES:
        switch (currentCycleType) {
          case CYCLE_TYPES.WORK:
            newState.currentCycleLength = workLengthInMinutes;
            break;
          case CYCLE_TYPES.BREAK:
            newState.currentCycleLength = breakLengthInMinutes;
            break;
          case CYCLE_TYPES.LONG_BREAK:
            newState.currentCycleLength = longBreakLengthInMinutes;
            break;
        }
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

  useEffect(() => {
    dispatch(CYCLE_ACTIONS.UPDATE_VALUES);
  }, [settings]);

  return {
    finishCycle,
    cycleCount: cycleState.currentCycleCount,
    currentCycleLength: cycleState.currentCycleLength,
    currentCycleType: cycleState.currentCycleType,
  };
}
