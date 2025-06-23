import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FlexGrow, LinkBtn } from '../../../styles/common/Board';

// export const AlignLeft = styled.div`
//   flex-grow: 1;
//   align-self: center;
//   justify-items: center;
// `;

export const alignRight = styled.div`
  display: flex;
  justify-content: flex-end;
`;
//

export const PageInfo = styled.div`
  width: 74%;
`;

export const PageTop = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export const PageTitle = styled.div`
  width: 100%;
  text-align: left;

  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  padding: 0 10px 20px;
`;
export const BoardMenu = styled.div`
  width: 100%;
  display: flex;
  gap: 30px;
  padding: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[3]};
`;
export const MenuDiv = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const MenuLink = styled(Link)`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.gray[5]};
  &:hover {
    color: ${({ theme }) => theme.colors.gray[3]};
  }
`;
//
export const BoardTop = styled.div`
  width: 100%;
  height: 42px;
  display: flex;
  justify-content: center;
  padding: 5px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[3]};
`;
export const BoardTopLeft = styled(FlexGrow)``;
export const BoardTopRight = styled(alignRight)`
  flex: 5;
  padding-right: 10px;
  gap: 6px;
`;

export const SearchBtn = styled.button`
  align-content: center;
  width: 50px;
  background-color: ${({ theme }) => theme.colors.gray[3]};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  padding: 0;
`;
// export const CreateBtn = styled(LinkBtn)`
//   width: 10%;
// `;

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
  }
`;
