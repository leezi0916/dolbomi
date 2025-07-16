import { styled } from 'styled-components';
import { media } from '../MediaQueries';

export const Section = styled.section`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[4]};
`;

export const Container = styled.div`
  width: 100%;
  padding: 0 ${({ theme }) => theme.spacing[4]};
  margin: 0 auto;
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

export const GridContainer = styled(Section)`
  display: grid;
  padding: 0;
  gap: ${({ theme }) => theme.spacing[4]};

  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));

  ${media.md`
    gap: ${({ theme }) => theme.spacing[5]};
  `}

  ${media.lg`
    gap: ${({ theme }) => theme.spacing[6]};
  `}
`;
