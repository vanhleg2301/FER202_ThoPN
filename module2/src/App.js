import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Content from "./components/Content";
// import Footer from "./components/Footer";
// import Header from "./components/Header";
// import Courses from "./Courses.json";
import Companies from "./lab/Companies";
import Ex4 from "./lab/Ex_4";

function App() {
  // console.log(Courses.map(item => item.title));
  return (
    <Router>
      <Routes>
        {/* Uncomment and add routes as needed */}
        {/* <Route path="/header" element={<Header />} />
        <Route path="/content" element={<Content />}>
          <Route path="col1" element={<Content.Col1 />} />
          <Route path="col2" element={<Content.Col2 data={Courses} title="List of courses" />} />
        </Route>
        <Route path="/footer" element={<Footer />} /> */}
        <Route path="/" element={<Ex4 />} />
        <Route path="/companies" element={<Companies />} />
      </Routes>
    </Router>
  );
}

export default App;
