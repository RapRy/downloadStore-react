import React from "react";
import { ListItemText, ListItem, makeStyles } from "@material-ui/core";

const ListDetail = ({ primary, secondary }) => {
  const classes = useStyles();
  return (
    <ListItem className={classes.listItem}>
      <ListItemText
        primary={primary}
        secondary={secondary}
        classes={{
          root: classes.listItemText,
          primary: classes.primaryText,
          secondary: classes.secondaryText,
        }}
      />
    </ListItem>
  );
};

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(0, 2, 1),
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  listItemText: {
    margin: 0,
  },
  primaryText: {
    fontSize: ".8rem",
    color: theme.palette.neutrals.dark,
    display: "inline",
    marginRight: theme.spacing(1),
    textTransform: "capitalize",
  },
  secondaryText: {
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.primary.dark,
    fontSize: ".9rem",
    display: "inline",
  },
}));

export default ListDetail;
