import { InputAdornment, TextField } from "@mui/material";
import { SettingsSwitch, FormSection } from "components/FormSection";
import { CYCLES, usePomodoroSettings } from "store/pomodoro-settings.store";

export function PomodoroSettings() {
  const settings = usePomodoroSettings();

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
            checked={settings.playAudioOnCycleEnd}
            handleToggle={settings.togglePlayAudioOnCycleEnd}
          />
          {"wakeLock" in navigator && (
            <SettingsSwitch
              label={"Keep Screen On"}
              checked={settings.keepScreenOnDuringCycles}
              handleToggle={settings.toggleKeepScreenOnDuringCycles}
            />
          )}
          <SettingsSwitch
            label={"Auto-Start Cycles"}
            checked={settings.autoStartCycles}
            handleToggle={settings.toggleAutoStartCycles}
          />
          <SettingsSwitch
            label={"Long Breaks"}
            checked={settings[CYCLES.LONG_BREAK].enabled}
            handleToggle={settings.setLongBreakEnabled}
          />
          <TextField
            label={"Cycles Until Long Break"}
            type={"tel"}
            fullWidth
            variant={"filled"}
            value={settings[CYCLES.LONG_BREAK].cyclesBeforeLongBreak}
            onChange={(evt) =>
              settings.setCyclesBeforeLongBreak(
                parsePositiveInteger(evt.target.value)
              )
            }
            disabled={!settings[CYCLES.LONG_BREAK].enabled}
          />
        </>
      </FormSection>
      <FormSection title={"Cycle Lengths"}>
        <>
          <TextField
            label={"Work Length"}
            type={"tel"}
            value={settings[CYCLES.WORK].length}
            onChange={(evt) =>
              settings.setCycleLength(
                CYCLES.WORK,
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
            value={settings[CYCLES.BREAK].length}
            onChange={(evt) =>
              settings.setCycleLength(
                CYCLES.BREAK,
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
            disabled={!settings[CYCLES.LONG_BREAK].enabled}
            label={"Long Break Length"}
            fullWidth
            type={"tel"}
            value={settings[CYCLES.LONG_BREAK].length}
            onChange={(evt) =>
              settings.setCycleLength(
                CYCLES.LONG_BREAK,
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
}
