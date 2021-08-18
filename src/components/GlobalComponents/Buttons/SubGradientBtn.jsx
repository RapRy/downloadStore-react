import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SubGradientBtn = ({ text, icon, type, event, disabled }) => {
  const classes = useStyles({ disabled });

  return (
    <Button
      classes={{
        root: classes.root,
        contained: classes.contained,
        iconSizeMedium: classes.iconSize,
      }}
      variant="contained"
      startIcon={icon !== null ? <FontAwesomeIcon icon={icon} /> : icon}
      type={type}
      onClick={event}
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
    textTransform: "uppercase",
    fontWeight: theme.typography.fontWeightBold,
    fontSize: "1rem",
  },
  contained: {
    background: ({ disabled }) =>
      disabled
        ? theme.palette.neutrals.disabled
        : `linear-gradient(143deg, ${theme.palette.secondary.light} 11.67%, ${theme.palette.secondary.main} 80.27%)`,
    boxShadow: ({ disabled }) =>
      disabled ? theme.shadows[0] : theme.shadows[4],
    color: theme.palette.neutrals.light,
  },
  iconSize: {
    "&.MuiButton-iconSizeMedium > *:first-child": {
      fontSize: "1rem",
    },
  },
}));

export default SubGradientBtn;
