import React, { useState } from "react";
import firebase from "firebase";
import { db, storage } from "../config/Firebase";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import "./ImageUpload.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "#dde3e4",
    border: "2px solid #3f51b5",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 3, 3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "100%",
  },
}));

function ImageUpload({ username, modalAddState, onCloseAddPost }) {
  const classes = useStyles();

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const onSelectImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const onUploadImage = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
        if (progress === 100) {
          onCloseAddPost();
        }
      },
      (error) => {
        // error message
        console.log(error.message);
        alert(error.message);
      },
      () => {
        // complete function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // post image inside db
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <Modal
      className={classes.modal}
      open={modalAddState}
      onClose={onCloseAddPost}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={modalAddState}>
        <div className={classes.paper}>
          {/* I want to have : */}
          {/* - Caption input */}
          {/* - file picker */}
          {/* - post button */}
          <progress
            value={progress}
            max="100"
            className="ImageUpload__progressBar"
          />
          <input
            type="file"
            className="ImageUpload__file"
            onChange={onSelectImage}
          />
          <textarea
            rows="5"
            placeholder="Write your caption here..."
            className="ImageUpload__caption"
            onChange={(e) => setCaption(e.target.value)}
            value={caption}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={onUploadImage}
            className={classes.button}
          >
            Upload
          </Button>
        </div>
      </Fade>
    </Modal>
  );
}

export default ImageUpload;
