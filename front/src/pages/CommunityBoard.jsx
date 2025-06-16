import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { commuService } from '../api/community';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import {
  BoardItem,
  BoardItemTop,
  BoardMenu,
  BoardTop,
  BorderDiv,
  Button,
  CommuBoard,
  Input,
  Left,
  Right,
} from '../styles/common/Board';

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
      <BoardMenu>
        <Link to="/CommunityBoard">자유게시판</Link>
        <div>공지사항</div>
        <div>1:1문의사항</div>
        {/* <Link to="/NoticeBoard">공지사항</Link>
        <Link to="/QuestionBoard">1:1문의사항</Link> */}
      </BoardMenu>
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

export default CommunityBoard;
