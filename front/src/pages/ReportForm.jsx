import React from 'react';
import styled from 'styled-components';
import { Section } from '../styles/common/Container';

const ReportForm = () => {
  return (
    <Wrap>
      <MainTitle>진단 일지 등록 / 수정</MainTitle>
      <Container></Container>
      <Container></Container>
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

export default ReportForm;
