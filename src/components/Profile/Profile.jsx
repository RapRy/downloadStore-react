import React, { useEffect } from "react";
import { Container, makeStyles, Box } from "@material-ui/core";
import {
  Switch,
  Route,
  useRouteMatch,
  useHistory,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTransition, animated } from "react-spring";

import Header from "../GlobalComponents/Header/Header";
import { Overview, EditProfile, Security } from "./Sub";
import {
  backToSignIn,
  dispatchToProfile,
} from "../../helperFunctions/usersFunc";

const Profile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);
  const { path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const transition = useTransition(location, {
    key: location.pathname,
    from: { opacity: 0, transform: "translate3d(-100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(50%,0,0)" },
  });

  useEffect(() => {
    backToSignIn(history);
    dispatchToProfile(dispatch);
  }, [dispatch, history]);

  return (
    profile && (
      <Container className={classes.container}>
        <Header />
        <Box position="relative">
          {transition((style, item, t, key) => (
            <animated.div key={key} style={style}>
              <Switch location={item}>
                <Route exact path={path} component={Overview} />
                <Route exact path={`${path}/edit`} component={EditProfile} />
                <Route exact path={`${path}/security`} component={Security} />
              </Switch>
            </animated.div>
          ))}
        </Box>
      </Container>
    )
  );
};

const useStyles = makeStyles({
  container: {
    padding: 0,
  },
});

export default Profile;
