import { NavItem } from "components/navigation/NavItem";
import React from "react";
import { routes } from "pages/routes";
import { useStyles } from "./styles";
import { DrawerToggle } from "components/DrawerToggle";
import ThemeIcon from "@material-ui/icons/FormatPaintRounded";
import { ThemeChange } from "components/ThemeChange";
export const BottomNav: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.bottomNav}>
      <nav className={classes.nav}>
        {Object.values(routes).map((config, index) => (
          <NavItem config={config} key={index} />
        ))}
      </nav>
    </div>
  );
};
