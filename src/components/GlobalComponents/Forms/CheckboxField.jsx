import React from "react";
import { FormControlLabel, Checkbox, makeStyles } from "@material-ui/core";

const CheckboxField = ({ checked, label, name, onChange, isLast }) => {
  const classes = useStyles({ isLast });
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          name={name}
          onChange={onChange}
          color="primary"
          classes={{
            root: classes.checkbox,
          }}
        />
      }
      label={label}
      classes={{ root: classes.root, label: classes.label }}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: "flex-start",
    marginTop: ({ isLast }) => (isLast ? theme.spacing(2) : 0),
  },
  label: {
    fontSize: ".9rem",
    color: theme.palette.neutrals.dark,
  },
  checkbox: {
    padding: theme.spacing(0, 1),
  },
}));

export default CheckboxField;
