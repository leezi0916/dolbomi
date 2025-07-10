import React, { useEffect, useState } from 'react';
import { commuService } from '../../api/community';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import useUserStore from '../../store/userStore';
import Paging from '../../components/Paging';
import { Btn, Input, Page } from '../../styles/common/Board';
import {
  BoardItem,
  BoardItemTop,
  BoardMenu,
  BoardTop,
  BoardTopLeft,
  BoardTopRight,
  Drop,
  MenuDiv,
  MenuLink,
  Null,
  PageInfo,
  PageTitle,
  PageTop,
  SearchBtn,
} from './style/Question.styles';

const QuestionHistory = () => {
  const userNo = useUserStore((state) => state.user?.userNo);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const ITEMS_PER_PAGE = 10;

  const chagneCurrentPage = (value) => {
    setCurrentPage(value);
  };
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    const loadQuestion = async () => {
      try {
        const myHistory = await commuService.getQuestionHistory(userNo, currentPage - 1, ITEMS_PER_PAGE);
        console.log(myHistory);

        setData(myHistory.content); // 게시글 목록 등
        setTotalPage(myHistory.totalPage); // 총 페이지 수
        setTotalCount(myHistory.totalCount);
      } catch (error) {
        console.error(error);
        const errorMessage = '목록을 불러오는데 실패했습니다.';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadQuestion();
  }, [userNo, currentPage]);

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
  if (!data || totalCount === 0) {
    return (
      <Page>
        <PageInfo>
          <PageTop>
            <PageTitle> 1:1 문의사항 </PageTitle>
            {userNo && (
              <BoardMenu>
                <MenuLink to="/question/full">전체</MenuLink>
                <MenuDiv>문의내역</MenuDiv>
                <MenuLink to="/question/create"> 문의하기</MenuLink>
              </BoardMenu>
            )}
          </PageTop>

          <BoardTop>
            <BoardTopLeft>총 0건</BoardTopLeft>
            <BoardTopRight style={{ flex: '7' }}>
              <Drop value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option value="date">날짜순</option>
                <option value="views">조회순</option>
              </Drop>
              <Input type="text" />
              <SearchBtn>검색</SearchBtn>
            </BoardTopRight>
          </BoardTop>
          <BoardItemTop>
            <div>No</div>
            <div>유형</div>
            <div style={{ flex: '2' }}>제목</div>
            <div>작성자</div>
            <div style={{ flex: '2' }}>작성 일자</div>
            <div>처리 현황</div>
          </BoardItemTop>
          <Null>
            <div style={{ marginBottom: '10px' }}>게시글이 없습니다.</div>
            {userNo && (
              <Btn style={{ margin: 'auto' }} to="/question/create">
                글쓰기
              </Btn>
            )}
          </Null>

          <Paging totalPage={totalPage} currentPage={currentPage} chagneCurrentPage={chagneCurrentPage} />
        </PageInfo>
      </Page>
    );
  }
  return (
    <Page>
      <PageInfo>
        <PageTop>
          <PageTitle> 1:1 문의사항 </PageTitle>
          {userNo && (
            <BoardMenu>
              <MenuLink to="/question/full">전체</MenuLink>
              <MenuDiv>문의내역</MenuDiv>
              <MenuLink to="/question/create"> 문의하기</MenuLink>
            </BoardMenu>
          )}
        </PageTop>

        <BoardTop>
          <BoardTopLeft>총 {totalCount}건</BoardTopLeft>
          <BoardTopRight style={{ flex: '7' }}>
            <Drop value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              <option value="">작성일</option>
              <option value="count">조회순</option>
            </Drop>
            <Input type="text" />
            <SearchBtn>검색</SearchBtn>
          </BoardTopRight>
        </BoardTop>
        <BoardItemTop>
          <div>No</div>
          <div>유형</div>
          <div style={{ flex: '2' }}>제목</div>
          <div>작성자</div>
          <div style={{ flex: '2' }}>작성 일자</div>
          <div>처리 현황</div>
        </BoardItemTop>
        {data.map((info) => (
          <BoardItem key={info.boardNo} to={`/question/detail/${info.boardNo}`}>
            <div>{info.boardNo}</div>
            <div>
              {info.questionCategory === 'T'
                ? '기술적 문제'
                : info.questionCategory === 'S'
                  ? '서비스 관련'
                  : info.questionCategory === 'E'
                    ? '기타'
                    : '알 수 없음'}
            </div>
            <div style={{ flex: '2' }}>{info.boardTitle}</div>
            <div>{info.userName}</div>
            <div style={{ flex: '2' }}>{info.createDate}</div>
            {info.questionStatus == 'Y' ? <div>완료</div> : <div>대기</div>}
          </BoardItem>
        ))}

        <Paging totalPage={totalPage} currentPage={currentPage} chagneCurrentPage={chagneCurrentPage} />
      </PageInfo>
    </Page>
  );
};

export default QuestionHistory;
