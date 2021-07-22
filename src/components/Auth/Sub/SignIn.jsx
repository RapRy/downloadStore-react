import React, { useState, useCallback } from "react";
import { makeStyles, Box, Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";

import {
  MainHeading,
  TextLoginHighlight,
} from "../../GlobalComponents/Typography";
import { InputFields } from "../../GlobalComponents/Forms";
import { MainGradientBtn } from "../../GlobalComponents/Buttons";
import { ButtonCircLoader } from "../../GlobalComponents/Loaders";
import { baseUrl, signInRoute } from "../../../api";
import { sign_in_api, loading_status } from "../../../redux/authReducer";

const initialData = { mobile: "", password: "" };
const initialErrors = { mobile: "", password: "" };

const SignIn = ({ setForgotPass }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState(initialErrors);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const inputChange = useCallback(
    (e) => {
      if (e.target.name === "mobile") {
        if (isNaN(e.target.value)) {
          return;
        }
      }

      if (errors[e.target.name] !== "")
        setErrors((prevState) => ({ ...prevState, [e.target.name]: "" }));

      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    },
    [errors]
  );

  const formSubmit = async (e) => {
    e.preventDefault();
    if (formData.mobile === "") {
      setErrors((prevState) => ({
        ...prevState,
        mobile: "Field is required.",
      }));
      return;
    }

    if (formData.password === "") {
      setErrors((prevState) => ({
        ...prevState,
        password: "Field is required.",
      }));
      return;
    }

    setLoading(true);
    dispatch(loading_status("loading"));
    console.log(formData);

    try {
      const { data, status } = await baseUrl.post(signInRoute, formData);

      if (status === 200) {
        setLoading(false);
        setFormData(initialData);
        dispatch(sign_in_api(data));
      }
    } catch (error) {
      const { status, data } = error.response;

      setLoading(false);
      dispatch(loading_status("failure"));

      if (status === 404 || status === 400) {
        setErrors((prevState) => ({ ...prevState, mobile: data.message }));
        return;
      } else {
        console.log(error);
      }
    }
  };

  return (
    <>
      <MainHeading text={"account login"} />
      <form onSubmit={formSubmit}>
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
        <Box textAlign="center" position="relative">
          <MainGradientBtn
            text="Sign In"
            icon={<FontAwesomeIcon icon={faSignInAlt} />}
            type="submit"
            event={null}
            disabled={loading}
          />
          {loading && <ButtonCircLoader />}
        </Box>
      </form>
      <Typography variant="body1" className={classes.typography}>
        New here or already registered but doesn't have an account yet?{" "}
        {
          <TextLoginHighlight
            text="sign up"
            primaryEvent={null}
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
            primaryEvent={setForgotPass}
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
