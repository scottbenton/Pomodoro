import { THEME_COLORS, THEME_TYPES } from "providers/MuiThemeProvider/themes";

import { create } from "zustand";
import { produce } from "immer";
import { persist } from "zustand/middleware";

interface IThemeState {
  type: THEME_TYPES;
  color: THEME_COLORS;

  updateType: (newType: THEME_TYPES) => void;
  updateColor: (newColor: THEME_COLORS) => void;
}

export const useThemeStore = create<IThemeState>()(
  persist(
    (set) => ({
      type: THEME_TYPES.LIGHT,
      color: THEME_COLORS.ROSE,

      updateType: (type: THEME_TYPES) =>
        set(
          produce((state: IThemeState) => {
            state.type = type;
          })
        ),

      updateColor: (color: THEME_COLORS) =>
        set(
          produce((state: IThemeState) => {
            state.color = color;
          })
        ),
    }),
    {
      name: "pomodoro-theme-settings",
    }
  )
);
