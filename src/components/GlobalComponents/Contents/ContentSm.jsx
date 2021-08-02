import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const ContentSm = ({ content }) => {
  const classes = useStyles();
  return (
    <div>
      <img
        src={content.thumbnail}
        alt={content.name}
        className={classes.image}
      />
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
    width: 100,
  },
  text: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontSize: ".8rem",
    color: theme.palette.neutrals.dark,
  },
}));

export default ContentSm;
