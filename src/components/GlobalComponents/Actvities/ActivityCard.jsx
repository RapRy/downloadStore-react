import React from "react";
import { makeStyles, Grid } from "@material-ui/core";

import ActivityDesc from "./ActivityDesc";
import ActivityDate from "./ActivityDate";

const ActivityCard = ({ act, bg }) => {
  const classes = useStyles({ bg });
  return (
    <div className={classes.cardContainer}>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={4}>
          <ActivityDate date={act.refDate} />
        </Grid>
        <Grid item xs={8}>
          {act.activities.map((activity, i) => (
            <ActivityDesc key={activity._id} activity={activity} ind={i} />
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    background: ({ bg }) =>
      bg !== "white"
        ? theme.palette.neutrals.light
        : theme.palette.primary.contrastText,
    borderRadius: theme.shape.borderRadiusFive,
    boxShadow: theme.shadows[1],
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
}));

export default ActivityCard;
