import React from "react";
import CheckedIcon from "@material-ui/icons/CheckCircle";
import UnCheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { Box, Typography } from "@material-ui/core";

export interface PomodoroProgressProps {
  currentSessionNumber: number;
  sessionsBeforeLongBreak: number;
}

export const PomodoroProgress: React.FC<PomodoroProgressProps> = (props) => {
  const { currentSessionNumber, sessionsBeforeLongBreak } = props;

  const array = Array.from(Array(sessionsBeforeLongBreak).keys());

  return (
    <Box padding={2}>
      <Typography variant={"overline"} color={"textSecondary"}>
        Cycles until Long Break
      </Typography>
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        {array.map((val, index) =>
          val < ((currentSessionNumber - 1) % sessionsBeforeLongBreak) + 1 ? (
            <CheckedIcon color={"primary"} key={index} />
          ) : (
            <UnCheckedIcon color={"disabled"} key={index} />
          )
        )}
      </Box>
    </Box>
  );
};
