import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";

import { MainHeading } from "../../GlobalComponents/Typography";
import { get_featured_contents } from "../../../redux/contentReducer";

const Featured = () => {
  const classes = useStyles();
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const dispatch = useDispatch();
  const { featuredContents, error, loadStatus } = useSelector(
    (state) => state.contents
  );

  useEffect(() => {
    const promise = dispatch(get_featured_contents());

    return () => {
      promise.abort();
    };
  }, [dispatch]);
  return (
    <div className={classes.container}>
      <MainHeading text="featured" />
      <Slider {...settings}>
        {featuredContents.map((content) => (
          <div key={content._id}>
            <h3>{content.name}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(1),
  },
}));

export default Featured;
