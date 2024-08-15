import React from "react";
import { renderStars } from "../../../util/renderRate";

export default function Comments({ comments, users }) {
  const getUserNameById = (userId) => {
    const user = users?.find((user) => user?.userId === userId);
    return user ? user?.name : "Unknown User";
  };
  return (
    <div className='mt-4'>
      <h3>Comments</h3>
      {comments?.length > 0 ? (
        comments?.map((comment) => (
          <div
            key={comment?.id}
            className='mb-3'
            style={{
              backgroundColor: "lightGray",
              borderRadius: "7px",
              paddingTop: "20px",
              paddingLeft: "20px",
              paddingBottom: "5px",
            }}>
            <strong>{getUserNameById(comment?.userId)}</strong>
            <div>{renderStars(comment?.rate)}</div>
            <p>{comment?.text}</p>
          </div>
        ))
      ) : (
        <p>No comments yet</p>
      )}
    </div>
  );
}
