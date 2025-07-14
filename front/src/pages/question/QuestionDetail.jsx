import { useEffect, useState } from 'react';
import useUserStore from '../../store/userStore';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { commuService } from '../../api/community';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { Btn, Page } from '../../styles/common/Board';
import theme from '../../styles/theme';
import styled from 'styled-components';
import {
  BodyTop,
  FileTitle,
  Icons,
  InputFile,
  Left,
  PageBody,
  PageTitle,
  PageTop,
} from '../community/style/Community.styles';
import { Textarea } from './style/Question.styles';
import { getDownloadUrl } from '../../api/fileApi';
const QuestionDetail = () => {
  const userRole = useUserStore((state) => state.user?.userRole);
  const userNo = useUserStore((state) => state.user?.userNo);
  const userName = useUserStore((state) => state.user?.userName);
  const { boardNo } = useParams();

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [communityDetail, setCommunityDetail] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [replyMode, setReplyMode] = useState('none');
  const handleCreateClick = () => {
    setReplyMode(replyMode === 'create' ? 'none' : 'create');
  };
  const handleUpdateClick = () => {
    if (communityDetail.reply?.length > 0) {
      setEditedContent(communityDetail.reply[0].replyContent);
    }
    setReplyMode(replyMode === 'update' ? 'none' : 'update');
  };

  const [editedContent, setEditedContent] = useState('');
  useEffect(() => {
    if (communityDetail?.reply?.length > 0) {
      setEditedContent(communityDetail.reply[0].replyContent);
    }
  }, [communityDetail]);

  useEffect(() => {
    const loadCommunity = async () => {
      try {
        const community = await commuService.getCommunityDetail(boardNo);
        console.log(community);

        setCommunityDetail(community);
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
  }, [boardNo, userRole]);

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

  if (!communityDetail) {
    return <Page>게시글을 찾을 수 없습니다.</Page>;
  }
  const handleSaveReply = async () => {
    if (submitting) return;

    console.log('작성 버튼 클릭');

    try {
      setSubmitting(true);
      const replyData = {
        board_no: boardNo,
        user_no: userNo,
        reply_content: editedContent,
      };

      await commuService.createReplyQusetion(replyData); // API 호출

      const updatedCommunity = await commuService.getCommunityDetail(boardNo); // 데이터만 다시 요청
      setCommunityDetail(updatedCommunity); // 상태 갱신
      setReplyMode('none'); // 작성 모드 종료
      setEditedContent(''); // 작성 내용 초기화
    } catch (error) {
      toast.error(error.message);
      const errorMessage = '등록에 실패했습니다. 다시 시도해주세요.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateReply = async () => {
    if (submitting) return;

    console.log('작성 버튼 클릭');

    try {
      setSubmitting(true);
      const replyData = {
        reply_no: communityDetail.reply[0].replyNo,
        reply_content: editedContent,
      };

      await commuService.updateReply(replyData); // API 호출

      const updatedCommunity = await commuService.getCommunityDetail(boardNo); // 데이터만 다시 요청
      setCommunityDetail(updatedCommunity); // 상태 갱신
      setReplyMode('none'); // 작성 모드 종료
      setEditedContent(''); // 작성 내용 초기화
    } catch (error) {
      toast.error(error.message);
      const errorMessage = '등록에 실패했습니다. 다시 시도해주세요.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };
  const handleDeleteBoard = async () => {
    try {
      const deleteBoard = await commuService.deleteBoard(boardNo); // API 호출
      toast.success(deleteBoard);
      navigate(-1);
      // 데이터만 다시 요청
    } catch (error) {
      toast.error(error.message);
      const errorMessage = '삭제 실패했습니다. 다시 시도해주세요.';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleDownload = async (fileNo, fileName) => {
    try {
      const { presignedUrl } = await getDownloadUrl(fileNo);
      const response = await fetch(presignedUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('파일 다운로드 실패:', error);
      alert('파일 다운로드에 실패했습니다.');
    }
  };

  return (
    <Page>
      <PageTop>
        <PageTitle>문의 게시판 상세</PageTitle>
        <div>
          <RightBtn type="button" onClick={() => navigate(-1)}>
            뒤로가기
          </RightBtn>
        </div>
      </PageTop>
      <PageBody>
        <Left style={{ fontSize: theme.fontSizes.lg, fontWeight: theme.fontWeights.medium, padding: '0 10px' }}>
          {communityDetail.boardTitle}
        </Left>
        <BodyTop>
          <Icons src="/src/assets/icons/icon_작성자.png" alt="" />
          <Left style={{ fontSize: theme.fontSizes.sm }}>{communityDetail?.userName}</Left>
          <Right>
            <Icons src="/src/assets/icons/icon_조회수.png" alt="" />
            <div style={{ paddingRight: '10px' }}>{communityDetail?.count}</div>
            <Icons src="/src/assets/icons/icon_작성일자.png" alt="" />
            <div style={{ paddingRight: '10px' }}>{communityDetail?.createDate}</div>
            {communityDetail.userNo === userNo ? (
              <button style={{ padding: '0', color: 'gray' }} type="button" onClick={handleDeleteBoard}>
                삭제
              </button>
            ) : null}
          </Right>
        </BodyTop>

        <BodyText>{communityDetail.boardContent}</BodyText>
        {communityDetail.files && communityDetail.files.length > 0 && (
          <FileBox>
            <p>파일 목록</p>
            {communityDetail.files && communityDetail.files.length > 0 ? (
              communityDetail.files.map((file) => (
                <div key={file.fileNo}>
                  <span>{file.fileName.split('/').pop()}</span> {/* 경로 제외한 파일명만 표시 */}
                  <button onClick={() => handleDownload(file.fileNo, file.fileName.split('/').pop())}>다운로드</button>
                </div>
              ))
            ) : (
              <EmptyMessage>첨부된 파일이 없습니다</EmptyMessage>
            )}
          </FileBox>
        )}
      </PageBody>
      <CommentSelectBox>
        <div style={{ gap: '6px', paddingLeft: '10px' }}>
          <div>
            <div style={{ fontWeight: theme.fontWeights.bold }}>답변</div>
            <div style={{ color: theme.colors.primary, fontWeight: theme.fontWeights.bold }}>
              {communityDetail.questionStatus === 'Y' ? '완료' : '대기'}
            </div>
          </div>
          {userRole === 'ADMIN' && replyMode === 'none' && (
            <div>
              {communityDetail.questionStatus === 'Y' ? (
                <Btn type="button" onClick={handleUpdateClick}>
                  수정
                </Btn>
              ) : (
                <Btn type="button" onClick={handleCreateClick}>
                  작성
                </Btn>
              )}
            </div>
          )}
        </div>
        {replyMode !== 'none' && (
          <CommentSelect style={{ padding: '10px' }}>
            {replyMode === 'update' &&
              communityDetail.reply.map((reply) => (
                <div key={reply.replyNo} style={{ width: '100%', gap: '8px' }}>
                  <Icons src="/src/assets/icons/icon_작성자.png" alt="" />
                  <div>{reply.userName}</div>
                  <div>{reply.updateDate}</div>
                  <div style={{ marginLeft: 'auto' }}>
                    <Btn type="button" onClick={handleUpdateReply}>
                      수정
                    </Btn>
                    <Btn type="button" style={{ margin: '0 10PX' }} onClick={handleUpdateClick}>
                      취소
                    </Btn>
                  </div>
                </div>
              ))}
            {replyMode === 'create' && (
              <div style={{ width: '100%', gap: '8px' }}>
                <Icons src="/src/assets/icons/icon_작성자.png" alt="" />
                <div>{userName}</div>
                <div style={{ marginLeft: 'auto' }}>
                  <Btn type="button" onClick={handleSaveReply}>
                    작성
                  </Btn>
                  <Btn type="button" style={{ margin: '0 10PX' }} onClick={handleCreateClick}>
                    취소
                  </Btn>
                </div>
              </div>
            )}

            <Textarea
              style={{ marginTop: '10px' }}
              as="textarea"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          </CommentSelect>
        )}
        {replyMode === 'none' &&
          communityDetail.reply?.map((reply) => (
            <CommentSelect key={reply.replyNo}>
              <div style={{ width: '100%', gap: '8px' }}>
                <Icons src="/src/assets/icons/icon_작성자.png" alt="" />
                <div>{reply.userName}</div>
                <div>{reply.updateDate}</div>
              </div>
              <div style={{ textAlign: 'left', padding: '5px 10px 0' }}>{reply.replyContent}</div>
            </CommentSelect>
          ))}
      </CommentSelectBox>
    </Page>
  );
};
export const FileBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.gray[5]};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  padding: 10px;

  * {
    border-radius: ${({ theme }) => theme.borderRadius.base};
  }
  span {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
  > p {
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    margin-right: auto;
    padding: 0 10px 10px;
  }
  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.colors.gray[6]};
    padding: 10px;
    > span {
      color: ${({ theme }) => theme.colors.gray[3]};
    }
    > button {
      font-size: ${({ theme }) => theme.fontSizes.sm};
      color: ${({ theme }) => theme.colors.primary};
      background: transparent;
      border: 1px solid ${({ theme }) => theme.colors.primary};
      cursor: pointer;
      transition: all 0.2s;
      padding: 8px 20px;

      &:hover {
        background: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.white};
      }
    }
  }

  > span {
    width: 100%;
    color: ${({ theme }) => theme.colors.gray[3]};
    background-color: ${({ theme }) => theme.colors.gray[6]};
    padding: 10px;
  }
`;
const RightBtn = styled.button`
  width: 100px;
  border: 1px solid ${({ theme }) => theme.colors.gray[4]};
  border-radius: 6px;
`;

const ImgBox = styled.div`
  width: calc(100% / 4);
  aspect-ratio: 4 / 3;
  padding: 0 10px 10px 0px;
  position: relative;
  display: inline-block;
`;
const Right = styled.div`
  display: flex;
`;

const BodyText = styled.div`
  width: 100%;
  min-height: 200px;
  display: flex;
  justify-content: flex-start;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[4]};
  padding: 10px;
`;
const MenuBox = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  position: relative;
  > ul {
    display: none;
    position: absolute;
    top: 104%;
    right: 0;
    padding: 10px 10px 0px 10px;
    background-color: white;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius.base};
    z-index: 1;
    > li {
      min-width: 70px;
      cursor: pointer;
      margin-bottom: 10px;
      > img {
        margin-right: 5px;
      }
    }
  }
  &:hover ul {
    display: block;
  }
  > img {
    width: min-content;
  }
`;

const LinkLi = styled(Link)`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-align: center;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CommentSelectBox = styled(PageBody)`
  margin-bottom: 40px;
  > div {
    display: flex;
    justify-content: flex-start;
    > div {
      display: flex;
      justify-content: flex-start;
    }
  }
`;
const CommentSelect = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[4]};
  margin-top: 10px;
  padding: 10px 10px 0px 10px;
  > div {
    align-items: center;
  }
`;
const FileListTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
  text-align: left;
  padding: 5px 15px;
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  border: 1px solid #e9ecef;
`;

const FileName = styled.span`
  font-size: 0.875rem;
  color: #495057;
  flex: 1;
`;

const DownloadButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.primary};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

const EmptyMessage = styled.p`
  text-align: center;
  font-size: 0.875rem;
  color: #6c757d;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 6px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;
export default QuestionDetail;
