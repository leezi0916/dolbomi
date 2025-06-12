import React from 'react';
import mainBennerImg from '../assets/mainImg/MainBenner1.png';
import {
  BennerSection,
  LeftBennerSection,
  MainBenner,
  RightBennerSection,
  SubBenner,
} from '../styles/common/Container';
import { LeftBennerText, RightBennerText } from '../styles/common/Typography';
import { PhoneIcon } from '../styles/common/Icon';

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

export default Home;
