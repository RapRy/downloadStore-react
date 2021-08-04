import React from "react";
import {
  Input,
  FormControl,
  InputLabel,
  FormHelperText,
  makeStyles,
} from "@material-ui/core";

const Textarea = ({
  value,
  type,
  label,
  errors,
  name,
  inputChange,
  textHelper,
}) => {
  const classes = useStyles({ name, errors });
  return (
    <FormControl fullWidth margin="normal" error={errors[name] !== "" && true}>
      {label !== null && (
        <InputLabel shrink classes={{ root: classes.inputLabel }}>
          {label}
        </InputLabel>
      )}
      <Input
        multiline
        rows={6}
        disableUnderline
        value={value}
        type={type}
        onChange={inputChange}
        name={name}
        classes={{
          root: classes.rootInput,
          input: classes.baseInput,
          focused: classes.rootFocused,
        }}
      />
      {errors[name] !== "" ? (
        <FormHelperText classes={{ root: classes.textError }}>
          {errors[name]}
        </FormHelperText>
      ) : (
        <FormHelperText classes={{ root: classes.textHelper }}>
          {textHelper}
        </FormHelperText>
      )}
    </FormControl>
  );
};

const useStyles = makeStyles((theme) => ({
  rootInput: {
    border: ({ name, errors }) =>
      errors[name] !== ""
        ? `1px solid ${theme.palette.error.main}`
        : `1px solid ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadiusFive,
    overflow: "hidden",
    background: theme.palette.neutrals.main,
  },
  rootFocused: {
    boxShadow: theme.shadows[3],
  },
  baseInput: {
    background: theme.palette.neutrals.main,
    padding: theme.spacing(1, 2),
    fontSize: ".9rem",
    color: theme.palette.neutrals.dark,
  },
  inputLabel: {
    color: theme.palette.neutrals.dark,
    fontWeight: theme.typography.fontWeightRegular,
  },
  textError: {
    fontSize: ".7rem",
    fontWeight: theme.typography.fontWeightLight,
  },
  textHelper: {
    fontSize: ".7rem",
    color: theme.palette.neutrals.dark,
  },
}));

export default Textarea;
