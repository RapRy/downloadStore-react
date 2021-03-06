import React from "react";
import { makeStyles, Grid, Box } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";

import { ButtonCircLoader } from "../../GlobalComponents/Loaders";

const CatButton = ({ cat, iconStart, iconEnd, open, loading }) => {
  const classes = useStyles({ loading, open });

  const props = useSpring({
    to: { rotate: open ? "90deg" : "0deg" },
  });
  return (
    <Link
      to={`/category/${cat.catName.replace(" ", "-")}`}
      style={{ textDecoration: "none" }}
    >
      <Box position="relative">
        {loading && <ButtonCircLoader margTop={-12} />}
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
              style={{
                ...props,
                transformOrigin: "center",
                marginBottom: open ? "8px" : 0,
                marginLeft: open ? "20px" : 0,
              }}
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
    background: ({ loading }) =>
      loading
        ? theme.palette.neutrals.disabled
        : `linear-gradient(143deg, ${theme.palette.primary.light} 11.67%, ${theme.palette.primary.main} 80.27%)`,
    boxShadow: ({ loading }) => (loading ? theme.shadows[0] : theme.shadows[2]),
  },
  textRight: {
    textAlign: "right",
  },
  text: {
    fontSize: "1.2rem",
    fontWeight: 900,
    color: ({ loading }) =>
      loading ? theme.palette.neutrals.disabled : theme.palette.neutrals.dark,
  },
  colorIcon: {
    color: ({ loading }) =>
      loading ? theme.palette.neutrals.disabled : theme.palette.neutrals.dark,
  },
}));

export default CatButton;
