
import { useState, useEffect } from 'react';

const usePagination = (data: any[], itemHeight: number) => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const calculateItemsPerPage = () => {
      const screenHeight = window.innerHeight;
      const calculatedItemsPerPage = Math.floor(screenHeight / itemHeight) - 2;
      setItemsPerPage(Math.max(calculatedItemsPerPage, 1));
    };

    calculateItemsPerPage();
    window.addEventListener('resize', calculateItemsPerPage);

    return () => window.removeEventListener('resize', calculateItemsPerPage);
  }, [itemHeight]);

  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handleNavPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNavNext = () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const pageData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return {
    pageData,
    currentPage,
    pageCount,
    itemsPerPage,
    handleNavPrev,
    handleNavNext,
    handlePageClick,
  };
};

export default usePagination;
