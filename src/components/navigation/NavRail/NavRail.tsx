import React from "react";
import { useStyles } from "./styles";
import { routes } from "pages/routes";
import { NavItem } from "../NavItem";
import { UserAvatar } from "components/User/UserAvatar";

export const NavRail: React.FC = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.rail}>
      <nav className={classes.widthFull}>
        {Object.values(routes)
          .filter((config) => !config.hideOnDesktop)
          .map((config, index) => (
            <NavItem config={config} key={index} />
          ))}
      </nav>
      <div className={classes.bottomSettings}>
        <UserAvatar linkTo={routes.profile.url} />
      </div>
    </div>
  );
};
