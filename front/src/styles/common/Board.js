import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

// 예시 코드입니다 지우고 새롭게 만들어주세요
// 단 기본적으로 맨위의 틀을가지고 가서 변경하는것을 추천하나, 많이 바뀔거같으면 아래와 같이 새로 하나 만들어서 사용하세요
// 절대 다른 사람이 만든 컴포넌트 말없이 수정 ㄴㄴ 당신 책임
export const Page = styled.div`
  width: 70%;
  min-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 60px auto;
`;

export const MenuBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  > * {
    display: flex;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
  > p {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    color: ${({ theme }) => theme.colors.primary};
    padding-bottom: 10px;
  }
  > div {
    padding-top: 10px;
    gap: 20px;
    > div {
      color: 1px solid ${({ theme }) => theme.colors.gray[5]};
    }
    a {
      color: ${({ theme }) => theme.colors.gray[5]};
      &:hover {
        color: ${({ theme }) => theme.colors.gray[3]};
      }
    }
  }
`;

export const SearchBoard = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[3]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[3]};
  padding: 5px 20px;
  > div {
    align-self: center;
  }
  > form {
    display: flex;
    > * {
      border-radius: ${({ theme }) => theme.borderRadius.md};
      border: 1px solid ${({ theme }) => theme.colors.gray[3]};
      margin-left: 5px;
    }
    > input {
      padding: 4px;
    }
    > button {
      align-content: center;
      background-color: ${({ theme }) => theme.colors.gray[3]};
      color: ${({ theme }) => theme.colors.white};
      padding: 0 5px;
    }
  }
`;
export const Board = styled.div`
  > * {
    display: grid;
    padding: 5px 0;
  }
  > div:first-of-type {
    > div {
      color: ${({ theme }) => theme.colors.gray[1]};
      font-weight: ${({ theme }) => theme.fontWeights.medium};
    }
  }
  > div {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[3]};
  }
  > a {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[5]};
    > div {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;
export const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.gray[3]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 4px;
`;
export const LinkBtn = styled(Link)`
  align-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 0 5px;
`;
export const SearchBtn = styled.button`
  align-content: center;

  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 0 5px;
`;
export const Btn = styled.button`
  align-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;
export const NullBox = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[3]};
  > * {
    width: max-content;
    margin: 0 auto;
  }
  > div {
    margin-bottom: 5px;
  }
`;
//

export const FlexGrow = styled.div`
  flex-grow: 1;
  align-self: center;
  justify-items: center;
`;

//
export const CommuBoard = styled.div`
  width: 100%;
  > div {
    display: flex;
    justify-content: center;
  }
`;
export const BoardMenu = styled.div`
  width: 100%;
  display: flex;
  gap: 100px;
  padding: 10px;
  border-bottom: 1px solid black;
`;
export const BoardTop = styled.div`
  width: 100%;
  display: flex;
  padding-top: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid black;
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
`;

export const Left = styled.div`
  align-self: center;
  flex: 1;
`;
export const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 4;
  padding-right: 10px;
  gap: 6px;
`;

export const BoardItemTop = styled.div`
  width: 100%;
  display: flex;
  padding-top: 4px;
  padding-bottom: 4px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black1};
  > div {
    flex: 1;
  }
`;
export const BoardItem = styled.div`
  width: 100%;
  display: flex;
  padding-top: 2px;
  padding-bottom: 2px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[5]};
  > div {
    flex: 1;
  }
`;
export const BorderDiv = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.black1};
`;

export const board = styled.div``;
