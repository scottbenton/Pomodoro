import React from "react";
import clsx from "clsx";
import { Paper, Box, Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import { DrawerToggle } from "components/DrawerToggle";
import SettingsIcon from "@material-ui/icons/SettingsRounded";
import { RouteConfig } from "pages/routes";
import { ThemeChange } from "components/ThemeChange";
import ThemeIcon from "@material-ui/icons/FormatPaintRounded";

interface ContentsProps {
  config: RouteConfig;
}

export const Contents: React.FC<ContentsProps> = (props) => {
  const { config } = props;
  const classes = useStyles();
  const { title, settingsComponent, component } = config;

  return (
    <Box display={"flex"} flexDirection={"column"} flexGrow={1} paddingTop={2}>
      <div className={classes.header}>
        <Typography variant={"h6"}>{title ?? ""}</Typography>
        <div>
          {settingsComponent && (
            <DrawerToggle
              title={title + " Settings"}
              icon={<SettingsIcon />}
              drawerContent={settingsComponent}
            />
          )}
          <DrawerToggle
            title={"Change your Theme"}
            icon={<ThemeIcon />}
            drawerContent={<ThemeChange />}
          />
        </div>
      </div>
      <Paper className={clsx(classes.contents, classes.paper)}>
        {React.createElement(component)}
      </Paper>
    </Box>
  );
};
