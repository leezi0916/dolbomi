import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import Paging from '../components/Paging';

const appliedData = [
  {
    no: 15,
    title: '정성 가득한 간병인을 찾습니다.',
    period: '2025-11-01 ~ 2025-11-10',
    date: '2025-10-20',
    match: '환자 아이디',
    status: '모집 중',
    applyStatus: '대기',
  },
  {
    no: 14,
    title: '따뜻한 마음의 간병인을 모십니다.',
    period: '2025-10-05 ~ 2025-10-20',
    date: '2025-10-01',
    match: '환자 아이디',
    status: '모집 마감',
    applyStatus: '대기',
  },
  {
    no: 13,
    title: '배려 깊은 간병인을 찾습니다.',
    period: '2025-09-10 ~ 2025-09-25',
    date: '2025-09-01',
    match: '환자 아이디',
    status: '모집 마감',
    applyStatus: '거절',
  },
  {
    no: 12,
    title: '책임감 있는 간병인을 구합니다.',
    period: '2025-08-01 ~ 2025-08-15',
    date: '2025-07-25',
    match: '환자 아이디',
    status: '모집 마감',
    applyStatus: '간병 종료',
  },
  {
    no: 11,
    title: '간병 경력자 우대합니다.',
    period: '2025-07-20 ~ 2025-07-30',
    date: '2025-07-18',
    match: '환자 아이디',
    status: '모집 마감',
    applyStatus: '간병 종료',
  },
  {
    no: 10,
    title: '오랜 간병 경험을 가진 분 환영합니다.',
    period: '2025-07-01 ~ 2025-07-10',
    date: '2025-06-30',
    match: '환자 아이디',
    status: '모집 마감',
    applyStatus: '간병 종료',
  },
  {
    no: 9,
    title: '가족처럼 돌봐주실 분 구합니다.',
    period: '2025-06-10 ~ 2025-06-15',
    date: '2025-06-05',
    match: '환자 아이디',
    status: '모집 마감',
    applyStatus: '간병 종료',
  },
  {
    no: 8,
    title: '성실한 간병인을 찾습니다.',
    period: '2025-05-01 ~ 2025-05-10',
    date: '2025-04-28',
    match: '환자 아이디',
    status: '모집 마감',
    applyStatus: '간병 종료',
  },
  {
    no: 7,
    title: '정이 많은 간병인을 구합니다.',
    period: '2025-04-10 ~ 2025-04-20',
    date: '2025-04-01',
    match: '환자 아이디',
    status: '모집 마감',
    applyStatus: '간병 종료',
  },
  {
    no: 6,
    title: '정성을 다해 돌봐주실 간병인을 구합니다.',
    period: '2025-07-15 ~ 2025-07-18',
    date: '2025-07-16',
    match: '환자 아이디',
    status: '모집 마감',
    applyStatus: '대기',
  },
  {
    no: 5,
    title: '사려 깊은 간병인을 찾습니다. (조건 협의 가능)',
    period: '2025-06-04 ~ 2025-06-25',
    date: '2025-06-06',
    match: '환자 아이디',
    status: '모집 마감',
    applyStatus: '대기',
  },
  {
    no: 4,
    title: '사랑과 정성으로 함께할 간병인을 찾습니다.',
    period: '2025-03-04 ~ 2025-04-03',
    date: '2025-03-04',
    match: '환자 아이디',
    status: '모집 마감',
    applyStatus: '거절',
  },
  {
    no: 3,
    title: '경험 많은 간병인을 모십니다. (급구)',
    period: '2025-02-04 ~ 2025-03-03',
    date: '2025-02-05',
    match: '환자 아이디',
    status: '모집 마감',
    applyStatus: '간병 종료',
  },
  {
    no: 2,
    title: '가족처럼 함께할 간병인을 찾습니다.',
    period: '2025-01-04 ~ 2025-02-03',
    date: '2025-01-08',
    match: '환자 아이디',
    status: '모집 마감',
    applyStatus: '간병 종료',
  },
  {
    no: 1,
    title: '정성과 배려로 환자를 돌봐주실 분을 구합니다.',
    period: '2024-12-18 ~ 2025-01-03',
    date: '2024-12-25',
    match: '환자 아이디',
    status: '모집 마감',
    applyStatus: '간병 종료',
  },
];

const ITEMS_PER_PAGE = 10;

const HistoryManageMent = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const totalPage = Math.ceil(appliedData.length / ITEMS_PER_PAGE);

  const chagneCurrentPage = (value) => {
    setCurrentPage(value);
  };

  return (
    <Wrapper>
      <Header>
        <Title>나의 지원현황</Title>
      </Header>

      <Table>
        <thead>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th>신청 날짜</th>
            <th>작성자</th>
            <th>모집 상태</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {appliedData.slice(offset, offset + ITEMS_PER_PAGE).map((item) => (
            <tr key={item.no}>
              <td>{item.no}</td>
              <td className="left-align">{item.title}</td>
              <td>{item.date}</td>
              <td>{item.match}</td>
              <td
                style={{
                  color: item.status === '모집 중' ? theme.colors.success : theme.colors.gray[4],
                }}
              >
                {item.status}
              </td>
              <td>
                <DeleteIcon />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Paging totalPage={totalPage} currentPage={currentPage} chagneCurrentPage={chagneCurrentPage} />
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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: ${({ theme }) => theme.spacing[6]};

  th,
  td {
    padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[2]};
    text-align: center;
    vertical-align: middle;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.gray[2]};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[4]};
  }

  th {
    background-color: ${({ theme }) => theme.colors.third};
    color: ${({ theme }) => theme.colors.gray[1]};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    font-size: ${({ theme }) => theme.fontSizes.base};
  }

  tbody tr:hover {
    background-color: ${({ theme }) => theme.colors.gray[5]};
  }

  .left-align {
    text-align: left;
  }
`;

const DeleteIcon = styled(FaTimes)`
  color: ${({ theme }) => theme.colors.gray[3]};
  cursor: pointer;
  font-size: 18px;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.danger};
    transform: scale(1.1);
  }
`;
