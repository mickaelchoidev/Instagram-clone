import React, { useState, useEffect } from "react";
import { db, auth } from "./config/Firebase";
import Logo from "./components/Logo";
import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";
import Post from "./components/Post";
import Button from "@material-ui/core/Button";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import ImageUpload from "./components/ImageUpload";
import SideBar from "./components/SideBar";

import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openAddPost, setOpenAddPost] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const onOpenSignUp = () => setOpenSignUp(true);
  const onOpenSignIn = () => setOpenSignIn(true);
  const onCloseModal = () => {
    setOpenSignUp(false);
    setOpenSignIn(false);
  };
  const onOpenAddPost = () => setOpenAddPost(true);
  const onCloseAddPost = () => setOpenAddPost(false);
  const onchangeUsername = (e) => setUsername(e.target.value);
  const onchangeEmail = (e) => setEmail(e.target.value);
  const onchangePassword = (e) => setPassword(e.target.value);

  const onSignUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
    setOpenSignUp(false);
  };

  const onSignIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
    setOpenSignIn(false);
  };

  const onLogOut = () => auth.signOut();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in ...
        console.log(authUser.displayName);
        setUser(authUser);
        // if (authUser.displayName) {
        //   // don't update username
        // } else {
        //   // if we just created a user
        //   return authUser.updateProfile({
        //     displayName: username,
        //   });
        // }
      } else {
        // user has logged out ...
        setUser(null);
      }
    });
    return () => {
      // perform some cleanup actions
      unsubscribe();
    };
  }, [user, username]);

  // useEffect => runs the code based on a specific conditions
  useEffect(() => {
    // here is where the code runs
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        // every time a new post is added, this code will run
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <div className="Header__logo">
          <Logo />
          <div className="Header__title">Instagram clone</div>
        </div>

        {user ? (
          <div className="App__logContainer">
            <Button
              variant="contained"
              className="App__logButton"
              onClick={onLogOut}
            >
              LOG OUT
            </Button>
          </div>
        ) : (
          <div className="App__logContainer">
            <div className="App__logButton">
              <Button
                variant="contained"
                className="App__logButton"
                onClick={onOpenSignIn}
              >
                SIGN IN
              </Button>
            </div>
            <div className="App__logButton">
              <Button variant="contained" onClick={onOpenSignUp}>
                SIGN UP
              </Button>
            </div>
          </div>
        )}
      </header>

      {user?.displayName ? (
        <div className="App__addPost">
          <button onClick={onOpenAddPost} className="App__addPostButton">
            <AddRoundedIcon style={{ fontSize: 40, color: "#fff9fb" }} />
          </button>
          <ImageUpload
            username={user.displayName}
            modalAddState={openAddPost}
            onCloseAddPost={onCloseAddPost}
          />
        </div>
      ) : (
        <div className="App__addPost">
          <h3 className="App__notLogMessage">
            Sorry, you need to be logged in to upload an image :/
          </h3>
        </div>
      )}

      <SignUp
        modalState={openSignUp}
        onCloseModal={onCloseModal}
        username={username}
        email={email}
        password={password}
        onChangeUsername={onchangeUsername}
        onChangeEmail={onchangeEmail}
        onChangePassword={onchangePassword}
        onSignUp={onSignUp}
      />
      <SignIn
        modalState={openSignIn}
        onCloseModal={onCloseModal}
        email={email}
        password={password}
        onChangeEmail={onchangeEmail}
        onChangePassword={onchangePassword}
        onSignIn={onSignIn}
      />
      <SideBar />
      <div className="App__postsContainer">
        {posts.map(({ id, post }) => (
          <Post
            key={id}
            username={post.username}
            imageUrl={post.imageUrl}
            caption={post.caption}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
