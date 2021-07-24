import React, { useEffect } from "react";
import { Container, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

import Header from "../GlobalComponents/Header/Header";
import Featured from "./Featured/Featured";
import Categories from "./Categories/Categories";
import { PageLoader } from "../GlobalComponents/Loaders";
import { sign_in_ls, loading_status } from "../../redux/authReducer";

const profileLS = localStorage.getItem("profile");

const Main = () => {
  const classes = useStyles();
  const history = useHistory();
  const { profile, loadStatus } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (profileLS === null && _.isEmpty(profile)) {
      history.push("/signin");
      return;
    }

    if (_.isEmpty(profile) && !_.isEmpty(profileLS)) {
      dispatch(loading_status("loading"));
      dispatch(sign_in_ls(profileLS));
    }
  }, []);

  if (loadStatus === "loading") {
    return <PageLoader open={loadStatus === "loading" ? true : false} />;
  }

  return (
    !_.isEmpty(profile) && (
      <Container className={classes.container}>
        <Header />
        <Featured />
        <Categories />
      </Container>
    )
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(0),
  },
}));

export default Main;
