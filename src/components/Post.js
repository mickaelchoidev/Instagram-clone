import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { db } from "../config/Firebase";
import Avatar from "@material-ui/core/Avatar";
// import Button from "@material-ui/core/Button";

import "./Post.css";

function Post({ username, user, imageUrl, caption, postId }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => unsubscribe();
  }, [postId]);

  const onPostComment = (e) => {
    e.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="Post">
      <div className="Post__header">
        <Avatar
          className="Post__avatar"
          src="https://images.unsplash.com/photo-1594616838951-c155f8d978a0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
          alt="avatar"
        />
        <h3>{username}</h3>
      </div>
      <img className="Post__image" src={imageUrl} alt="post" />
      <h4 className="Post__text">
        <strong className="Post__textUser">{username}</strong>
        {caption}
      </h4>
      <div className="Post__comments">
        {comments.map((comment) => (
          <p>
            <strong className="Post__textUser">{comment.username}</strong>
            {comment.text}
          </p>
        ))}
      </div>
      {user && (
        <form className="Post__comment">
          <input
            type="text"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="submit"
            className="Post__button"
            disabled={!comment}
            onClick={onPostComment}
          >
            POST
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
