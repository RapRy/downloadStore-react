import React, { useEffect, useState } from "react";
import { makeStyles, Container } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  faRocket,
  faBox,
  faMusic,
  faVideo,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import Category from "./Category";
import { get_categories } from "../../../redux/categoriesReducer";

const icons = {
  Videos: faVideo,
  Games: faRocket,
  Apps: faBox,
  Music: faMusic,
};

const Categories = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { loadStatus, categories } = useSelector((state) => state.categories);

  useEffect(() => {
    const promise = dispatch(get_categories("all"));

    return () => {
      promise.abort();
    };
  }, [dispatch]);

  return (
    loadStatus === "idle" && (
      <Container className={classes.container}>
        {categories.map((cat) => (
          <Category
            key={cat._id}
            cat={cat}
            iconStart={icons[cat.catName]}
            iconEnd={faChevronRight}
          />
        ))}
      </Container>
    )
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
}));

export default Categories;
