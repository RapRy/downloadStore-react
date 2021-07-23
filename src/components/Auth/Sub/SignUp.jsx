import React, { useState, useCallback } from "react";
import { Divider, makeStyles, Typography, Box } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileSignature } from "@fortawesome/free-solid-svg-icons";

import {
  MainHeading,
  TextLoginHighlight,
} from "../../GlobalComponents/Typography";
import { InputFields } from "../../GlobalComponents/Forms";
import { MainGradientBtn } from "../../GlobalComponents/Buttons";
import { ModalWithLinks } from "../../GlobalComponents/Modals";
import { ButtonCircLoader } from "../../GlobalComponents/Loaders";
import { signUpRoute } from "../../../api";

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

export const Text = ({ classes, primaryEvent }) => {
  return (
    <Typography
      variant="body1"
      className={`${classes.typography} ${classes.marginTop0}`}
    >
      You have succesfully created your account. You can now proceed to{" "}
      {
        <TextLoginHighlight
          text="sign in"
          primaryEvent={primaryEvent}
          historyLink="/signin"
        />
      }{" "}
      your account.
    </Typography>
  );
};

const SignUp = () => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState(initialErrors);
  const [loading, setLoading] = useState(false);

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

  const submitForm = async (e) => {
    e.preventDefault();
    if (formData.firstName === "") {
      setErrors((prevState) => ({
        ...prevState,
        firstName: "Field is required.",
      }));
      return;
    }

    if (formData.lastName === "") {
      setErrors((prevState) => ({
        ...prevState,
        lastName: "Field is required.",
      }));
      return;
    }

    if (formData.mobile === "") {
      setErrors((prevState) => ({
        ...prevState,
        mobile: "Field is required.",
      }));
      return;
    }

    if (formData.email === "") {
      setErrors((prevState) => ({
        ...prevState,
        email: "Field is required.",
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

    if (formData.password !== formData.confirmPassword) {
      setErrors((prevState) => ({
        ...prevState,
        confirmPassword: "Password didn.t match.",
      }));
      return;
    }

    setLoading(true);

    try {
      const { data, status } = await signUpRoute(formData);

      if (status === 200 && data.message === "success") {
        setLoading(false);
        setOpenModal(true);
        setFormData(initialData);
      }
    } catch (error) {
      const { status, data } = error.response;
      if (status === 400) {
        setLoading(false);
        setErrors((prevState) => ({ ...prevState, [data.key]: data.message }));
      } else {
        console.log(error);
      }
    }
  };

  return (
    <>
      <ModalWithLinks
        open={openModal}
        setOpen={null}
        text={<Text classes={classes} primaryEvent={setOpenModal} />}
      />
      <Divider className={classes.divider} />
      <MainHeading text="create account" />
      <Typography variant="body1" className={classes.typography}>
        Already have an account?{" "}
        {
          <TextLoginHighlight
            text="sign in"
            primaryEvent={null}
            secondaryEvent={null}
            historyLink="/signin"
          />
        }
        !
      </Typography>
      <form onSubmit={submitForm}>
        <InputFields
          value={formData.firstName}
          type="text"
          name="firstName"
          label="First Name:"
          errors={errors}
          inputChange={inputChange}
          textHelper=""
        />
        <InputFields
          value={formData.lastName}
          type="text"
          name="lastName"
          label="Last Name:"
          errors={errors}
          inputChange={inputChange}
          textHelper=""
        />
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
          value={formData.email}
          type="email"
          name="email"
          label="Email Address:"
          errors={errors}
          inputChange={inputChange}
          textHelper=""
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
        <InputFields
          value={formData.confirmPassword}
          type="password"
          name="confirmPassword"
          label="Confirm Password:"
          errors={errors}
          inputChange={inputChange}
          textHelper=""
        />
        <Box textAlign="center" marginBottom="30px" position="relative">
          <MainGradientBtn
            text="sign up"
            icon={<FontAwesomeIcon icon={faFileSignature} />}
            type="submit"
            event={null}
            disabled={loading}
          />
          {loading && <ButtonCircLoader />}
        </Box>
      </form>
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
  divider: {
    margin: theme.spacing(4, 0),
  },
  marginTop0: {
    marginTop: 0,
  },
}));

export default SignUp;
