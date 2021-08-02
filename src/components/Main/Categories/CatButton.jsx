import React from "react";
import { makeStyles, Grid, Box } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { useSelector } from "react-redux";

import { ButtonCircLoader } from "../../GlobalComponents/Loaders";

const CatButton = ({ cat, iconStart, iconEnd, open }) => {
  const { loadStatus } = useSelector((state) => state.contents);
  const classes = useStyles({ loadStatus, open });

  const props = useSpring({
    to: { rotate: open ? "90deg" : "0deg" },
  });
  return (
    <Link
      to={`/category/${cat.catName.replace(" ", "-")}`}
      style={{ textDecoration: "none" }}
    >
      <Box position="relative">
        {loadStatus === "loading" && <ButtonCircLoader margTop={-12} />}
        <Grid
          container
          direction="row"
          className={classes.root}
          alignItems="center"
        >
          <Grid item xs={1}>
            <FontAwesomeIcon icon={iconStart} className={classes.colorIcon} />
          </Grid>
          <Grid item xs={10} className={classes.text}>
            {cat.catName}
          </Grid>
          <Grid item xs={1} className={classes.textRight}>
            <animated.div
              style={{ ...props, transformOrigin: "center", width: "16px" }}
            >
              <FontAwesomeIcon
                icon={iconEnd}
                size="lg"
                className={classes.colorIcon}
              />
            </animated.div>
          </Grid>
        </Grid>
      </Box>
    </Link>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 4),
    borderRadius: theme.shape.borderRadiusTen,
    marginTop: theme.spacing(2),
    textTransform: "uppercase",
    fontWeight: theme.typography.fontWeightBold,
    fontSize: "1rem",
    background: ({ loadStatus, open }) =>
      loadStatus === "loading" && open
        ? theme.palette.neutrals.disabled
        : `linear-gradient(143deg, ${theme.palette.primary.light} 11.67%, ${theme.palette.primary.main} 80.27%)`,
    boxShadow: ({ loadStatus, open }) =>
      loadStatus === "loading" && open ? theme.shadows[0] : theme.shadows[2],
  },
  textRight: {
    textAlign: "right",
  },
  text: {
    fontSize: "1.2rem",
    fontWeight: 900,
    color: ({ loadStatus, open }) =>
      loadStatus === "loading" && open
        ? theme.palette.neutrals.disabled
        : theme.palette.neutrals.dark,
  },
  colorIcon: {
    color: ({ loadStatus, open }) =>
      loadStatus === "loading" && open
        ? theme.palette.neutrals.disabled
        : theme.palette.neutrals.dark,
  },
}));

export default CatButton;
