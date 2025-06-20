import React from 'react';
import styled from 'styled-components';
import { SITE_CONFIG } from '../config/site';
import { media } from '../styles/MediaQueries';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterWrapper>
        <FooterSection>
          <Logo to="/">
            <img src="/public/logo.png" />
            {SITE_CONFIG.name}
          </Logo>
        </FooterSection>

        <FooterSection>
          <FooterTitle>고객센터</FooterTitle>
          <FooterContent>
            <p>전화: {SITE_CONFIG.contact.phone}</p>
            <p>이메일: {SITE_CONFIG.contact.email}</p>
            <p>운영시간: {SITE_CONFIG.contact.runtime}</p>
          </FooterContent>
        </FooterSection>

        <FooterSection>
          <FooterTitle>회사정보</FooterTitle>
          <FooterContent>
            <p>상호명: {SITE_CONFIG.name}</p>
            <p>대표: {SITE_CONFIG.info.ceo}</p>
            <p>사업자등록번호: {SITE_CONFIG.info.company_number}</p>
          </FooterContent>
        </FooterSection>

        <FooterSection>
          <FooterTitle>이용약관</FooterTitle>
          <FooterContent>
            <p>이용약관</p>
            <p>개인정보처리방침</p>
            <p>사업자정보확인</p>
          </FooterContent>
        </FooterSection>
      </FooterWrapper>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  min-height: 164px;
  background-color: ${({ theme }) => theme.colors.third};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;

  ${media.md`
    padding: ${({ theme }) => theme.spacing[8]};
    display : block;
  `}
`;

const FooterWrapper = styled.div`
  max-width: 1280px;
  display: flex;
  justify-content: space-around;

  margin: auto;
  ${media.md`
    flex-direction: row;
    gap: ${({ theme }) => theme.spacing[8]};
  `}
`;

const FooterSection = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[4]};
  ${media.md`
    flex-direction: column;
  `}
`;

const FooterTitle = styled.h3`
  padding: ${({ theme }) => theme.spacing[8]};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.gray[900]};

  ${media.md`
    padding: 0;
  `}
`;

const FooterContent = styled.div`
  display: none;

  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.gray[600]};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  ${media.md`
   display: flex;
  `}
`;
const Logo = styled(Link)`
  display: none;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};

  img {
    margin-right: ${({ theme }) => theme.spacing[8]};
  }

  ${media.md`
  display: block;
   font-size: ${({ theme }) => theme.fontSizes['2xl']}; 
  `}
`;

export default Footer;
