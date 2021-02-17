import { Box, CircularProgress, Typography } from "@material-ui/core";
import React from "react";
import { TIMER_STATUSES } from "../../hooks/useTimer";
import { convertMillisecondsToFriendlyTime } from "../../utils/timeUtils";
import { useStyles } from "./styles";
import { TimerControls } from "./TimerControls";

export interface TimerDisplayProps {
  totalTime: number;
  remainingTime: number;
  start: () => void;
  stop: () => void;
  reset: () => void;
  status: TIMER_STATUSES;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = (props) => {
  const { totalTime, remainingTime, ...controlsProps } = props;

  const classes = useStyles();

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
        <TimerControls {...controlsProps} />
      </Box>
    </Box>
  );
};
