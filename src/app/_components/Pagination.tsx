"use client"

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';



interface PaginationProps {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  pageCount,
  onPageChange,
  onPrev,
  onNext,
}) => {
  return (
    <div className="flex flex-row justify-end items-center gap-[15px] mr-[30px]">
      <button
        type='button'
        onClick={onPrev}
        disabled={currentPage === 1}
      >
        <FontAwesomeIcon icon={faAnglesLeft} />
      </button>
      {Array.from({ length: pageCount }, (_, i) => {
          if(i < 2 ) {
            return (
              <button
              type='button'
              onClick={() => onPageChange(i + 1)}
              className="px-[20px] py-[5px] bg-lightDark text-white rounded-[5px]"
              key={i}
            >
              {i + 1}
            </button>
            )
          }
          if(i === 2 && pageCount > 2) {
            return (
              <span key={i} className="px-[10px] py-[5px]">
                ...
              </span>
            )
          }
          if(i > 1 && i !== pageCount -1 && currentPage === i) {
            return (
              <button
              type='button'
              onClick={() => onPageChange(i + 1)}
              className="px-[20px] py-[5px] bg-lightDark text-white rounded-[5px]"
              key={i}
              >
                {i + 1}
              </button>
            )
          }else if(i === pageCount -1) {
            return (
              <button
              type='button'
              onClick={() => onPageChange(i + 1)}
              className="px-[20px] py-[5px] bg-lightDark text-white rounded-[5px]"
              key={i}
              >
                {pageCount}
              </button>
            )
          }else {
            return null;
          }
        })}
      <button
        type='button'
        onClick={onNext}
        disabled={currentPage === pageCount}
      >
        <FontAwesomeIcon icon={faAnglesRight} />
      </button>
    </div>
  );
};

export default Pagination;
