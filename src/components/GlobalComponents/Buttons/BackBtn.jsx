import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const BackBtn = ({ link }) => {
  const classes = useStyles();
  return (
    <Link to="/" className={classes.root}>
      <FontAwesomeIcon icon={faLongArrowAltLeft} size="3x" />
    </Link>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: theme.spacing(1),
    left: theme.spacing(2),
    textDecoration: "none",
    color: theme.palette.neutrals.dark,
  },
}));

export default BackBtn;
