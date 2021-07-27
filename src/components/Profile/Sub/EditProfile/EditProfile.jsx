import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Button,
  makeStyles,
  Typography,
  Box,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { faSave, faCheck } from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";

import { MainHeading } from "../../../GlobalComponents/Typography";
import { MainGradientBtn } from "../../../GlobalComponents/Buttons";
import { InputFields } from "../../../GlobalComponents/Forms";
import { ButtonCircLoader } from "../../../GlobalComponents/Loaders";
import { update_profile } from "../../../../redux/authReducer";
import { NotificationModal } from "../../../GlobalComponents/Modals";

const initialData = {
  id: "",
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
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState(initialErrors);
  const [open, setOpen] = useState(false);
  const { profile, loadStatus, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const classes = useStyles();
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
    // if (formData.proPic === "") {
    //   setErrors((prevState) => ({
    //     ...prevState,
    //     proPic: "Field is required.",
    //   }));
    // }

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

    if (
      formData.firstName === profile.user?.name?.firstName &&
      formData.lastName === profile.user?.name?.lastName
    ) {
      return;
    }

    const result = await dispatch(update_profile(formData));

    if (
      result.meta.requestStatus === "fulfilled" ||
      result.meta.requestStatus === "rejected"
    )
      setOpen(true);
  };

  useEffect(() => {
    !_.isEmpty(profile) &&
      setFormData({
        id: profile.user._id,
        proPic: profile.user.proPic,
        firstName: profile.user.name.firstName,
        lastName: profile.user.name.lastName,
      });
  }, [profile]);

  return (
    profile && (
      <div style={{ position: "absolute", width: "100%" }}>
        {loadStatus === "idle" && (
          <NotificationModal
            text="Profile Updated"
            icon={faCheck}
            type="success"
            open={open}
            setOpen={setOpen}
          />
        )}
        <MainHeading text="edit profile" />
        <Container>
          <div style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              type="button"
              classes={{
                root: classes.changeProBtn,
                contained: classes.containedBtn,
              }}
            >
              change profile picture
            </Button>
            <Typography variant="body1" className={classes.labelP}>
              Accepted formats jpg and png only.
            </Typography>
          </div>

          <div className={classes.formContainer}>
            <form onSubmit={formSubmit}>
              <InputFields
                value={formData.firstName}
                type="text"
                name="firstName"
                label="First Name:"
                errors={errors}
                inputChange={inputChange}
                textHelper={null}
              />
              <InputFields
                value={formData.lastName}
                type="text"
                name="lastName"
                label="Last Name:"
                errors={errors}
                inputChange={inputChange}
                textHelper={null}
              />
              <Box textAlign="center" position="relative">
                <MainGradientBtn
                  text="Save Changes"
                  icon={faSave}
                  type="submit"
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
  changeProBtn: {
    padding: theme.spacing(1, 2),
    borderRadius: theme.shape.borderRadiusFive,
    textTransform: "capitalize",
    fontSize: ".9rem",
    color: theme.palette.neutrals.dark,
    marginBottom: theme.spacing(1),
    fontWeight: theme.typography.fontWeightBold,
  },
  containedBtn: {
    background: `linear-gradient(143deg, ${theme.palette.primary.light} 11.67%, ${theme.palette.primary.main} 80.27%)`,
    boxShadow: theme.shadows[2],
  },
  labelP: {
    fontSize: ".8rem",
    color: theme.palette.neutrals.dark,
  },
  formContainer: {
    margin: theme.spacing(3, 0),
  },
}));

export default EditProfile;
