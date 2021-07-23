import React, { useCallback, useState } from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileSignature } from "@fortawesome/free-solid-svg-icons";

import {
  MainHeading,
  TextBodyLogin,
  TextLoginHighlight,
} from "../../GlobalComponents/Typography";
import { InputFields } from "../../GlobalComponents/Forms";
import { MainGradientBtn } from "../../GlobalComponents/Buttons";
import {
  ModalWithButtons,
  ModalWithLinks,
} from "../../GlobalComponents/Modals";
import { ButtonCircLoader } from "../../GlobalComponents/Loaders";

import { registerRoute } from "../../../api";

const initialData = { mobile: "" };
const initialError = { mobile: "" };

export const Text = ({ primaryEvent }) => {
  const classes = useStyles();

  return (
    <Typography
      variant="body1"
      className={`${classes.typography} ${classes.marginTop0}`}
    >
      Welcome back to our service! You may proceed to{" "}
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

const Registration = () => {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [error, setError] = useState(initialError);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const inputChange = useCallback(
    (e) => {
      if (e.target.name === "mobile") {
        if (isNaN(e.target.value)) {
          return;
        }
      }

      if (error[e.target.name] !== "") setError(initialError);

      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    },
    [error]
  );

  const formSubmit = async (e) => {
    e.preventDefault();
    if (formData.mobile === "") {
      setError((prevState) => ({
        ...prevState,
        mobile: "Field is required.",
      }));
      return;
    }

    setLoading(true);

    try {
      const { data, status } = await registerRoute(formData);

      if (status === 200) {
        setLoading(false);
        setMessage(data.message);
        setOpenModal(true);
        setFormData(initialData);
      }
    } catch (error) {
      const { status, data } = error.response;
      if (status === 400) {
        setLoading(false);
        setError({ mobile: data.message });
      } else {
        console.log(error);
      }
    }
  };

  return (
    <>
      {message === "success" ? (
        <ModalWithLinks
          open={openModal}
          setOpen={null}
          text={<Text primaryEvent={setOpenModal} />}
        />
      ) : (
        <ModalWithButtons
          open={openModal}
          setOpen={setOpenModal}
          text={message}
          primaryBtn={null}
          secondaryBtn="close"
          primaryEvt={null}
        />
      )}
      <MainHeading text={"register to our service"} />
      <TextBodyLogin
        text="You need to register to our service before you sign up.
If you’re already registered just fill up the sign up form below."
      />
      <form onSubmit={formSubmit}>
        <InputFields
          value={formData.mobile}
          type="text"
          name="mobile"
          label="Mobile Number:"
          errors={error}
          inputChange={inputChange}
          textHelper=""
        />
        <Box textAlign="center" position="relative">
          <MainGradientBtn
            text="register"
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

export default Registration;
