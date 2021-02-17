import { createContext, Dispatch, SetStateAction } from "react";
import { colors, themeColors, THEME_COLORS, THEME_TYPES } from "./themes";

interface IThemeChangeContext {
  colors: typeof colors;
  types: typeof themeColors;
  selectedColor: THEME_COLORS;
  selectedType: THEME_TYPES;
  changeColor: Dispatch<SetStateAction<THEME_COLORS>>;
  changeThemeType: Dispatch<SetStateAction<THEME_TYPES>>;
}

export const ThemeChangeContext = createContext<IThemeChangeContext>({
  colors: colors,
  types: themeColors,
  changeColor: () => {},
  changeThemeType: () => {},
  selectedColor: THEME_COLORS.TEAL,
  selectedType: THEME_TYPES.DARK,
});
