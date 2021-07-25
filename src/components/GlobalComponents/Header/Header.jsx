import React, { useState, useEffect } from "react";
import { makeStyles, Box, Typography } from "@material-ui/core";
import { useRouteMatch, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import HeadBg from "../Backgrounds/HeadBg";
import { BackBtn } from "../Buttons";
import AvatarThumb from "../Avatar/AvatarThumb";

const Header = () => {
  const classes = useStyles();
  const [link, setLink] = useState("");
  const { url, path } = useRouteMatch();
  const { profile } = useSelector((state) => state.auth);
  const [animSvg, setAnimSvg] = useState(false);

  useEffect(() => {
    if (url !== "/signup" && url !== "/signin") {
      setAnimSvg((prevState) => !prevState);
    }

    switch (path) {
      case "/:auth":
        setLink(url === "/signup" ? "/signin" : "/");
        break;
      case "/profile":
        console.log("yes");
        break;
      default:
        setLink("/");
        break;
    }
  }, [url, path]);

  return (
    <div className={classes.container}>
      {url !== "/" && <BackBtn link={link} />}

      {url === "/" && (
        <Box position="absolute" top="24px" right="16px">
          <Typography
            variant="h6"
            className={classes.userName}
          >{`Hi, ${profile.user?.name?.firstName}`}</Typography>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <AvatarThumb size="small" display="inline-block" />
          </Link>
        </Box>
      )}

      {url.includes("profile") ? (
        <div className={classes.profileContainer}>
          <AvatarThumb size="large" display="block" />
        </div>
      ) : (
        <img
          src={`${process.env.PUBLIC_URL}/assets/DS_logo.svg`}
          alt="Download Store"
          className={classes.img}
        />
      )}
      <HeadBg animSvg={animSvg} />
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
    marginTop: theme.spacing(15),
  },
  userName: {
    fontSize: ".9rem",
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.neutrals.dark,
    display: "inline-block",
    position: "relative",
    right: theme.spacing(2),
    bottom: 12,
  },
  profileContainer: {
    position: "absolute",
    top: theme.spacing(12),
    left: "50%",
    transform: "translateX(-50%)",
  },
}));

export default Header;
