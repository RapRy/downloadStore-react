import React, { useEffect } from "react";
import { Container, CircularProgress, Box } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import { MainHeading } from "../../../GlobalComponents/Typography";
import { ActivityCard } from "../../../GlobalComponents/Actvities";
import { get_activities } from "../../../../redux/authReducer";

const profileLS = JSON.parse(localStorage.getItem("profile")).user;

const Activity = () => {
  const { profile, activities, loadStatus } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const promise = dispatch(
      get_activities(profile.user?._id || profileLS._id)
    );
    return () => {
      promise.abort();
    };
  }, [dispatch, profile.user?._id]);

  return (
    profile && (
      <div style={{ position: "absolute", width: "100%" }}>
        <MainHeading text="activity history" />
        <Container>
          {loadStatus === "loading" && (
            <Box textAlign="center" marginTop={10}>
              <CircularProgress />
            </Box>
          )}
          {activities &&
            activities.map((act, i) => <ActivityCard key={i} act={act} />)}
        </Container>
      </div>
    )
  );
};

export default Activity;
