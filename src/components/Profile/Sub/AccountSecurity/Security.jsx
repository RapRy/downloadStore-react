import React, { useState, useEffect, useCallback } from "react";
import { Container, makeStyles, Box } from "@material-ui/core";
import {
  faSave,
  faCheckCircle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import { MainHeading } from "../../../GlobalComponents/Typography";
import { MainGradientBtn } from "../../../GlobalComponents/Buttons";
import { InputFields } from "../../../GlobalComponents/Forms";
import { NotificationModal } from "../../../GlobalComponents/Modals";
import { ButtonCircLoader } from "../../../GlobalComponents/Loaders";
import { update_account } from "../../../../redux/authReducer";
import { updateSecurity } from "../../../../api";

const initialData = {
  id: "",
  password: "",
  confirmPassword: "",
};

const initialErrors = {
  password: "",
  confirmPassword: "",
};

const Security = () => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState(initialErrors);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { profile, loadStatus, error } = useSelector((state) => state.auth);

  const inputChange = useCallback(
    (e) => {
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

    if (formData.password === "") {
      setErrors((prevState) => ({
        ...prevState,
        password: "Field is required.",
      }));
      return;
    }

    if (formData.confirmPassword === "") {
      setErrors((prevState) => ({
        ...prevState,
        confirmPassword: "Field is required.",
      }));
      return;
    }

    if (formData.confirmPassword !== formData.password) {
      setErrors((prevState) => ({
        ...prevState,
        confirmPassword: "Password didn.t match.",
      }));
      return;
    }

    const result = await dispatch(
      update_account({ formData, apiRequest: updateSecurity })
    );

    if (
      result.meta.requestStatus === "fulfilled" ||
      result.meta.requestStatus === "rejected"
    ) {
      setOpen(true);
    }
  };

  useEffect(() => {
    !_.isEmpty(profile) &&
      setFormData((prevState) => ({ ...prevState, id: profile.user._id }));
  }, [profile]);

  return (
    profile && (
      <div style={{ position: "absolute", width: "100%" }}>
        {loadStatus === "idle" && (
          <NotificationModal
            text="password changed"
            icon={faCheckCircle}
            type="success"
            open={open}
            setOpen={setOpen}
          />
        )}
        {loadStatus === "failed" && (
          <NotificationModal
            text={error.message}
            icon={faExclamationCircle}
            type="warning"
            open={open}
            setOpen={setOpen}
          />
        )}
        <MainHeading text="account security" />
        <Container>
          <div className={classes.formContainer}>
            <form onSubmit={formSubmit}>
              <InputFields
                value={formData.password}
                type="password"
                name="password"
                label="New Password:"
                errors={errors}
                inputChange={inputChange}
                textHelper={null}
              />
              <InputFields
                value={formData.confirmPassword}
                type="password"
                name="confirmPassword"
                label="Confirm Password:"
                errors={errors}
                inputChange={inputChange}
                textHelper={null}
              />
              <Box textAlign="center" position="relative">
                <MainGradientBtn
                  text="Save Changes"
                  icon={faSave}
                  type="button"
                  event={null}
                  disabled={loadStatus === "loading" ? true : false}
                />
                {loadStatus === "loading" && <ButtonCircLoader />}
              </Box>
            </form>
          </div>
        </Container>
      </div>
    )
  );
};

const useStyles = makeStyles((theme) => ({
  formContainer: {
    margin: theme.spacing(3, 0),
  },
}));

export default Security;
