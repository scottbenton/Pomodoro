import { Box } from "@material-ui/core";
import React, { useCallback } from "react";
import { PomodoroProgress } from "./PomodoroProgress";
import { Timer } from "components/Timer/Timer";
import { usePomodoro } from "hooks/usePomodoro";
import { useNotifications } from "components/providers/NotificationProvider";
import { usePomodoroSettings } from "globalState/globalPomodoroSettings";
import { PageProps } from "../routes";

export const PomodoroPage: React.FC<PageProps> = (props) => {
  const { notify } = useNotifications();
  const pomodoroSettings = usePomodoroSettings();
  const { longBreaksEnabled, cyclesBeforeLongBreak } = pomodoroSettings.get();

  const { state, finishCycle } = usePomodoro();

  const handleCycleEnd = useCallback(() => {
    notify("Cycle Completed", "Pomodoro Cycle is Complete");

    finishCycle();
  }, [finishCycle, notify]);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      flexGrow={1}
    >
      <Timer pomodoroState={state} timerFinishCallback={handleCycleEnd} />
      {longBreaksEnabled && (
        <PomodoroProgress
          currentSessionNumber={state.count}
          sessionsBeforeLongBreak={cyclesBeforeLongBreak}
        />
      )}
    </Box>
  );
};
