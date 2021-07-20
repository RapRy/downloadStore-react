import React, { useState, useCallback } from "react";
import { Container, makeStyles } from "@material-ui/core";

import HeadBg from "../GlobalComponents/Backgrounds/HeadBg";
import { InputFields } from "../GlobalComponents/Forms";
import { MainHeading } from "../GlobalComponents/Typography";

const initialData = {
  mobile: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const initialErrors = {
  mobile: "field is required",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialData);
  const [erros, setErrors] = useState(initialErrors);

  const inputChange = useCallback(
    (e) => {
      if (e.target.name === "mobile") {
        if (isNaN(e.target.value)) {
          return;
        }
      }
      // setFormData({ ...formData, [e.target.name]: e.target.value })
      setFormData((prevState) => {
        return { ...prevState, [e.target.name]: e.target.value };
      });
    },
    [formData]
  );

  return (
    <Container>
      <MainHeading text="Subscriber login" />
      <form>
        <InputFields
          value={formData.mobile}
          type="text"
          name="mobile"
          label="Mobile Number:"
          errors={erros}
          inputChange={inputChange}
        />
        <InputFields
          value={formData.password}
          type="password"
          name="password"
          label="Password:"
          errors={erros}
          inputChange={inputChange}
        />
        <InputFields
          value={formData.email}
          type="email"
          name="email"
          label="Email Address:"
          errors={erros}
          inputChange={inputChange}
        />
      </form>
      {/* <HeadBg /> */}
    </Container>
  );
};

const useStyles = makeStyles({});

export default Auth;
