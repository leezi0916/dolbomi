import { useEffect, useState } from 'react';
import useUserStore from '../../store/userStore';
import { Link, useParams } from 'react-router-dom';
import { commuService } from '../../api/community';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { LinkBtn, Page } from '../../styles/common/Board';
import theme from '../../styles/theme';
import styled from 'styled-components';
import {
  BodyTop,
  FileBox,
  FileTitle,
  Icons,
  InputFile,
  Left,
  PageBody,
  PageTitle,
  PageTop,
} from '../community/style/Community.styles';
import { PageInfo, Textarea } from './style/Question.styles';

const QuestionDetail = () => {
  const userNo = useUserStore((state) => state.user?.userNo);
  // 수정하기 버튼 때문에 추가
  const [error, setError] = useState(null);
  const [communityDetail, setCommunityDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const { boardNo } = useParams();

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
  }, [boardNo]);

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

  return (
    <Page>
      <PageInfo>
        <PageTop>
          <PageTitle>문의 게시판 상세</PageTitle>
          <div>
            <RightBtn>뒤로가기</RightBtn>
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
                <MenuBox>
                  <img src="/src/assets/icons/icon_설정메뉴.png" alt="" />
                  <ul>
                    <li>
                      <img src="/src/assets/icons/icon_수정.png" alt="" />
                      <LinkLi to={`/community/update/${communityDetail?.no}`}>수정</LinkLi>
                    </li>
                    <li>
                      <img src="/src/assets/icons/icon_삭제.png" alt="" />
                      <LinkLi> 삭제</LinkLi>
                    </li>
                  </ul>
                </MenuBox>
              ) : null}
            </Right>
          </BodyTop>
          <BodyText>{communityDetail.boardContent}</BodyText>
          {communityDetail.files && communityDetail.files.length > 0 && (
            <FileBox>
              <FileTitle>
                <Icons src="/src/assets/icons/icon_사진.png" alt="" />
                <div>사진</div>
              </FileTitle>
              <InputFile>
                {communityDetail.files?.map((file, index) => (
                  <ImgBox key={index}>
                    <a href={file.filePath} target="_blank" rel="noopener noreferrer">
                      <img
                        src={file.filePath}
                        alt={file.originName || '첨부 이미지'}
                        style={{ width: '100%', aspectRatio: '4 / 3', borderRadius: '4px' }}
                      />
                    </a>
                  </ImgBox>
                ))}
              </InputFile>
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

            {communityDetail.questionStatus === 'Y' ? (
              <LinkBtn style={{ marginLeft: 'auto', marginRight: '20PX' }}>수정</LinkBtn>
            ) : (
              <LinkBtn style={{ marginLeft: 'auto', marginRight: '20PX' }}>작성</LinkBtn>
            )}
          </div>
          <Textarea style={{ marginTop: '10px' }} name="" id="" />

          {communityDetail.reply?.map((reply) => (
            <CommentSelect key={reply.replyNo}>
              <div style={{ width: '100%', gap: '8px' }}>
                <Icons src="/src/assets/icons/icon_작성자.png" alt="" />
                <div>{reply.userName}</div>
                <div>{reply.updateDate}</div>
              </div>
              <div style={{ padding: '5px 10px 0' }}>{reply.replyContent}</div>
            </CommentSelect>
          ))}
        </CommentSelectBox>
      </PageInfo>
    </Page>
  );
};
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
export default QuestionDetail;
