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

// @@@@@ 여기부터 메인 페이지 배너 글씨 컴포넌트입니다. @@@@@

export const LeftBennerText = styled.p`
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

export const RightBennerText = styled(LeftBennerText)`
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

// @@@@@ 여기까지 메인 페이지 배너 글씨 컴포넌트입니다. @@@@@
