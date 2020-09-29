import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "#fff9fb",
    // border: "2px solid #3f51b5",
    borderRadius: "4px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 3, 3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    color: "#08090a",
    marginBottom: "1rem",
    width: "60vw",
  },
  button: {
    fontSize: "1rem",
    padding: "0.5rem 0",
    width: "100%",
  },
}));

function SignUp(props) {
  const classes = useStyles();

  const {
    modalState,
    onCloseModal,
    username,
    email,
    password,
    onChangeUsername,
    onChangeEmail,
    onChangePassword,
    onSignUp,
  } = props;

  return (
    <div className="Modal__signup">
      <Modal
        className={classes.modal}
        open={modalState}
        onClose={onCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalState}>
          <form className={classes.paper} onSubmit={onSignUp}>
            <TextField
              required
              id="outlined-basic"
              className={classes.input}
              label="Username"
              variant="outlined"
              value={username}
              onChange={onChangeUsername}
            />
            <TextField
              required
              type="email"
              id="outlined-basic"
              className={classes.input}
              label="email"
              variant="outlined"
              value={email}
              onChange={onChangeEmail}
            />
            <TextField
              required
              type="password"
              id="outlined-basic"
              className={classes.input}
              label="Password"
              variant="outlined"
              value={password}
              onChange={onChangePassword}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              SIGN UP
            </Button>
          </form>
        </Fade>
      </Modal>
    </div>
  );
}

export default SignUp;
