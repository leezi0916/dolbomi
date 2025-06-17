import React, { useEffect, useState } from 'react';
import { Section } from '../styles/common/Container';
import styled from 'styled-components';
import { BoardItemTop, BoardTop, BorderDiv, Button, Left, Right } from '../styles/common/Board';
import { reportService } from '../api/report';
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import { ButtonText, SubmitButton } from '../styles/common/Button';
import { patientService } from '../api/patient';

const ReportMain = () => {
  const { patNo } = useParams(); // URL의 :patNo 값 가져오기
  const [pat, setpat] = useState({});
  const [allReport, setAllReport] = useState([]); // 처음 가져온 전체 일지 목록
  const [dateFilter, setDateFilter] = useState(''); // 날짜 필터
  const [authorFilter, setAuthorFilter] = useState(''); // 작성자 필터
  const [reportList, setReportList] = useState([]); // 필터링 후 일지목록
  const [error, setError] = useState(null);

  // 일지목록에서 가져온, 드롭다운박스에 넣을 날짜들과 작성자들
  const uniqueDates = [...new Set(allReport.map((report) => report.createDate.slice(0, 7)))];
  const uniqueAuthors = [...new Set(allReport.map((report) => report.careGiverNo))];

  const formatPhoneNumber = (phone = '') => {
    return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  };

  useEffect(() => {
    const patient = async () => {
      try {
        const patient = await patientService.getPatientId(patNo);
        setpat(patient);
      } catch (error) {
        console.error(error);
        const errorMessage = '돌봄 대상자를 불러오는데 실패했습니다.';
        setError(errorMessage);
        toast.error(errorMessage);
      }
    };

    const loadReportList = async () => {
      try {
        const reports = await reportService.getReports(patNo);
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

    patient();
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
        <Title>돌봄 대상자</Title>
        <SubTitle>
          {pat.patName} / {pat.patAge} / {pat.patGender === 'F' ? '여' : '남'}
        </SubTitle>
        <SubTitle>비상연락망 : {formatPhoneNumber(pat.phone)}</SubTitle>
        <SubTitle>거주지 : {pat.patAddress}</SubTitle>
        <SubTitle>키 : {pat.patHeight}</SubTitle>
        <SubTitle>몸무게 : {pat.patWeight}</SubTitle>
        <br />
        <Title>건강 상태</Title>
        <SubTitle>{pat.patContent}</SubTitle>
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
            <Link to={`/caregiver/reportform/${patNo}`}>
              <SubmitButton>
                <ButtonText>글쓰기</ButtonText>
              </SubmitButton>
            </Link>
          </Right>
        </BoardTop>
        <BoardItemTop>
          <div>No</div>
          <div>제목</div>
          <div>작성자</div>
          <div>작성 일자</div>
        </BoardItemTop>
        {reportList.map((report) => (
          <BoardItem key={report.reportNo} to={`/report/${patNo}/detail/${report.reportNo}`} state={{ report }}>
            <div>{report.reportNo}</div>
            <div>{report.reportTitle}</div>
            <div>{report.careGiverNo}</div>
            <div>{report.createDate}</div>
          </BoardItem>
        ))}

        <BorderDiv />
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
  padding-bottom: 10px;
`;

const SubTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-left: 20px;
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

const BoardItem = styled(Link)`
  width: 100%;
  display: flex;
  padding-top: 2px;
  padding-bottom: 2px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[5]};
  > div {
    flex: 1;
  }
`;
export default ReportMain;
