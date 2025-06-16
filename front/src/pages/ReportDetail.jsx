import React from 'react';
import styled from 'styled-components';
import { Section } from '../styles/common/Container';
import { Button, ButtonText } from '../styles/common/Button';

const ReportDetail = () => {
  return (
    <Wrap>
      <Head>
        <MainTitle>[2025.06.02]</MainTitle>
        <Buttons>
          <Btn>
            <ButtonText>삭제</ButtonText>
          </Btn>
          <Btn>
            <ButtonText>수정</ButtonText>
          </Btn>
        </Buttons>
      </Head>
      <br />
      <Container>
        <Title>1. 신체활동 수준:</Title>
        <p>( ) 거의 없음 ( ) 보통 ( ) 활발함</p>
        <br />
        <Title>2. 스트레스 수준(1~10):</Title>
        <SubTitle>[ 5 ]</SubTitle>
        <br />
        <Title>3. 식사 내용:</Title>
        <SubTitle>[ 아침: 계란후라이, 흰밥, 김치 ]</SubTitle>
        <SubTitle>[ 점심: 계란후라이, 흰밥, 김치 ]</SubTitle>
        <SubTitle>[ 저녁: 계란후라이, 흰밥, 김치 ]</SubTitle>
        <br />
        <Title>4. 복용 여부 체크:</Title>
        <SubTitle>[✔] 아침 약 복용</SubTitle>
        <SubTitle>[✔] 점심 약 복용</SubTitle>
        <SubTitle>[✔] 저녁 약 복용</SubTitle>
        <br />
        <Title>5. 감정 상태:</Title>
        <SubTitle>( )안정 ( )불안 ( )우울 ( )분노 (✔)혼란</SubTitle>
        <br />
        <Title>6. 혼잣말/ 망상/ 불안 증상 여부:</Title>
        <SubTitle>[✔] 있음 / [ ]없음</SubTitle>
        <br />
        <Title>7. 특이사항:</Title>
        <SubTitle>오늘 아침 혈압이 다소 높음.</SubTitle>
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
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const SubTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;
export default ReportDetail;
