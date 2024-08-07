import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "./Header";
import Spinner from "react-bootstrap/Spinner";
import { Button, Col, Container, Row } from "react-bootstrap";

export default function Home() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      // Simulate a loading delay
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1222); // Adjust the delay as needed (e.g., 2000ms for 2 seconds)

      // Cleanup the timer if the component unmounts before the timer finishes
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  return (
    <>
      <Header />
      <div
        style={{
          backgroundImage: "url(georgie-cobbs-bKjHgo_Lbpo-unsplash.jpg)", // Set background image
          backgroundSize: "cover", // Ensure background image covers the entire element
          backgroundPosition: "center", // Center the background image
          backgroundRepeat: "no-repeat", // Prevent background image from repeating
          width: "100%",
          height: "607px", // Element size
          overflow: "hidden",
          backgroundColor: "rgba(0, 0, 0, 0)", // Transparent background color
          position: "relative", // Enable positioning of inner elements
        }}>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}>
            <Spinner animation='border' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </Spinner>
          </div>
        ) : isLoggedIn ? (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}>
            <Button variant='light' as={Link} to='/create'>Create now</Button>
          </div>
        ) : (
          <Outlet />
        )}
        <div
          style={{
            position: "absolute",
            bottom: "50%",
            left: "9%",
            width: "20%",
            // backgroundColor: "rgba(255, 255, 255, 0.7)", // Optional: background color for better readability
            padding: "10px",
            borderRadius: "5px", // Optional: rounded corners
          }}>
          <Container>
            <Row className='justify-content-center'>
              <Col md={12}>
                <h5
                  className='text-black'
                  style={{ fontFamily: "Gupter, serif", textAlign: "center" }}>
                  All that is valuable in human society depends on the
                  opportunity for harmonious development in each individual.
                </h5>
                <h6
                  className='text-secondary'
                  style={{ fontFamily: "Georgia, serif", textAlign: "center" }}>
                  The difference between genius and stupidity is that genius
                  always has its limits.
                </h6>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}
