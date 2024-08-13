import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RowCol from "./components/ReactBootstrap/Grid/RowCol";
import Layout from "./components/layout/Layout";
import Home from "./components/Home";
import Login from "./components/ReactBootstrap/Grid/Login";
import Register from "./components/ReactBootstrap/Grid/Register";
import TodoItem from "./components/TodoItem";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          {/* <Route path="/content" element={<Content />}>
          <Route path="col1" element={<Content.Col1 />} />
          <Route path="col2" element={<Content.Col2 data={Courses} title="List of courses" />} />
              </Route>
         
          {/* <Route path="/companies" element={<Companies />} /> */}
          <Route path='/' element={<Home />} />
          <Route path='/grid' element={<RowCol />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/todo' element={<TodoItem />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
