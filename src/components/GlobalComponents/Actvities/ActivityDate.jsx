import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const ActivityDate = ({ date }) => {
  const classes = useStyles();
  return (
    <div className={classes.dateContainer}>
      <Typography varinat="h2" className={classes.date}>
        {date.split(" ")[1].replace("th", "")}
      </Typography>
      <Typography varinat="h4" className={classes.month}>
        {date.split(" ")[0]}
      </Typography>
      <Typography varinat="h3" className={classes.year}>
        {date.split(" ")[2]}
      </Typography>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  dateContainer: {
    padding: theme.spacing(1),
    background: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadiusFive,
    textAlign: "center",
  },
  date: {
    fontSize: "1.8rem",
    fontWeight: 900,
    color: "#000",
  },
  month: {
    fontSize: ".9rem",
    color: theme.palette.neutrals.dark,
    fontWeight: theme.typography.fontWeightMedium,
    marginTop: "-5px",
  },
  year: {
    fontSize: "1.2rem",
    fontWeight: 900,
    color: theme.palette.neutrals.dark,
  },
}));

export default ActivityDate;
