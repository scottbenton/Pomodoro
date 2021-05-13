import { Box, Button } from "@material-ui/core";
import React from "react";
import { PomodoroProgress } from "./PomodoroProgress";
import { Timer } from "pages/PomodoroPage/Timer/Timer";
import { usePomodoroState } from "globalState/pomodoroState";
import {
  usePomodoroSettingsState,
  CYCLES,
} from "globalState/globalPomodoroSettings";
import { usePomodoroTimer } from "components/providers/PomodoroTimerProvider";

import { PageProps } from "../routes";

export const PomodoroPage: React.FC<PageProps> = (props) => {
  const settings = usePomodoroSettingsState().get();
  const { completedCycles } = usePomodoroState().get();

  const { enabled, cyclesBeforeLongBreak } = settings[CYCLES.LONG_BREAK];

  const { reset } = usePomodoroTimer();

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      flexGrow={1}
    >
      <Timer />
      {enabled && (
        <PomodoroProgress
          currentSessionNumber={completedCycles}
          sessionsBeforeLongBreak={cyclesBeforeLongBreak}
        />
      )}
      <Button color={"primary"} onClick={() => reset()}>
        Reset Timer
      </Button>
    </Box>
  );
};
