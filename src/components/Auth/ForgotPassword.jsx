import React, { useState, useCallback } from "react";
import { Divider, makeStyles, Box } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSms } from "@fortawesome/free-solid-svg-icons";

import { MainHeading } from "../GlobalComponents/Typography";
import { InputFields } from "../GlobalComponents/Forms";
import { MainGradientBtn } from "../GlobalComponents/Buttons";

const initialData = { mobile: "" }
const initialError = { mobile: "" } 

const ForgotPassword = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialData);
  const [error, setError] = useState(initialError);

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
          errors={error}
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
