import React, { useState } from "react";
import {
  Input,
  makeStyles,
  FormControl,
  InputLabel,
  FormHelperText,
  InputAdornment,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const InputFields = ({
  value,
  type,
  label,
  errors,
  name,
  inputChange,
  textHelper,
}) => {
  const classes = useStyles({ name, errors });
  const [show, setShow] = useState(false);

  return (
    <FormControl fullWidth margin="normal" error={errors[name] !== "" && true}>
      <InputLabel
        shrink
        classes={{
          root: classes.inputLabel,
        }}
      >
        {label}
      </InputLabel>
      <Input
        value={value}
        type={name === "password" ? (show ? "text" : type) : type}
        onChange={inputChange}
        name={name}
        disableUnderline
        startAdornment={
          name === "mobile" ? (
            <InputAdornment
              disableTypography
              position="start"
              classes={{
                root: classes.inputAdorn,
              }}
            >
              +673
            </InputAdornment>
          ) : null
        }
        endAdornment={
          name === "password" ? (
            <InputAdornment
              position="end"
              classes={{ root: classes.passwordAdorn }}
            >
              <FontAwesomeIcon
                icon={show ? faEyeSlash : faEye}
                onClick={() => setShow((prev) => !prev)}
              />
            </InputAdornment>
          ) : null
        }
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
  inputAdorn: {
    background: ({ name, errors }) =>
      errors[name] !== ""
        ? theme.palette.error.main
        : theme.palette.primary.main,
    height: "100%",
    minHeight: "34px",
    maxHeight: "0",
    padding: theme.spacing(1, 2),
    marginRight: 0,
    color: theme.palette.neutrals.dark,
    fontWeight: theme.typography.fontWeightBold,
    fontSize: ".8rem",
  },
  passwordAdorn: {
    color: theme.palette.neutrals.dark,
    marginRight: theme.spacing(1),
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

export default InputFields;
