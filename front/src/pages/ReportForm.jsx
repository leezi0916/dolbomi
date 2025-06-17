import React from 'react';
import styled from 'styled-components';
import { Section } from '../styles/common/Container';
import { ButtonText, SubmitButton } from '../styles/common/Button';
import { useParams } from 'react-router-dom';

const ReportForm = () => {
  const { patNo } = useParams();

  return (
    <Wrap>
      <MainTitle>진단 일지 등록 / 수정</MainTitle>
      <br />
      <TopContainer>
        <Top>
          <Input placeholder="제목" />
          <Name>환자명</Name>
          <Name>{new Date().toISOString().slice(0, 10)}</Name>
        </Top>
      </TopContainer>
      <br />
      <Container>
        <Header>
          <Contents>
            <img src="Union.png" alt="" />
          </Contents>
        </Header>
        <Body>
          <Input placeholder="소제목 : " />
          <MainInput />
        </Body>
      </Container>
      <br />
      <Container>
        <Header>
          <Contents onClick={() => close()}>
            <img src="Union.png" alt="" />
          </Contents>
        </Header>
        <Body>
          <Input placeholder="소제목 : " />
          <MainInput />
        </Body>
      </Container>
      <AddBtn>
        <ButtonText>추가</ButtonText>
      </AddBtn>

      <br />
      <br />
      <br />
      <Line />
      <br />
      <Buttons>
        <Btn>
          <ButtonText>삭제</ButtonText>
        </Btn>
        <Btn>
          <ButtonText>등록</ButtonText>
        </Btn>
      </Buttons>
    </Wrap>
  );
};

const Wrap = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
  margin: 0;
`;

const MainTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  display: flex;
`;
const TopContainer = styled(Section)`
  box-shadow: ${({ theme }) => theme.shadows.lg};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
`;

const Container = styled(Section)`
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
`;

const Top = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  padding: 16px;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.gray[5]};
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  width: 100%;
  padding: 10px 20px;
  margin: 10px 0;
`;

const Name = styled.div`
  width: 20%;
  border: 1px solid ${({ theme }) => theme.colors.gray[5]};
  border-radius: 4px;
  padding: 10px 20px;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin: 10px 0;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray[4]};
`;

const Contents = styled.div`
  margin: 8px 16px;
  > img {
    filter: brightness(300%) saturate(0%);
  }
`;

const MainInput = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.gray[5]};
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  width: 100%;
  height: 200px;
  padding: 10px 20px;
  margin: 10px 0;
`;

const Body = styled.div`
  width: 100%;
  padding: 20px;
`;

const Line = styled.div`
  width: 100%;
  height: 3px;
  background-color: ${({ theme }) => theme.colors.gray[3]};
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;

const Btn = styled(SubmitButton)`
  width: 160px;
  height: 60px;
`;

const AddBtn = styled(SubmitButton)`
  width: 100%;
  height: 60px;
`;
export default ReportForm;
