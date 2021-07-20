import React, { useState, useCallback } from "react";
import { Container, makeStyles } from "@material-ui/core";

import Header from "../GlobalComponents/Header/Header";
import SignIn from "./SignIn";
import ForgotPassword from "./ForgotPassword";
import SignUp from "./SignUp";
import Registration from "./Registration";
import { authContext } from "./authContext";

const initialData = {
  mobile: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const initialErrors = {
  mobile: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState(initialErrors);
  const [signUp, setSignUp] = useState(false);
  const [forgotPass, setForgotPass] = useState(false);
  // const [open, setOpen] = React.useState(false);

  const inputChange = useCallback((e) => {
    if (e.target.name === "mobile") {
      if (isNaN(e.target.value)) {
        return;
      }
    }
    // setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  }, []);

  return (
    <Container className={classes.container}>
      <Header />
      <Container>
        <authContext.Provider
          value={{
            inputChange,
            setSignUp,
            setForgotPass,
            formData,
            errors,
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
