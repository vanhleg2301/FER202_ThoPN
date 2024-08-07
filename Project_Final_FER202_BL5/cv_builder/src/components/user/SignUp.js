import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const handleSignUp = () => {
    toast.success("SignUp successfully", {
      autoClose: 1000,
    });

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <>
      <ToastContainer />
      
      <div
        style={{
          width: "100%",
          paddingTop: "150px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Form style={{ width: "30%" }}>
          <Form.Group className='mb-3' controlId='formGroupEmail'>
            <Form.Control type='email' placeholder='Enter email' />
          </Form.Group>
          <Form.Group className='mb-2' controlId='formGroupPassword'>
            <Form.Control type='password' placeholder='Password' />
          </Form.Group>
          <div className='text-center mb-3'>
            Already have an account?{" "}
            <Link style={{ textDecoration: "none" }} to='/'>
              Sign In
            </Link>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Button variant='light' onClick={handleSignUp}>
              Sign Up
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
