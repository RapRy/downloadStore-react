import React, { useContext, useState, useCallback } from "react";
import { Divider, makeStyles, Typography, Box } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileSignature } from "@fortawesome/free-solid-svg-icons";

import {
  MainHeading,
  TextLoginHighlight,
} from "../GlobalComponents/Typography";
import { InputFields } from "../GlobalComponents/Forms";
import { MainGradientBtn } from "../GlobalComponents/Buttons";
import { ModalWithLinks } from "../GlobalComponents/Modals";
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

export const Text = ({ classes, event, event2 }) => {
  return (
    <Typography
      variant="body1"
      className={`${classes.typography} ${classes.marginTop0}`}
    >
      You have succesfully created your account. You can now proceed to{" "}
      {<TextLoginHighlight text="sign in" event={event} event2={event2} />} your
      account.
    </Typography>
  );
};

const SignUp = () => {
  const classes = useStyles();
  const { setSignUp } = useContext(authContext);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState(initialErrors);

  const inputChange = useCallback((e) => {
  if(e.target.name === "mobile"){
    if(isNaN(e.target.value)){
      return;
    }
  }

  setFormData((prevState) => {
    return { ...prevState, [e.target.name]: e.target.value }
  })
}, []) 

  const showModal = () => {
    setOpenModal(true);
  };

  return (
    <>
      <ModalWithLinks
        open={openModal}
        setOpen={setOpenModal}
        text={
          <Text classes={classes} event={setSignUp} event2={setOpenModal} />
        }
      />
      <Divider className={classes.divider} />
      <MainHeading text="create account" />
      <Typography variant="body1" className={classes.typography}>
        Already have an account?{" "}
        {<TextLoginHighlight text="sign in" event={setSignUp} event2={null} />}!
      </Typography>
      <form>
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
        <Box textAlign="center" marginBottom="30px">
          <MainGradientBtn
            text="sign up"
            icon={<FontAwesomeIcon icon={faFileSignature} />}
            type="button"
            event={showModal}
          />
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
