import { Box, CircularProgress, Typography } from "@mui/material";
import { convertMillisecondsToFriendlyTime } from "utils/timeUtils";
import { TimerControls } from "./TimerControls";
import { usePomodoro } from "store/pomodoro.store";
import { usePomodoroSettings } from "store/pomodoro-settings.store";

export function TimerDisplay() {
  const settings = usePomodoroSettings();
  const { remainingTimerTime, status, currentCycleType } = usePomodoro(
    (state) => ({
      remainingTimerTime: state.timer.remainingTime,
      status: state.timer.status,
      currentCycleType: state.currentCycleType,
    })
  );

  const totalTime = settings[currentCycleType].length * 1000 * 60;
  const remainingTime = remainingTimerTime ?? totalTime;

  const { time, label } = convertMillisecondsToFriendlyTime(remainingTime);

  return (
    <Box position={"relative"} display={"flex"} justifyContent={"center"}>
      <CircularProgress
        variant={"determinate"}
        value={100}
        size={300}
        thickness={1.5}
        sx={(theme) => ({
          color: theme.palette.grey[500],
          opacity: 0.25,
        })}
      />
      <CircularProgress
        variant={"determinate"}
        value={(remainingTime / totalTime) * 100}
        size={300}
        thickness={1.5}
        sx={{
          top: 0,
          position: "absolute",
        }}
      />
      <Box
        position={"absolute"}
        top={0}
        left={0}
        right={0}
        bottom={0}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        marginTop={1}
      >
        <Typography variant={"h2"}>{time}</Typography>
        <Typography
          variant={"body1"}
          color={"textSecondary"}
        >{`${label} remaining`}</Typography>
        <TimerControls status={status} />
      </Box>
    </Box>
  );
}
