import React from "react";
import { makeStyles, Modal, Backdrop, Fade, Grid } from "@material-ui/core";

import { TextBodyLogin } from "../Typography";
import { CloseBtn } from "../Buttons";

const ModalWithButtons = ({ open, setOpen, text, primaryBtn }) => {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <TextBodyLogin text={text} />
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={2}
              className={classes.gridContainer}
            >
              {primaryBtn !== null && (
                <Grid item xs={6}>
                  {primaryBtn}
                </Grid>
              )}
              <Grid item xs={6}>
                <CloseBtn event={handleClose} />
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    borderRadius: theme.shape.borderRadiusTen,
    padding: theme.spacing(3),
    margin: theme.spacing(0, 3),
  },
  gridContainer: {
    marginTop: theme.spacing(2),
  },
}));

export default ModalWithButtons;
