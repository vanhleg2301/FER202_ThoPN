import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col } from "react-bootstrap";
import AuthContext from "../../../context/Context";
import { Link } from "react-router-dom";

export default function Share() {
  const { user } = useContext(AuthContext);
  const [sharedPhotos, setSharedPhotos] = useState([]);
  const [receivedPhotos, setReceivedPhotos] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sharesResponse = await axios.get("http://localhost:9999/shares");
        const photosResponse = await axios.get("http://localhost:9999/photos");
        const usersResponse = await axios.get("http://localhost:9999/users");

        setPhotos(photosResponse.data);
        setUsers(usersResponse.data);

        const shared = sharesResponse.data.filter(
          (share) => share.userId === user.userId
        );
        const received = sharesResponse.data.filter(
          (share) => share.sharedWithUserIds === user.userId
        );

        setSharedPhotos(shared);
        setReceivedPhotos(received);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user?.userId]);

  const getPhotoDetails = (photoId) => {
    return photos.find((photo) => photo.id === photoId);
  };

  const getUserDetails = (userId) => {
    return users.find((user) => user.userId === userId);
  };

  return (
    <div>
      <h3>Photos I've Shared</h3>
      <Row>
        {sharedPhotos.map((share) => {
          const photo = getPhotoDetails(share.photoId);
          return (
            <Col key={share.id} md={4}>
              <Card className="mt-2">
                <Card.Img variant='top' src={photo?.url} />
                <Card.Body>
                  <Card.Title>
                    <Link to={`http://localhost:3000/photo/${photo?.id}`}>
                      {photo?.title}
                    </Link>
                  </Card.Title>
                  <Card.Text>
                    Shared with: {getUserDetails(share.sharedWithUserIds)?.name}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      <h3 className='mt-4'>Photos Shared With Me</h3>
      <Row>
        {receivedPhotos.map((share) => {
          const photo = getPhotoDetails(share.photoId);
          const user = getUserDetails(share.userId);
          return (
            <Col key={share.id} md={4}>
              <Card className="mt-2">
                <Card.Img variant='top' src={photo?.url} />
                <Card.Body>
                  <Link to={`http://localhost:3000/photo/${photo?.id}`}>
                    <Card.Title>{photo?.title}</Card.Title>
                  </Link>
                  <Card.Text>Shared by: {user?.name}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
