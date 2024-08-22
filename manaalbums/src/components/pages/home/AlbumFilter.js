import React, { useState } from "react";
import { Button } from "react-bootstrap";

export default function AlbumFilter({
  albums,
  selectedAlbumId,
  handleAlbumSelect,
}) {
  const [startIndex, setStartIndex] = useState(0);

  // Extract unique album descriptions
  const uniqueAlbumDescriptions = [
    ...new Set(albums.map((album) => album.description))
  ];

  const visibleCount = 4; // Number of visible thumbnails at a time

  const handleScrollLeft = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleScrollRight = () => {
    const maxIndex = Math.max(0, uniqueAlbumDescriptions.length - visibleCount);
    setStartIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
  };

  return (
    <div className='d-flex align-items-center'>
      <Button
        variant='primary'
        onClick={handleScrollLeft}
        style={{
          fontSize: "1rem",
          marginRight: "1rem",
        }}
      >
        <i className='bi bi-arrow-left-circle-fill'></i>
      </Button>

      {/* Add "All" Button */}
      <div>
        <Button
          onClick={() => handleAlbumSelect(null)} // null represents "All"
          variant={selectedAlbumId === null ? "primary" : "outline-primary"}
          className='mx-1'
        >
          All
        </Button>
      </div>

      {uniqueAlbumDescriptions
        .slice(startIndex, startIndex + visibleCount)
        .map((description, index) => {
          const album = albums.find(album => album.description === description);
          return (
            <Button
              key={album?.albumsId}
              onClick={() => handleAlbumSelect(album?.albumsId)}
              variant={
                selectedAlbumId === album?.albumsId
                  ? "primary"
                  : "outline-primary"
              }
              className='mx-1'
            >
              {description}
            </Button>
          );
        })}
      
      <Button
        variant='primary'
        onClick={handleScrollRight}
        style={{
          fontSize: "1rem",
          marginLeft: "1rem",
        }}
      >
        <i className='bi bi-arrow-right-circle-fill'></i>
      </Button>
    </div>
  );
}
