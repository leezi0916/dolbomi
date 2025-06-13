import { styled } from 'styled-components';
import { media } from '../MediaQueries';

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.gray[900]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};

  ${media.md`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  `}

  ${media.lg`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  `}
`;

export const Price = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};

  ${media.md`
    font-size: ${({ theme }) => theme.fontSizes.base};
  `}
`;
