import { Box, IconButton } from "@material-ui/core";
import React from "react";
import { TIMER_STATUSES } from "globalState/pomodoroState";
import { usePomodoroTimer } from "components/providers/PomodoroTimerProvider";

import StartIcon from "@material-ui/icons/PlayArrowRounded";
import PauseIcon from "@material-ui/icons/PauseRounded";
import ResetIcon from "@material-ui/icons/ReplayRounded";

export interface TimerControlsProps {
  status: TIMER_STATUSES;
}

export const TimerControls: React.FC<TimerControlsProps> = (props) => {
  const { status } = props;
  const {
    handleCycleStart,
    handleCyclePause,
    handleCycleRestart,
  } = usePomodoroTimer();
  return (
    <Box marginTop={1}>
      {status === TIMER_STATUSES.READY || status === TIMER_STATUSES.PAUSED ? (
        <IconButton onClick={handleCycleStart} color={"primary"}>
          <StartIcon />
        </IconButton>
      ) : null}
      {status === TIMER_STATUSES.RUNNING ? (
        <IconButton onClick={handleCyclePause} color={"primary"}>
          <PauseIcon />
        </IconButton>
      ) : null}
      {status === TIMER_STATUSES.PAUSED ||
      status === TIMER_STATUSES.COMPLETE ? (
        <IconButton onClick={handleCycleRestart} color={"primary"}>
          <ResetIcon />
        </IconButton>
      ) : null}
    </Box>
  );
};
