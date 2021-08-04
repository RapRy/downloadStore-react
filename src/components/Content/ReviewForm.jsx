import React, { useState, useCallback, useEffect } from "react";
import { makeStyles, Box } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import { Textarea } from "../GlobalComponents/Forms";
import { MainGradientBtn } from "../GlobalComponents/Buttons";
import { create_review } from "../../redux/contentReducer";

const initialData = { review: "", contentId: "" };
const initialError = { review: "" };

const ReviewForm = ({ contentId }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialData);
  const [error, setError] = useState(initialError);
  const { loadStatus } = useSelector((state) => state.contents);
  const dispatch = useDispatch();

  const inputChange = useCallback(
    (e) => {
      if (error[e.target.name] !== "")
        setError((prevState) => ({ ...prevState, [e.target.name]: "" }));

      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    },
    [error]
  );

  const formSubmit = async (e) => {
    e.preventDefault();

    if (formData.review === "") {
      setError((prevState) => ({
        ...prevState,
        review: "Field is required.",
      }));
      return;
    }

    const promise = await dispatch(create_review(formData));

    if (promise.meta.requestStatus === "fulfilled") setFormData(initialData);
  };

  useEffect(() => {
    setFormData((prevState) => ({ ...prevState, contentId: contentId }));
  }, [contentId]);

  return (
    <div className={classes.container}>
      <form onSubmit={formSubmit}>
        <Textarea
          value={formData.review}
          type="text"
          label={null}
          errors={error}
          name="review"
          inputChange={inputChange}
          textHelper=""
        />
        <Box textAlign="center" position="relative">
          <MainGradientBtn
            text="post review"
            icon={null}
            type="submit"
            event={null}
            disabled={loadStatus === "loading" ? true : false}
          />
        </Box>
      </form>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
}));

export default ReviewForm;
