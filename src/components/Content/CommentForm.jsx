import React, { useState, useCallback, useEffect } from "react";
import { Box } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import { Textarea } from "../GlobalComponents/Forms";
import { MainGradientBtn } from "../GlobalComponents/Buttons";
import { create_comment } from "../../redux/contentReducer";

const initialData = { comment: "", contentId: "", reviewId: "" };
const initialError = { comment: "" };

const CommentForm = ({ contentId, reviewId, indexReview }) => {
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

    if (formData.comment === "") {
      setError((prevState) => ({
        ...prevState,
        comment: "Field is required.",
      }));
      return;
    }

    const rawData = { formData, indexReview };
    const promise = await dispatch(create_comment(rawData));

    if (promise.meta.requestStatus === "fulfilled") setFormData(initialData);
  };

  useEffect(() => {
    setFormData((prevState) => ({ ...prevState, contentId, reviewId }));
  }, [contentId, reviewId]);
  return (
    <div>
      <form onSubmit={formSubmit}>
        <Textarea
          value={formData.comment}
          type="text"
          label={null}
          errors={error}
          name="comment"
          inputChange={inputChange}
          textHelper=""
        />
        <Box textAlign="right" position="relative">
          <MainGradientBtn
            text="post comment"
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

export default CommentForm;
