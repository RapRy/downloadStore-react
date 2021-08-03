import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, makeStyles, Typography, Grid } from "@material-ui/core";
import Glide from "react-glidejs";

import Header from "../GlobalComponents/Header/Header";
import { get_content_details } from "../../redux/contentReducer";

const ContentDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { selected } = useSelector((state) => state.contents);
  const { profile } = useSelector((state) => state.auth);
  const gliderRef = useRef(null);
  useEffect(() => {
    dispatch(get_content_details(id));
  }, [id, dispatch]);
  return (
    profile && (
      <Container className={classes.container}>
        <Header />
        <Container>
          {selected.filename === "apk" || selected.filename === "mp3" ? (
            <Grid
              container
              direction="row"
              spacing={2}
              alignItems="flex-end"
              className={classes.thumbGrid}
            >
              <Grid item xs={4}>
                <img
                  src={selected.thumbnail}
                  alt={selected.name}
                  className={classes.img}
                />
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h5" className={classes.contentName}>
                  {selected.name}
                </Typography>
                <Typography variant="body1" className={classes.subcategoryName}>
                  {selected.subCatName}
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <div>video</div>
          )}

          {selected.filename === "apk" && (
            <Glide ref={gliderRef} type="carousel" gap={20} startAt={0}>
              {selected.screenshots.map((image, i) => (
                <img key={i} src={image} alt={i} style={{ width: "100%" }} />
              ))}
            </Glide>
          )}

          <Typography variant="body1" className={classes.description}>
            {selected.description}
          </Typography>
        </Container>
      </Container>
    )
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(0),
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
  },
}));

export default ContentDetails;
