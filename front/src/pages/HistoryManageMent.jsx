import React, { useState } from 'react';
import styled from 'styled-components';
import { Pagination, Stack } from '@mui/material';

const writtenData = [
  {
    no: 15,
    title: '정성 가득한 간병인을 찾습니다.',
    period: '2025-11-01 ~ 2025-11-10',
    applicants: '2명',
    status: '모집 중',
  },
  {
    no: 14,
    title: '따뜻한 마음의 간병인을 모십니다.',
    period: '2025-10-05 ~ 2025-10-20',
    applicants: '3명',
    status: '마감',
  },
  {
    no: 13,
    title: '배려 깊은 간병인을 찾습니다.',
    period: '2025-09-10 ~ 2025-09-25',
    applicants: '1명',
    status: '마감',
  },
  {
    no: 12,
    title: '책임감 있는 간병인을 구합니다.',
    period: '2025-08-01 ~ 2025-08-15',
    applicants: '4명',
    status: '마감',
  },
  {
    no: 11,
    title: '간병 경력자 우대합니다.',
    period: '2025-07-20 ~ 2025-07-30',
    applicants: '2명',
    status: '마감',
  },
  {
    no: 10,
    title: '오랜 간병 경험을 가진 분 환영합니다.',
    period: '2025-07-01 ~ 2025-07-10',
    applicants: '3명',
    status: '마감',
  },
  {
    no: 9,
    title: '가족처럼 돌봐주실 분 구합니다.',
    period: '2025-06-10 ~ 2025-06-15',
    applicants: '5명',
    status: '마감',
  },
  {
    no: 8,
    title: '성실한 간병인을 찾습니다.',
    period: '2025-05-01 ~ 2025-05-10',
    applicants: '1명',
    status: '마감',
  },
  {
    no: 7,
    title: '정이 많은 간병인을 구합니다.',
    period: '2025-04-10 ~ 2025-04-20',
    applicants: '2명',
    status: '마감',
  },
  {
    no: 6,
    title: '정성을 다해 돌봐주실 간병인을 구합니다.',
    period: '2025-07-15 ~ 2025-07-18',
    applicants: '0명',
    status: '모집 중',
  },
  {
    no: 5,
    title: '사려 깊은 간병인을 찾습니다. (조건 협의 가능)',
    period: '2025-06-04 ~ 2025-06-25',
    applicants: '5명',
    status: '마감',
  },
  {
    no: 4,
    title: '사랑과 정성으로 함께할 간병인을 찾습니다.',
    period: '2025-03-04 ~ 2025-04-03',
    applicants: '10명',
    status: '마감',
  },
  {
    no: 3,
    title: '경험 많은 간병인을 모십니다. (급구)',
    period: '2025-02-04 ~ 2025-03-03',
    applicants: '10명',
    status: '마감',
  },
  {
    no: 2,
    title: '가족처럼 함께할 간병인을 찾습니다.',
    period: '2025-01-04 ~ 2025-02-03',
    applicants: '5명',
    status: '마감',
  },
  {
    no: 1,
    title: '정성과 배려로 환자를 돌봐주실 분을 구합니다.',
    period: '2024-12-18 ~ 2025-01-03',
    applicants: '2명',
    status: '마감',
  },
];
const appliedData = [
  {
    no: 15,
    title: '정성 가득한 간병인을 찾습니다.',
    period: '2025-11-01 ~ 2025-11-10',
    date: '2025-10-20',
    match: '환자 아이디',
    status: '모집 중',
    applyStatus: '신청 대기',
  },
  {
    no: 14,
    title: '따뜻한 마음의 간병인을 모십니다.',
    period: '2025-10-05 ~ 2025-10-20',
    date: '2025-10-01',
    match: '환자 아이디',
    status: '마감',
    applyStatus: '매칭 중',
  },
  {
    no: 13,
    title: '배려 깊은 간병인을 찾습니다.',
    period: '2025-09-10 ~ 2025-09-25',
    date: '2025-09-01',
    match: '환자 아이디',
    status: '마감',
    applyStatus: '거절',
  },
  {
    no: 12,
    title: '책임감 있는 간병인을 구합니다.',
    period: '2025-08-01 ~ 2025-08-15',
    date: '2025-07-25',
    match: '환자 아이디',
    status: '마감',
    applyStatus: '간병 종료',
  },
  {
    no: 11,
    title: '간병 경력자 우대합니다.',
    period: '2025-07-20 ~ 2025-07-30',
    date: '2025-07-18',
    match: '환자 아이디',
    status: '마감',
    applyStatus: '간병 종료',
  },
  {
    no: 10,
    title: '오랜 간병 경험을 가진 분 환영합니다.',
    period: '2025-07-01 ~ 2025-07-10',
    date: '2025-06-30',
    match: '환자 아이디',
    status: '마감',
    applyStatus: '간병 종료',
  },
  {
    no: 9,
    title: '가족처럼 돌봐주실 분 구합니다.',
    period: '2025-06-10 ~ 2025-06-15',
    date: '2025-06-05',
    match: '환자 아이디',
    status: '마감',
    applyStatus: '간병 종료',
  },
  {
    no: 8,
    title: '성실한 간병인을 찾습니다.',
    period: '2025-05-01 ~ 2025-05-10',
    date: '2025-04-28',
    match: '환자 아이디',
    status: '마감',
    applyStatus: '간병 종료',
  },
  {
    no: 7,
    title: '정이 많은 간병인을 구합니다.',
    period: '2025-04-10 ~ 2025-04-20',
    date: '2025-04-01',
    match: '환자 아이디',
    status: '마감',
    applyStatus: '간병 종료',
  },
  {
    no: 6,
    title: '정성을 다해 돌봐주실 간병인을 구합니다.',
    period: '2025-07-15 ~ 2025-07-18',
    date: '2025-07-16',
    match: '환자 아이디',
    status: '모집 중',
    applyStatus: '신청 대기',
  },
  {
    no: 5,
    title: '사려 깊은 간병인을 찾습니다. (조건 협의 가능)',
    period: '2025-06-04 ~ 2025-06-25',
    date: '2025-06-06',
    match: '환자 아이디',
    status: '마감',
    applyStatus: '매칭 중',
  },
  {
    no: 4,
    title: '사랑과 정성으로 함께할 간병인을 찾습니다.',
    period: '2025-03-04 ~ 2025-04-03',
    date: '2025-03-04',
    match: '환자 아이디',
    status: '마감',
    applyStatus: '거절',
  },
  {
    no: 3,
    title: '경험 많은 간병인을 모십니다. (급구)',
    period: '2025-02-04 ~ 2025-03-03',
    date: '2025-02-05',
    match: '환자 아이디',
    status: '마감',
    applyStatus: '간병 종료',
  },
  {
    no: 2,
    title: '가족처럼 함께할 간병인을 찾습니다.',
    period: '2025-01-04 ~ 2025-02-03',
    date: '2025-01-08',
    match: '환자 아이디',
    status: '마감',
    applyStatus: '간병 종료',
  },
  {
    no: 1,
    title: '정성과 배려로 환자를 돌봐주실 분을 구합니다.',
    period: '2024-12-18 ~ 2025-01-03',
    date: '2024-12-25',
    match: '환자 아이디',
    status: '마감',
    applyStatus: '간병 종료',
  },
];

