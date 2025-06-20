import React from 'react';

const Borad = () => {
  const [currentPage, setCurrentPage] = useState(1); const data = activeTab === 'written' ? writtenData : appliedData;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE; const totalPage = Math.ceil(data.length / ITEMS_PER_PAGE)
  return(<>
 
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

export default Borad;
