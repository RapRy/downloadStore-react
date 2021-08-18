import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

const MainHeading = ({ text }) => {
  const classes = useStyles();

  return (
    <Typography variant="h3" className={classes.root}>
      {text}
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.neutrals.dark,
    fontSize: "1.3rem",
    fontWeight: 900,
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom: theme.spacing(3),
  },
}));

export default MainHeading;
