import React from "react";
import { Avatar, makeStyles, Box } from "@material-ui/core";
import { useSelector } from "react-redux";

const AvatarThumb = ({ size, display }) => {
  const { profile } = useSelector((state) => state.auth);
  const classes = useStyles({ size });

  return (
    <Box position="relative" display={display}>
      <Avatar
        src={
          profile.user?.proPic !== ""
            ? profile.user?.proPic
            : `${process.env.PUBLIC_URL}/assets/defaultPropic.jpg`
        }
        className={classes.root}
      />
      <div className={classes.whiteBg}></div>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: ({ size }) =>
      size === "small" ? theme.spacing(6) : theme.spacing(17),
    height: ({ size }) =>
      size === "small" ? theme.spacing(6) : theme.spacing(17),
    position: "relative",
    top: theme.spacing(1) - 6,
    left: theme.spacing(1) - 6,
    zIndex: 2,
  },
  whiteBg: {
    width: ({ size }) =>
      size === "small" ? theme.spacing(6) + 4 : theme.spacing(17) + 4,
    height: ({ size }) =>
      size === "small" ? theme.spacing(6) + 4 : theme.spacing(17) + 4,
    background: theme.palette.secondary.contrastText,
    borderRadius: "100%",
    boxShadow: theme.shadows[1],
    position: "absolute",
    top: 0,
    left: 0,
  },
}));

export default AvatarThumb;
