import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

const TextBodyLogin = ({ text }) => {
  const classes = useStyles();
  return (
    <Typography variant="body1" className={classes.root}>
      {text}
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.neutrals.dark,
    fontSize: ".8rem",
    lineHeight: 1.8,
    textAlign: "center",
  },
}));

export default TextBodyLogin;
