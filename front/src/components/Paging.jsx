import React from 'react';
import styled from 'styled-components';
import { Pagination, Stack } from '@mui/material';

const Paging = ({ totalPage, currentPage, chagneCurrentPage }) => {
  console.log(totalPage , currentPage)
  return (
    <>
      <PaginationWrapper>
        <Stack spacing={2}>
          <Pagination
            count={totalPage}
            page={currentPage}
            onChange={(e, value) => chagneCurrentPage(value)}
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
`;
