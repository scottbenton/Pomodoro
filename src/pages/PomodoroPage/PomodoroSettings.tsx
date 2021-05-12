import React from "react";
import { InputAdornment, TextField } from "@material-ui/core";
import { SettingsSwitch, FormSection } from "components/FormSection";
import {
  usePomodoroSettingsState,
  CYCLES,
} from "globalState/globalPomodoroSettings";

export interface PomodoroSettingsProps {}

export const PomodoroSettings: React.FC<PomodoroSettingsProps> = (props) => {
  const settings = usePomodoroSettingsState();

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
          <SettingsSwitch
            label={"Audio Reminder Enabled"}
            checked={settings.playAudioOnCycleEnd.get()}
            handleToggle={settings.playAudioOnCycleEnd.set}
          />
          {"wakeLock" in navigator && (
            <SettingsSwitch
              label={"Keep Screen On"}
              checked={settings.keepScreenOnDuringCycles.get()}
              handleToggle={settings.keepScreenOnDuringCycles.set}
            />
          )}
          <SettingsSwitch
            label={"Auto-Start Cycles"}
            checked={settings.autoStartCycles.get()}
            handleToggle={settings.autoStartCycles.set}
          />
          <SettingsSwitch
            label={"Long Breaks"}
            checked={settings[CYCLES.LONG_BREAK].enabled.get()}
            handleToggle={settings[CYCLES.LONG_BREAK].enabled.set}
          />
          <TextField
            label={"Cycles Until Long Break"}
            type={"tel"}
            fullWidth
            variant={"filled"}
            value={settings[CYCLES.LONG_BREAK].cyclesBeforeLongBreak.get()}
            onChange={(evt) =>
              settings[CYCLES.LONG_BREAK].cyclesBeforeLongBreak.set(
                parsePositiveInteger(evt.target.value)
              )
            }
            disabled={!settings[CYCLES.LONG_BREAK].enabled.get()}
          />
        </>
      </FormSection>
      <FormSection title={"Cycle Lengths"}>
        <>
          <TextField
            label={"Work Length"}
            type={"tel"}
            value={settings[CYCLES.WORK].length.get()}
            onChange={(evt) =>
              settings[CYCLES.WORK].length.set(
                parsePositiveInteger(evt.target.value)
              )
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
            value={settings[CYCLES.BREAK].length.get()}
            onChange={(evt) =>
              settings[CYCLES.BREAK].length.set(
                parsePositiveInteger(evt.target.value)
              )
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
            disabled={!settings[CYCLES.LONG_BREAK].enabled.get()}
            label={"Long Break Length"}
            fullWidth
            type={"tel"}
            value={settings[CYCLES.LONG_BREAK].length.get()}
            onChange={(evt) =>
              settings[CYCLES.LONG_BREAK].length.set(
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
