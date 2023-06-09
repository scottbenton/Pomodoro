import { Box, Button } from "@mui/material";
import { PomodoroProgress } from "./PomodoroProgress";
import { Timer } from "pages/PomodoroPage/Timer/Timer";
import { usePomodoroTimer } from "providers/PomodoroTimerProvider";
import { CYCLES, usePomodoroSettings } from "store/pomodoro-settings.store";
import { usePomodoro } from "store/pomodoro.store";

export function PomodoroPage() {
  const { longBreakEnabled, cyclesBeforeLongBreak } = usePomodoroSettings(
    (store) => ({
      longBreakEnabled: store[CYCLES.LONG_BREAK].enabled,
      cyclesBeforeLongBreak: store[CYCLES.LONG_BREAK].cyclesBeforeLongBreak,
    })
  );
  const completedCycles = usePomodoro((store) => store.completedCycles);
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
      {longBreakEnabled && (
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
}
