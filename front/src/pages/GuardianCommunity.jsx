import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { commuService } from '../api/community';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';
import useUserStore from '../store/userStore';
import Paging from '../components/Paging';

const GuardianCommunity = () => {
  const userId = useUserStore((state) => state.user?.userId);

  const ROLE = 'G';
  // const STATUS = 'Y';

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
        const community = await commuService.getCommunity(ROLE);
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
          <div style={{ padding: '20px', textAlign: 'center' }}>
            게시글이 없습니다.
            {userId && (
              <div style={{ marginTop: '10px' }}>
                <Btn to="/community/create">글쓰기</Btn>
              </div>
            )}
          </div>
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
          <Left>총 {communityList.length}건</Left>
          <Right>
            <Drop value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              <option value="" disabled hidden>
                -- 작성일순/조회순 --
              </option>
              <option value="date">작성일</option>
              <option value="views">조회순</option>
            </Drop>
            <Input type="text" />
            <SearchBtn>검색</SearchBtn>
            {userId && <Btn to="/community/create">글쓰기</Btn>}
          </Right>
        </BoardTop>
        <BoardItemTop>
          <div>No</div>
          <div style={{ flex: '2' }}>제목</div>
          <div>작성자</div>
          <div>작성 일자</div>
          <div>조회수</div>
        </BoardItemTop>
        {currentList.map((community) => (
          <BoardItem key={community.no} to={`/community/detail/${community.no}`}>
            <div>{community.no}</div>
            <div style={{ flex: '2' }}>{community.title}</div>
            <div>{community.name}</div>
            <div>{community.create_date}</div>
            <div>{community.count}</div>
          </BoardItem>
        ))}
        <BorderDiv></BorderDiv>
        <Paging totalPage={totalPage} currentPage={currentPage} chagneCurrentPage={chagneCurrentPage} />
      </PageInfo>
    </Page>
  );
};
export const Page = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 70px;
`;
export const PageInfo = styled.div`
  width: 74%;
  > div {
    display: flex;
    justify-content: center;
  }
`;
export const BoardMenu = styled.div`
  width: 100%;
  display: flex;
  gap: 100px;
  padding: 10px 10px 20px 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[3]};
`;
export const NowBoard = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;
const BoardTop = styled.div`
  width: 100%;
  height: 42px;
  display: flex;
  padding: 5px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[3]};
`;
const Drop = styled.select`
  min-width: 20%;
  border: 1px solid ${({ theme }) => theme.colors.gray[5]};
  border-radius: 4px;
  padding: 2px 4px;
`;
export const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.gray[5]};
  border-radius: 4px;
  padding: 2px 4px;
`;
const Btn = styled(Link)`
  align-content: center;
  width: 10%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
`;
const SearchBtn = styled.button`
  align-content: center;
  width: 50px;
  background-color: ${({ theme }) => theme.colors.gray[3]};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  padding: 0;
`;

const Left = styled.div`
  align-self: center;
  flex: 1;
`;
const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 5;
  padding-right: 10px;
  gap: 6px;
`;

export const BoardItemTop = styled.div`
  width: 100%;
  display: flex;
  padding-top: 4px;
  padding-bottom: 4px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[3]};
  > div {
    flex: 1;
  }
`;
export const BoardItem = styled(Link)`
  width: 100%;
  display: flex;
  padding-top: 2px;
  padding-bottom: 2px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[5]};
  > div {
    flex: 1;
  }
`;
export const BorderDiv = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[3]};
`;

export default GuardianCommunity;
