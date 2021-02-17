export enum THEME_COLORS {
  ROSE = "rose",
  AMBER = "amber",
  GREEN = "green",
  TEAL = "teal",
  CYAN = "cyan",
  BLUE = "blue",
  VIOLET = "violet",
}

interface IColors {
  [color: string]: {
    name: string;
    mainValue: string;
  };
}

export const colors: IColors = {
  [THEME_COLORS.ROSE]: {
    name: "Rose",
    mainValue: "#E11D48",
  },
  [THEME_COLORS.AMBER]: {
    name: "Amber",
    mainValue: "#D97706",
  },
  [THEME_COLORS.GREEN]: {
    name: "Green",
    mainValue: "#16A34A",
  },
  [THEME_COLORS.TEAL]: {
    name: "Teal",
    mainValue: "#0D9488",
  },
  [THEME_COLORS.CYAN]: {
    name: "Cyan",
    mainValue: "#06B6D4",
  },
  [THEME_COLORS.BLUE]: {
    name: "Blue",
    mainValue: "#2563EB",
  },
  [THEME_COLORS.VIOLET]: {
    name: "Violet",
    mainValue: "#6D28D9",
  },
};

export enum THEME_TYPES {
  LIGHT = "light",
  DARK = "dark",
}

interface IThemeColors {
  [themeKey: string]: {
    name: string;
    type: "light" | "dark";
    backgroundColor: string;
    paperColor: string;
  };
}

export const themeColors: IThemeColors = {
  [THEME_TYPES.LIGHT]: {
    name: "Light",
    type: "light",
    backgroundColor: "#F3F4F6",
    paperColor: "#fff",
  },
  [THEME_TYPES.DARK]: {
    name: "Dark",
    type: "dark",
    backgroundColor: "#111827",
    paperColor: "#1F2937",
  },
};
