import React from "react";
import { Pagination as BootstrapPagination } from "react-bootstrap";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  return (
    <BootstrapPagination className="justify-content-center mt-4">
      <BootstrapPagination.Prev onClick={handlePrevClick} disabled={currentPage === 1} />
      {[...Array(totalPages)].map((_, index) => (
        <BootstrapPagination.Item
          key={index + 1}
          active={index + 1 === currentPage}
          onClick={() => handlePageClick(index + 1)}
        >
          {index + 1}
        </BootstrapPagination.Item>
      ))}
      <BootstrapPagination.Next onClick={handleNextClick} disabled={currentPage === totalPages} />
    </BootstrapPagination>
  );
}
