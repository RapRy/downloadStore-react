import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Container,
  Grid,
  Typography,
  Button,
  Divider,
} from "@material-ui/core";
import axios from "axios";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";

import { ReviewAvatar } from "../Avatar";
import CommentForm from "../../Content/CommentForm";
import CommentList from "../../Content/CommentList";
import { fetchUserData } from "../../../helperFunctions/usersFunc";

const Review = ({ review, index }) => {
  const classes = useStyles();
  const [userData, setUserData] = useState({});
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();

    fetchUserData(review.ref.user, source)
      .then((res) => {
        setUserData(res);
      })
      .catch((error) => console.log(error));

    return () => {
      source.cancel();
    };
  }, [review.ref.user]);
  return (
    <Container className={classes.container}>
      <Grid container spacing={2} direction="row">
        <Grid item xs={2}>
          <ReviewAvatar proPic={userData.proPic} />
        </Grid>
        <Grid item xs={10}>
          <Typography
            variant="h6"
            className={classes.nameTypo}
          >{`${userData.name?.firstName} ${userData.name?.lastName}`}</Typography>
          <Typography variant="body1" className={classes.descriptionTypo}>
            {review.description}
          </Typography>
          <Divider />
          <div>
            <Typography variant="caption">
              <Moment fromNow>{review.createdAt}</Moment>
            </Typography>
            <Button
              classes={{
                root: classes.commentBtn,
                startIcon: classes.btnIconSize,
              }}
              startIcon={<FontAwesomeIcon icon={faComments} />}
              onClick={() => setOpenForm((prevState) => !prevState)}
            >
              comment
            </Button>
          </div>
          {openForm && (
            <CommentForm
              contentId={review.ref?.content}
              reviewId={review._id}
              indexReview={index}
            />
          )}
          <CommentList comments={review.comments} />
        </Grid>
      </Grid>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    background: theme.palette.neutrals.light,
    borderRadius: theme.shape.borderRadiusFive,
    marginTop: theme.spacing(4),
  },
  nameTypo: {
    fontSize: ".9rem",
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.neutrals.dark,
  },
  descriptionTypo: {
    fontSize: ".85rem",
    fontWeight: theme.typography.fontWeightRegular,
    color: theme.palette.neutrals.dark,
    marginBottom: theme.spacing(1),
  },
  commentBtn: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: ".8rem",
    color: theme.palette.neutrals.dark,
    marginLeft: theme.spacing(2),
    textTransform: "capitalize",
  },
  btnIconSize: {
    "&.MuiButton-iconSizeMedium > *:first-child": {
      fontSize: ".9rem",
    },
  },
}));

export default Review;
