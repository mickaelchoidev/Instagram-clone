import React from "react";
import Avatar from "@material-ui/core/Avatar";

import "./Post.css";

function Post({ username, imageUrl, caption }) {
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
        <strong>{username} : </strong>
        {caption}
      </h4>
    </div>
  );
}

export default Post;
