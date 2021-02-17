import { Box, Drawer, IconButton, Typography } from "@material-ui/core";
import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/CloseRounded";

interface DrawerToggleProps {
  icon: React.ReactNode;
  drawerContent: React.ReactNode;
  title: string;
}

export const DrawerToggle: React.FC<DrawerToggleProps> = (props) => {
  const { icon, drawerContent, title } = props;

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  return (
    <>
      <IconButton onClick={() => setIsDrawerOpen(true)}>{icon}</IconButton>
      <Drawer
        anchor={"bottom"}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box padding={4}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant={"h5"}>{title}</Typography>
            <IconButton onClick={() => setIsDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          {drawerContent}
        </Box>
      </Drawer>
    </>
  );
};
