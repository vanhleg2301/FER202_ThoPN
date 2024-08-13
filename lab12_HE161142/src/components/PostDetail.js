import React from "react";
import { Link, useParams } from "react-router-dom";
import PostData from "../data/posts.json";
import UserData from "../data/users.json";
import { Button, Card, Col, Row } from "react-bootstrap";

export default function PostDetail() {
  const { id } = useParams(); // Get the post ID from the URL parameters
  const post = PostData?.find((p) => p?.id === parseInt(id)); // Find the post with the given ID
  const postBy = UserData?.find((u) => u?.id === post?.userId); // Find the user who created the post

  if (!post) {
    return <h2>Post not found</h2>; // Show a message if the post doesn't exist
  }

  return (
    <>
      <div className="m-4 text-center">
        <Button as={Link} to="/" className="m-3">
          Back to posts
        </Button>
        <h1>Post Detail</h1>
        {postBy && (
          <>
            <h3>Post by:</h3>
            <p>{postBy?.name}</p>
          </>
        )}
        <h4>Post Id:</h4>
        <p>{post?.id}</p>
        <Row>
          <Col md={{ span: 12, offset: 3 }}>
            <Card style={{ width: "50%" }}>
              <Card.Body>
                <Card.Title>{post?.title}</Card.Title>
                <Card.Text>{post?.body}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
