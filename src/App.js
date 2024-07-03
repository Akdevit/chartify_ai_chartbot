// import logo from "./logo.svg";
import React from "react";
import "./App.css";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./Privaterout";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/Chartify" element={<PrivateRoute />}>
            <Route path="/Chartify" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
