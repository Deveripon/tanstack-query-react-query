import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5; // Number of pages to show around the current page

        // Show first page, ellipsis, range of pages around current, ellipsis, last page
        if (totalPages <= maxVisiblePages + 2) {
            // If there are fewer pages, show all of them
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Always show first and last page
            pageNumbers.push(1);

            let startPage = Math.max(currentPage - 2, 2);
            let endPage = Math.min(currentPage + 2, totalPages - 1);

            // Adjust if we're near the start or end
            if (currentPage <= 3) {
                endPage = 5;
            }
            if (currentPage >= totalPages - 2) {
                startPage = totalPages - 4;
            }

            // Add ellipsis if needed
            if (startPage > 2) pageNumbers.push("...");
            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }
            if (endPage < totalPages - 1) pageNumbers.push("...");

            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

    return (
        <div className='flex justify-center space-x-2 mt-4'>
            {/* Previous Button */}
            <button
                className={`px-3 py-1 rounded-md ${
                    currentPage === 1
                        ? "bg-gray-300 text-gray-500"
                        : "bg-blue-500 text-white"
                } `}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}>
                Prev
            </button>

            {/* Page Numbers */}
            {getPageNumbers().map((page, index) =>
                typeof page === "number" ? (
                    <button
                        key={index}
                        className={`px-3 py-1 rounded-md ${
                            page === currentPage
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-700"
                        } `}
                        onClick={() => onPageChange(page)}>
                        {page}
                    </button>
                ) : (
                    <span
                        key={index}
                        className='px-3 py-1 text-gray-500'>
                        ...
                    </span>
                )
            )}

            {/* Next Button */}
            <button
                className={`px-3 py-1 rounded-md ${
                    currentPage === totalPages
                        ? "bg-gray-300 text-gray-500"
                        : "bg-blue-500 text-white"
                } `}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
