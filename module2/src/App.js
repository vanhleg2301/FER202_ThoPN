import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RowCol from "./components/ReactBootstrap/Grid/RowCol";

function App() {
  // console.log(Courses.map(item => item.title));
  return (
    <Router>
      <Routes>
        {/* <Route path="/content" element={<Content />}>
          <Route path="col1" element={<Content.Col1 />} />
          <Route path="col2" element={<Content.Col2 data={Courses} title="List of courses" />} />
        </Route>
        <Route path="/footer" element={<Footer />} /> */}
        {/*<Route path="/" element={<Ex4 />} />*/}
        {/*<Route path="/companies" element={<Companies />} />*/}

        <Route path="/grid" element={<RowCol />} />
      </Routes>
    </Router>
  );
}

export default App;
