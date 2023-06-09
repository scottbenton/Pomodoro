import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { themeTypes, themeColors } from "./themes";
import { PropsWithChildren } from "react";
import { useThemeStore } from "store/theme.store";

export function MuiThemeProvider(props: PropsWithChildren) {
  const { children } = props;

  const { color, type } = useThemeStore();
  // const themeSettings = useThemeSettings();
  // const { color, type } = themeSettings.get();

  const theme = createTheme({
    typography: {
      fontFamily: ["Cabin Variable", "Arial", "sans-serif"].join(","),
    },
    palette: {
      mode: themeTypes[type].type as "light" | "dark",
      primary: {
        light: themeColors[color].lightValue,
        main: themeColors[color].mainValue,
        dark: themeColors[color].darkValue,
      },
      background: {
        default: themeTypes[type].backgroundColor,
        paper: themeTypes[type].paperColor,
      },
    },
    shape: {
      borderRadius: 2,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
