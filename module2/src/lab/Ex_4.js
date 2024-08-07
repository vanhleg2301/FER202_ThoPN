import React from "react";
import HeaderLab from "./HeaderLab";

export default function Ex4() {
  return (
    <>
      <HeaderLab/>
      <div className='text-center'>
        <div>
          <h1>
            Hello <strong style={{ color: "blue" }}>React</strong>
          </h1>
        </div>
        <div>
          <img
            src='logo192.png'
            width='220'
            height='220'
            style={{ borderBottom: "solid blue 2px" }}
            className='d-inline-block align-top'
            alt='Logo'
          />
        </div>
        <div>
          <p style={{ color: "blue", fontStyle: "italic" }}>
            {" "}
            This is a react logo{" "}
          </p>
          <p style={{ fontWeight: "lighter", fontStyle: "italic" }}>
            (Something write here)
          </p>
          <p> This library for web and native user interfaces </p>
        </div>
      </div>
    </>
  );
}
