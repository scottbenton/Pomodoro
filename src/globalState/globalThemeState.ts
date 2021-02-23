import { createState, useState } from "@hookstate/core";
import { Persistence } from "@hookstate/persistence";
import {
  THEME_COLORS,
  THEME_TYPES,
} from "../components/providers/MuiThemeProvider/themes";

interface IThemeState {
  type: THEME_TYPES;
  color: THEME_COLORS;
}

const themeState = createState<IThemeState>({
  type: THEME_TYPES.LIGHT,
  color: THEME_COLORS.ROSE,
});

themeState.attach(Persistence("theme-data-key"));

export const useThemeSettings = () => useState(themeState);
