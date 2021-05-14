import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { useThemeSettings } from "../../../globalState/globalThemeState";
import { themeTypes, themeColors } from "./themes";

export const MuiThemeProvider: React.FC = (props) => {
  const { children } = props;

  const themeSettings = useThemeSettings();
  const { color, type } = themeSettings.get();

  const theme = createMuiTheme({
    typography: {
      fontFamily: ["Inter", "Arial", "sans-serif"].join(","),
    },
    palette: {
      type: themeTypes[type].type as "light" | "dark",
      primary: { main: themeColors[color].mainValue },
      background: {
        default: themeTypes[type].backgroundColor,
        paper: themeTypes[type].paperColor,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
