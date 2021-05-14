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
  isMobile: boolean;
}

export const Contents: React.FC<ContentsProps> = (props) => {
  const { config, isMobile } = props;
  const classes = useStyles();
  const { title, settingsComponent, component } = config;

  const Header = () => (
    <div className={clsx(classes.header, isMobile && classes.headerMobile)}>
      <Typography variant={isMobile ? "h6" : "h5"}>{title ?? ""}</Typography>
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
  );

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      flexGrow={1}
      overflow={"auto"}
    >
      {isMobile ? <Header /> : null}
      <Paper
        className={clsx(
          classes.contents,
          isMobile ? classes.paperMobile : classes.paperDesktop
        )}
      >
        {!isMobile ? <Header /> : null}

        {React.createElement(component)}
      </Paper>
    </Box>
  );
};
