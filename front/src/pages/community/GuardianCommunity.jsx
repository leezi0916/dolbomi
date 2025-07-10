import React, { useEffect, useState } from 'react';
import useUserStore from '../../store/userStore';
import { commuService } from '../../api/community';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { LinkBtn, NullBox, Page } from '../../styles/common/Board';
import {
  BoardItem,
  BoardItemTop,
  BoardMenu,
  BoardTop,
  BorderDiv,
  Drop,
  Input,
  Left,
  NowBoard,
  PageInfo,
  Right,
  SearchBtn,
} from './style/CommunityList.styles';
import Paging from '../../components/Paging';

const GuardianCommunity = () => {
  const userNo = useUserStore((state) => state.user?.userNo);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [keyword, setKeyword] = useState('');

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
    const loadCommunity = async () => {
      try {
        const community = await commuService.getGuardian(sortOption, keyword, currentPage - 1, ITEMS_PER_PAGE);
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
  }, [currentPage, sortOption, keyword]);

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
  const handleSubmit = async () => {
    try {
      const data = await commuService.getCaregiver(sortOption, keyword, currentPage - 1, ITEMS_PER_PAGE);

      setData(data.content); // 게시글 목록 등
      setTotalPage(data.totalPage); // 총 페이지 수
      setTotalCount(data.totalCount);
    } catch (error) {
      console.error('검색 실패:', error);
    }
  };
  if (!data || totalCount === 0) {
    return (
      <Page>
        <PageInfo>
          <BoardMenu>
            <NowBoard> 보호자 게시판</NowBoard>
          </BoardMenu>
          <BoardTop>
            <Left>총 0건</Left>
            <Form onSubmit={handleSubmit}>
              <Drop value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option value="">작성일</option>
                <option value="count">조회순</option>
              </Drop>
              <Input
                type="text"
                placeholder="검색어 입력"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <SearchBtn>검색</SearchBtn>
            </Form>
          </BoardTop>
          <BoardItemTop>
            <div>No</div>
            <div style={{ flex: '3' }}>제목</div>
            <div>작성자</div>
            <div style={{ flex: '2' }}>작성 일자</div>
            <div>조회수</div>
          </BoardItemTop>
          <NullBox>
            <div style={{ marginBottom: '10px' }}>게시글이 없습니다.</div>
            {userNo && (
              <LinkBtn style={{ margin: 'auto' }} to="/community/create/G">
                글쓰기
              </LinkBtn>
            )}
          </NullBox>
          <BorderDiv></BorderDiv>
          <Paging totalPage={totalPage} currentPage={currentPage} chagneCurrentPage={chagneCurrentPage} />
        </PageInfo>
      </Page>
    );
  }
  return (
    <Page>
      <PageInfo>
        <BoardMenu>
          <NowBoard> 보호자 게시판</NowBoard>
        </BoardMenu>
        <BoardTop>
          <Left>총 {totalCount}건</Left>
          <Right>
            <Drop value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              <option value="">작성일</option>
              <option value="count">조회순</option>
            </Drop>
            <Input type="text" />
            <SearchBtn>검색</SearchBtn>
            {userNo && <LinkBtn to="/community/create/G">글쓰기</LinkBtn>}
          </Right>
        </BoardTop>
        <BoardItemTop>
          <div>No</div>
          <div style={{ flex: '3' }}>제목</div>
          <div>작성자</div>
          <div style={{ flex: '2' }}>작성 일자</div>
          <div>조회수</div>
        </BoardItemTop>
        {data.map((community) => (
          <BoardItem key={community.boardNo} to={`/community/detail/${community.boardNo}`}>
            <div>{community.boardNo}</div>
            <div style={{ flex: '3' }}>{community.boardTitle}</div>
            <div>{community.userName}</div>
            <div style={{ flex: '2' }}>{community.createDate}</div>
            <div>{community.count}</div>
          </BoardItem>
        ))}
        <BorderDiv></BorderDiv>
        <Paging totalPage={totalPage} currentPage={currentPage} chagneCurrentPage={chagneCurrentPage} />
      </PageInfo>
    </Page>
  );
};

export default GuardianCommunity;
