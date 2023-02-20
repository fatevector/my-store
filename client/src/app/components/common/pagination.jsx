import React from "react";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
    const pageCount = Math.ceil(itemsCount / pageSize);
    if (pageCount === 1) return null;
    const pages = new Array(pageCount).fill(1).map((_, index) => index + 1);
    return (
        <nav>
            <ul className="pagination">
                {pages.map(page => (
                    <li
                        className={
                            "page-item" +
                            (currentPage === page ? " active" : "")
                        }
                        key={page}
                    >
                        <button
                            className="page-link"
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
