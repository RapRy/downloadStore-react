import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

const Paragraph = ({ text, align, lineHeight }) => {
  const classes = useStyles({ align, lineHeight });
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
    lineHeight: ({ lineHeight }) => lineHeight,
    textAlign: ({ align }) => align,
  },
}));

export default Paragraph;
