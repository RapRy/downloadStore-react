import React from "react";
import { makeStyles, Grid } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const CatButton = ({ cat, iconStart, iconEnd }) => {
  const classes = useStyles();
  return (
    <Link to={"/"} style={{ textDecoration: "none" }}>
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
          <FontAwesomeIcon
            icon={iconEnd}
            size="lg"
            className={classes.colorIcon}
          />
        </Grid>
      </Grid>
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
    background: `linear-gradient(143deg, ${theme.palette.primary.light} 11.67%, ${theme.palette.primary.main} 80.27%)`,
    boxShadow: theme.shadows[2],
  },
  textRight: {
    textAlign: "right",
  },
  text: {
    fontSize: "1.2rem",
    fontWeight: 900,
    color: theme.palette.neutrals.dark,
  },
  colorIcon: {
    color: theme.palette.neutrals.dark,
  },
}));

export default CatButton;
