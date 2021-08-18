import React, { useCallback } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

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

const TextLoginHighlight = ({ text, primaryEvent, historyLink }) => {
  const classes = useStyles();
  const history = useHistory();
  const handleClick = useCallback(() => {
    if (historyLink) history.push(historyLink);
    if (primaryEvent) primaryEvent((prevState) => !prevState);
  }, [primaryEvent, history, historyLink]);
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
