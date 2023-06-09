export enum THEME_COLORS {
  ROSE = "rose",
  AMBER = "amber",
  GREEN = "green",
  TEAL = "teal",
  CYAN = "cyan",
  BLUE = "blue",
  VIOLET = "violet",
}

export const themeColors = {
  [THEME_COLORS.ROSE]: {
    name: "Rose",
    mainValue: "#E11D48",
    lightValue: "#f43f5e",
    darkValue: "#be123c",
  },
  [THEME_COLORS.AMBER]: {
    name: "Amber",
    mainValue: "#D97706",
    lightValue: "#f59e0b",
    darkValue: "#b45309",
  },
  [THEME_COLORS.GREEN]: {
    name: "Green",
    mainValue: "#16A34A",
    lightValue: "#22c55e",
    darkValue: "#15803d",
  },
  [THEME_COLORS.TEAL]: {
    name: "Teal",
    mainValue: "#0D9488",
    lightValue: "#14b8a6",
    darkValue: "#0f766e",
  },
  [THEME_COLORS.CYAN]: {
    name: "Cyan",
    mainValue: "#0891B2",
    lightValue: "#06b6d4",
    darkValue: "#0e7490",
  },
  [THEME_COLORS.BLUE]: {
    name: "Blue",
    mainValue: "#2563EB",
    lightValue: "#3b82f6",
    darkValue: "#1d4ed8",
  },
  [THEME_COLORS.VIOLET]: {
    name: "Violet",
    mainValue: "#6D28D9",
    lightValue: "#7c3aed",
    darkValue: "#5b21b6",
  },
};

export enum THEME_TYPES {
  LIGHT = "light",
  DARK = "dark",
  BLACK = "black",
}

export const themeTypes = {
  [THEME_TYPES.LIGHT]: {
    name: "Light",
    type: "light",
    backgroundColor: "#F3F4F6",
    paperColor: "#fff",
  },
  [THEME_TYPES.DARK]: {
    name: "Dark",
    type: "dark",
    backgroundColor: "#020617",
    paperColor: "#0f172a",
  },
  [THEME_TYPES.BLACK]: {
    name: "Black",
    type: "dark",
    backgroundColor: "#000",
    paperColor: "#0f172a",
  },
};
