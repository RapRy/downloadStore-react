import React, { useCallback, useContext } from "react";
import { makeStyles, Typography } from "@material-ui/core";

import { authContext } from "../../Auth/authContext";

const useStyles = makeStyles((theme) => ({
  root: {
    textDecoration: "none",
    fontSize: ".8rem",
    color: theme.palette.primary.dark,
    textTransform: "uppercase",
    fontWeight: theme.typography.fontWeightBold,
    letterSpacing: "normal",
  },
}));

const TextLoginHighlight = ({ text, event, event2 }) => {
  const classes = useStyles();
  const { setForgotPass, forgotPass } = useContext(authContext);
  const handleClick = useCallback(() => {
    if (event2) event2((prevState) => !prevState);
    if (forgotPass) setForgotPass((prevState) => !prevState);
    event((prevState) => !prevState);
  }, [event, setForgotPass, event2, forgotPass]);
  return (
    <Typography
      variant="caption"
      onClick={handleClick}
      className={classes.root}
    >
      {text}
    </Typography>
  );
};

export default TextLoginHighlight;
