import { useState } from 'react';

export const pageing = () => {

  const [currentPage, setCurrentPage] = useState(1);

  // set을 pros로 넘기는 함수 
  const chagneCurrentPage = (value) => {
    setCurrentPage(value);
  }
 
  return {
    chagneCurrentPage,
    currentPage
  };
};
