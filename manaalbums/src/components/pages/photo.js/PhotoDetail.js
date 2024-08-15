import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Row, Col } from "react-bootstrap";
import Uploader from "./Uploader";
import Comments from "./Comments";
import PostComment from "./PostComment";
import AuthContext from "../../../context/Context";

export default function PhotoDetail() {
  const { photoId } = useParams();
  const { user } = useContext(AuthContext);
  const [photo, setPhoto] = useState(null);
  const [album, setAlbum] = useState(null); // State for album details
  const [uploader, setUploader] = useState(null); // State for uploader details
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9999/photos/${photoId}`
        );
        const photoData = response?.data;
        setPhoto(photoData);
        setMainImage(photoData?.images?.url[0]); // Set the first image as the main image

        // Fetch album details using albumId from the photo
        if (photoData?.albumId) {
          const albumResponse = await axios.get(
            `http://localhost:9999/albums/${photoData?.albumId}`
          );
          const albumData = albumResponse?.data;
          setAlbum(albumData);

          // Fetch uploader details using userId from the album
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

  const handleThumbnailClick = (imageUrl) => {
    setMainImage(imageUrl);
  };

  return (
    <div className='container mt-4 mb-4'>
      <Row>
        <Col md={8}>
          {/*main image and description*/}
          <div>
            {photo && (
              <Card>
                <Card.Img
                  variant='top'
                  src={mainImage}
                  alt={photo?.title}
                />
                <Card.Body>
                  <Card.Title>{photo?.title}</Card.Title>
                  <Card.Text>{photo?.description}</Card.Text>
                </Card.Body>
              </Card>
            )}
          </div>
          {/*thumbnail images*/}
          <div className='mt-3'>
            {photo?.images?.url?.length > 0 && (
              <div
                className='d-flex flex-wrap'
                style={{ textAlign: "center", justifyContent: "center" }}>
                {photo?.images?.url?.map((imageUrl, index) => (
                  <div key={index} className='p-1'>
                    {imageUrl !== mainImage && (
                      <img
                        src={imageUrl}
                        alt={`Thumbnail ${index}`}
                        style={{
                          width: "100px",
                          height: "auto",
                          cursor: "pointer",
                        }}
                        onClick={() => handleThumbnailClick(imageUrl)}
                        className='img-thumbnail'
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Col>
        {/*uploader and album details*/}
        <Col md={4}>
          <Uploader uploader={uploader} album={album} />
        </Col>
      </Row>

      {/*comments*/}
      <Comments comments={comments} users={users} />

      {user && <PostComment photoId={photoId} setComments={setComments} />}
      {/*post comment*/}
    </div>
  );
}
