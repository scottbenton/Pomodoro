import {
  createMuiTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { ThemeChangeContext } from "./ThemeChangeContext";
import { THEME_COLORS, THEME_TYPES, colors, themeColors } from "./themes";

export const MuiThemeProvider: React.FC = (props) => {
  const { children } = props;
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [currentMode, setCurrentMode] = useState<THEME_TYPES>(
    (window.localStorage.getItem("mode") as THEME_TYPES) ??
      (prefersDarkMode ? THEME_TYPES.DARK : THEME_TYPES.LIGHT)
  );
  const [currentColor, setCurrentColor] = useState<THEME_COLORS>(
    (window.localStorage.getItem("color") as THEME_COLORS) ?? THEME_COLORS.ROSE
  );

  console.debug(currentMode, currentColor);

  const theme = createMuiTheme({
    typography: {
      fontFamily: ["nunito", "Arial", "sans-serif"].join(","),
    },
    palette: {
      type: themeColors[currentMode].type,
      primary: { main: colors[currentColor].mainValue },
      background: {
        default: themeColors[currentMode].backgroundColor,
        paper: themeColors[currentMode].paperColor,
      },
    },
  });

  useEffect(() => {
    window.localStorage.setItem("mode", currentMode);
  }, [currentMode]);
  useEffect(() => {
    window.localStorage.setItem("color", currentColor);
  }, [currentColor]);

  return (
    <ThemeProvider theme={theme}>
      <ThemeChangeContext.Provider
        value={{
          colors: colors,
          types: themeColors,
          changeColor: setCurrentColor,
          changeThemeType: setCurrentMode,
          selectedColor: currentColor,
          selectedType: currentMode,
        }}
      >
        <CssBaseline />
        {children}
      </ThemeChangeContext.Provider>
    </ThemeProvider>
  );
};
