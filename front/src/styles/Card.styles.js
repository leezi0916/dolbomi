import styled from 'styled-components';
import { Container, Section } from './common/Container';
import { media } from './MediaQueries';
import { MessageLine,BannerMessage, HomeBannerSection } from '../pages/GuardianMainPage';
import { Title } from './Auth.styles';


export const NewCantainer = styled(Container)`
margin-top: 50px;
`

export const NewTitle = styled(Title)`
text-align: left;
`

export const CardWrap = styled.div`
padding:${({ theme }) => theme.spacing[5]} ;
  background-color: white;
  box-shadow: ${({ theme }) => theme.shadows.base};
  min-height: 800px;
  border: 1px solid  ${({ theme }) => theme.colors.gray[5]};
`;


// 유저 카드 섹션
export const HiringCardSection = styled(Section)`
  padding: ${({ theme }) => theme.spacing[0]};
`;

// 각 카드
export const HiringCard = styled.div`
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

// 카드 상단 내부 내용
export const HiringCardTopContent = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
  display: flex;
  gap: ${({ theme }) => theme.spacing[5]};
`;

// 이미지
export const HiringCardImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%; // 원형 처리
  background-image: ${({ src }) => (src ? `url(${src})` : 'none')};
  background-size: cover;
  background-position: center;
  flex-shrink: 0; // 축소 방지

  ${media.sm`
    width: 80px;
    height: 80px;
  `}

  ${media.xl`
    width: 100px;
    height: 100px;
  `}
`;

// 카드 상단 내용 제목 + 텍스트 묶는 영역
export const HiringCardTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[2]};
`;

// 제목 (이름)
export const HiringCardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.gray[1]};
`;

// 텍스트 라벨 (나이, 시급)
export const HiringCardText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray[2]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

// 구분선 + 지역 + 버튼 감싸는 하단 영역
export const HiringCardBottomContent = styled.div`
  margin-top: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  border-top: 1px solid ${({ theme }) => theme.colors.gray[4]};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// 지역 텍스트
export const HiringCardRegion = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray[1]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  span {
    color: ${({ theme }) => theme.colors.gray[3]};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }
`;

// 버튼
export const HiringCardButton = styled.button`
  align-self: flex-end;
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
`;


//  구인 관련 섹션
export const JobSeekingSection = styled(HomeBannerSection)`
  padding-top: ${({ theme }) => theme.spacing[0]};
`;

// 구인글 텍스트 섹션
export const JobSeekingTextSection = styled(BannerMessage)`
  width: 100%;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.third};
  border-radius: ${({ theme }) => theme.borderRadius.base};
`;

// 구인글 텍스트
export const JobSeekingTextSectionTitle = styled(MessageLine)`
  color: ${({ theme }) => theme.colors.black2};
`;

// 유저 카드 섹션
export const JobSeekingCardSection = styled(Section)`
  padding: ${({ theme }) => theme.spacing[0]};
  
`;

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

// 카드 상단 내부 내용
export const CardTopContent = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
  display: flex;
  gap: ${({ theme }) => theme.spacing[5]};
`;

// 이미지
export const CardImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%; // 원형 처리
  background-image: ${({ src }) => (src ? `url(${src})` : 'none')};
  background-size: cover;
  background-position: center;
  flex-shrink: 0; // 축소 방지

  ${media.sm`
    width: 80px;
    height: 80px;
  `}

  ${media.xl`
    width: 100px;
    height: 100px;
  `}
`;

// 카드 상단 내용 제목 + 텍스트 묶는 영역
export const CardTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[2]};
`;

// 제목 (이름)
export const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.gray[1]};
`;

// 텍스트 라벨 (나이, 시급)
export const CardText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray[2]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

// 구분선 + 지역 + 버튼 감싸는 하단 영역
export const CardBottomContent = styled.div`
  margin-top: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  border-top: 1px solid ${({ theme }) => theme.colors.gray[4]};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CardBottomTextSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[1]};
`;

// 자격증 텍스트
export const CardLicenseText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray[1]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  span {
    color: ${({ theme }) => theme.colors.gray[3]};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }
`;
// 지역 텍스트
export const CardRegionText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray[1]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  // 말줄임 처리
  display: inline-block;
  max-width: 120px;
  white-space: nowrap; // 줄바꿈 방지
  overflow: hidden; // 넘친 부분 숨김
  text-overflow: ellipsis; // 넘친 텍스트를 ...으로 표시
  vertical-align: middle;

  span {
    color: ${({ theme }) => theme.colors.gray[3]};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }

  ${media.sm`
    max-width: 80px; 
  `}

  ${media.xl`
    max-width: 120px; 
  `}
`;

// 버튼
export const CardButton = styled.button`
  align-self: flex-end;
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
`;
