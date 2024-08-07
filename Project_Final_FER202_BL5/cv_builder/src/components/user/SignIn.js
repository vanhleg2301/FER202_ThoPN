import React from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function SignIn() {
  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    window.location.reload();
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          paddingTop: "150px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Form style={{  width: "30%"}}>
          <Form.Group className='mb-3' controlId='formGroupEmail'>
            <Form.Control type='email' placeholder='Enter email' />
          </Form.Group>
          <Form.Group className='mb-2' controlId='formGroupPassword'>
            <Form.Control type='password' placeholder='Password' />
          </Form.Group>
          <div className='text-center mb-3'>
            Don't have an account?{" "}
            <Link style={{ textDecoration: "none" }} to='/signup'>
              Sign Up
            </Link>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Button variant='light' onClick={handleLogin}>
              Sign In
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
