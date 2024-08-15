import React from "react";
import { Card } from "react-bootstrap";

export default function Uploader({ uploader, album }) {
  return (
    <div>
      <Card>
        {uploader && (
          <Card.Text>
            <strong>Uploaded by:</strong> {uploader?.name}
          </Card.Text>
        )}
        {album && (
          <Card.Text>
            <strong>Album:</strong> {album?.description}
          </Card.Text>
        )}
      </Card>
    </div>
  );
}