// 몇개씩 보여줄지
const ITEMS_PER_PAGE = 10;

const HistoryManageMent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('written');

  const data = activeTab === 'written' ? writtenData : appliedData;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const totalPage = Math.ceil(data.length / ITEMS_PER_PAGE);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // 색상
  const getApplyStatusColor = (status) => {
    switch (status) {
      case '신청 대기':
        return '#2F80ED';
      case '매칭 중':
        return '#FFA101';
      case '거절':
        return '#EB5757';
      case '간병 종료':
        return '#828282';
      default:
        return '#000';
    }
  };

  return (
    <Wrapper>
      <Header>
        <Title>내역 관리</Title>
        <TabsWrapper>
          <Tab onClick={() => handleTabChange('written')} active={activeTab === 'written'}>
            작성 목록
          </Tab>
          /
          <Tab onClick={() => handleTabChange('applied')} active={activeTab === 'applied'}>
            신청 목록
          </Tab>
        </TabsWrapper>
      </Header>

      <Table>
        <thead>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th>희망 일자</th>
            {activeTab === 'applied' && <th>신청 날짜</th>}
            {activeTab === 'applied' && <th>매칭간병인</th>}
            {activeTab === 'applied' ? <th>신청 상태</th> : <th>지원현황</th>}
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(offset, offset + ITEMS_PER_PAGE).map((item) => (
            <tr key={item.no}>
              <td>{item.no}</td>
              <td>{item.title}</td>
              <td>{item.period}</td>
              {activeTab === 'applied' && <td>{item.date}</td>}
              {activeTab === 'applied' && <td>{item.match}</td>}
              {activeTab === 'applied' ? (
                <td style={{ color: getApplyStatusColor(item.applyStatus) }}>{item.applyStatus}</td>
              ) : (
                <td>{item.applicants}</td>
              )}
              <td style={{ color: item.status === '모집 중' ? '#27AE60' : '#BDBDBD' }}>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>

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
    </Wrapper>
  );
};

export default HistoryManageMent;

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing[10]};
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  align-items: flex-start;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const TabsWrapper = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin: ${({ theme }) => theme.spacing[3]} 0 ${({ theme }) => theme.spacing[5]};
`;

const Tab = styled.span`
  font-weight: ${({ active, theme }) => (active ? theme.fontWeights.bold : theme.fontWeights.regular)};
  color: ${({ active, theme }) => (active ? theme.colors.black1 : theme.colors.gray[3])};
  cursor: pointer;
  margin: 0 ${({ theme }) => theme.spacing[1]};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: ${({ theme }) => theme.spacing[6]};

  th,
  td {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[4]};
    padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[2]};
    text-align: left;
  }

  th {
    background-color: ${({ theme }) => theme.colors.third};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing[5]};
`;
