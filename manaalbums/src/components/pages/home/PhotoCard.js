import React, { useContext } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "../../../context/Context";
import "./PhotoCard.css";

export default function PhotoCard({
  photo,
  likesData,
  handleLike,
  handleComment,
  handleShare,
  users,
  getUserNameByAlbumId,
  getAlbumDescription,
  commentsData,
  albums,
}) {
  const { user } = useContext(AuthContext);

  const hasLiked = (photoId) => {
    const photoLikes = likesData?.find((like) => like?.photoId === photoId);
    return photoLikes?.userIds?.includes(user?.userId);
  };

  const getUserNamesWhoLiked = (photoId) => {
    const photoLikes = likesData?.find((like) => like?.photoId === photoId);
    const userIds = photoLikes?.userIds || [];
    return userIds
      .map((id) => users?.find((user) => user?.userId === id)?.name)
      .join(", ");
  };

  const getAvatarByAlbumId = (albumId) => {
    const album = albums?.find((album) => album?.albumsId === albumId);
    if (album) {
      const user = users?.find((user) => user?.id === album?.userId);
      return user?.avatar || "logo192.png";
    }
    return "logo192.png";
  };

  return (
    <div className='photo-card'>
      <Card.Header>
        <Row>
          <Col xs={2}>
            <Image
              width={50}
              height={50}
              src={"/assets/images/" + getAvatarByAlbumId(photo?.albumId)}
              alt={getUserNameByAlbumId(photo?.albumId)}
              className='rounded-circle'
            />
          </Col>
          <Col xs={10}>
            <div style={{ color: "black" }}>
              <strong>{getUserNameByAlbumId(photo?.albumId)}</strong>
            </div>
            <div style={{ color: "black" }}>
              {getAlbumDescription(photo?.albumId)}
            </div>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Link to={`photo/${photo?.id}`}>
          <Card.Img
            variant='top'
            src={
              photo?.images?.thumbnail.startsWith("http")
                ? photo?.images?.thumbnail
                : "/assets/images/" +
                  (photo?.images?.thumbnail || "logo192.png")
            }
            className='my-3'
          />
        </Link>
      </Card.Body>
      <Card.Footer>
        <Row>
          <Col sx={6} sm={6} md={6}>
            <div className='action'>
              <Card.Text style={{ color: "black" }}>
                <OverlayTrigger
                  placement='top'
                  overlay={
                    <Tooltip id={`tooltip-like-${photo?.id}`}>
                      {getUserNamesWhoLiked(photo?.id) || "No likes yet"}
                    </Tooltip>
                  }>
                  <span>
                    {likesData?.find((like) => like?.photoId === photo?.id)
                      ?.userIds.length || 0}{" "}
                    <i
                      className={
                        hasLiked(photo?.id) ? "bi bi-heart-fill" : "bi bi-heart"
                      }></i>{" "}
                    ·{" "}
                  </span>
                </OverlayTrigger>
                {commentsData?.filter(
                  (comment) => comment?.photoId === photo?.id
                ).length || 0}{" "}
                <i className='bi bi-chat-dots'></i> · 0{" "}
                <i className='bi bi-share'></i>
              </Card.Text>
            </div>
          </Col>
          <Col sx={6} sm={6} md={6}>
            <div className='text-center d-flex'>
              <Button
                onClick={() => handleLike(photo?.id)}
                variant={hasLiked(photo?.id) ? "light" : "light"}
                className='custom-button'>
                <i
                  className={
                    hasLiked(photo?.id) ? "bi bi-heart-fill" : "bi bi-heart"
                  }></i>
              </Button>

              <Button
                onClick={() => handleComment(photo?.id)}
                variant='light'
                className='custom-button'>
                <i className='bi bi-chat-dots'></i>
              </Button>

              <Button
                variant='light'
                className='custom-button'
                onClick={handleShare}>
                <i className='bi bi-share'></i>
              </Button>
            </div>
          </Col>
        </Row>
      </Card.Footer>
    </div>
  );
}
