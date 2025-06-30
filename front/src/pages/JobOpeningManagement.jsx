import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Paging from '../components/Paging';
import theme from '../styles/theme';
import { MainSubmitButton } from '../styles/common/Button';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';
import { hiringService } from '../api/hiring';

const JobOpeningManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [jobOpeningList, setJobOpeningList] = useState([]);

  const navigate = useNavigate();

  const { user } = useUserStore();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await hiringService.getMyJobOpeningList(currentPage, user.userNo);
        console.log(data);
        setJobOpeningList(data);
      } catch (error) {
        console.error('리뷰 로딩 실패:', error);
      }
    };
    fetchReviews();
  }, [currentPage]);

  // 자식에게 물려주는 currentPage 변경시 값 추적 함수
  const chagneCurrentPage = (value) => {
    setCurrentPage(value);
  };

  return (
    <Wrapper>
      <Header>
        <Title>내 구인글 관리</Title>
        <MainSubmitButton onClick={() => navigate('/guardian/hire-registration')}>구인글 등록하기</MainSubmitButton>
      </Header>
      <Table>
        <THead>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th>작성일자</th>
            <th>지원현황</th>
            <th>상태</th>
          </tr>
        </THead>
        <TBody>
          {jobOpeningList.content?.map((jobOpening, index) => {
            const total = jobOpeningList.totalCount; // 전체 구인글 수
            const currentPage = jobOpeningList.currentPage; // 현재 페이지 번호 (0부터 시작)
            const size = jobOpeningList.pageSize; // 한 페이지당 몇 개 보여주는지 (혹은 백엔드에서 받은 pageSize 사용)

            // 번호 계산 (내림차순)
            const displayNo = total - (currentPage * size + index);

            return (
              <tr key={jobOpening.hiringNo} onClick={() => navigate(`/hireDetail/${jobOpening.hiringNo}`)}>
                <td>{displayNo}</td>
                <td className="title">{jobOpening.hiringTitle}</td>
                <td>{jobOpening.createDate.slice(0, 10)}</td>
                <td>{jobOpening.appliedCount === 0 ? '0명' : `${jobOpening.appliedCount}명`}</td>
                <td style={{ color: jobOpening.hiringStatus === 'Y' ? theme.colors.success : theme.colors.gray[4] }}>
                  {jobOpening.hiringStatus === 'Y' ? '모집중' : '모집마감'}
                </td>
              </tr>
            );
          })}
        </TBody>
      </Table>

      <Paging currentPage={currentPage} totalPage={jobOpeningList.totalPage} chagneCurrentPage={chagneCurrentPage} />
    </Wrapper>
  );
};

export default JobOpeningManagement;

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing[10]};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: left;
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
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      max-width: 200px;
    }
  }
`;
