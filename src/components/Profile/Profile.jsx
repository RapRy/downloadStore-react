import React, { useEffect } from "react";
import { Container, makeStyles } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Header from "../GlobalComponents/Header/Header";
import { Overview } from "./Sub";
import { sign_in_ls } from "../../redux/authReducer";

const profileLS = localStorage.getItem("profile");

const Profile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(sign_in_ls(profileLS));
  }, [dispatch]);

  return (
    <Container className={classes.container}>
      <Header />
      <Switch>
        <Route path="/" component={Overview} />
      </Switch>
    </Container>
  );
};

const useStyles = makeStyles({
  container: {
    padding: 0,
  },
});

export default Profile;
