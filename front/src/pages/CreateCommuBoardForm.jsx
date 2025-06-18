import React, { useEffect, useRef, useState } from 'react';
import { Page, PageInfo } from './CommunityBoard';
import styled from 'styled-components';
import { commuService } from '../api/community';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const CreateCommuBoardForm = () => {
  const [error, setError] = useState(null);
  const [setCommunityDetail] = useState([]); //communityDetail
  const [loading, setLoading] = useState(true);

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
        const community = await commuService.getCommunityDetail();
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
  }, []);

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
  return (
    <Page>
      <PageInfo>
        <PageTop>
          <PageTitle>소통 게시판 등록</PageTitle>
          <RightBtn>뒤로가기</RightBtn>
        </PageTop>
        <PageBody>
          {/* {communityDetail.map((info) => ( */}
          <TitleInput type="text" placeholder="제목을 입력해 주세요" />
          <UserName>{/* {info.name} */}야호</UserName>
          {/* ))} */}
          <TextInput type="text" placeholder="내용을 입력해 주세요" />
          <FileBox>
            <FileTitle>사진</FileTitle>
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
          </FileBox>
          <BtnBox>
            <button>이전으로</button>
            <button>등록하기</button>
          </BtnBox>
        </PageBody>
        <PageEndBox>
          <span>
            • 개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법정보 유포 시 이에 대한 민형사상 책임은 작성자에게
            있습니다
          </span>
          <span>
            • 개인정보가 포함되거나 부적절한 답변은 비노출 또는 해당 서개인정보를 공유 및 요청하거나, 명예 훼손, 무단
            광고, 불법 정보 유포 시 이에 대한 민형사상 책임은 작성자에게 있습니다.
          </span>
          <span>• 개인정보가 포함되거나 부적절한 글은 비노출 또는 서비스 이용 정지 사유가 될 수 있습니다.</span>
          <span>• 인기 글로 추천될 수 있습니다.비스 이용 불가 처리될 수 있습니다</span>
        </PageEndBox>
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
  font-size: ${({ theme }) => theme.fontSizes.xl};
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
const TitleInput = styled.input`
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  padding: 0 10px 10px;
`;
const UserName = styled(Left)`
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[4]};
  padding: 0 10px 10px;
`;
const TextInput = styled.textarea`
  width: 100%;
  min-height: 200px;
  resize: none;
  margin: 10px;
`;
const FileBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.gray[5]};
  border-radius: 4px;
  padding: 0 10px;
  margin-bottom: 10px;
`;
const FileTitle = styled(Left)`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  padding: 10px;
`;
const InputFile = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
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
  background: ${({ theme }) => theme.colors.gray[4]};
  color: ${({ theme }) => theme.colors.white};
  font-size: xx-large;
  font-weight: 500;
`;
const BtnBox = styled.div`
  width: auto;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[4]};
  > button {
    align-content: center;
    width: 100px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    border-radius: 4px;
    margin: 10px 10px 0px 10px;
  }
`;

const PageEndBox = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  flex-direction: column;

  background-color: ${({ theme }) => theme.colors.gray[5]};
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;

  > span {
    text-align: left;
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: ${({ theme }) => theme.fontWeights.light};
  }
`;
export default CreateCommuBoardForm;
