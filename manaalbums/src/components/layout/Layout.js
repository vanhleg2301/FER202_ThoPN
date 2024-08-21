import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <>
      <Header />
      <div className='p-4 min-vh-100' >
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
