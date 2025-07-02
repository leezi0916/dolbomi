import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const PageTop = styled.div`
  width: 100%;
  display: flex;
  padding: 0 10px 10px;
`;
export const Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-grow: 1;
`;

export const PageTitle = styled(Left)`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const PageBody = styled.div`
  width: 100%;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.gray[4]};
  border-radius: 4px;
  padding: 12px;
  margin-bottom: 10px;
`;
export const BodyTop = styled.div`
  width: 100%;
  display: flex;
  padding: 10px;
`;

export const Icons = styled.img`
  width: 20px;
  height: 20px;
  align-self: center;
  margin-right: 4px;
`;

export const InputFile = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px;
`;

export const FileBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.gray[5]};
  border-radius: 4px;
  padding: 0 10px;
  margin-bottom: 10px;
`;

export const FileTitle = styled(Left)`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  padding: 10px;
`;
