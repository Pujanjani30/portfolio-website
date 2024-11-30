import React from 'react'

function LogsPagination({ totalPages, currentPage, handlePageClick, handlePrevPage, handleNextPage }) {
  return (
    <div className='pb-4'>
      {/* Pagination controls */}
      <ol className="flex justify-center gap-1 text-xs font-medium">
        {/* Previous Button */}
        <li>
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="inline-flex items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 disabled:opacity-50 size-8"
          >
            <span className="sr-only">Prev Page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>

        {/* Page Numbers */}
        {[...Array(totalPages).keys()].map((pageNumber) => (
          <li key={pageNumber + 1}>
            <button
              onClick={() => handlePageClick(pageNumber + 1)}
              className={`block size-8 rounded border text-center leading-8 ${currentPage === pageNumber + 1
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-gray-100 bg-white text-gray-900"
                }`}
            >
              {pageNumber + 1}
            </button>
          </li>
        ))}

        {/* Next Button */}
        <li>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="inline-flex items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 disabled:opacity-50 size-8"
          >
            <span className="sr-only">Next Page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
      </ol>
    </div>
  );
}

export default LogsPagination;
