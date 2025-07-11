import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const PageInfo = styled.div`
  width: 74%;
  padding-bottom: 100px;
  > div {
    display: flex;
    justify-content: center;
  }
`;
export const BoardMenu = styled.div`
  width: 100%;
  display: flex;
  gap: 100px;
  padding: 10px 10px 20px 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[3]};
`;
export const NowBoard = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;
export const BoardTop = styled.div`
  width: 100%;
  height: 42px;
  display: flex;
  padding: 5px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[3]};
`;
export const Drop = styled.select`
  min-width: 20%;
  border: 1px solid ${({ theme }) => theme.colors.gray[5]};
  border-radius: 4px;
  padding: 2px 4px;
`;
export const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.gray[5]};
  border-radius: 4px;
  padding: 2px 4px;
`;
export const SearchBtn = styled.button`
  align-content: center;
  width: 50px;
  background-color: ${({ theme }) => theme.colors.gray[3]};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 6px;
  padding: 0;
`;

export const Left = styled.div`
  align-self: center;
  flex: 1;
`;
export const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 7;
  padding-right: 10px;
  gap: 6px;
`;
export const Form = styled.form`
  display: flex;
  justify-content: flex-end;
  flex: 7;
  padding-right: 10px;
  gap: 6px;
`;
export const BoardItemTop = styled.div`
  width: 100%;
  display: flex;
  padding-top: 4px;
  padding-bottom: 4px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[3]};
  > div {
    flex: 1;
  }
`;
export const BoardItem = styled(Link)`
  width: 100%;
  display: flex;
  padding-top: 2px;
  padding-bottom: 2px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[5]};
  > div {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
export const BorderDiv = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[3]};
`;
