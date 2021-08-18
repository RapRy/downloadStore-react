import React from "react";
import { Button, makeStyles } from "@material-ui/core";

const DownloadBtn = ({ size }) => {
  const classes = useStyles();
  return (
    <Button
      classes={{ root: classes.root, contained: classes.contained }}
      variant="contained"
      type="button"
    >
      DOWNLOAD {`(${size} MB)`}
    </Button>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 5),
    borderRadius: theme.shape.borderRadiusFive,
    textTransform: "uppercase",
    fontWeight: theme.typography.fontWeightBold,
    fontSize: "1rem",
  },
  contained: {
    background: `linear-gradient(143deg, ${theme.palette.primary.light} 11.67%, ${theme.palette.primary.main} 80.27%)`,
    width: "100%",
    maxWidth: 300,
    boxShadow: theme.shadows[2],
  },
}));

export default DownloadBtn;
