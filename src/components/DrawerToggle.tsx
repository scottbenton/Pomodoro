import { Box, Drawer, IconButton, Typography, Container } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/CloseRounded";

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
      <IconButton onClick={() => setIsDrawerOpen(true)} color={"inherit"}>
        {icon}
      </IconButton>
      <Drawer
        anchor={"bottom"}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Container maxWidth={"md"}>
          <Box padding={3}>
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
        </Container>
      </Drawer>
    </>
  );
};
