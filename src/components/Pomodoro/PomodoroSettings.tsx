import React from "react";
import { Grid, InputAdornment, TextField, Typography } from "@material-ui/core";
import { SettingsSwitch } from "./SettingsSwitch";
import { useNotifications } from "../providers/NotificationProvider";
import { usePomodoroSettings } from "../../globalState/globalPomodoroSettings";
import { useNotificationSettings } from "../../globalState/globalNotificationState";
import { useWakelockSettings } from "globalState/globalWakelockState";

export interface PomodoroSettingsProps {}

export const PomodoroSettings: React.FC<PomodoroSettingsProps> = (props) => {
    const {
        workLengthInMinutes,
        breakLengthInMinutes,
        longBreakLengthInMinutes,
        cyclesBeforeLongBreak,
        longBreaksEnabled,
        autoStartCycles,
    } = usePomodoroSettings();

    const { requestNotificationPermission } = useNotifications();

    const {
        audioEnabled,
        notificationsSupported,
        notificationsEnabled,
        notificationDecisionMade,
    } = useNotificationSettings();

    const { wakelocksSupported, wakelocksEnabled } = useWakelockSettings();

    const handleNotificationToggle = (checked: boolean) => {
        if (notificationDecisionMade || !checked) {
            notificationsEnabled.set(checked);
        } else if (checked && !notificationDecisionMade) {
            requestNotificationPermission();
        }
    };

    const parsePositiveInteger = (rawString: string) => {
        const intVal = parseInt(rawString);
        if (intVal < 0 || isNaN(intVal)) {
            return 0;
        } else {
            return intVal;
        }
    };

    return (
        <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant={"h6"}>General Settings</Typography>
                    </Grid>
                    {notificationsSupported.get() &&
                        !notificationsEnabled.get() &&
                        notificationDecisionMade.get() && (
                            <Grid item xs={12}>
                                <SettingsSwitch
                                    label={"Push Notifications Enabled"}
                                    checked={notificationsEnabled.get()}
                                    handleToggle={handleNotificationToggle}
                                />
                            </Grid>
                        )}
                    <Grid item xs={12}>
                        <SettingsSwitch
                            label={"Audio Reminder Enabled"}
                            checked={audioEnabled.get()}
                            handleToggle={(checked) =>
                                audioEnabled.set(checked)
                            }
                        />
                    </Grid>
                    {wakelocksSupported.get() && (
                        <Grid item xs={12}>
                            <SettingsSwitch
                                label={"Keep Screen On"}
                                checked={wakelocksEnabled.get()}
                                handleToggle={wakelocksEnabled.set}
                            />
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <SettingsSwitch
                            label={"Auto-Start Cycles"}
                            checked={autoStartCycles.get()}
                            handleToggle={(checked) =>
                                autoStartCycles.set(checked)
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <SettingsSwitch
                            label={"Long Breaks"}
                            checked={longBreaksEnabled.get()}
                            handleToggle={(checked) =>
                                longBreaksEnabled.set(checked)
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label={"Cycles Until Long Break"}
                            type={"tel"}
                            fullWidth
                            variant={"filled"}
                            value={cyclesBeforeLongBreak.get()}
                            onChange={(evt) =>
                                cyclesBeforeLongBreak.set(
                                    parsePositiveInteger(evt.target.value)
                                )
                            }
                            disabled={!longBreaksEnabled.get()}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant={"h6"}>Cycle Lengths</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label={"Work Length"}
                            type={"tel"}
                            value={workLengthInMinutes.get()}
                            onChange={(evt) =>
                                workLengthInMinutes.set(
                                    parsePositiveInteger(evt.target.value)
                                )
                            }
                            fullWidth
                            variant={"filled"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position={"end"}>
                                        min.
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label={"Break Length"}
                            type={"tel"}
                            value={breakLengthInMinutes.get()}
                            onChange={(evt) =>
                                breakLengthInMinutes.set(
                                    parsePositiveInteger(evt.target.value)
                                )
                            }
                            fullWidth
                            variant={"filled"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position={"end"}>
                                        min.
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            disabled={!longBreaksEnabled.get()}
                            label={"Long Break Length"}
                            fullWidth
                            type={"tel"}
                            value={longBreakLengthInMinutes.get()}
                            onChange={(evt) =>
                                longBreakLengthInMinutes.set(
                                    parsePositiveInteger(evt.target.value)
                                )
                            }
                            variant={"filled"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position={"end"}>
                                        min.
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
