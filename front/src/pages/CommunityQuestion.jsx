import React from 'react';
import { BoardMenu, PageInfo, NowBoard, Page } from './CommunityBoard';
import { Link } from 'react-router-dom';

const CommunityQuestion = () => {
  return (
    <Page>
      <PageInfo>
        <BoardMenu>
          <Link to="/community/free">자유게시판</Link>
          <Link to="/community/notice">공지사항</Link>
          <NowBoard>1:1문의사항</NowBoard>
        </BoardMenu>
      </PageInfo>
    </Page>
  );
};

export default CommunityQuestion;
