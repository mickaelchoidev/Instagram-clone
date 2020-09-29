import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { db } from "../config/Firebase";
import Avatar from "@material-ui/core/Avatar";
// import Button from "@material-ui/core/Button";

import "./Post.css";

function Post(props) {
  const { username, user, imageUrl, caption, postId } = props;
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

  // const commentsDate = (date) =>
  //   new Date(date.toDate()).toUTCString().split(" ").slice(0, 5).join(" ");

  return (
    <div className="Post">
      <div className="Post__header">
        <Avatar
          className="Post__avatar"
          src="/broken-image.jpg"
          alt={username}
        />
        <h3>{username}</h3>
      </div>
      <img className="Post__image" src={imageUrl} alt="post" />
      <div className="Post__description">
        <h4 className="Post__text">
          <strong className="Post__textUser">{username}</strong>
          {caption}
        </h4>
        <p className="Post__date">{/* {postDate} */}</p>
      </div>
      <div className="Post__comments">
        {comments.map((comment) => {
          return (
            <div className="Post__comment">
              <p>
                <strong className="Post__textUser">{comment.username}</strong>
                {comment.text}
              </p>
              <p className="Post__date">
                {/* {commentsDate(comment.timestamp)} */}
              </p>
            </div>
          );
        })}
      </div>
      {user && (
        <form className="Post__addComment">
          <input
            type="text"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit" disabled={!comment} onClick={onPostComment}>
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
