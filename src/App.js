import React, { useState, useEffect } from "react";
import { db } from "./config/Firebase";

import Logo from "./components/Logo";
import Post from "./components/Post";

import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);

  ///////////////////////******************///////////////////////

  // useEffect => runs the code based on a speific conditions
  useEffect(() => {
    // here is where the code runs
    db.collection("posts").onSnapshot((snapshot) => {
      // every time a new post is added, this code will run
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

  ///////////////////////******************///////////////////////

  return (
    <div className="App">
      <header className="App__header">
        <div className="Header__logo">
          <Logo />
          <div className="Header__title">Instagram clone</div>
        </div>
      </header>
      {posts.map(({ id, post }) => (
        <Post
          key={id}
          username={post.username}
          imageUrl={post.imageUrl}
          caption={post.caption}
        />
      ))}
    </div>
  );
}

export default App;
