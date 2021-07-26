import React from "react";
import { makeStyles, Grid, Divider } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const MenuButton = ({ index, text, iconStart, iconEnd, link }) => {
  const classes = useStyles();
  return (
    <Link to={link} style={{ textDecoration: "none" }}>
      {index !== 0 && <Divider />}
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
          {text}
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
    padding: theme.spacing(0, 2),
    borderRadius: theme.shape.borderRadiusTen,
    margin: theme.spacing(2, 0),
    textTransform: "capitalize",
    fontWeight: theme.typography.fontWeightBold,
    fontSize: "1rem",
    cursor: "pointer",
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

export default MenuButton;
