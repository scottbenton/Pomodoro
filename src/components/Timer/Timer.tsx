import { Box, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { TIMER_STATUSES, useTimer } from "../../hooks/useTimer";
import { TimerControls } from "./TimerControls";
import { TimerDisplay } from "./TimerDisplay";

export interface TimerProps {
  timeInSeconds: number;
  timerFinishCallback?: () => void;
  title?: string;
}

export const Timer: React.FC<TimerProps> = (props) => {
  const { timeInSeconds, timerFinishCallback, title } = props;

  const timerProps = useTimer(timeInSeconds);

  const { status } = timerProps;
  useEffect(() => {
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
      {title && (
        <Typography variant={"h4"} component={"h1"} gutterBottom>
          {title}
        </Typography>
      )}
      <TimerDisplay {...timerProps} />
      {/* <TimerControls start={start} stop={stop} reset={reset} status={status} /> */}
    </Box>
  );
};
