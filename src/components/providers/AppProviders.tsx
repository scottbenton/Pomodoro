import { MuiThemeProvider } from "./MuiThemeProvider";
import { BrowserRouter } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateUtils from "@date-io/date-fns";
import { PomodoroTimerProvider } from "./PomodoroTimerProvider";

export const AppProviders: React.FC = (props) => {
  const { children } = props;

  return (
    <BrowserRouter>
      <MuiPickersUtilsProvider utils={DateUtils}>
        <MuiThemeProvider>
          <PomodoroTimerProvider>{children}</PomodoroTimerProvider>
        </MuiThemeProvider>
      </MuiPickersUtilsProvider>
    </BrowserRouter>
  );
};
