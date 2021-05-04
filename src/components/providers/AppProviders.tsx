import { MuiThemeProvider } from "./MuiThemeProvider";
import { NotificationProvider } from "./NotificationProvider";
import { BrowserRouter } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateUtils from "@date-io/date-fns";

export const AppProviders: React.FC = (props) => {
  const { children } = props;

  return (
    <BrowserRouter>
      <MuiPickersUtilsProvider utils={DateUtils}>
        <MuiThemeProvider>
          <NotificationProvider>{children}</NotificationProvider>
        </MuiThemeProvider>
      </MuiPickersUtilsProvider>
    </BrowserRouter>
  );
};
