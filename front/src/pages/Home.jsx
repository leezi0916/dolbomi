import React, { useEffect, useState } from 'react';
import mainBennerImg from '../assets/mainImg/MainBenner1.png';
import { GridContainer } from '../styles/common/Container';
import { styled } from 'styled-components';
import { Section } from '../styles/common/Container';
import { media } from '../styles/MediaQueries';
import { BiSolidPhoneCall } from 'react-icons/bi';
import { hiringService } from '../api/hiring';
import { toast } from 'react-toastify';

const Home = () => {
  const [hiringList, setHiringList] = useState([]);

  useEffect(() => {
    const loadHiringList = async () => {
      try {
        const list = await hiringService.getHiringList();
        setHiringList(list);
      } catch (error) {
        console.error(error);
        const errorMessage = '구인 목록을 불러오는데 실패했습니다.';
        toast.error(errorMessage);
      }
    };

    loadHiringList();
  }, []);

  // 이름 첫글자 O 처리하기
  const maskName = (name) => {
    if (name.length === 2) {
      return name[0] + '○';
    } else if (name.length >= 3) {
      return name[0] + '○' + name.slice(2);
    }

    return name;
  };

  return (
    <>
      <HomeBannerSection>
        <MainBannerImage src={mainBennerImg} />

        <InfoBanner>
          <BannerMessage>
            <MessageLine>도움이 필요한 보호자 230명과</MessageLine>
            <MessageLine>정성 어린 마음을 전할 728명의 간병인이 함께합니다.</MessageLine>
          </BannerMessage>

          <BannerContact>
            <ContactLine>상담문의</ContactLine>
            <ContactLine>간병사와 함께하세요.</ContactLine>
            <ContactLine>
              <PhoneIcon />
              02)525-1333
            </ContactLine>
          </BannerContact>
        </InfoBanner>
      </HomeBannerSection>

      <HiringSection>
        <HiringTextSection>
          <HiringTextSectionTitle>도움이 간절한 돌봄 대상자</HiringTextSectionTitle>
        </HiringTextSection>

        <HiringCardSection>
          <GridContainer>
            {hiringList.map((user) => (
              <Card key={user.job_opening_no}>
                <CardImage src={user.image} />
                <CardContent>
                  <CardTitle>{maskName(user.user_name)} 님</CardTitle>
                  <CardText>나이: {user.age}세</CardText>
                  <CardText>시급: {user.pay}원</CardText>
                  <CardText>상주 가능 · 지역: {user.address}</CardText>
                  <CardButton>상세보기</CardButton>
                </CardContent>
              </Card>
            ))}
          </GridContainer>
        </HiringCardSection>
      </HiringSection>
    </>
  );
};

export default Home;

// 홈 배너 섹션 전체 컨테이너
export const HomeBannerSection = styled(Section)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// 상단 메인 배너 이미지
export const MainBannerImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: ${({ theme }) => theme.borderRadius.base};
`;

// 텍스트 + 상담 섹션 감싸는 박스 (왼+오 구조)
export const InfoBanner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  overflow: hidden;

  ${media.md`
    flex-direction: row;
    aspect-ratio: 5.5 / 1;
  `}
`;

// 왼쪽 메시지 텍스트 영역
export const BannerMessage = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray[5]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  padding: ${({ theme }) => theme.spacing[4]};

  ${media.md`
    width: 75%;
    padding-left: ${({ theme }) => theme.spacing[10]};
  `}
`;

// 오른쪽 상담 섹션
export const BannerContact = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  padding: ${({ theme }) => theme.spacing[4]};

  ${media.md`
    width: 25%;
    padding-left: ${({ theme }) => theme.spacing[6]};
  `}

  ${media.lg`
    padding-left: ${({ theme }) => theme.spacing[10]};
  `}
`;

// 아이콘 (전화)
export const PhoneIcon = styled(BiSolidPhoneCall)`
  margin-right: 8px;
  vertical-align: middle;
  font-size: 1.2em;
`;

// 메시지 라인 (왼쪽 텍스트 라인)
export const MessageLine = styled.p`
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

// 상담 영역 텍스트 (오른쪽)
export const ContactLine = styled(MessageLine)`
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

//  구인 관련 섹션
export const HiringSection = styled(HomeBannerSection)`
  padding-top: 0px;
`;

// 구인글 텍스트 섹션
export const HiringTextSection = styled(BannerMessage)`
  width: 100%;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.third};
  border-radius: ${({ theme }) => theme.borderRadius.base};
`;

// 구인글 텍스트
export const HiringTextSectionTitle = styled(MessageLine)`
  color: ${({ theme }) => theme.colors.black2};
`;

// 유저 카드 섹션
export const HiringCardSection = styled(Section)``;

// 각 카드
export const Card = styled.div`
  background: #fff;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

// 이미지
export const CardImage = styled.div`
  width: 100%;
  height: 180px;
  background-color: ${({ theme }) => theme.colors.gray[200]};
  background-image: ${({ src }) => (src ? `url(${src})` : 'none')};
  background-size: cover;
  background-position: center;
`;

// 카드 내부 내용
export const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// 제목
export const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.gray[900]};
`;

// 텍스트 라벨
export const CardText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray[700]};
`;

// 버튼
export const CardButton = styled.button`
  margin-top: 10px;
  align-self: flex-end;
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: #fff;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondaryDark};
  }
`;
