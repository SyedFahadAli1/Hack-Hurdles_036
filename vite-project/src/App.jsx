import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import {Home} from "./components/home" 
import LoginForm from "./components/LoginForm"

import "./styles/styles.css"

import { Navbar } from "./components/navbar";
import SignUpForm from "./components/SignUpForm";


function App() {
  return (
    <>
     <Navbar/>
      <div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signup" element={<SignUpForm/>} />
          <Route path="/login" element={<LoginForm/>} />
        </Routes>
      </div>
      <h1>Code in progress....</h1>
    </>
  );
}

export default App;
