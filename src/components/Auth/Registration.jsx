import React, { useContext, useCallback, useState } from "react";
import { Box } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileSignature } from "@fortawesome/free-solid-svg-icons";

import { MainHeading, TextBodyLogin } from "../GlobalComponents/Typography";
import { InputFields } from "../GlobalComponents/Forms";
import { MainGradientBtn } from "../GlobalComponents/Buttons";
import { ModalWithButtons } from "../GlobalComponents/Modals";
import { authContext } from "./authContext";

const Registration = () => {
  const { formData, errors, inputChange } = useContext(authContext);
  const [openModal, setOpenModal] = useState(false);

  const registerButton = useCallback(() => {
    setOpenModal(true);
  }, []);

  return (
    <>
      <ModalWithButtons
        open={openModal}
        setOpen={setOpenModal}
        text="You will receive a confirmation message via SMS.
After that you can proceed in creating your account."
        primaryBtn={null}
        secondaryBtn="close"
        primaryEvt={null}
      />
      <MainHeading text={"register to our service"} />
      <TextBodyLogin
        text="You need to register to our service before you sign up.
If you’re already registered just fill up the sign up form below."
      />
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
        <Box textAlign="center">
          <MainGradientBtn
            text="register"
            icon={<FontAwesomeIcon icon={faFileSignature} />}
            type="button"
            event={registerButton}
          />
        </Box>
      </form>
    </>
  );
};

export default Registration;
