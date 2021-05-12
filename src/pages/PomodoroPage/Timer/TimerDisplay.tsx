import { Box, CircularProgress, Typography } from "@material-ui/core";
import React from "react";
import { convertMillisecondsToFriendlyTime } from "../../../utils/timeUtils";
import { useStyles } from "./styles";
import { TimerControls } from "./TimerControls";
import { usePomodoroState } from "globalState/pomodoroState";
import { usePomodoroSettingsState } from "globalState/globalPomodoroSettings";

export interface TimerDisplayProps {}

export const TimerDisplay: React.FC<TimerDisplayProps> = (props) => {
  const settings = usePomodoroSettingsState().get();
  const pomodoroState = usePomodoroState().get();

  const classes = useStyles();

  const totalTime = settings[pomodoroState.currentCycleType].length * 1000 * 60;
  const remainingTime = pomodoroState.timer.remainingTime ?? totalTime;

  const { time, label } = convertMillisecondsToFriendlyTime(remainingTime);

  return (
    <Box position={"relative"} display={"flex"} justifyContent={"center"}>
      <CircularProgress
        variant={"determinate"}
        value={100}
        size={300}
        thickness={1.5}
        className={classes.progressBackground}
      />
      <CircularProgress
        variant={"determinate"}
        value={(remainingTime / totalTime) * 100}
        size={300}
        thickness={1.5}
        className={classes.progressForeground}
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
        <TimerControls status={pomodoroState.timer.status} />
      </Box>
    </Box>
  );
};
