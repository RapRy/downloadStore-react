import React from "react";
import { makeStyles, Button } from "@material-ui/core";

const CloseBtn = ({ event }) => {
  const classes = useStyles();
  return (
    <Button classes={{ root: classes.root }} onClick={event}>
      close
    </Button>
  );
};
const useStyles = makeStyles((theme) => ({
  root: {
    width: "150px",
    padding: theme.spacing(1, 4),
    borderRadius: theme.shape.borderRadiusFive,
    marginTop: theme.spacing(2),
    textTransform: "uppercase",
    fontWeight: 700,
    fontSize: "1rem",
    color: theme.palette.neutrals.dark,
    background: theme.palette.neutrals.main,
  },
}));

export default CloseBtn;
