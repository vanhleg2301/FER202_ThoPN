import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Posts from "./components/Posts";
import PostDetail from "./components/PostDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Posts />} />
          <Route path='/post/:id' element={<PostDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
