import { Box, Typography, Button } from "@material-ui/core";
import React from "react";
import { CYCLES } from "globalState/globalPomodoroSettings";
import { usePomodoroState } from "globalState/pomodoroState";
import { TimerDisplay } from "./TimerDisplay";

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

export interface TimerProps {}

export const Timer: React.FC<TimerProps> = () => {
  const pomodoroState = usePomodoroState();
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      marginTop={2}
    >
      <Typography variant={"h4"} component={"h1"} gutterBottom>
        {getTitleFromCycleType(pomodoroState.currentCycleType.get())}
      </Typography>
      <TimerDisplay />
    </Box>
  );
};
