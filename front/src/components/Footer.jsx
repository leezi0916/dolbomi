import React from 'react';
import styled from 'styled-components';
import { SITE_CONFIG } from '../config/site';
import { media } from '../styles/MediaQueries';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <FooterContainer>
        <FooterWrapper>
          <FooterSection>
            <Logo to="/">
            <div>
            <img src="/public/logo.png" />
            <p>{SITE_CONFIG.name}</p>
            </div>
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
              <Link to="/terms-of-service">
                <p>이용약관</p>
              </Link>
              <Link to="/privacy-policy">
                <p>개인정보처리방침</p>
              </Link>
              <div></div>
              <div></div>
              <div></div>
            </FooterContent>
          </FooterSection>
        </FooterWrapper>
      </FooterContainer>
      <Copy>Copyright © 2025 Dolbomi. All rights reserved.</Copy>
    </>
  );
};

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.third};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[8]};

  ${media.md`
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
  padding: ${({ theme }) => theme.spacing[5]};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.gray[900]};

  ${media.md`
    padding: 0;
  `}
`;

const FooterContent = styled.div`
  display: none;
  padding: ${({ theme }) => theme.spacing[1]};
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.gray[600]};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  ${media.md`
   display: flex;
  `}
`;
const Logo = styled(Link)`
 

  div{
    display: none;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  }

  ${media.md`

  div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: ${({ theme }) => theme.spacing[8]};
  }
  
  p{
    display: block;
    font-size: ${({ theme }) => theme.fontSizes['xl']}; 
  }
   
   img {
    display: block;
    
  }
  `}
`;

const Copy = styled.div`
  background-color: ${({ theme }) => theme.colors.third};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  padding: ${({ theme }) => theme.spacing[5]};
  box-shadow: 0 0 0.5px ${({ theme }) => theme.colors.gray[1]};
`;
export default Footer;
