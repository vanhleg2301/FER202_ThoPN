import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function PhotoCard({
  photo,
  likedPhotos,
  handleLike,
  handleComment,
  getUserNameByAlbumId,
  getAlbumDescription,
  commentsData,
}) {
  return (
    <Col md={12}>
      <Card className='mt-4 mb-4'>
        <Card.Header>
          <Row>
            <Col xs={1}>
              <img
                width={50}
                height={50}
                src='logo192.png'
                alt='User Profile'
                className='rounded-circle'
              />
            </Col>
            <Col xs={11}>
              <div>
                <strong>{getUserNameByAlbumId(photo?.albumId)}</strong>
              </div>
              <div className='text-muted' style={{ fontSize: "0.9rem" }}>
                {getAlbumDescription(photo?.albumId)}
              </div>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Card.Title>{photo?.title}</Card.Title>
          <Link to={`photo/${photo?.id}`}>
            <Card.Img
              variant='top'
              src={photo?.images?.thumbnail}
              className='my-3'
            />
          </Link>
          <Card.Text className='text-muted'>
            {likedPhotos[photo?.id] ? (
              <>
                1 <i className='bi bi-heart-fill'></i>
              </>
            ) : (
              <>
                0 <i className='bi bi-heart'></i>
              </>
            )}{" "}
            {
              commentsData?.filter((comment) => comment?.photoId === photo?.id)
                .length
            }{" "}
            <i className='bi bi-chat-dots'></i> · 0{" "}
            <i className='bi bi-share'></i>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Row className='text-center'>
            <Col>
              <Button
                onClick={() => handleLike(photo?.id)}
                variant={likedPhotos[photo?.id] ? "primary" : "light"}
                className='w-100 custom-button'
                style={{ borderRadius: "3px" }}>
                {likedPhotos[photo?.id] ? "Liked" : "Like"}
              </Button>
            </Col>
            <Col>
              <Button
                onClick={() => handleComment(photo?.id)}
                variant='light'
                className='w-100 custom-button'
                style={{ borderRadius: "0" }}>
                Comment
              </Button>
            </Col>
            <Col>
              <Button
                variant='light'
                className='w-100 custom-button'
                style={{ borderRadius: "0" }}>
                Share
              </Button>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Col>
  );
}
