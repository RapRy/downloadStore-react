import React, { useCallback, useState } from "react";
import { Box } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileSignature } from "@fortawesome/free-solid-svg-icons";

import { MainHeading, TextBodyLogin } from "../GlobalComponents/Typography";
import { InputFields } from "../GlobalComponents/Forms";
import { MainGradientBtn } from "../GlobalComponents/Buttons";
import { ModalWithButtons } from "../GlobalComponents/Modals";

import { baseUrl , registerRoute } from '../../api';

const initialData = { mobile: "" }
const initialError = { mobile: "" }

const Registration = () => {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [error, setError] = useState(initialError);
  const [message, setMessage] = useState("");

const inputChange = useCallback((e) => {
  if(e.target.name === "mobile"){
    if(isNaN(e.target.value)){
      return;
    }
  }

  if(error[e.target.name] !== "") setError(initialError)

  setFormData((prevState) => {
    return { ...prevState, [e.target.name]: e.target.value }
  })

}, []) 


  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, status } = await baseUrl.post(registerRoute, formData);

      if(status === 200){
        setMessage(data.message)
        setOpenModal(true)
        setFormData(initialData)
      }
    } catch (error) {
      const { status, data } = error.response
      if(status === 500){
        setError({ mobile: data.message })
      }else{
        console.log(error)
      }
    }
  }

  return (
    <>
      <ModalWithButtons
        open={openModal}
        setOpen={setOpenModal}
        text={message}
        primaryBtn={null}
        secondaryBtn="close"
        primaryEvt={null}
      />
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
        <Box textAlign="center">
          <MainGradientBtn
            text="register"
            icon={<FontAwesomeIcon icon={faFileSignature} />}
            type="submit"
            event={null}
          />
        </Box>
      </form>
    </>
  );
};

export default Registration;
