import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAuMpyx8XUFGyPbrWIK1HhopzY-VhtB9co",
  authDomain: "instagram-clone-f162e.firebaseapp.com",
  databaseURL: "https://instagram-clone-f162e.firebaseio.com",
  projectId: "instagram-clone-f162e",
  storageBucket: "instagram-clone-f162e.appspot.com",
  messagingSenderId: "620900055294",
  appId: "1:620900055294:web:0efa522e70a31bdb154daf",
  measurementId: "G-9D6LQJ1893",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
