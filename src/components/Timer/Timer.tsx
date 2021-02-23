import { Box, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { usePomodoroSettings } from "../../globalState/globalPomodoroSettings";
import { CYCLE_TYPES, PomodoroCycleState } from "../../hooks/usePomodoro";
import { TIMER_STATUSES, useTimer } from "../../hooks/useTimer";
import { TimerDisplay } from "./TimerDisplay";

const getTitleFromCycleType = (type: CYCLE_TYPES) => {
  switch (type) {
    case CYCLE_TYPES.BREAK:
      return "Break";
    case CYCLE_TYPES.LONG_BREAK:
      return "Long Break";
    case CYCLE_TYPES.WORK:
      return "Work";
    default:
      return "Unknown";
  }
};

export interface TimerProps {
  pomodoroState: PomodoroCycleState;
  timerFinishCallback?: () => void;
}

export const Timer: React.FC<TimerProps> = (props) => {
  const { pomodoroState, timerFinishCallback } = props;

  const { autoStartCycles } = usePomodoroSettings();

  const timerProps = useTimer(
    pomodoroState.length * 60,
    pomodoroState.type,
    autoStartCycles.get()
  );

  const { status } = timerProps;
  useEffect(() => {
    console.debug("Status:", status);
    if (timerFinishCallback && status === TIMER_STATUSES.COMPLETE) {
      timerFinishCallback();
    }
  }, [status, timerFinishCallback]);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      marginTop={2}
    >
      <Typography variant={"h4"} component={"h1"} gutterBottom>
        {getTitleFromCycleType(pomodoroState.type)}
      </Typography>
      <TimerDisplay {...timerProps} />
    </Box>
  );
};
