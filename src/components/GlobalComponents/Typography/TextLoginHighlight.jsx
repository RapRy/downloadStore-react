import React, { useCallback, useContext } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { authContext } from "../../Auth/context/authContext";

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

const TextLoginHighlight = ({ text, event, event2, historyLink }) => {
  const classes = useStyles();
  const { setForgotPass, forgotPass } = useContext(authContext);
  const history = useHistory();
  const handleClick = useCallback(() => {
    if (historyLink) history.push(historyLink);
    if (event2) event2((prevState) => !prevState);
    if (forgotPass) setForgotPass((prevState) => !prevState);
    if (event) event((prevState) => !prevState);
  }, [event, setForgotPass, event2, forgotPass, history, historyLink]);
  return (
    <Typography
      variant="caption"
      onClick={handleClick}
      className={classes.root}
      style={{ cursor: "pointer" }}
    >
      {text}
    </Typography>
  );
};

export default TextLoginHighlight;
