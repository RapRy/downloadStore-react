import React, { useContext, useState, useCallback } from "react";
import { makeStyles, Box, Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";

import {
  MainHeading,
  TextLoginHighlight,
} from "../../GlobalComponents/Typography";
import { InputFields } from "../../GlobalComponents/Forms";
import { MainGradientBtn } from "../../GlobalComponents/Buttons";
import { authContext } from "../context/authContext";

const initialData = { mobile: "", password: "" };
const initialErrors = { mobile: "", password: "" };

const SignIn = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState(initialErrors);

  const { setForgotPass } = useContext(authContext);

  const inputChange = useCallback((e) => {
    if (e.target.name === "mobile") {
      if (isNaN(e.target.value)) {
        return;
      }
    }

    setFormData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  }, []);

  return (
    <>
      <MainHeading text={"account login"} />
      <form>
        <InputFields
          value={formData.mobile}
          type="text"
          name="mobile"
          label="Mobile Number:"
          errors={errors}
          inputChange={inputChange}
          textHelper="Make sure that your mobile number is subscribe to our service."
        />
        <InputFields
          value={formData.password}
          type="password"
          name="password"
          label="Password:"
          errors={errors}
          inputChange={inputChange}
          textHelper=""
        />
        <Box textAlign="center">
          <MainGradientBtn
            text="Sign In"
            icon={<FontAwesomeIcon icon={faSignInAlt} />}
            type="submit"
          />
        </Box>
      </form>
      <Typography variant="body1" className={classes.typography}>
        New here or already registered but doesn't have an account yet?{" "}
        {
          <TextLoginHighlight
            text="sign up"
            event={null}
            event2={null}
            historyLink="/signup"
          />
        }{" "}
        now!
      </Typography>
      <Typography variant="body1" className={classes.typography}>
        Have you forgotten your{" "}
        {
          <TextLoginHighlight
            text="password"
            event={setForgotPass}
            event2={null}
            historyLink={null}
          />
        }
        ?
      </Typography>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  typography: {
    color: theme.palette.neutrals.dark,
    fontSize: ".8rem",
    textAlign: "center",
    marginTop: theme.spacing(2),
  },
}));

export default SignIn;
