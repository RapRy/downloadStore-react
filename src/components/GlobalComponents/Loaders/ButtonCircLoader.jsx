import React from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";

const ButtonCircLoader = ({ margTop }) => {
  const classes = useStyles({ margTop });
  return <CircularProgress size={24} className={classes.root} />;
};

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.dark,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -12,
    marginTop: ({ margTop }) => margTop,
  },
}));

export default ButtonCircLoader;
