import React, { useState, useEffect } from "react";
import { makeStyles, Collapse } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import _ from "lodash";

import CatButton from "./CatButton";
import SubCategory from "./SubCategory";
import { get_contents_by_cat } from "../../../redux/contentReducer";

const Category = ({ cat, iconStart, iconEnd }) => {
  const [open, setOpen] = useState(true);
  const route = useRouteMatch();
  const classes = useStyles({ open });
  const dispatch = useDispatch();
  const { contents } = useSelector((state) => state.contents);

  useEffect(() => {
    if (route.params.cat !== "") {
      if (route.params?.cat?.replace("-", " ") === cat.catName) {
        dispatch(get_contents_by_cat(cat.catName)).then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            setOpen(true);
          }
        });

        return;
      }

      setOpen(false);
    }
  }, [route.params.cat]);
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
          {cat.subCategories.map(
            (subcat) =>
              !_.isEmpty(contents[subcat.subCatName]) && (
                <SubCategory key={subcat._id} subcat={subcat} open={open} />
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
