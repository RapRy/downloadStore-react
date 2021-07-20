import React from "react";
import { makeStyles } from "@material-ui/core";

import HeadBg from "../Backgrounds/HeadBg";

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <img
        src={`${process.env.PUBLIC_URL}/assets/DS_logo.svg`}
        alt="Download Store"
        className={classes.img}
      />
      <HeadBg />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    textAlign: "center",
    overflow: "hidden",
    height: "300px",
  },
  img: {
    marginTop: theme.spacing(11),
  },
}));

export default Header;
