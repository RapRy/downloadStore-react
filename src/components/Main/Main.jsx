import React, { useEffect } from "react";
import { Container, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Header from "../GlobalComponents/Header/Header";
import Featured from "./Featured/Featured";
import Categories from "./Categories/Categories";
import { PageLoader } from "../GlobalComponents/Loaders";
import { backToSignIn, dispatchToProfile } from "../../helperFunctions";

const Main = () => {
  const classes = useStyles();
  const history = useHistory();
  const { profile, loadStatus } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    backToSignIn(profile, history);
    dispatchToProfile(profile, dispatch);
  }, [dispatch, history, profile]);

  if (loadStatus === "loading") {
    return <PageLoader open={loadStatus === "loading" ? true : false} />;
  }

  return (
    profile && (
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
