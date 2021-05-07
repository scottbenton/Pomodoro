import React from "react";
import { Typography, Grid, Divider } from "@material-ui/core";
import { useStyles } from "./styles";

export interface FormSectionProps {
  title: string;
  description?: React.ReactNode;
}

export const FormSection: React.FC<FormSectionProps> = (props) => {
  const { title, description, children } = props;
  const classes = useStyles();

  return (
    <section>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant={"h6"} className={classes.settingsSectionTitle}>
            {title}
          </Typography>
          {description && (
            <Typography color={"textSecondary"}>{description}</Typography>
          )}
        </Grid>
        <Grid item xs={12} md={8} className={classes.settingsSectionContent}>
          {children}
        </Grid>
      </Grid>
    </section>
  );
};
