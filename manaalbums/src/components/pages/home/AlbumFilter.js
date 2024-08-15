import React from "react";
import { Button } from "react-bootstrap";

export default function AlbumFilter({
  albums,
  selectedAlbumId,
  handleAlbumSelect,
}) {
  return (
    <div className='text-center'>
      {/* Add "All" Button */}
      <Button
        onClick={() => handleAlbumSelect(null)} // null represents "All"
        variant={selectedAlbumId === null ? "primary" : "outline-primary"}
        className='mx-1'>
        All
      </Button>
      {albums?.map((album) => (
        <Button
          key={album?.albumsId}
          onClick={() => handleAlbumSelect(album?.albumsId)}
          variant={
            selectedAlbumId === album?.albumsId ? "primary" : "outline-primary"
          }
          className='mx-1'>
          {album?.description}
        </Button>
      ))}
    </div>
  );
}
