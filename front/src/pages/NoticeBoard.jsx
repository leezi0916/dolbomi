import React from 'react';
import { BoardMenu, CommuBoard, NowBoard, Page } from './CommunityBoard';
import { Link } from 'react-router-dom';

const NoticeBoard = () => {
  return (
    <Page>
      <CommuBoard>
        <BoardMenu>
          <Link to="/CommunityBoard">자유게시판</Link>
          <NowBoard>공지사항</NowBoard>
          <Link to="/CommunityQuestion">1:1문의사항</Link>
        </BoardMenu>
      </CommuBoard>
    </Page>
  );
};

export default NoticeBoard;
