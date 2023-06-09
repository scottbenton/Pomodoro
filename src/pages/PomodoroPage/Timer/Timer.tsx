import { Box, Typography } from "@mui/material";
import { TimerDisplay } from "./TimerDisplay";
import { usePomodoro } from "store/pomodoro.store";
import { CYCLES } from "store/pomodoro-settings.store";

const getTitleFromCycleType = (type: CYCLES) => {
  switch (type) {
    case CYCLES.BREAK:
      return "Break";
    case CYCLES.LONG_BREAK:
      return "Long Break";
    case CYCLES.WORK:
      return "Work";
    default:
      return "Unknown";
  }
};

export function Timer() {
  const currentCycleType = usePomodoro((store) => store.currentCycleType);
  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <Typography variant={"h4"} component={"h1"} gutterBottom>
        {getTitleFromCycleType(currentCycleType)}
      </Typography>
      <TimerDisplay />
    </Box>
  );
}
