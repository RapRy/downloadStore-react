import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { MainHeading } from "../../../GlobalComponents/Typography";

const profileLS = localStorage.getItem("profile");

const initialData = {
  proPic: "",
  firstName: "",
  lastName: "",
};

const initialErrors = {
  proPic: "",
  firstName: "",
  lastName: "",
};

const EditProfile = () => {
  const [formData, setFormData] = useState();
  const { profile } = useSelector((state) => state.auth);
  const history = useHistory();

  useEffect(() => {
    // backToSignIn(profile, history);
  }, [profile, history]);

  return (
    profile && (
      <div>
        <MainHeading text="edit profile" />
        <Container></Container>
      </div>
    )
  );
};

export default EditProfile;
