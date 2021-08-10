import React, { useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, makeStyles, Typography, Grid } from "@material-ui/core";
import Glide from "react-glidejs";

import Header from "../GlobalComponents/Header/Header";
import { DownloadBtn } from "../GlobalComponents/Buttons";
import ReviewForm from "./ReviewForm";
import { Review } from "../GlobalComponents/Contents";
import { get_content_details } from "../../redux/contentReducer";
import {
  backToSignIn,
  dispatchToProfile,
} from "../../helperFunctions/usersFunc";

const ContentDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { selected, loadStatus } = useSelector((state) => state.contents);
  const { profile } = useSelector((state) => state.auth);
  const gliderRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    backToSignIn(history);
    dispatchToProfile(dispatch, profile);

    const promise = dispatch(get_content_details(id));

    console.log("run");

    return () => {
      promise.abort();
    };
  }, [id, dispatch, history, profile]);

  return (
    selected && (
      <Container className={classes.container}>
        <Header />
        <Container className={classes.detailsContainer}>
          {selected.details.filename === "apk" ||
          selected.details.filename === "mp3" ? (
            <Grid
              container
              direction="row"
              spacing={2}
              alignItems="flex-end"
              className={classes.thumbGrid}
            >
              <Grid item xs={4} sm={3}>
                <img
                  src={selected.details.thumbnail}
                  alt={selected.details.name}
                  className={classes.img}
                />
              </Grid>
              <Grid item xs={8} sm={9}>
                <Typography variant="h5" className={classes.contentName}>
                  {selected.details.name}
                </Typography>
                <Typography variant="body1" className={classes.subcategoryName}>
                  {selected.details.subCatName}
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <div>
              <video
                preload="metadata"
                controlsList="nodownload"
                disablePictureInPicture
                controls
                style={{ width: "100%" }}
              >
                <source
                  src={`${process.env.PUBLIC_URL}/assets/video.mp4`}
                  type="video/mp4"
                />
              </video>
              <div className={classes.videoTextContainer}>
                <Typography variant="h5" className={classes.contentName}>
                  {selected.details.name}
                </Typography>
                <Typography variant="body1" className={classes.subcategoryName}>
                  {selected.details.subCatName}
                </Typography>
              </div>
            </div>
          )}

          {selected.details.filename === "apk" && (
            <Glide ref={gliderRef} type="carousel" gap={20} startAt={0}>
              {selected.details.screenshots.map((image, i) => (
                <img key={i} src={image} alt={i} style={{ width: "100%" }} />
              ))}
            </Glide>
          )}

          {selected.details.filename === "mp3" && (
            <audio
              preload="metadata"
              controlsList="nodownload"
              disablePictureInPicture
              controls
              style={{ width: "100%" }}
            >
              <source
                src={`${process.env.PUBLIC_URL}/assets/music.mp3`}
                type="audio/mp3"
              />
            </audio>
          )}

          <Typography variant="body1" className={classes.description}>
            {selected.details.description}
          </Typography>

          <ReviewForm contentId={selected.details._id} />

          <div>
            {selected.reviews.map((review, i) => (
              <Review key={review._id} review={review} index={i} />
            ))}
          </div>
        </Container>

        <div className={classes.downloadContainer}>
          <DownloadBtn size={selected.details.filesize} />
        </div>
      </Container>
    )
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(0),
    position: "relative",
  },
  detailsContainer: {
    paddingBottom: theme.spacing(17),
  },
  thumbGrid: {
    margin: theme.spacing(2, 0),
  },
  img: {
    width: 110,
    height: 110,
    borderRadius: theme.shape.borderRadiusTen,
  },
  contentName: {
    fontSize: "1.2rem",
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.neutrals.dark,
  },
  subcategoryName: {
    fontSize: ".9rem",
    color: theme.palette.neutrals.dark,
    marginBottom: theme.spacing(3),
  },
  description: {
    marginTop: theme.spacing(2),
    fontSize: ".9rem",
    color: theme.palette.neutrals.dark,
    textAlign: "justify",
  },
  videoTextContainer: {
    marginTop: theme.spacing(1),
  },
  downloadContainer: {
    position: "fixed",
    left: 0,
    bottom: 0,
    width: "100%",
    background: theme.palette.neutrals.main,
    boxShadow: theme.shadows[1],
    padding: theme.spacing(3, 6),
    textAlign: "center",
  },
}));

export default ContentDetails;
