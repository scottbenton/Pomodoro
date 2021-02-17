import React from "react";
import { useStyles } from "./styles";
import clsx from "clsx";

export interface PomodoroProgressProps {
  currentSessionNumber: number;
  sessionsBeforeLongBreak: number;
}

export const PomodoroProgress: React.FC<PomodoroProgressProps> = (props) => {
  const { currentSessionNumber, sessionsBeforeLongBreak } = props;

  const classes = useStyles();

  const array = Array.from(Array(sessionsBeforeLongBreak).keys());

  return (
    <div className={classes.container}>
      {array.map((val) => (
        <span
          className={clsx(
            classes.dot,
            val < ((currentSessionNumber - 1) % sessionsBeforeLongBreak) + 1
              ? classes.dotFilled
              : classes.dotUnfilled
          )}
        />
      ))}
    </div>
  );
};
