import React, { useState } from "react";
import { Container, makeStyles } from "@material-ui/core";

import Header from "../GlobalComponents/Header/Header";
import SignIn from "./SignIn";
import ForgotPassword from "./ForgotPassword";
import SignUp from "./SignUp";
import Registration from "./Registration";
import { authContext } from "./authContext";

const Auth = () => {
  const classes = useStyles();
  const [signUp, setSignUp] = useState(false);
  const [forgotPass, setForgotPass] = useState(false);

  return (
    <Container className={classes.container}>
      <Header />
      <Container>
        <authContext.Provider
          value={{
            setSignUp,
            setForgotPass,
            forgotPass,
          }}
        >
          {/* sign in */}
          {!signUp && <SignIn />}

          {/* forgot password */}
          {forgotPass && !signUp && <ForgotPassword />}

          {/* sign up */}
          {signUp && (
            <>
              <Registration />
              <SignUp />
            </>
          )}
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
