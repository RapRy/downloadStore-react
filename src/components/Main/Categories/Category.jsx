import React, { useState, useEffect } from "react";
import { makeStyles, Collapse } from "@material-ui/core";
import { useRouteMatch } from "react-router-dom";

import CatButton from "./CatButton";
import SubCategory from "./SubCategory";

const Category = ({ cat, iconStart, iconEnd }) => {
  const [open, setOpen] = useState(false);
  const route = useRouteMatch();
  const classes = useStyles({ open });

  useEffect(() => {
    if (route.path !== "/") {
      if (route.params.cat.replace("-", " ") === cat.catName) {
        if (!open) setOpen(!open);
      }
    }
  }, [route.params.cat]);
  return (
    <div className={classes.mainContainer}>
      <CatButton
        cat={cat}
        iconStart={iconStart}
        iconEnd={iconEnd}
        setOpen={setOpen}
      />
      <Collapse in={open} timeout="auto" unmountOnExit>
        {cat.subCategories.map((subcat) => (
          <SubCategory key={subcat._id} subcat={subcat} />
        ))}
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
}));

export default Category;
