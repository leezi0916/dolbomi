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

  ${media.lg`
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
