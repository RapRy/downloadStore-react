import React from "react";
import { makeStyles, Modal, Backdrop, Fade } from "@material-ui/core";

const ModalWithLinks = ({ open, setOpen, text }) => {
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
          <div className={classes.paper}>{text}</div>
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
}));

export default ModalWithLinks;
