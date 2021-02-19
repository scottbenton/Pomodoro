import { MuiThemeProvider } from "./MuiThemeProvider";
import { NotificationProvider } from "./NotificationProvider";

export const AppProviders: React.FC = (props) => {
  const { children } = props;
  return (
    <MuiThemeProvider>
      <NotificationProvider>{children}</NotificationProvider>
    </MuiThemeProvider>
  );
};
