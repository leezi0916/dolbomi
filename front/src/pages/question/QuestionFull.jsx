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

const QuestionFull = () => {
  const userId = useUserStore((state) => state.user?.userId);

  const [error, setError] = useState(null);
  const [communityList, setCommunityList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentList = communityList.slice(startIndex, endIndex);
  const totalPage = Math.ceil(communityList.length / ITEMS_PER_PAGE);

  const chagneCurrentPage = (value) => {
    setCurrentPage(value);
  };
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    const loadCommunity = async () => {
      try {
        const community = await commuService.getQuestion();
        console.log(community);
        setCommunityList(community.content);
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
  }, [userId]);

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
  if (!communityList || communityList.length === 0) {
    return (
      <Page>
        <PageInfo>
          <PageTop>
            <PageTitle> 1:1 문의사항 </PageTitle>
            {userId && (
              <BoardMenu>
                <MenuDiv>전체</MenuDiv>
                <MenuLink to="/question/history">문의내역</MenuLink>
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
            <div style={{ flex: '3' }}>제목</div>
            <div>작성자</div>
            <div style={{ flex: '2' }}>작성 일자</div>
          </BoardItemTop>
          <Null>
            <div style={{ marginBottom: '10px' }}>게시글이 없습니다.</div>
            {userId && (
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
          {userId && (
            <BoardMenu>
              <MenuDiv>전체</MenuDiv>
              <MenuLink to="/question/history">문의내역</MenuLink>
              <MenuLink to="/question/create"> 문의하기</MenuLink>
            </BoardMenu>
          )}
        </PageTop>

        <BoardTop>
          <BoardTopLeft>총 {communityList.length}건</BoardTopLeft>
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
          <div style={{ flex: '3' }}>제목</div>
          <div>작성자</div>
          <div style={{ flex: '2' }}>작성 일자</div>
        </BoardItemTop>
        {currentList.map((info) => (
          <BoardItem key={info.boardNo} to={`/question/detail/${info.boardNo}`}>
            <div>{info.boardNo}</div>
            <div>
              {' '}
              {info.questionCategory === 'T'
                ? '기술적 문제'
                : info.questionCategory === 'S'
                  ? '서비스 관련'
                  : info.questionCategory === 'E'
                    ? '기타'
                    : '알 수 없음'}
            </div>
            <div style={{ flex: '3' }}>{info.boardTitle}</div>
            <div>{info.userName}</div>
            <div style={{ flex: '2' }}>{info.createDate}</div>
          </BoardItem>
        ))}

        <Paging totalPage={totalPage} currentPage={currentPage} chagneCurrentPage={chagneCurrentPage} />
      </PageInfo>
    </Page>
  );
};

export default QuestionFull;
