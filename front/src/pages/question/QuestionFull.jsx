import React, { useEffect, useState } from 'react';
import { commuService } from '../../api/community';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import useUserStore from '../../store/userStore';
import Paging from '../../components/Paging';
import { Input, LinkBtn, MenuBox, NullBox, Page, SearchBar, SearchBtn } from '../../styles/common/Board';
// import {
//   BoardItemTop,
//   BoardMenu,
//   BoardTop,
//   BoardTopLeft,
//   Drop,
//   Form,
//   MenuDiv,
//   MenuLink,
//   Null,
//   PageTitle,
//   PageTop,
//   SearchBtn,
// } from './style/Question.styles';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const QuestionFull = () => {
  const userNo = useUserStore((state) => state.user?.userNo);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [sortOption, setSortOption] = useState('');
  const [tempSortOption, setTempSortOption] = useState('');
  const [keyword, setKeyword] = useState('');
  const [tempkeyword, setTempKeyword] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const ITEMS_PER_PAGE = 10;

  const chagneCurrentPage = (value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    const loadCommunity = async () => {
      try {
        const community = await commuService.getQuestion(sortOption, keyword, currentPage - 1, ITEMS_PER_PAGE);
        console.log(community);
        setData(community.content); // 게시글 목록 등
        setTotalPage(community.totalPage); // 총 페이지 수
        setTotalCount(community.totalCount);
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
  }, [keyword, sortOption, currentPage]);

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
  const handleSubmit = async (e) => {
    setSortOption(tempSortOption);
    setKeyword(tempkeyword);
    e.preventDefault();
  };
  if (data || totalCount === 0) {
    return (
      <Page>
        <MenuBox>
          <p> 1:1 문의사항 </p>
          {userNo && (
            <div>
              <div>전체</div>
              <Link to="/question/history">문의내역</Link>
              <Link to="/question/create"> 문의하기</Link>
            </div>
          )}
        </MenuBox>
        <SearchBar>
          <div>총 0건</div>
          <form onSubmit={handleSubmit}>
            <select value={tempSortOption} onChange={(e) => setSortOption(e.target.value)}>
              <option value="">작성일</option>
              <option value="count">조회순</option>
            </select>
            <input
              type="text"
              placeholder="검색어 입력"
              value={tempkeyword}
              onChange={(e) => setTempKeyword(e.target.value)}
            />
            <SearchBtn type="submit">검색</SearchBtn>
          </form>
        </SearchBar>
        <Board>
          <div>
            <div>No</div>
            <div>유형</div>
            <div>제목</div>
            <div>작성자</div>
            <div>작성 일자</div>
          </div>
        </Board>
        <NullBox>
          <div style={{ marginBottom: '10px' }}>게시글이 없습니다.</div>
          {userNo && <LinkBtn to="/question/create">글쓰기</LinkBtn>}
        </NullBox>
        <Paging totalPage={totalPage} currentPage={currentPage} chagneCurrentPage={chagneCurrentPage} />
      </Page>
    );
  }
  return (
    <Page>
      <MenuBox>
        <p> 1:1 문의사항 </p>
        {userNo && (
          <div>
            <div>전체</div>
            <Link to="/question/history">문의내역</Link>
            <Link to="/question/create"> 문의하기</Link>
          </div>
        )}
      </MenuBox>
      <SearchBar>
        <div>총 {totalCount}건</div>
        <form onSubmit={handleSubmit}>
          <select value={tempSortOption} onChange={(e) => setTempSortOption(e.target.value)}>
            <option value="">작성일</option>
            <option value="count">조회순</option>
          </select>
          <input
            type="text"
            placeholder="검색어 입력"
            value={tempkeyword}
            onChange={(e) => setTempKeyword(e.target.value)}
          />
          <SearchBtn type="submit">검색</SearchBtn>
        </form>
      </SearchBar>
      <Board>
        <div>
          <div>No</div>
          <div>유형</div>
          <div>제목</div>
          <div>작성자</div>
          <div>작성 일자</div>
        </div>
        {data.map((info) => (
          <Link key={info.boardNo} to={`/question/detail/${info.boardNo}`}>
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
            <div>{info.boardTitle}</div>
            <div>{info.userName}</div>
            <div>{info.createDate.slice(0, 10)}</div>
          </Link>
        ))}
      </Board>
      <Paging totalPage={totalPage} currentPage={currentPage} chagneCurrentPage={chagneCurrentPage} />
    </Page>
  );
};

//현재페이지
const Board = styled.div`
  > * {
    display: grid;
    grid-template-columns: 10% 20% 40% 10% 20%;
    padding: 5px 0;
  }
  > div {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[3]};
  }
  > a {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[5]};
    > div {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

export default QuestionFull;
