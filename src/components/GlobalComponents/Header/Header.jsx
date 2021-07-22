import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { useRouteMatch } from "react-router-dom";

import HeadBg from "../Backgrounds/HeadBg";
import { BackBtn } from "../Buttons";

const Header = () => {
  const classes = useStyles();
  const [link, setLink] = useState("");
  const { url } = useRouteMatch();

  useEffect(() => {
    switch (url) {
      case "/signup":
        setLink("/signin");
        break;
      default:
        setLink("/");
        break;
    }
  }, [url]);

  return (
    <div className={classes.container}>
      {url !== "/signin" && <BackBtn link={link} />}
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
