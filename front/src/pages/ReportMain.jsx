import React, { useEffect, useState } from 'react';
import { Section } from '../styles/common/Container';
import styled from 'styled-components';
import { BoardItem, BoardItemTop, BoardTop, BorderDiv, Button, Left, Right } from '../styles/common/Board';
import { reportService } from '../api/report';
import { toast } from 'react-toastify';

const ReportMain = () => {
  const [error, setError] = useState(null);
  const [allReport, setAllReport] = useState([]); // 처음 가져온 전체 일지 목록
  const [dateFilter, setDateFilter] = useState(''); // 날짜 필터
  const [authorFilter, setAuthorFilter] = useState(''); // 작성자 필터
  const [reportList, setReportList] = useState([]); // 필터링 후 일지목록

  // 일지목록에서 가져온, 드롭다운박스에 넣을 날짜들과 작성자들
  const uniqueDates = [...new Set(allReport.map((report) => report.createDate.slice(0, 7)))];
  const uniqueAuthors = [...new Set(allReport.map((report) => report.careGiverNo))];

  useEffect(() => {
    const loadReportList = async () => {
      try {
        const reports = await reportService.getReports();
        setAllReport(reports);

        setReportList(
          reports.filter((report) => {
            const date = dateFilter ? report.createDate.startsWith(dateFilter) : true;
            const author = authorFilter ? report.careGiverNo.toString() === authorFilter : true;
            return date && author;
          })
        );
      } catch (error) {
        console.error(error);
        const errorMessage = '일지를 불러오는데 실패했습니다.';
        setError(errorMessage);
        toast.error(errorMessage);
      }
    };

    loadReportList();
  }, [dateFilter, authorFilter]);

  if (error) {
    return null;
  }

  return (
    <Wrap>
      <MainTitle>돌봄 대상자 정보</MainTitle>
      <br />
      <Container>
        <Title>돌봄 대상자 :</Title>
        <p>홍길동 / 600000 / 남</p>
        <SubTitle>연락처: 000-0000-0000</SubTitle>
        <br />
        <Title>건강 상태:</Title>
        <SubTitle>진단명: 알츠하이머(치매)</SubTitle>
        <SubTitle>주요 증상: 기억력 저하, 혈당변화, 어지럼증</SubTitle>
        <SubTitle>알레르기 정보: 땅콩, 해산물(갑각류)</SubTitle>
        <SubTitle>복용중 약물:</SubTitle>
        <p>도네페질 (Donepezil), 리바스티그민 (Rivastigmine), 갈란타민 (Galantamine), 메만틴 (Memantine)</p>
        <SubTitle>병원: 서울OO병원 / 신경과</SubTitle>
        <SubTitle>특이사항:</SubTitle>
        <p>의사소통 어려움, 가족 인식 못함, 볼일 혼자 못봄</p>
      </Container>
      <br />
      <Board>
        <BoardTop>
          <ListTitle>진단 일지 목록</ListTitle>
          <Right>
            {/* 날짜 필터 */}
            <Fillter value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
              <option value="">날짜 : 전체</option>
              {uniqueDates.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </Fillter>
            {/* 작성자 필터 */}
            <Fillter value={authorFilter} onChange={(e) => setAuthorFilter(e.target.value)}>
              <option value="">작성자 : 전체</option>
              {uniqueAuthors.map((author) => (
                <option key={author} value={author}>
                  {author}
                </option>
              ))}
            </Fillter>
            <Button>글쓰기</Button>
          </Right>
        </BoardTop>
        <BoardItemTop>
          <div>No</div>
          <div>제목</div>
          <div>작성자</div>
          <div>작성 일자</div>
        </BoardItemTop>
        {reportList.map((report) => (
          <BoardItem key={report.reportNo}>
            <div>{report.reportNo}</div>
            <div>{report.reportTitle}</div>
            <div>{report.careGiverNo}</div>
            <div>{report.createDate}</div>
          </BoardItem>
        ))}

        <BorderDiv></BorderDiv>
      </Board>
    </Wrap>
  );
};

const Wrap = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
`;

const MainTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  display: flex;
`;

const Container = styled(Section)`
  box-shadow: ${({ theme }) => theme.shadows.lg};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const SubTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const Board = styled.div`
  width: 100%;
  > div {
    display: flex;
    justify-content: space-between;
  }
`;

const ListTitle = styled(Left)`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const Fillter = styled.select`
  width: 160px;
  border: 1px solid ${({ theme }) => theme.colors.gray[5]};
  border-radius: 4px;
  padding: 10px;
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.gray[3]};
`;

export default ReportMain;
