import React, { useState, useEffect } from "react";
import { makeStyles, Collapse } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import _ from "lodash";
import axios from "axios";

import CatButton from "./CatButton";
import SubCategory from "./SubCategory";
import { get_contents_by_cat } from "../../../redux/contentReducer";

const Category = ({ cat, iconStart, iconEnd }) => {
  const [open, setOpen] = useState(false);
  const [viewAll, setViewAll] = useState("");
  const route = useRouteMatch();
  const classes = useStyles({ open });
  const dispatch = useDispatch();
  const { contents } = useSelector((state) => state.contents);

  useEffect(() => {
    setViewAll("");
    const source = axios.CancelToken.source();
    if (route.params.cat !== undefined) {
      if (route.params?.cat?.replace("-", " ") === cat.catName) {
        const args = { cat: cat.catName, source: source };
        dispatch(get_contents_by_cat(args)).then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            setOpen(true);
            return;
          }
        });
      }

      return () => {
        source.cancel();
        setOpen(false);
      };
    }
  }, [route.params.cat, cat.catName, dispatch]);
  return (
    <div className={classes.mainContainer}>
      <CatButton
        cat={cat}
        iconStart={iconStart}
        iconEnd={iconEnd}
        open={open}
      />
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div className={classes.subContainer}>
          {viewAll === ""
            ? cat.subCategories.map(
                (subcat) =>
                  !_.isEmpty(contents[subcat.subCatName]) && (
                    <SubCategory
                      key={subcat._id}
                      subcat={subcat}
                      setViewAll={setViewAll}
                      viewAll={viewAll}
                    />
                  )
              )
            : cat.subCategories.map(
                (subcat) =>
                  subcat.subCatName === viewAll && (
                    <SubCategory
                      key={subcat._id}
                      subcat={subcat}
                      setViewAll={setViewAll}
                      viewAll={viewAll}
                    />
                  )
              )}
        </div>
      </Collapse>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    background: theme.palette.secondary.contrastText,
    boxShadow: ({ open }) => (open ? theme.shadows[1] : theme.shadows[0]),
    borderRadius: theme.shape.borderRadiusTen,
  },
  subContainer: {
    padding: theme.spacing(2),
  },
}));

export default Category;
