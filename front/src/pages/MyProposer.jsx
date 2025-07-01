import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import Paging from '../components/Paging';
import theme from '../styles/theme';
import { toast } from 'react-toastify';
import { proposerService } from '../api/propose';

const MyProposer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [proposerList, setProserList] = useState([]);

  useEffect(() => {
    const fetchPostList = async () => {
      try {
        const list = await proposerService.getMyProposer(currentPage, user.userNo);
        setProserList(list);
      } catch (error) {
        toast.error('내 지원현황을 불러오는데 실패했습니다.');
      }
    };
    fetchPostList();
  }, [currentPage]);

  // 자식에게 물려주는 currentPage 변경시 값 추적 함수
  const chagneCurrentPage = (value) => {
    setCurrentPage(value);
  };

  return (
    <Wrapper>
      <Header>
        <Title>나의 지원현황</Title>
      </Header>

      <Table>
        <THead>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th>신청 날짜</th>
            <th>작성자</th>
            <th>모집 상태</th>
            <th>내역 삭제</th>
          </tr>
        </THead>
        <TBody>
          {!proposerList.content || proposerList.content.length === 0 ? (
            <tr>
              <td colSpan={6}>
                <EmptyMessage>등록된 구인글이 없습니다.</EmptyMessage>
              </td>
            </tr>
          ) : (
            proposerList.content.map((proposer) => (
              <tr key={p.no}>
                <td>{p.no}</td>
                <td>{p.title}</td>
                <td>{p.date}</td>
                <td>{p.match}</td>
                <td style={{ color: p.status === '모집 중' ? theme.colors.success : theme.colors.gray[4] }}>
                  {p.status}
                </td>
                <td>
                  {p.status === '모집 중' ? (
                    <span style={{ fontSize: 20, color: 'gray' }}>-</span>
                  ) : (
                    <FaTimes size={20} style={{ cursor: 'pointer', verticalAlign: '-8px' }} />
                  )}
                </td>
              </tr>
            ))
          )}
        </TBody>
      </Table>

      <Paging currentPage={currentPage} totalPage={proposerList.totalPage} chagneCurrentPage={chagneCurrentPage} />
    </Wrapper>
  );
};

export default MyProposer;

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
  border-collapse: separate;
  border-spacing: 0 8px;
  margin-top: ${({ theme }) => theme.spacing[6]};
`;

const THead = styled.thead`
  tr {
    background-color: ${({ theme }) => theme.colors.third};
    box-shadow: ${({ theme }) => theme.shadows.base};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    overflow: hidden;
  }

  th {
    padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[3]};
    text-align: center;
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    font-size: ${({ theme }) => theme.fontSizes.lg};
    color: ${({ theme }) => theme.colors.black1};
    white-space: nowrap;
    letter-spacing: 0.5px;
    background-color: transparent;
  }

  th:first-child {
    padding-left: ${({ theme }) => theme.spacing[5]};
  }

  th:last-child {
    padding-right: ${({ theme }) => theme.spacing[5]};
  }
`;

const TBody = styled.tbody`
  tr {
    background-color: ${({ theme }) => theme.colors.white};
    /* box-shadow: ${({ theme }) => theme.shadows.sm}; */
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    transition: all 0.2s ease-in-out;

    &:hover {
      transform: translateY(-2px);
      box-shadow: ${({ theme }) => theme.shadows.md};
    }

    td {
      padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[2]};
      text-align: center;
      font-size: ${({ theme }) => theme.fontSizes.sm};
      color: ${({ theme }) => theme.colors.black3};

      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 160px;
    }

    td:last-child {
      color: ${({ theme }) => theme.colors.danger};
    }
  }
`;

// 빈 메시지 추가
const EmptyMessage = styled.div`
  padding: ${({ theme }) => theme.spacing[10]} 0;
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.gray[3]};
  text-align: center;
`;
