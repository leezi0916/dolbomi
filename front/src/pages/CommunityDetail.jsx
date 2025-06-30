import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { commuService } from '../api/community';
import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';
import { Page, PageInfo } from './CommunityBoard';
import theme from '../styles/theme';
import useUserStore from '../store/userStore';

const CommunityDetail = () => {
  const userId = useUserStore((state) => state.user?.userId);
  // 수정하기 버튼 때문에 추가
  const [error, setError] = useState(null);
  const [communityDetail, setCommunityDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const { no } = useParams();

  useEffect(() => {
    const loadCommunity = async () => {
      try {
        const community = await commuService.getCommunityDetail(no);
        console.log(community);

        setCommunityDetail(community?.[0]);
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
  }, [no]);

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
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <Page>
      <PageInfo>
        <PageTop>
          <PageTitle>소통게시판 상세</PageTitle>
          <div>
            <RightBtn>뒤로가기</RightBtn>
          </div>
        </PageTop>
        <PageBody>
          <Left style={{ fontSize: theme.fontSizes.lg, fontWeight: theme.fontWeights.medium, padding: '0 10px' }}>
            {communityDetail?.title}
          </Left>
          <BodyTop>
            <Icons src="/src/assets/icons/icon_작성자.png" alt="" />
            <Left style={{ fontSize: theme.fontSizes.sm }}>{communityDetail?.name}</Left>
            <Right>
              <Icons src="/src/assets/icons/icon_조회수.png" alt="" />
              <div style={{ paddingRight: '10px' }}>{communityDetail?.count}</div>
              <Icons src="/src/assets/icons/icon_작성일자.png" alt="" />
              <div style={{ paddingRight: '10px' }}>{communityDetail?.create_date}</div>
              {communityDetail?.id === userId ? (
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
              {/* 수정삭제 메뉴아이콘 로그인 한 사람만 뜨게 하기/원래있던 수정하기 버튼 삭제 */}
            </Right>
          </BodyTop>
          <BodyText>{communityDetail?.board_detail}</BodyText>
          {communityDetail.src && (
            <FileBox>
              <FileTitle>
                <Icons src="/src/assets/icons/icon_사진.png" alt="" />
                <div>사진</div>
              </FileTitle>
              <InputFile>
                {communityDetail.src?.map((src, index) => (
                  <ImgBox key={index}>
                    <img src={src} alt="preview" style={{ width: '100%', aspectRatio: '4 / 3', borderRadius: '4px' }} />
                  </ImgBox>
                ))}
              </InputFile>
            </FileBox>
          )}
          <CommentBox>
            <CommentInput type="text" />
            <CommentButton>댓글 작성</CommentButton>
          </CommentBox>
          <CommentEx>
            <span>
              • 개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법정보 유포 시 이에 대한 민형사상 책임은
              작성자에게 있습니다
            </span>
            <span>• 개인정보가 포함되거나 부적절한 답변은 비노출 또는 해당 서비스 이용 불가 처리될 수 있습니다</span>
          </CommentEx>
        </PageBody>
        <CommentSelectBox>
          <div style={{ gap: '6px', paddingLeft: '10px' }}>
            <div style={{ fontWeight: theme.fontWeights.bold }}>답변</div>
            <div style={{ color: theme.colors.primary, fontWeight: theme.fontWeights.bold }}>2</div>
          </div>
          <CommentSelect>
            <div style={{ marginTop: '10px' }}>야호</div>
          </CommentSelect>
        </CommentSelectBox>
      </PageInfo>
    </Page>
  );
};
const PageTop = styled.div`
  width: 100%;
  display: flex;
  padding: 0 10px 6px;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-grow: 1;
`;

const PageTitle = styled(Left)`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const RightBtn = styled.button`
  width: 100px;
  border: 1px solid ${({ theme }) => theme.colors.gray[4]};
  border-radius: 4px;
`;

const PageBody = styled.div`
  width: 100%;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.gray[4]};
  border-radius: 4px;
  padding: 12px;
  margin-bottom: 10px;
`;

const BodyTop = styled.div`
  width: 100%;
  display: flex;
  padding: 10px;
`;
export const Icons = styled.img`
  width: 20px;
  height: 20px;
  align-self: center;
  margin-right: 4px;
`;

const MenuBox = styled.div`
  display: flex;
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
const InputFile = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px;
`;
const ImgBox = styled.div`
  width: calc(100% / 4);
  aspect-ratio: 4 / 3;
  padding: 0 10px 10px 0px;
  position: relative;
  display: inline-block;
`;

const CommentBox = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[4]};
  padding: 10px;
`;
const CommentInput = styled.input`
  flex-grow: 1;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.colors.gray[4]};
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  padding: 2px 4px;
`;
const CommentButton = styled.button`
  width: 100px;
  height: 100%;

  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  padding: 5px;
`;

const CommentEx = styled.ul`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.gray[5]};
  margin: 0 10px;
  padding: 10px;
  > span {
    text-align: left;
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: ${({ theme }) => theme.fontWeights.light};
  }
`;
const CommentSelectBox = styled(PageBody)`
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
  flex-direction: column;
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[4]};
  margin-top: 10px;
  padding: 0px 10px 0px 10px;
`;

export default CommunityDetail;
