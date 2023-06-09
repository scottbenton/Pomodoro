import CheckedIcon from "@mui/icons-material/CheckCircleRounded";
import UnCheckedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import { Box, Typography } from "@mui/material";

export interface PomodoroProgressProps {
  currentSessionNumber: number;
  sessionsBeforeLongBreak: number;
}

export function PomodoroProgress(props: PomodoroProgressProps) {
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
}
