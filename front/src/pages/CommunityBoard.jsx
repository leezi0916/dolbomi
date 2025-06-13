import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
    <CommuBoard>
      <BoardMunu>
        <Link to="/CommunityBoard">자유게시판</Link>
        <div>공지사항</div>
        <div>1:1문의사항</div>
        {/* <Link to="/NoticeBoard">공지사항</Link>
        <Link to="/QuestionBoard">1:1문의사항</Link> */}
      </BoardMunu>
      <BoardTop>
        <Left>총 {communityList.length}건</Left>
        <Right>
          <Input type="text" />
          <Input type="text" />
          <Button>글쓰기</Button>
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
        <BoardItem key={community.id}>
          <div>{community.no}</div>
          <div>{community.title}</div>
          <div>{community.name}</div>
          <div>{community.createDate}</div>
          <div>{community.count}</div>
        </BoardItem>
      ))}
      <BorderDiv></BorderDiv>
    </CommuBoard>
  );
};

const CommuBoard = styled.div`
  width: 100%;
  > div {
    display: flex;
    justify-content: center;
  }
`;
const BoardMunu = styled.div`
  width: 100%;
  display: flex;
  gap: 100px;
  padding: 10px;
  border-bottom: 1px solid black;
`;
const BoardTop = styled.div`
  width: 100%;
  display: flex;
  padding-top: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid black;
`;
const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.gray[5]};
  border-radius: 4px;
`;
const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
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

const BoardItemTop = styled.div`
  width: 100%;
  display: flex;
  padding-top: 4px;
  padding-bottom: 4px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black1};
  > div {
    flex: 1;
  }
`;
const BoardItem = styled.div`
  width: 100%;
  display: flex;
  padding-top: 2px;
  padding-bottom: 2px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[5]};
  > div {
    flex: 1;
  }
`;
const BorderDiv = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.black1};
`;

export default CommunityBoard;
