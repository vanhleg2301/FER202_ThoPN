import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Row, Col, Button, Image } from "react-bootstrap";
import Uploader from "./Uploader";
import Comments from "./Comments";
import PostComment from "./PostComment";
import AuthContext from "../../../context/Context";

export default function PhotoDetail() {
  const { photoId } = useParams();
  const { user } = useContext(AuthContext);
  const [photo, setPhoto] = useState(null);
  const [album, setAlbum] = useState(null);
  const [uploader, setUploader] = useState(null);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9999/photos/${photoId}`
        );
        const photoData = response?.data;
        setPhoto(photoData);
        setSelectedImage(photoData?.images?.url[0]);
        setCurrentIndex(0);

        if (photoData?.albumId) {
          const albumResponse = await axios.get(
            `http://localhost:9999/albums/${photoData?.albumId}`
          );
          const albumData = albumResponse?.data;
          setAlbum(albumData);

          if (albumData?.userId) {
            const userResponse = await axios.get(
              `http://localhost:9999/users/${albumData?.userId}`
            );
            setUploader(userResponse?.data);
          }
        }
      } catch (error) {
        console.error("Error fetching photo, album, or uploader:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9999/comments?photoId=${photoId}`
        );
        setComments(response?.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:9999/users");
        setUsers(response?.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchPhoto();
    fetchComments();
    fetchUsers();
  }, [photoId]);

  const uniqueImages = Array.from(new Set(photo?.images?.url || []));
  const visibleCount = 4; // Number of visible thumbnails at a time

  const handleImageClick = (url, index) => {
    setSelectedImage(url);
    setCurrentIndex(index);
  };

  const handleNextImage = () => {
    const newIndex = (currentIndex + 1) % uniqueImages.length;
    setSelectedImage(uniqueImages[newIndex]);
    setCurrentIndex(newIndex);
  };

  const handlePreviousImage = () => {
    const newIndex = (currentIndex - 1 + uniqueImages.length) % uniqueImages.length;
    setSelectedImage(uniqueImages[newIndex]);
    setCurrentIndex(newIndex);
  };

  const handleScrollLeft = () => {
    setScrollOffset(prevOffset => Math.max(prevOffset - 100, 0));
  };

  const handleScrollRight = () => {
    const maxOffset = Math.max(0, (uniqueImages.length - visibleCount) * 100);
    setScrollOffset(prevOffset => Math.min(prevOffset + 100, maxOffset));
  };

  return (
    <div className='container mt-4 mb-4'>
      <Row>
        <Col md={8}>
          {photo && (
            <div>
              <div>
                <Card>
                  <Card.Img
                    variant='top'
                    src={
                      selectedImage
                        ? selectedImage.startsWith("http")
                          ? selectedImage
                          : "/assets/images/" + selectedImage
                        : "/assets/images/default-thumbnail.jpg"
                    }
                    style={{ width: "100%", height: 500 }}
                    alt={photo?.title}
                  />
                  <Card.Body>
                    <Card.Title>{photo?.title}</Card.Title>
                    <Card.Text>{photo?.description}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className='mt-3'>
                <div className='d-flex align-items-center'>
                  <Button
                    variant='outline'
                    onClick={handleScrollLeft}
                    style={{ fontSize: "1.5rem", marginRight: "1rem" }}
                  >
                    <i className='bi bi-arrow-left-circle-fill'></i>
                  </Button>
                  <div
                    className='d-flex overflow-hidden'
                    style={{ width: "100%", whiteSpace: "nowrap" }}
                  >
                    <div
                      className='d-flex'
                      style={{ transform: `translateX(-${scrollOffset}px)`, transition: 'transform 0.3s' }}
                    >
                      {uniqueImages.map((imageUrl, index) => (
                        <div key={index} className='p-1'>
                          <Image
                            src={
                              imageUrl
                                ? imageUrl.startsWith("http")
                                  ? imageUrl
                                  : "/assets/images/" + imageUrl
                                : "/assets/images/default-thumbnail.jpg"
                            }
                            onClick={() => handleImageClick(imageUrl, index)}
                            alt={`Images ${index}`}
                            style={{
                              width: 100,
                              height: "auto",
                              cursor: "pointer",
                            }}
                            className='img-thumbnail'
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button
                    variant='outline'
                    onClick={handleScrollRight}
                    style={{ fontSize: "1.5rem", marginLeft: "1rem" }}
                  >
                    <i className='bi bi-arrow-right-circle-fill'></i>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Col>
        <Col md={4}>
          <Uploader uploader={uploader} album={album} />
        </Col>
      </Row>

      <Comments comments={comments} users={users} />

      {user && <PostComment photoId={photoId} setComments={setComments} />}
    </div>
  );
}
