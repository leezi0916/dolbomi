import React from 'react';
import { Section } from '../styles/common/Container';
import styled from 'styled-components';

const Report = () => {
  return (
    <Wrap>
      <MainTitle>돌봄 대상자 정보</MainTitle>
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

      {/* 진단 일지 목록 게시판 */}
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

export default Report;
