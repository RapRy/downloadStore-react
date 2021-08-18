import React, { useEffect } from "react";
import { makeStyles, Modal, Backdrop, Fade } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { TextBodyLogin } from "../Typography";

const NotificationModal = ({ text, icon, type, open, setOpen }) => {
  const classes = useStyles({ type });

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 4000);
  }, [text, setOpen]);

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
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <TextBodyLogin text={text} />
            <FontAwesomeIcon icon={icon} size="4x" className={classes.icon} />
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
    textAlign: "center",
  },
  icon: {
    marginTop: theme.spacing(3),
    color: ({ type }) =>
      type === "success"
        ? theme.palette.primary.main
        : theme.palette.secondary.main,
  },
}));

export default NotificationModal;
