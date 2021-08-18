import React, { useCallback, useState, useEffect } from "react";
import { Container, makeStyles, FormGroup, Box } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import _ from "lodash";

import { MainHeading, Paragraph } from "../../../GlobalComponents/Typography";
import { CheckboxField } from "../../../GlobalComponents/Forms";
import { SubGradientBtn } from "../../../GlobalComponents/Buttons";
import { ModalWithButtons } from "../../../GlobalComponents/Modals";
import { ButtonCircLoader } from "../../../GlobalComponents/Loaders";
import {
  update_account,
  deactivate_account,
} from "../../../../redux/authReducer";
import { updateSettings } from "../../../../api";

const initialData = {
  id: "",
  sms: false,
  email: false,
  updated: "",
};

const Settings = () => {
  const [formData, setFormData] = useState(initialData);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { profile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const onChange = useCallback(
    (e) => {
      if (formData[e.target.name] === true) {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: !formData[e.target.name],
        }));

        const updatedFormData = {
          ...formData,
          [e.target.name]: !formData[e.target.name],
          updated: e.target.name,
        };

        dispatch(
          update_account({
            formData: updatedFormData,
            apiRequest: updateSettings,
          })
        );

        return;
      }

      setFormData((prevState) => {
        switch (e.target.name) {
          case "sms":
            return {
              ...prevState,
              sms: true,
              email: false,
              updated: e.target.name,
            };
          case "email":
            return {
              ...prevState,
              sms: false,
              email: true,
              updated: e.target.name,
            };
          default:
            return prevState;
        }
      });

      let updatedFormData = { id: formData.id };

      switch (e.target.name) {
        case "sms":
          updatedFormData = {
            ...updatedFormData,
            sms: true,
            email: false,
            updated: e.target.name,
          };
          break;
        case "email":
          updatedFormData = {
            ...updatedFormData,
            sms: false,
            email: true,
            updated: e.target.name,
          };
          break;
        default:
          updatedFormData = formData;
          break;
      }

      dispatch(
        update_account({
          formData: updatedFormData,
          apiRequest: updateSettings,
        })
      );
    },
    [formData, dispatch]
  );

  const deactivateEvent = useCallback(() => {
    setLoading(true);

    dispatch(deactivate_account(formData.id))
      .unwrap()
      .then((result) => {
        setLoading(false);
        setOpen(false);
        history.push("/signin");
      });
  }, [formData.id, dispatch, history]);

  const toggleOpen = useCallback(() => {
    setOpen(!open);
  }, [open]);

  useEffect(() => {
    !_.isEmpty(profile) &&
      setFormData({
        id: profile.user?._id,
        sms: profile.user?.receiveUpdate?.sms,
        email: profile.user?.receiveUpdate?.email,
        updated: "",
      });
  }, [profile]);

  return (
    profile && (
      <div style={{ position: "absolute", width: "100%" }}>
        <ModalWithButtons
          open={open}
          setOpen={setOpen}
          text="Please tap or click on the Confirm Button to deactivate your account."
          primaryBtn={
            <SubGradientBtn
              text="confirm"
              icon={null}
              type="button"
              event={deactivateEvent}
              disabled={false}
            />
          }
        />
        <MainHeading text="account settings" />
        <Container>
          <div className={classes.formContainer}>
            <FormGroup>
              <CheckboxField
                checked={formData.sms}
                label="Receive new updates about our services and new contents via sms."
                name="sms"
                onChange={onChange}
                isLast={false}
              />
              <CheckboxField
                checked={formData.email}
                label="Receive new updates about our services and new contents via email."
                name="email"
                onChange={onChange}
                isLast={true}
              />
            </FormGroup>
          </div>
          <div className={classes.deactiContainer}>
            <Box marginBottom={2} textAlign="center" position="relative">
              <SubGradientBtn
                text="Deactivate Account"
                icon={null}
                type="button"
                event={toggleOpen}
                disabled={loading}
              />
              {loading && <ButtonCircLoader margTop={-3} />}
            </Box>
            <Paragraph
              text={
                "Deactivating your account will unsubscribe you to our services. You will no longer be able to use this app and download any contents from our services."
              }
              align="justify"
              lineHeight={1.4}
            />
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
  deactiContainer: {
    background: theme.palette.neutrals.main,
    borderRadius: theme.shape.borderRadiusFive,
    padding: theme.spacing(3),
  },
}));

export default Settings;
