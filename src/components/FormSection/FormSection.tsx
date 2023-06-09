import React, { PropsWithChildren } from "react";
import { Typography, Grid, Divider, Stack } from "@mui/material";

export interface FormSectionProps {
  title: string;
  description?: React.ReactNode;
}

export function FormSection(props: PropsWithChildren<FormSectionProps>) {
  const { title, description, children } = props;

  return (
    <section>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant={"h6"} sx={{ lineHeight: 1.2 }}>
            {title}
          </Typography>
          {description && (
            <Typography color={"textSecondary"}>{description}</Typography>
          )}
        </Grid>
        <Grid item xs={12} md={8} sx={{ mb: 2 }}>
          <Stack spacing={2}>{children}</Stack>
        </Grid>
      </Grid>
    </section>
  );
}
