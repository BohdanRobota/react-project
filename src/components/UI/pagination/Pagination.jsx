import '../../../styles/App.css';
import React from 'react';
import { usePagination } from '../../../hooks/usePagination';

function Pagination({ totalPages, changePage, page }) {
  const pagesArray = usePagination(totalPages);
  return (
    <div className="page__wrapper">
      {pagesArray.map((p) => (
        <span
          onClick={() => {
            changePage(p);
          }}
          className={page === p ? 'page page__current' : 'page'}
          key={p}
        >
          {p}
        </span>
      ))}
    </div>
  );
}

export default Pagination;
