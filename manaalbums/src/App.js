import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/pages/home/Home";
import PhotoDetail from "./components/pages/photo.js/PhotoDetail";
import Login from "./components/pages/sign/Login";
import Regis from "./components/pages/sign/Regis";
import Profile from "./components/pages/profile/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />{" "}
          <Route path='/login' element={<Login />} />
          <Route path='/regis' element={<Regis />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/photo/:photoId' element={<PhotoDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
