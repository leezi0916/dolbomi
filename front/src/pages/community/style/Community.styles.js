import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Board } from '../../../styles/common/Board';

//게시판 목록
export const BoardBox = styled(Board)`
  > * {
    grid-template-columns: 10% 30% 25% 20% 15%;
  }
`;
//
export const FileBox = styled.div`
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.gray[5]};
  padding: 4px 10px 4px 16px;
  margin: 0 10px 10px;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  > div {
    display: flex;
    flex-wrap: wrap;
  }
  > div:first-of-type {
    padding: 10px 0;
    > p {
      padding-left: 4px;
      font-weight: ${({ theme }) => theme.fontWeights.semibold};
    }
  }
  > div:nth-of-type(2) {
    button {
      width: 100%;
      aspect-ratio: 4 / 3;
      font-size: xx-large;
      color: ${({ theme }) => theme.colors.white};
    }
    input {
      display: none;
    }
    img {
      width: 100%;
      aspect-ratio: 4 / 3;
      border-radius: ${({ theme }) => theme.borderRadius.base};
    }
    > div {
      width: calc(100% / 4);
      padding: 0 10px 10px 0;
    }
    .file-card {
      position: relative;
      display: inline-block;
      > button {
        display: none;
        position: absolute;
        padding: 0 10px 10px 0px;
      }
      &:hover button {
        display: block;
      }
    }
    .file-button {
      > button {
        background: ${({ theme }) => theme.colors.gray[4]};
        border-radius: ${({ theme }) => theme.borderRadius.base};
      }
    }
  }
`;
//
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

export const RightBtn = styled.button`
  width: 100px;
  border: 1px solid ${({ theme }) => theme.colors.gray[4]};
  border-radius: 6px;
`;

export const PageBody = styled.div`
  width: 100%;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.gray[4]};
  border-radius: ${({ theme }) => theme.borderRadius.base};
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

export const MenuBox = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  position: relative;
  > ul {
    display: none;
    position: absolute;
    top: 104%;
    right: 0;
    padding: 10px 10px 0px 10px;
    background-color: white;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius.base};
    z-index: 1;
    > li {
      min-width: 70px;
      cursor: pointer;
      margin-bottom: 10px;
      > img {
        margin-right: 5px;
      }
    }
  }
  &:hover ul {
    display: block;
  }
  > img {
    width: min-content;
  }
`;

export const LinkLi = styled(Link)`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-align: center;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Right = styled.div`
  display: flex;
`;
export const BodyText = styled.div`
  width: 100%;
  min-height: 200px;
  display: flex;
  justify-content: flex-start;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[4]};
  padding: 10px;
`;
export const InputFile = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px;
`;
export const ImgBox = styled.div`
  width: calc(100% / 4);
  aspect-ratio: 4 / 3;
  padding: 0 10px 10px 0px;
  position: relative;
  display: inline-block;
`;
