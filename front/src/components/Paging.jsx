import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Pagination, Stack } from '@mui/material';

const Paging = () => {
    // 데이터의 갯수
    const data = ["",""];
  // 몇개씩 보여줄지
  const ITEMS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1); 
  
  const offset = (currentPage - 1) * ITEMS_PER_PAGE; 
  
  // 전체페이지
  const totalPage = Math.ceil(data.length / ITEMS_PER_PAGE);

  console.log(currentPage,"/",totalPage,"");

  return(
 
 <>
 
    <PaginationWrapper>
      <Stack spacing={2}>
        <Pagination
          count={totalPage}
          page={currentPage}
          onChange={(e, value) => setCurrentPage(value)}
          shape="rounded"
          showFirstButton
          showLastButton
          sx={{
            '& .MuiPaginationItem-root': {
              color: '#FFA101',
              borderColor: '#FFA101',
            },
            '& .Mui-selected': {
              backgroundColor: '#FFA101 !important',
              color: '#fff',
            },
            '& .MuiPaginationItem-icon': {
              color: '#FFA101',
            },
          }}
        />
      </Stack>
    </PaginationWrapper>
    
  </>
  );
  
};

export default Paging;


const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing[5]};
  `