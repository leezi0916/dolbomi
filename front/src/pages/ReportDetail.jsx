import React, { useState } from 'react';
import styled from 'styled-components';
import { Section } from '../styles/common/Container';
import { Button, ButtonText } from '../styles/common/Button';
import { useLocation } from 'react-router-dom';

const ReportDetail = () => {
  const location = useLocation();
  const report = location.state?.report;

  const [state, setState] = useState(true);
  return (
    <Wrap>
      <Head>
        <MainTitle>[{report.createDate}]</MainTitle>
        <Buttons>
          <Btn>
            <ButtonText>삭제</ButtonText>
          </Btn>
          <Btn onClick={() => setState(!state)}>
            {state ? <ButtonText>수정</ButtonText> : <ButtonText>등록</ButtonText>}
          </Btn>
        </Buttons>
      </Head>
      <br />
      <Container>
        <Title>제목 : {report.reportTitle}</Title>
        <br />
        <SubTitle>
          <Contents>{report.reportContent}</Contents>
        </SubTitle>
      </Container>
    </Wrap>
  );
};

const Wrap = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
  margin-top: 20px;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;
const Btn = styled(Button)`
  border-radius: ${({ theme }) => theme.borderRadius.md};
  width: 160px;
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
  padding: 20px 16px;
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
`;

const SubTitle = styled.div`
  padding: 0 10px;
`;

const Contents = styled.pre`
  text-align: left;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;
export default ReportDetail;
