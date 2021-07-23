import React from "react";
import { Backdrop, CircularProgress } from "@material-ui/core";

const PageLoader = ({ open }) => {
  return (
    <Backdrop open={open}>
      <CircularProgress />
    </Backdrop>
  );
};

export default PageLoader;
