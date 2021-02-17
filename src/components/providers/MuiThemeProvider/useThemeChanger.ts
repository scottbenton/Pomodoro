import { useContext } from "react";
import { ThemeChangeContext } from "./ThemeChangeContext";

export function useThemeChanger() {
  return useContext(ThemeChangeContext);
}
