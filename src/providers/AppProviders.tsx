import { MuiThemeProvider } from "./MuiThemeProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PomodoroTimerProvider } from "./PomodoroTimerProvider";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { PropsWithChildren } from "react";

export function AppProviders(props: PropsWithChildren) {
  const { children } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiThemeProvider>
        <PomodoroTimerProvider>{children}</PomodoroTimerProvider>
      </MuiThemeProvider>
    </LocalizationProvider>
  );
}
