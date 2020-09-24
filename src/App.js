import React from "react";

import Logo from "./components/Logo";

import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App__header">
        <div className="Header__logo">
          <Logo />
          <div className="Header__title">Instagram clone</div>
        </div>
      </header>
    </div>
  );
}

export default App;
