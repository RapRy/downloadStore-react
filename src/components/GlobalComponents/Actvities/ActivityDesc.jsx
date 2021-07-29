import React, { useState, useEffect } from "react";
import { Typography, Divider, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";

const ActivityDesc = ({ activity, ind }) => {
  const classes = useStyles();
  const [description, set] = useState("");
  const { profile } = useSelector((state) => state.auth);

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
