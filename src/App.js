import React, { useState } from "react";

import Logo from "./components/Logo";
import Post from "./components/Post";

import "./App.css";

function App() {
  const [posts, setPosts] = useState([
    {
      username: "Mickael Choi",
      imageUrl:
        "https://images.unsplash.com/photo-1559419381-c0cfcdb1e5e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1115&q=80",
      caption: "This is where I wanna go !",
    },
    {
      username: "Stella Choi",
      imageUrl:
        "https://images.unsplash.com/photo-1551650045-fc958c7b0452?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1064&q=80",
      caption: "My trip in Asia was incredible ! <3",
    },
    {
      username: "Alice Travouillon",
      imageUrl:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      caption: "Que bella e la pizza !",
    },
  ]);
  return (
    <div className="App">
      <header className="App__header">
        <div className="Header__logo">
          <Logo />
          <div className="Header__title">Instagram clone</div>
        </div>
      </header>
      {posts.map((post) => (
        <Post
          username={post.username}
          imageUrl={post.imageUrl}
          caption={post.caption}
        />
      ))}
    </div>
  );
}

export default App;
