import React from 'react';
import { BoardMenu, CommuBoard, NowBoard, Page } from './CommunityBoard';
import { Link } from 'react-router-dom';

const CommunityQuestion = () => {
  return (
    <Page>
      <CommuBoard>
        <BoardMenu>
          <Link to="/CommunityBoard">자유게시판</Link>
          <Link to="/NoticeBoard">공지사항</Link>
          <NowBoard>1:1문의사항</NowBoard>
        </BoardMenu>
      </CommuBoard>
    </Page>
  );
};

export default CommunityQuestion;
