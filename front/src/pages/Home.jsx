import React from 'react';
import { styled } from 'styled-components';
import mainBennerImg from '../assets/mainImg/MainBenner1.png';
import { Section } from '../styles/common/Container';
import { media } from '../styles/MediaQueries';
import { BiSolidPhoneCall } from 'react-icons/bi';

const Home = () => {
  return (
    <>
      <BennerSection>
        <MainBenner src={mainBennerImg} />
        <SubBenner>
          <LeftBennerSection>
            <LeftBennerText>도움이 필요한 보호자 230명과</LeftBennerText>
            <LeftBennerText>정성 어린 마음을 전할 728명의 간병인이 함께합니다.</LeftBennerText>
          </LeftBennerSection>
          <RightBennerSection>
            <RightBennerText>상담문의</RightBennerText>
            <RightBennerText>간병사와 함께하세요.</RightBennerText>
            <RightBennerText>
              <PhoneIcon />
              02)525-1333
            </RightBennerText>
          </RightBennerSection>
        </SubBenner>
      </BennerSection>
    </>
  );
};

const BennerSection = styled(Section)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MainBenner = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const SubBenner = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  overflow: hidden;

  ${media.md`
    flex-direction: row;
    aspect-ratio: 5.5 / 1; // 높이 비율
  `}
`;

const LeftBennerSection = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray[5]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding: ${({ theme }) => theme.spacing[4]};

  ${media.md`
    width: 75%; 
    padding-left: ${({ theme }) => theme.spacing[10]};
    
  `}
`;

const LeftBennerText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: left;

  ${media.sm`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  `}

  ${media.md`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  `}

  ${media.lg`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  `}

  ${media.xl`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  `}
`;

const RightBennerSection = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding: ${({ theme }) => theme.spacing[4]};

  ${media.md`
    width: 25%; 
    padding-left: ${({ theme }) => theme.spacing[6]};
  `}

  ${media.lg`
    width: 25%; 
    padding-left: ${({ theme }) => theme.spacing[10]};
  `}
`;

const RightBennerText = styled(LeftBennerText)`
  color: ${({ theme }) => theme.colors.white};

  ${media.md`
  font-size: ${({ theme }) => theme.fontSizes.base};
  `}

  ${media.lg`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  `}

  ${media.xl`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  `}
`;

const PhoneIcon = styled(BiSolidPhoneCall)`
  margin-right: 8px;
  vertical-align: middle;
  font-size: 1.2em;
`;

export default Home;
