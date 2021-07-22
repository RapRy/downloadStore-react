import React, { useState } from "react";
import { Container, makeStyles } from "@material-ui/core";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import Header from "../GlobalComponents/Header/Header";
import SignIn from "./Sub/SignIn";
import ForgotPassword from "./Sub/ForgotPassword";
import SignUp from "./Sub/SignUp";
import Registration from "./Sub/Registration";
import { authContext } from "./context/authContext";

const Auth = () => {
  const classes = useStyles();
  const [forgotPass, setForgotPass] = useState(false);
  const { path } = useRouteMatch();

  return (
    <Container className={classes.container}>
      <Header />
      <Container>
        <authContext.Provider
          value={{
            setForgotPass,
            forgotPass,
          }}
        >
          <Switch>
            {/* sign in */}
            <Route exact path="/signin">
              <SignIn />
              {forgotPass && <ForgotPassword />}
            </Route>

            <Route exact path="/signup">
              {/* sign up */}
              <Registration />
              <SignUp />
            </Route>
          </Switch>
        </authContext.Provider>
      </Container>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(0),
  },
  typography: {
    color: theme.palette.neutrals.dark,
    fontSize: ".8rem",
    textAlign: "center",
    marginTop: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(4, 0),
  },
}));

export default Auth;
