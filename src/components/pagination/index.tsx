import * as React from "react";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

const PaginationComponent: React.FC<PaginationProps> = ({ currentPage, setCurrentPage, totalPages }) => {
  return (
    <div className="flex items-center justify-center xxs:gap-2 sm:gap-4 lg:gap-[1.5rem]">
      <button
        className={`${currentPage !== 1 && "cursor-pointer"}`}
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        <i className="pi pi-chevron-circle-left responsive__icon"></i>
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        className={`${currentPage !== totalPages && "cursor-pointer"}`}
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        <i className="pi pi-chevron-circle-right responsive__icon"></i>
      </button>
    </div>
  );
};

export default PaginationComponent;
