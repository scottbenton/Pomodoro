import React from "react";
import clsx from "clsx";
import { RouteConfig } from "pages/routes";
import { useRouteMatch } from "react-router-dom";
import { SvgIconProps, ButtonBase, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useStyles } from "./styles";

export interface NavItemProps {
  config: RouteConfig;
}

export const NavItem: React.FC<NavItemProps> = (props) => {
  const { config } = props;
  const classes = useStyles();

  const match = useRouteMatch({ path: config.url, strict: true });

  const TypedIcon = config.Icon as React.FC<SvgIconProps>;
  return (
    <ButtonBase
      component={Link}
      to={config.url}
      className={clsx(
        classes.navItem,
        match?.isExact && classes.selectedNavItem
      )}
    >
      <TypedIcon />
      <span>{config.title}</span>
    </ButtonBase>
  );
};
