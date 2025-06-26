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
  const [pat, setpat] = useState({}); //환자들
  const [allReport, setAllReport] = useState([]); // 처음 가져온 전체 일지 목록
  const [dateFilter, setDateFilter] = useState(''); // 날짜 필터
  const [authorFilter, setAuthorFilter] = useState(''); // 작성자 필터
  const [reportList, setReportList] = useState([]); // 필터링 후 일지목록
  const [error, setError] = useState(null);

  // 일지목록에서 가져온, 드롭다운박스에 넣을 날짜들과 작성자들
  const uniqueDates = [...new Set(allReport.map((report) => report.createDate.slice(0, 10)))];
  const uniqueAuthors = [...new Set(allReport.map((report) => report.userName))];

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

        if (reports) {
          setAllReport(reports);

          setReportList(
            reports.filter((report) => {
              const date = dateFilter ? report.createDate.startsWith(dateFilter) : true;
              const author = authorFilter ? report.userName === authorFilter : true;
              return date && author;
            })
          );
        }
        return null;
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
          <Rights>
            <Filters>
              {/* 날짜 필터 */}
              <Fillter value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
                <Option value="">날짜 : 전체</Option>
                {uniqueDates.map((date) => (
                  <Option key={date} value={date}>
                    {date}
                  </Option>
                ))}
              </Fillter>
              {/* 작성자 필터 */}
              <Fillter value={authorFilter} onChange={(e) => setAuthorFilter(e.target.value)}>
                <Option value="">작성자 : 전체</Option>
                {uniqueAuthors.map((author) => (
                  <Option key={author} value={author}>
                    {author}
                  </Option>
                ))}
              </Fillter>
            </Filters>
            <Buttons>
              <Link to={`/guardian/patient`} state={pat.patName}>
                <SubmitButton>
                  <ButtonText>목록으로</ButtonText>
                </SubmitButton>
              </Link>
              <Link to={`/caregiver/reportform/${patNo}`} state={pat.patName}>
                <SubmitButton>
                  <ButtonText>글쓰기</ButtonText>
                </SubmitButton>
              </Link>
            </Buttons>
          </Rights>
        </BoardTop>
        <BoardItemTop>
          <div>No</div>
          <div>제목</div>
          <div>작성자</div>
          <div>작성 일자</div>
        </BoardItemTop>
        {reportList && reportList.length > 0 ? (
          reportList.map((report, index) => (
            <BoardItem key={report.reportNo} to={`/report/detail/${report.reportNo}`} state={{ report }}>
              <div>{reportList.length - index}</div>
              <div>{report.reportTitle}</div>
              <div>{report.userName}</div>
              <div>{report.createDate.slice(0, 10)}</div>
            </BoardItem>
          ))
        ) : (
          <BoardItemTop>
            <div>진단일지가 없습니다.</div>
          </BoardItemTop>
        )}

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
  width: 140px;
  border: 1px solid ${({ theme }) => theme.colors.gray[5]};
  border-radius: 4px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.gray[3]};
`;

const Option = styled.option``;

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

const Rights = styled(Right)`
  justify-content: space-between;
`;

const Filters = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const Buttons = styled.div`
  display: flex;
  gap: 10px;
`;
export default ReportMain;
