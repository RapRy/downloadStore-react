import React, { useEffect } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { MainHeading } from "../../GlobalComponents/Typography";
import { get_featured_contents } from "../../../redux/contentReducer";

const Featured = () => {
  const classes = useStyles();
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  const { featuredContents } = useSelector((state) => state.contents);
  const dispatch = useDispatch();

  useEffect(() => {
    const promise = dispatch(get_featured_contents("all"));

    return () => {
      promise.abort();
    };
  }, [dispatch]);
  return (
    featuredContents && (
      <div className={classes.container}>
        <MainHeading text="featured" />
        <Slider {...settings}>
          {featuredContents.map((content) => (
            <div key={content._id} className={classes.slideContainer}>
              <Link
                to={`/${content.catName.replace(
                  " ",
                  "-"
                )}/${content.subCatName.replace(" ", "-")}/${content._id}`}
              >
                <div className={classes.slideDetails}>
                  <img
                    src={content.thumbnail}
                    alt={content.name}
                    className={classes.thumbnail}
                  />
                  <Typography variant="body1" className={classes.snippet}>
                    {content.snippet}
                  </Typography>
                </div>
                <div
                  style={{
                    background: `url(${content.banner})`,
                    backgroundSize: "cover",
                  }}
                  className={`${classes.slideBackImage} backImage`}
                ></div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    )
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(1),
  },
  slideContainer: {
    position: "relative",
    height: 240,
    cursor: "pointer",
    "&:hover .backImage": {
      transform: "perspective(0px) rotateX(0deg)",
    },
  },
  slideDetails: {
    position: "absolute",
    width: "82%",
    top: theme.spacing(4),
    left: "9%",
    zIndex: 1000,
  },
  slideBackImage: {
    width: "88%",
    height: 210,
    position: "absolute",
    top: theme.spacing(2),
    left: "6%",
    borderRadius: theme.shape.borderRadiusTen,
    boxShadow: theme.shadows[1],
    overflow: "hidden",
    transform: "perspective(600px) rotateX(20deg)",
    transition: "transform 1s ease 0s",
    "&::before": {
      content: '""',
      display: "block",
      width: "100%",
      height: "inherit",
      position: "absolute",
      top: 0,
      left: 0,
      background: "rgba(0,0,0,.3)",
    },
  },
  snippet: {
    fontSize: ".95rem",
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.secondary.contrastText,
    textShadow: theme.shadows[1],
  },
  thumbnail: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginBottom: theme.spacing(2),
    borderRadius: theme.shape.borderRadiusTen,
    boxShadow: theme.shadows[1],
  },
}));

export default Featured;
