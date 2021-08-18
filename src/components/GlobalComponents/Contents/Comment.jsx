import React, { useEffect, useState } from "react";
import { Container, makeStyles, Typography } from "@material-ui/core";
import Moment from "react-moment";
import axios from "axios";

import { fetchUserData } from "../../../helperFunctions/usersFunc";

const Comment = ({ comment }) => {
  const classes = useStyles();
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const source = axios.CancelToken.source();
    fetchUserData(comment.ref.user, source)
      .then((res) => {
        setUserData(res);
      })
      .catch((error) => console.log(error));

    return () => {
      source.cancel("request cancelled");
    };
  }, [comment.ref.user]);
  return (
    <Container className={classes.container}>
      <Typography variant="body1" className={classes.descriptionTypo}>
        {comment.description}
      </Typography>
      <div>
        <Typography variant="caption">
          {`${userData.name?.firstName} ${userData.name?.lastName}`} |{" "}
          <Moment fromNow>{comment.createdAt}</Moment>
        </Typography>
      </div>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
    background: theme.palette.secondary.contrastText,
    marginBottom: theme.spacing(1),
    borderRadius: theme.shape.borderRadiusFive,
  },
  descriptionTypo: {
    fontSize: ".85rem",
    fontWeight: theme.typography.fontWeightRegular,
    color: theme.palette.neutrals.dark,
    marginBottom: theme.spacing(1),
  },
}));

export default Comment;
