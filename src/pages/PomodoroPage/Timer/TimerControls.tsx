import { Box, IconButton } from "@mui/material";
import StartIcon from "@mui/icons-material/PlayArrowRounded";
import PauseIcon from "@mui/icons-material/PauseRounded";
import ResetIcon from "@mui/icons-material/ReplayRounded";
import { TIMER_STATUSES } from "store/pomodoro.store";
import { usePomodoroTimer } from "providers/PomodoroTimerProvider";

export interface TimerControlsProps {
  status: TIMER_STATUSES;
}

export function TimerControls(props: TimerControlsProps) {
  const { status } = props;
  const { handleCycleStart, handleCyclePause, handleCycleRestart } =
    usePomodoroTimer();

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
}
