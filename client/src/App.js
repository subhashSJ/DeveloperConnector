import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

const App = () => (
  <Router>
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Landing />} />
      </Routes>
      <section className="container">
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </section>
    </>
  </Router>
);

export default App;
