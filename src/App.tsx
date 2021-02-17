import { Box } from "@material-ui/core";
import React, { useState } from "react";
import { DrawerToggle } from "./components/DrawerToggle/DrawerToggle";
import { PomodoroProgress } from "./components/Pomodoro/PomodoroProgress";
import { ThemeChange } from "./components/ThemeChange";
import { Timer } from "./components/Timer/Timer";
import {
  CYCLE_TYPES,
  usePomodoro,
  pomodoroSettings,
} from "./hooks/usePomodoro";
import ThemeIcon from "@material-ui/icons/FormatPaintRounded";
import SettingsIcon from "@material-ui/icons/SettingsRounded";
import { PomodoroSettings } from "./components/Pomodoro/PomodoroSettings";

function App() {
  const [pomSettings, setPomSettings] = useState<pomodoroSettings>({
    workLengthInMinutes: 25,
    breakLengthInMinutes: 5,
    longBreakLengthInMinutes: 15,
    cyclesBeforeLongBreak: 4,
    longBreaksEnabled: true,
  });

  const {
    cycleCount,
    currentCycleType,
    currentCycleLength,
    finishCycle,
  } = usePomodoro(pomSettings);

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
        {pomSettings.longBreaksEnabled && (
          <PomodoroProgress
            currentSessionNumber={cycleCount}
            sessionsBeforeLongBreak={pomSettings.cyclesBeforeLongBreak}
          />
        )}
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
          drawerContent={
            <PomodoroSettings
              pomodoroSettings={pomSettings}
              setPomodoroSettings={setPomSettings}
            />
          }
        />
      </Box>
    </Box>
  );
}

export default App;
