import { Box } from "@material-ui/core";
import React from "react";
import { DrawerToggle } from "./components/DrawerToggle/DrawerToggle";
import { PomodoroProgress } from "./components/Pomodoro/PomodoroProgress";
import { ThemeChange } from "./components/ThemeChange";
import { Timer } from "./components/Timer/Timer";
import { CYCLE_TYPES, usePomodoro } from "./hooks/usePomodoro";
import ThemeIcon from "@material-ui/icons/FormatPaintRounded";
import SettingsIcon from "@material-ui/icons/SettingsRounded";
import { PomodoroSettings } from "./components/Pomodoro/PomodoroSettings";

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
    <Box display={"flex"} height={"100vh"} flexDirection={"column"}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        flexGrow={1}
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
      <Box p={4} display={"flex"} justifyContent={"space-between"}>
        <DrawerToggle
          title={"Change your Theme"}
          icon={<ThemeIcon />}
          drawerContent={<ThemeChange />}
        />
        <DrawerToggle
          title={"Pomodoro Settings"}
          icon={<SettingsIcon />}
          drawerContent={<PomodoroSettings />}
        />
      </Box>
    </Box>
  );
}

export default App;
