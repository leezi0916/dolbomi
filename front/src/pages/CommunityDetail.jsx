import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { commuService } from '../api/community';
import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';
import { Input, Page, PageInfo } from './CommunityBoard';
import theme from '../styles/theme';

const CommunityDetail = () => {
  const [error, setError] = useState(null);
  const [communityDetail, setCommunityDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const { no } = useParams();

  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click(); // 숨겨진 input을 클릭
  };

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: crypto.randomUUID(),
    }));
    setImages((prev) => [...prev, ...newImages]);

    e.target.value = '';
  };
  const handleDelete = (id) => {
    setImages((prev) => {
      const filtered = prev.filter((img) => img.id !== id);
      const removed = prev.find((img) => img.id === id);
      if (removed) URL.revokeObjectURL(removed.preview);
      return filtered;
    });
  };

  useEffect(() => {
    const loadCommunity = async () => {
      try {
        const community = await commuService.getCommunityDetail(no);
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
      {communityDetail.map((info) => (
        <PageInfo key={info.no}>
          <PageTop>
            <PageTitle>소통게시판 상세</PageTitle>
            <RightBtn>뒤로가기</RightBtn>
          </PageTop>
          <PageBody>
            <Left style={{ fontSize: theme.fontSizes.lg, fontWeight: theme.fontWeights.medium, padding: '0 10px' }}>
              {info.title}
            </Left>
            <BodyTop>
              <Left>{info.name}</Left>
              <Right>
                <div>{info.count}</div>
                <div>{info.createDate}</div>
                <div>설정</div>
              </Right>
            </BodyTop>
            <BodyText>detail 영역</BodyText>
            <InputFile>
              {images.map((img) => (
                <ImgBox>
                  <button onClick={() => handleDelete(img.id)}>x</button>
                  <img
                    key={img.id}
                    src={img.preview}
                    alt="preview"
                    style={{ width: '100%', aspectRatio: '4 / 3', borderRadius: '4px' }}
                  />
                </ImgBox>
              ))}
              <div style={{ width: 'calc(100% / 4)', aspectRatio: '4 / 3', padding: '0 10px 10px 0px' }}>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFilesChange}
                />
                <FileButton onClick={handleClick}>+</FileButton>
              </div>
            </InputFile>
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
      ))}
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
  width: 20%;
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
  padding: 0px 10px 10px;
`;
const Right = styled.div`
  display: flex;
  gap: 16px;
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
  padding: 0 10px 10px;
`;
const ImgBox = styled.div`
  width: calc(100% / 4);
  aspect-ratio: 4 / 3;
  padding: 0 10px 10px 0px;
  position: relative;
  display: inline-block;
  > button {
    display: none;
    position: absolute;
    width: 100%;
    aspect-ratio: 4 / 3;
    padding: 0 10px 10px 0px;
    color: wheat;
    font-size: xx-large;
  }
  &:hover button {
    display: block;
  }
`;

const FileButton = styled.button`
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.gray[5]};
  color: ${({ theme }) => theme.colors.white};
  font-size: xx-large;
  font-weight: 500;
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
