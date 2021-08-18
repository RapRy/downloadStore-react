import React, { useState, useEffect } from "react";
import { Typography, Divider, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";

import { getContentViaReviewId, getContentsViaCommentId } from "../../../api";

const ActivityDesc = ({ activity, ind }) => {
  const classes = useStyles();
  const [description, set] = useState("");
  const { profile } = useSelector((state) => state.auth);

  const apiRequest = async (apiReq, id, activityRef) => {
    const { data, status } = await apiReq(id);

    if (status === 200) {
      const { name, subCatName } = data.content;

      if (activityRef === "review") {
        set(`You wrote a review about ${name} in ${subCatName} Category.`);
        return;
      }

      if (activityRef === "comment") {
        set(
          `You wrote a comment on a review about ${name} in ${subCatName} Category.`
        );
        return;
      }
    }
  };

  useEffect(() => {
    const { type, activityRef, activityDesc } = activity;
    switch (type) {
      case "updateProfile":
        set(
          profile.user?.accountType === "user"
            ? `You change your name to ${activityDesc}`
            : `user changed name`
        );
        break;
      case "changePassword":
        set(
          profile.user?.accountType === "user"
            ? `You updated your account security.`
            : `user changed password`
        );
        break;
      case "updateSettings":
        if (activityDesc === "true") {
          set(
            profile.user?.accountType === "user"
              ? `You marked ${activityRef.toUpperCase()}. You will now be receiving updates via ${activityRef.toUpperCase()}.`
              : `user switch receiving updates to ${activityRef.toUpperCase()}.`
          );
          break;
        } else {
          set(
            profile.user?.accountType === "user"
              ? `You unmarked ${activityRef.toUpperCase()}. You won't be receiving anymore updates from us.`
              : `user switch receiving updates to ${activityRef.toUpperCase()}.`
          );
          break;
        }
      case "wroteReview":
        if (activityRef === "review") {
          apiRequest(getContentViaReviewId, activityDesc, activityRef);
          break;
        }

        if (activityRef === "comment") {
          apiRequest(getContentsViaCommentId, activityDesc, activityRef);
          break;
        }
        break;
      default:
        set("");
        break;
    }
  }, [activity, profile.user?.accountType]);

  return (
    <>
      {ind !== 0 && <Divider />}
      <div className={classes.container}>
        <Typography variant="caption" className={classes.timeStamp}>
          {activity.refTime}
        </Typography>
        <Typography variant="body1" className={classes.desc}>
          {description}
        </Typography>
      </div>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1, 0),
  },
  timeStamp: {
    color: theme.palette.primary.dark,
    marginBottom: theme.spacing(1),
    display: "block",
  },
  desc: {
    fontSize: ".8rem",
    color: theme.palette.neutrals.dark,
  },
}));

export default ActivityDesc;
