import styled, { css } from 'styled-components';
import { Button, Title } from './Auth.styles';
import { MainMoveButton, MainSubmitButton } from './common/Button';
import { media } from '../styles/MediaQueries';


export const CardWrap = styled.div`
  display: ${({ list }) => (list?.length > 0 ? 'grid' : 'flex')};
  width: 100%;
  padding: ${({ theme }) => theme.spacing[5]};
  gap: ${({ theme }) => theme.spacing[8]};
  grid-template-columns: 1fr;

  ${({ list }) =>
    list?.length > 0 &&
    media.lg`
      grid-template-columns: repeat(2, 1fr);
    `}
`;
export const CardInnerWrap = styled.div`
  width: 100%;
  gap: 10px;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.gray[5]};
  border-radius: 4px;
  box-shadow: ${({ theme }) => theme.shadows.md};
`;
export const ProfileSection = styled.div`
  display: flex;
  margin: ${({ theme }) => theme.spacing[3]};
  margin-bottom: 0px;
  gap: ${({ theme }) => theme.spacing[3]};
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[5]};
  padding: ${({ theme }) => theme.spacing[5]};
`;

export const InfoSection = styled.div`
  padding: ${({ theme }) => theme.spacing[3]};
`;
export const ProFileImges = styled.img`
  padding: auto;
  width: 150px;
  height: 150px;
`;
export const TextWrap = styled.div`
  display: flex;
  gap: 10px;
  margin: 5px;
  align-items: center;

  img {
   
    width: 18px;
    height: 18px;
  }
  p {
    text-align: left;
  }
`;
export const BtnSection = styled.div`
  display: flex;
  width: 100%;

  button {
    margin: ${({ theme }) => theme.spacing[3]};
    padding: ${({ theme }) => theme.spacing[3]};

    border-radius: ${({ theme }) => theme.borderRadius.base};
    cursor: pointer;

    color: ${({ theme }) => theme.colors.white};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }
`;
export const ReportBtn = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  width: 45%;
`;
export const EndBtn = styled.button`
  background-color: ${({ theme }) => theme.colors.danger};
  width: 45%;
`;
