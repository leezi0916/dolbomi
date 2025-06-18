import React from 'react';
import { BoardMenu, PageInfo, NowBoard, Page } from './CommunityBoard';
import { Link } from 'react-router-dom';

const NoticeBoard = () => {
  return (
    <Page>
      <PageInfo>
        <BoardMenu>
          <Link to="/community/free">자유게시판</Link>
          <NowBoard>공지사항</NowBoard>
          <Link to="/community/question">1:1문의사항</Link>
        </BoardMenu>
      </PageInfo>
    </Page>
  );
};

export default NoticeBoard;
