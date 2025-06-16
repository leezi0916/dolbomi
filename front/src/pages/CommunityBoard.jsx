import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { commuService } from '../api/community';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';

const CommunityBoard = () => {
  const [error, setError] = useState(null);
  const [communityList, setCommunityList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCommunity = async () => {
      try {
        const community = await commuService.getCommunity();
        console.log(community);
        setCommunityList(community);
      } catch (error) {
        console.error(error);
        const errorMessage = '목록을 불러오는데 실패했습니다.';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadCommunity();
  }, []);

  if (loading) {
    return (
      <div>
        <ClipLoader size={50} aria-label="Loading Spinner" />
      </div>
    );
  }

  if (error) {
    return null;
  }

  return (
    <Page>
      <CommuBoard>
        <BoardMenu>
          <NowBoard>자유게시판</NowBoard>
          <Link to="/NoticeBoard">공지사항</Link>
          <Link to="/CommunityQuestion">1:1문의사항</Link>
        </BoardMenu>
        <BoardTop>
          <Left>총 {communityList.length}건</Left>
          <Right>
            <Input type="text" />
            <Input type="text" />
            <Btn>글쓰기</Btn>
          </Right>
        </BoardTop>
        <BoardItemTop>
          <div>No</div>
          <div>제목</div>
          <div>작성자</div>
          <div>작성 일자</div>
          <div>조회수</div>
        </BoardItemTop>
        {communityList.map((community) => (
          <BoardItem key={community.no} onClick={() => Navigate(`/communityBorad/${community.no}`)}>
            <div>{community.no}</div>
            <div>{community.title}</div>
            <div>{community.name}</div>
            <div>{community.createDate}</div>
            <div>{community.count}</div>
          </BoardItem>
        ))}
        <BorderDiv></BorderDiv>
      </CommuBoard>
    </Page>
  );
};
export const Page = styled.div`
  display: flex;
  justify-content: center;
`;
export const CommuBoard = styled.div`
  width: 80%;
  padding-top: 80px;
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
const BoardTop = styled.div`
  width: 100%;
  display: flex;
  padding-top: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[3]};
`;
const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.gray[5]};
  border-radius: 4px;
  padding: 0 4px;
`;
const Btn = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
`;

const Left = styled.div`
  align-self: center;
  flex: 1;
`;
const Right = styled.div`
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
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[3]};
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
  border-top: 1px solid ${({ theme }) => theme.colors.gray[3]};
`;

export default CommunityBoard;
