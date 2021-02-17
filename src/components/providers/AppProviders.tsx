import { MuiThemeProvider } from "./MuiThemeProvider";

export const AppProviders: React.FC = (props) => {
  const { children } = props;
  return <MuiThemeProvider>{children}</MuiThemeProvider>;
};
