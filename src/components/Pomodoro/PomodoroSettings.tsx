import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { pomodoroSettings } from "../../hooks/usePomodoro";
import { SettingsSwitch } from "./SettingsSwitch";
import { useNotifications } from "../providers/NotificationProvider";

export interface PomodoroSettingsProps {
  pomodoroSettings: pomodoroSettings;
  setPomodoroSettings: Dispatch<SetStateAction<pomodoroSettings>>;
}

export const PomodoroSettings: React.FC<PomodoroSettingsProps> = (props) => {
  const { pomodoroSettings, setPomodoroSettings } = props;

  const {
    requestNotificationPermission,
    areNotificationsSupported,
    toggleAudioEnabled,
    audioEnabled,
  } = useNotifications();
  /**
   * Settings to change
   *
   * Work Length In Minutes
   * Break Length In Minutes
   * Long Break Length In Minutes
   *
   * Cycles per Long Break
   *
   * Eventual Settings
   * - notifications
   * - sound
   */

  const handleLongBreakSwitch = (checked: boolean) => {
    setPomodoroSettings((prevSettings) => {
      let newSettings = { ...prevSettings };
      newSettings.longBreaksEnabled = checked;
      return newSettings;
    });
  };
  const handleCyclesBeforeLongBreak = (evt: ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseInt(evt.target.value);
    setPomodoroSettings((prevSettings) => {
      let newSettings = { ...prevSettings };
      newSettings.cyclesBeforeLongBreak = isNaN(parsedValue) ? 0 : parsedValue;
      return newSettings;
    });
  };

  const parseTimeInMinutes = (rawTime: string) => {
    const time = parseInt(rawTime);
    if (time < 0 || isNaN(time)) {
      return 0;
    } else {
      return time;
    }
  };

  const handleWorkTimeChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPomodoroSettings((prevSettings) => {
      let newSettings = { ...prevSettings };
      newSettings.workLengthInMinutes = parseTimeInMinutes(evt.target.value);
      return newSettings;
    });
  };
  const handleBreakTimeChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPomodoroSettings((prevSettings) => {
      let newSettings = { ...prevSettings };
      newSettings.breakLengthInMinutes = parseTimeInMinutes(evt.target.value);
      return newSettings;
    });
  };

  const handleLongBreakTimeChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPomodoroSettings((prevSettings) => {
      let newSettings = { ...prevSettings };
      newSettings.longBreakLengthInMinutes = parseTimeInMinutes(
        evt.target.value
      );
      return newSettings;
    });
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={6}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant={"h6"}>General Settings</Typography>
          </Grid>
          {areNotificationsSupported &&
            window.Notification.permission === "default" && (
              <Grid item xs={12}>
                <Button
                  color={"primary"}
                  variant={"contained"}
                  onClick={requestNotificationPermission}
                >
                  Enable Push Notifications
                </Button>
              </Grid>
            )}
          <Grid item xs={12}>
            <SettingsSwitch
              label={"Audio Reminder Enabled"}
              checked={audioEnabled}
              handleToggle={toggleAudioEnabled}
            />
          </Grid>
          <Grid item xs={12}>
            <SettingsSwitch
              label={"Long Breaks"}
              checked={pomodoroSettings.longBreaksEnabled}
              handleToggle={handleLongBreakSwitch}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={"Cycles Until Long Break"}
              type={"tel"}
              fullWidth
              variant={"filled"}
              value={pomodoroSettings.cyclesBeforeLongBreak}
              onChange={handleCyclesBeforeLongBreak}
              disabled={!pomodoroSettings.longBreaksEnabled}
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
              value={pomodoroSettings.workLengthInMinutes}
              onChange={handleWorkTimeChange}
              fullWidth
              variant={"filled"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position={"end"}>min.</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={"Break Length"}
              type={"tel"}
              value={pomodoroSettings.breakLengthInMinutes}
              onChange={handleBreakTimeChange}
              fullWidth
              variant={"filled"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position={"end"}>min.</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled={!pomodoroSettings.longBreaksEnabled}
              label={"Long Break Length"}
              fullWidth
              type={"tel"}
              value={pomodoroSettings.longBreakLengthInMinutes}
              onChange={handleLongBreakTimeChange}
              variant={"filled"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position={"end"}>min.</InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
