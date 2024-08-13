import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/pages/home/Home";
import PhotoDetail from "./components/pages/photo.js/PhotoDetail";


function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/photo/:photoId" element={<PhotoDetail/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
