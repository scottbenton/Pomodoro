import React from "react";
import { InputAdornment, TextField } from "@material-ui/core";
import { SettingsSwitch, FormSection } from "components/FormSection";
import { useNotifications } from "components/providers/NotificationProvider";
import { usePomodoroSettings } from "globalState/globalPomodoroSettings";
import { useNotificationSettings } from "globalState/globalNotificationState";
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
    <>
      <FormSection
        title={"General Settings"}
        description={
          "Due to limitations of web applications, notifications will work best on desktop."
        }
      >
        <>
          {notificationsSupported.get() &&
            !notificationsEnabled.get() &&
            notificationDecisionMade.get() && (
              <SettingsSwitch
                label={"Push Notifications Enabled"}
                checked={notificationsEnabled.get()}
                handleToggle={handleNotificationToggle}
              />
            )}
          <SettingsSwitch
            label={"Audio Reminder Enabled"}
            checked={audioEnabled.get()}
            handleToggle={(checked) => audioEnabled.set(checked)}
          />
          {wakelocksSupported.get() && (
            <SettingsSwitch
              label={"Keep Screen On"}
              checked={wakelocksEnabled.get()}
              handleToggle={wakelocksEnabled.set}
            />
          )}
          <SettingsSwitch
            label={"Auto-Start Cycles"}
            checked={autoStartCycles.get()}
            handleToggle={(checked) => autoStartCycles.set(checked)}
          />
          <SettingsSwitch
            label={"Long Breaks"}
            checked={longBreaksEnabled.get()}
            handleToggle={(checked) => longBreaksEnabled.set(checked)}
          />
          <TextField
            label={"Cycles Until Long Break"}
            type={"tel"}
            fullWidth
            variant={"filled"}
            value={cyclesBeforeLongBreak.get()}
            onChange={(evt) =>
              cyclesBeforeLongBreak.set(parsePositiveInteger(evt.target.value))
            }
            disabled={!longBreaksEnabled.get()}
          />
        </>
      </FormSection>
      <FormSection title={"Cycle Lengths"}>
        <>
          <TextField
            label={"Work Length"}
            type={"tel"}
            value={workLengthInMinutes.get()}
            onChange={(evt) =>
              workLengthInMinutes.set(parsePositiveInteger(evt.target.value))
            }
            fullWidth
            variant={"filled"}
            InputProps={{
              endAdornment: (
                <InputAdornment position={"end"}>min.</InputAdornment>
              ),
            }}
          />
          <TextField
            label={"Break Length"}
            type={"tel"}
            value={breakLengthInMinutes.get()}
            onChange={(evt) =>
              breakLengthInMinutes.set(parsePositiveInteger(evt.target.value))
            }
            fullWidth
            variant={"filled"}
            InputProps={{
              endAdornment: (
                <InputAdornment position={"end"}>min.</InputAdornment>
              ),
            }}
          />
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
                <InputAdornment position={"end"}>min.</InputAdornment>
              ),
            }}
          />
        </>
      </FormSection>
    </>
  );
};
