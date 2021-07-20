import React, { useContext } from "react";
import { Divider, makeStyles, Box } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSms } from "@fortawesome/free-solid-svg-icons";

import { MainHeading } from "../GlobalComponents/Typography";
import { InputFields } from "../GlobalComponents/Forms";
import { MainGradientBtn } from "../GlobalComponents/Buttons";
import { authContext } from "./authContext";

const ForgotPassword = () => {
  const classes = useStyles();
  const { formData, errors, inputChange } = useContext(authContext);
  return (
    <>
      <Divider className={classes.divider} />
      <MainHeading text={"forgot password"} />
      <form>
        <InputFields
          value={formData.mobile}
          type="text"
          name="mobile"
          label="Mobile Number:"
          errors={errors}
          inputChange={inputChange}
          textHelper=""
        />
        <Box textAlign="center" marginBottom="30px">
          <MainGradientBtn
            text="send sms"
            icon={<FontAwesomeIcon icon={faSms} />}
            type="submit"
          />
        </Box>
      </form>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(4, 0),
  },
}));

export default ForgotPassword;
