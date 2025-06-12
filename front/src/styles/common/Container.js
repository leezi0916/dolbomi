import { styled } from 'styled-components';
import { media } from '../MediaQueries';

export const Section = styled.section`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[4]};

  ${media.md`
    padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[4]};
  `}

  ${media.lg`
    padding: ${({ theme }) => theme.spacing[10]} ${({ theme }) => theme.spacing[4]};
  `}
`;

// @@@@@ 여기부터 메인 페이지 배너 영역입니다 @@@@@
export const BennerSection = styled(Section)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const MainBenner = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

export const SubBenner = styled.div`
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

export const LeftBennerSection = styled.div`
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

export const RightBennerSection = styled.div`
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

// @@@@@ 여기까지 메인 페이지 배너 영역입니다 @@@@@

export const Container = styled.div`
  width: 100%;
  padding: 0 ${({ theme }) => theme.spacing[4]};
  margin: 0 auto;

  ${media.sm`
    max-width: 576px;
  `}

  ${media.md`
    max-width: 768px
  `}

  ${media.lg`
    max-width: 992px;
  `}

  ${media.xl`
     max-width: 1200px;
  `}

  ${media['2xl']`
       max-width: 1400px;
  `}
`;

export const FlexContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};

  ${media.md`
       flex-direction: row;
       align-items: center;
       justify-content : space-between;
  `}
`;

export const GridContainer = styled(Container)`
  display: grid;
  grid-template-columns: repeat(1, 1fr); //한줄에 하나 , 넓이 동일하게
  gap: ${({ theme }) => theme.spacing[4]};

  ${media.sm`
    grid-template-columns: repeat(2, 1fr); // 한줄에 두개 , 넓이 동일하게
  `}

  ${media.md`
    grid-template-columns: repeat(3, 1fr);
    gap: ${({ theme }) => theme.spacing[5]};
  `}


  ${media.lg`
    grid-template-columns: repeat(4, 1fr);
    gap: ${({ theme }) => theme.spacing[6]};
  `}
`;
