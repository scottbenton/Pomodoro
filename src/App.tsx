import { Box } from "@material-ui/core";
import React from "react";
import { PomodoroProgress } from "./components/Pomodoro/PomodoroProgress";
import { Timer } from "./components/Timer/Timer";
import { CYCLE_TYPES, usePomodoro } from "./hooks/usePomodoro";

function App() {
  const {
    cycleCount,
    currentCycleType,
    currentCycleLength,
    finishCycle,
  } = usePomodoro({
    workLengthInMinutes: 0.2,
    breakLengthInMinutes: 0.1,
    longBreakLengthInMinutes: 0.5,
    cyclesBeforeLongBreak: 4,
  });

  let title = "Work";
  if (currentCycleType === CYCLE_TYPES.LONG_BREAK) title = "Long Break";
  else if (currentCycleType === CYCLE_TYPES.BREAK) title = "Break";

  return (
    <Box
      display={"flex"}
      height={"100vh"}
      flexDirection={"column"}
      justifyContent={"center"}
    >
      <Timer
        timeInSeconds={currentCycleLength * 60}
        timerFinishCallback={finishCycle}
        title={title}
      />
      <PomodoroProgress
        currentSessionNumber={cycleCount}
        sessionsBeforeLongBreak={4}
      />
    </Box>
  );
}

export default App;
