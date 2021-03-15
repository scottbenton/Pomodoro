import { Box } from "@material-ui/core";
import React, { useCallback } from "react";
import { DrawerToggle } from "./components/DrawerToggle/DrawerToggle";
import { PomodoroProgress } from "./components/Pomodoro/PomodoroProgress";
import { ThemeChange } from "./components/ThemeChange";
import { Timer } from "./components/Timer/Timer";
import { usePomodoro } from "./hooks/usePomodoro";
import ThemeIcon from "@material-ui/icons/FormatPaintRounded";
import SettingsIcon from "@material-ui/icons/SettingsRounded";
import { PomodoroSettings } from "./components/Pomodoro/PomodoroSettings";
import { useNotifications } from "./components/providers/NotificationProvider";
import { usePomodoroSettings } from "./globalState/globalPomodoroSettings";
import { useWakelock } from "hooks/useWakelock";

function App() {
    useWakelock();

    const { notify } = useNotifications();
    const pomodoroSettings = usePomodoroSettings();
    const { longBreaksEnabled, cyclesBeforeLongBreak } = pomodoroSettings.get();

    const { state, finishCycle } = usePomodoro();

    const handleCycleEnd = useCallback(() => {
        finishCycle();
        notify("Hello World", "Test Notification");
    }, [finishCycle, notify]);

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
                    pomodoroState={state}
                    timerFinishCallback={handleCycleEnd}
                />
                {longBreaksEnabled && (
                    <PomodoroProgress
                        currentSessionNumber={state.count}
                        sessionsBeforeLongBreak={cyclesBeforeLongBreak}
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
                    drawerContent={<PomodoroSettings />}
                />
            </Box>
        </Box>
    );
}

export default App;
