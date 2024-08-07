import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Cv from "./components/Cv";
import Manager from "./components/cvComponents/Manager";
import SignIn from "./components/user/SignIn";
import SignUp from "./components/user/SignUp";
import Profile from "./components/user/profile";

function App() {

  return ( 
    <Router>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route path='/' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Route>
        <Route path='/profile' element={<Profile />} />
        <Route path='/template' element={<Cv />} />
        <Route path='/manage' element={<Manager />} />
      </Routes>
    </Router>
  );
}

export default App;
