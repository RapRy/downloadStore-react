import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const Content = ({ content, size }) => {
  const classes = useStyles({ size });
  return (
    <div>
      <Link
        to={`/${content.catName.replace(" ", "-")}/${content.subCatName.replace(
          " ",
          "-"
        )}/${content._id}`}
        style={{ textDecoration: "none" }}
      >
        <img
          src={content.thumbnail}
          alt={content.name}
          className={classes.image}
        />
      </Link>
      <div>
        <Typography variant="body1" className={classes.text}>
          {content.name}
        </Typography>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  image: {
    borderRadius: theme.shape.borderRadiusTen,
    width: ({ size }) => size,
  },
  text: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontSize: ".8rem",
    color: theme.palette.neutrals.dark,
  },
}));

export default Content;
