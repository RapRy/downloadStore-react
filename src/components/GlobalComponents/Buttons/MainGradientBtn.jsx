import React from "react";
import { Button, makeStyles } from "@material-ui/core";

const MainGradientBtn = ({ text, icon, type, event, disabled }) => {
  const classes = useStyles({ disabled });

  return (
    <Button
      classes={{
        root: classes.root,
        contained: classes.contained,
        iconSizeMedium: classes.iconSize,
      }}
      variant="contained"
      startIcon={icon !== "" ? icon : null}
      type={type}
      onClick={event !== "" ? event : null}
      disabled={disabled}
    >
      {text}
    </Button>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 5),
    borderRadius: theme.shape.borderRadiusFive,
    marginTop: theme.spacing(2),
    textTransform: "uppercase",
    fontWeight: theme.typography.fontWeightBold,
    fontSize: "1rem",
  },
  contained: {
    background: ({ disabled }) =>
      disabled
        ? theme.palette.neutrals.disabled
        : `linear-gradient(143deg, ${theme.palette.primary.light} 11.67%, ${theme.palette.primary.main} 80.27%)`,
    boxShadow: theme.shadows[2],
    color: theme.palette.neutrals.dark,
  },
  iconSize: {
    "&.MuiButton-iconSizeMedium > *:first-child": {
      fontSize: "1rem",
    },
  },
}));

export default MainGradientBtn;
