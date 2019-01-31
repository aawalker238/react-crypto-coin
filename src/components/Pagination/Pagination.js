import React from 'react';
import './Pagination.css';
const Pagination = ({ page, totalPages, handlePaginationClick }) => {
  return (
    <div className="Pagination">
      <button
        onClick={() => handlePaginationClick('prev')}
        className="Pagination-button"
        disabled={page <= 1}
      >
        &larr;
      </button>
      <span className="Pagination-info">
        Page <strong>{page}</strong> of <strong>{totalPages}</strong>
      </span>
      <button
        onClick={() => handlePaginationClick('next')}
        className="Pagination-button"
        disabled={page >= totalPages}
      >
        &rarr;
      </button>
    </div>
  );
};

export default Pagination;
