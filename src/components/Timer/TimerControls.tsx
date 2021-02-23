import { Box, IconButton } from "@material-ui/core";
import React from "react";
import { TIMER_STATUSES } from "../../hooks/useTimer";

import StartIcon from "@material-ui/icons/PlayArrowRounded";
import PauseIcon from "@material-ui/icons/PauseRounded";
import ResetIcon from "@material-ui/icons/ReplayRounded";

export interface TimerControlsProps {
  start: () => void;
  pause: () => void;
  reset: () => void;
  status: TIMER_STATUSES;
}

export const TimerControls: React.FC<TimerControlsProps> = (props) => {
  const { start, pause, reset, status } = props;

  return (
    <Box marginTop={1}>
      {status === TIMER_STATUSES.READY || status === TIMER_STATUSES.PAUSED ? (
        <IconButton onClick={start} color={"primary"}>
          <StartIcon />
        </IconButton>
      ) : null}
      {status === TIMER_STATUSES.RUNNING ? (
        <IconButton onClick={pause} color={"primary"}>
          <PauseIcon />
        </IconButton>
      ) : null}
      {status === TIMER_STATUSES.PAUSED ||
      status === TIMER_STATUSES.COMPLETE ? (
        <IconButton onClick={reset} color={"primary"}>
          <ResetIcon />
        </IconButton>
      ) : null}
    </Box>
  );
};
