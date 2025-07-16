// import React, { useEffect, useState } from 'react';
// import { commuService } from '../../api/community';
// import { toast } from 'react-toastify';
// import { ClipLoader } from 'react-spinners';
// import useUserStore from '../../store/userStore';
// import Paging from '../../components/Paging';
// import { Input, LinkBtn, Page } from '../../styles/common/Board';
// import {
//   BoardItem,
//   BoardItemTop,
//   BoardMenu,
//   BoardTop,
//   BoardTopLeft,
//   Drop,
//   Form,
//   MenuDiv,
//   MenuLink,
//   Null,
//   PageInfo,
//   PageTitle,
//   PageTop,
//   SearchBtn,
// } from './style/Question.styles';

// const QuestionFull = () => {
//   const userNo = useUserStore((state) => state.user?.userNo);

//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [sortOption, setSortOption] = useState('');
//   const [tempSortOption, setTempSortOption] = useState('');
//   const [keyword, setKeyword] = useState('');
//   const [tempkeyword, setTempKeyword] = useState('');

//   const [currentPage, setCurrentPage] = useState(1);
//   const [data, setData] = useState([]);
//   const [totalPage, setTotalPage] = useState(0);
//   const [totalCount, setTotalCount] = useState(0);
//   const ITEMS_PER_PAGE = 10;

//   const chagneCurrentPage = (value) => {
//     setCurrentPage(value);
//   };

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }, [currentPage]);

//   useEffect(() => {
//     const loadCommunity = async () => {
//       try {
//         const community = await commuService.getQuestion(sortOption, keyword, currentPage - 1, ITEMS_PER_PAGE);
//         console.log(community);
//         setData(community.content); // 게시글 목록 등
//         setTotalPage(community.totalPage); // 총 페이지 수
//         setTotalCount(community.totalCount);
//       } catch (error) {
//         console.error(error);
//         const errorMessage = '목록을 불러오는데 실패했습니다.';
//         setError(errorMessage);
//         toast.error(errorMessage);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadCommunity();
//   }, [keyword, sortOption, currentPage]);

//   if (loading) {
//     return (
//       <div>
//         <ClipLoader size={50} aria-label="Loading Spinner" />
//       </div>
//     );
//   }

//   if (error) {
//     return null;
//   }
//   const handleSubmit = async (e) => {
//     setSortOption(tempSortOption);
//     setKeyword(tempkeyword);
//     e.preventDefault();
//   };
//   if (!data || totalCount === 0) {
//     return (
//       <Page>
//         <PageInfo>
//           <PageTop>
//             <PageTitle> 1:1 문의사항 </PageTitle>
//             {userNo && (
//               <BoardMenu>
//                 <MenuDiv>전체</MenuDiv>
//                 <MenuLink to="/question/history">문의내역</MenuLink>
//                 <MenuLink to="/question/create"> 문의하기</MenuLink>
//               </BoardMenu>
//             )}
//           </PageTop>

//           <BoardTop>
//             <BoardTopLeft>총 0건</BoardTopLeft>
//             <Form onSubmit={handleSubmit} style={{ flex: '8' }}>
//               <Drop value={tempSortOption} onChange={(e) => setSortOption(e.target.value)}>
//                 <option value="">작성일</option>
//                 <option value="count">조회순</option>
//               </Drop>
//               <Input
//                 type="text"
//                 placeholder="검색어 입력"
//                 value={tempkeyword}
//                 onChange={(e) => setTempKeyword(e.target.value)}
//               />
//               <SearchBtn type="submit">검색</SearchBtn>
//             </Form>
//           </BoardTop>
//           <BoardItemTop>
//             <div>No</div>
//             <div style={{ flex: '2' }}>유형</div>
//             <div style={{ flex: '3' }}>제목</div>
//             <div>작성자</div>
//             <div style={{ flex: '2' }}>작성 일자</div>
//           </BoardItemTop>
//           <Null>
//             <div style={{ marginBottom: '10px' }}>게시글이 없습니다.</div>
//             {userNo && (
//               <LinkBtn style={{ margin: 'auto' }} to="/question/create">
//                 글쓰기
//               </LinkBtn>
//             )}
//           </Null>

//           <Paging totalPage={totalPage} currentPage={currentPage} chagneCurrentPage={chagneCurrentPage} />
//         </PageInfo>
//       </Page>
//     );
//   }
//   return (
//     <Page>
//       <PageInfo>
//         <PageTop>
//           <PageTitle> 1:1 문의사항 </PageTitle>
//           {userNo && (
//             <BoardMenu>
//               <MenuDiv>전체</MenuDiv>
//               <MenuLink to="/question/history">문의내역</MenuLink>
//               <MenuLink to="/question/create"> 문의하기</MenuLink>
//             </BoardMenu>
//           )}
//         </PageTop>

//         <BoardTop>
//           <BoardTopLeft>총 {totalCount}건</BoardTopLeft>
//           <Form onSubmit={handleSubmit} style={{ flex: '8' }}>
//             <Drop value={tempSortOption} onChange={(e) => setTempSortOption(e.target.value)}>
//               <option value="">작성일</option>
//               <option value="count">조회순</option>
//             </Drop>
//             <Input
//               type="text"
//               placeholder="검색어 입력"
//               value={tempkeyword}
//               onChange={(e) => setTempKeyword(e.target.value)}
//             />
//             <SearchBtn type="submit">검색</SearchBtn>
//           </Form>
//         </BoardTop>
//         <BoardItemTop>
//           <div>No</div>
//           <div style={{ flex: '2' }}>유형</div>
//           <div style={{ flex: '3' }}>제목</div>
//           <div>작성자</div>
//           <div style={{ flex: '2' }}>작성 일자</div>
//         </BoardItemTop>
//         {data.map((info) => (
//           <BoardItem key={info.boardNo} to={`/question/detail/${info.boardNo}`}>
//             <div>{info.boardNo}</div>
//             <div style={{ flex: '2' }}>
//               {' '}
//               {info.questionCategory === 'T'
//                 ? '기술적 문제'
//                 : info.questionCategory === 'S'
//                   ? '서비스 관련'
//                   : info.questionCategory === 'E'
//                     ? '기타'
//                     : '알 수 없음'}
//             </div>
//             <div style={{ flex: '3' }}>{info.boardTitle}</div>
//             <div>{info.userName}</div>
//             <div style={{ flex: '2' }}>{info.createDate.slice(0, 10)}</div>
//           </BoardItem>
//         ))}

//         <Paging totalPage={totalPage} currentPage={currentPage} chagneCurrentPage={chagneCurrentPage} />
//       </PageInfo>
//     </Page>
//   );
// };

// export default QuestionFull;
