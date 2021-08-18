import React from "react";
import { Avatar, makeStyles } from "@material-ui/core";

const AvatarThumb = ({ proPic }) => {
  const classes = useStyles();

  return (
    <Avatar
      src={proPic || `${process.env.PUBLIC_URL}/assets/defaultPropic.jpg`}
      className={classes.root}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}));

export default AvatarThumb;
