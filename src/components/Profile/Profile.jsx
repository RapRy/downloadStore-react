import React, { useEffect } from "react";
import { Container, makeStyles } from "@material-ui/core";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "../GlobalComponents/Header/Header";
import { Overview, EditProfile } from "./Sub";
import { backToSignIn, dispatchToProfile } from "../../helperFunctions";

const Profile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);
  const { path } = useRouteMatch();
  const history = useHistory();
  useEffect(() => {
    backToSignIn(profile, history);
    dispatchToProfile(profile, dispatch);
  }, [dispatch, profile, history]);

  return (
    <Container className={classes.container}>
      <Header />
      <Switch>
        <Route exact path={path} component={Overview} />
        <Route exact path={`${path}/edit`} component={EditProfile} />
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
