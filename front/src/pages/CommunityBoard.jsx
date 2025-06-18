import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { commuService } from '../api/community';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';
import useUserStore from '../store/userStore';

const CommunityBoard = () => {
  const userId = useUserStore((state) => state.user?.user_id);

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
      <PageInfo>
        <BoardMenu>
          <NowBoard>자유게시판</NowBoard>
          <Link to="/community/notice">공지사항</Link>
          <Link to="/community/question">1:1문의사항</Link>
        </BoardMenu>
        <BoardTop>
          <Left>총 {communityList.length}건</Left>
          <Right>
            <Input type="text" />
            <Input type="text" />
            {userId ? <Btn to="/community/free/create">글쓰기</Btn> : null}
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
          <BoardItem key={community.no} to={`/community/free/detail/${community.no}`}>
            <div>{community.no}</div>
            <div>{community.title}</div>
            <div>{community.name}</div>
            <div>{community.createDate}</div>
            <div>{community.count}</div>
          </BoardItem>
        ))}
        <BorderDiv></BorderDiv>
      </PageInfo>
    </Page>
  );
};
export const Page = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 70px;
`;
export const PageInfo = styled.div`
  width: 74%;
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
  height: 42px;
  display: flex;
  padding: 5px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[3]};
`;
export const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.gray[5]};
  border-radius: 4px;
  padding: 2px 4px;
`;
const Btn = styled(Link)`
  align-content: center;
  width: 10%;
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
export const BorderDiv = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[3]};
`;

export default CommunityBoard;
