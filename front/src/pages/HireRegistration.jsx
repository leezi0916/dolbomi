import React, { useRef, useState } from 'react';
import { Container, Section } from '../styles/common/Container';
import profileImage from '../assets/images/pat.png'; // 프로필 이미지 경로
import styled from 'styled-components';

import {
  AuthContainer,
  Button,
  Input,
  InputGroup,
  Title,
  Form,
  AuthLink,
  ErrorMessage,
  InputContainer,
} from '../styles/Auth.styles';
import { media } from '../styles/MediaQueries';
import { SubmitButton } from '../styles/common/Button';
import { FaPlus } from 'react-icons/fa6';

const HireRegistration = () => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const handleDivClick = () => {
    inputRef.current?.click(); // 파일 선택창 열기
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('선택된 파일:', file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result); // base64 저장
      };
      reader.readAsDataURL(file); // base64 인코딩
    }
  };

  return (
    <HireRegistSection>
      <HireContainer>
        <HireHead>
          <HireHeadTitle>돌봄대상자 신청</HireHeadTitle>

          <SelectBox>
            <option value="">돌봄대상자 선택</option>
            <option value="서울">김oo</option>
            <option value="부산">이00</option>
            <option value="제주">박00</option>
          </SelectBox>
        </HireHead>
        <form action="">
          <ContentWrapper>
            <div>
              <ProfilImageWrapper>
                <img src={profileImage} alt="프로필 이미지" />
              </ProfilImageWrapper>
            </div>
            <Divider>
           
              <InputGroup>
                <InputGroup>
                  <Label>이름</Label>
                  <Input type="text" value={'김옥순'} />
                </InputGroup>
                <InputGroup>
                  <Label>나이</Label>
                  <Input type="text" value={'85'} />
                </InputGroup>
              </InputGroup>
              <RadioGroup>
                <Label>성별</Label>
                <RadioWrapper>
                  <input type="radio" id="male" name="gender" value="male" />
                  <label htmlFor="male">남성</label>
                </RadioWrapper>
                <RadioWrapper>
                  <input type="radio" id="female" name="gender" value="female" />
                  <label htmlFor="female">여성</label>
                </RadioWrapper>
              </RadioGroup>
              <InputGroup>
                <Label>보호자 전화번호</Label>
                <Input type="text" value={'010-1111-1111'} />
              </InputGroup>
              <InputGroup>
                <Label>주소</Label>
                <Input type="text" value={'서울시'} />
              </InputGroup>
              <InputRow>
                <InputGroup>
                  <Label>키</Label>
                  <Input type="text" value={'160 cm'} />
                </InputGroup>
                <InputGroup>
                  <Label>몸무게</Label>
                  <Input type="text" value={'42 kg'} />
                </InputGroup>
              </InputRow>
            </Divider>
          </ContentWrapper>
          <ContentWrapper>
            <DiseaseGroup>
              <Label>보유한 질병</Label>
              <DiseaseInputDiv>
                <div>치매</div>
                <div>고혈압</div>
                <div>당뇨</div>
              </DiseaseInputDiv>
            </DiseaseGroup>
          </ContentWrapper>
          <HireBottom>
            <HireBottomTitle>채용 정보</HireBottomTitle>
          </HireBottom>
          <ContentWrapper1>
            <HireContent>
              <Label>제목</Label>
              <Input type="text" value={'제목입니다 '} />
              <InputGird>
                <InputGroup>
                  <Label>지급 금액 (시급)</Label>
                  <Input type="text" value={'15000'} />
                </InputGroup>
                <InputGroup>
                  <Label>시작일</Label>
                  <Input type="date" value={''} />
                </InputGroup>

                <InputGroup>
                  <Label>종료일</Label>
                  <Input type="date" value={''} />
                </InputGroup>
                <InputGroup>
                  <Label>모집 인원수 설정</Label>
                  <Input type="number" value={'1'} />
                </InputGroup>
              </InputGird>
              <Label>내용</Label>
              <Content type="text" value={'제목입니다 '} />
              <RadioGroup>
                <Label>숙식 제공 여부</Label>
                <RadioWrapper>
                  <input type="radio" id="careStatus" name="careStatus" value="careStatus" />
                  <label htmlFor="careStatus">0</label>
                </RadioWrapper>
                <RadioWrapper>
                  <input type="radio" id="careStatus" name="careStatus" value="careStatus" />
                  <label htmlFor="careStatus">X</label>
                </RadioWrapper>
              </RadioGroup>
              <InputGroup>
                <Label>숙소 정보</Label>
                {/* 클릭 가능한 div */}
                <RoomImage onClick={handleDivClick}>
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="미리보기"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
                    />
                  ) : (
                    <Plus />
                  )}
                </RoomImage>
                <input
                  type="file"
                  accept="image/*"
                  ref={inputRef}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </InputGroup>
            </HireContent>
          </ContentWrapper1>
        </form>
        <ButtonGroup>
          <BackButton>이전</BackButton>
          <SubmitButton1>신청하기</SubmitButton1>
        </ButtonGroup>
      </HireContainer>
    </HireRegistSection>
  );
};

const HireRegistSection = styled(Section)``;

const HireContainer = styled(Container)`
  width: 80%;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  overflow: hidden; /* 내부 요소가 넘치지 않도록 */
`;

const HireHead = styled.div`
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[5]};
  margin-top: 10px;
`;

const HireHeadTitle = styled(Title)`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
`;

const SelectBox = styled.select`
  width: 20%;
  height: 50px;
  padding: 0 ${({ theme }) => theme.spacing[5]};
  border: 1px solid ${({ theme }) => theme.colors.gray[5]};
  border-radius: ${({ theme }) => theme.spacing[1]};
  font-size: ${({ theme }) => theme.spacing[4]};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column; /* 작은 화면에서 세로로 쌓이도록 */
  padding: ${({ theme }) => theme.spacing[6]}; /* 전체 패딩 */
  gap: ${({ theme }) => theme.spacing[6]}; /* 이미지와 입력 필드 그룹 사이 간격 */
  justify-content: space-around;
  ${media.md`
    flex-direction: row;
    padding: ${({ theme }) => theme.spacing[8]}; /* 큰 화면에서 패딩 증가 */
    gap: ${({ theme }) => theme.spacing[10]}; /* 큰 화면에서 간격 증가 */
  `}
`;

const ProfilImageWrapper = styled.div`
  flex-shrink: 0; /* 줄어들지 않도록 */
  width: 150px; /* 고정 너비 */
  height: 150px; /* 고정 높이 */
  border-radius: 50%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.gray[100]}; /* 이미지 없을 때 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center; /* 세로 중앙 정렬 */

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${media.md`
    width: 200px;
    height: 200px;
    align-self: flex-start; /* 큰 화면에서는 상단 정렬 */
  `}
`;


const InputRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[5]};

  ${media.md`
    flex-direction: row;
  `}
`;

const InputGird = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[5]};

  ${media.md`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20%, auto));
    
  `}
`

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.gray[700]};
  text-align: left;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[6]};
  align-items: center;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};

  // 'checked' prop을 받아서 스타일을 동적으로 적용합니다.
  input[type='radio'] {
    appearance: none;
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    outline: none;
    cursor: pointer;
    position: relative;
    transition: all 0.2s ease-in-out;
    background-color: white;
    // RadioWrapper에서 전달받은 checked prop 사용
    border: 1px solid ${({ theme, checked }) => (checked ? theme.colors.primary : theme.colors.gray[4])};
  }

  input[type='radio']::before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.2s ease-in-out;
  }

  input[type='radio']:checked::before {
    transform: translate(-50%, -50%) scale(1);
  }

  label {
    font-size: ${({ theme }) => theme.fontSizes.base};
    color: ${({ theme }) => theme.colors.gray[1]};
    cursor: pointer;
  }
`;

const Divider = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[6]};
`;

const DiseaseGroup = styled(InputGroup)`
  width: 100%;
  padding: 0 ${({ theme }) => theme.spacing[16]};

  input {
    width: 100%;
    border: none;
  }
`;
const DiseaseInputDiv = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray[5]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  height: 55px;
  display: flex;
  gap: ${({ theme }) => theme.spacing[8]};
  padding: 0 ${({ theme }) => theme.spacing[10]};
  text-align: center;
  align-items: center;
  max-width: 800px;
  div {
    width: 80px;
    height: 32px;
    align-items: center;
    display: flex;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.gray[5]};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    color: white;
  }
`;
const HireBottom = styled.div`
  width: 100%;
  display: flex;
  padding: 0 ${({ theme }) => theme.spacing[20]};
`;
const HireBottomTitle = styled(Title)`
  margin: 0;
`;

const HireContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const ContentWrapper1 = styled.div`
  display: flex;
  flex-direction: column; /* 작은 화면에서 세로로 쌓이도록 */
  padding: ${({ theme }) => theme.spacing[6]}; /* 전체 패딩 */
  gap: ${({ theme }) => theme.spacing[6]}; /* 이미지와 입력 필드 그룹 사이 간격 */
  justify-content: space-around;
  ${media.md`
    flex-direction: row;
    padding: ${({ theme }) => theme.spacing[6]}; /* 큰 화면에서 패딩 증가 */
    gap: ${({ theme }) => theme.spacing[10]}; /* 큰 화면에서 간격 증가 */
  `}
`;

const Content = styled.textarea`
  border: 1px solid ${({ theme, $error }) => ($error ? theme.colors.error : theme.colors.gray[5])};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing[3]};
  width: 100%;
  min-height: 400px; /* 원하는 기본 높이 */
  resize: none;
  overflow: hidden; /* 스크롤 숨김 */
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

const RoomImage = styled.div`
  width: 50%;
  height: 200px;
  background-color: ${({ theme }) => theme.colors.gray[5]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: 'pointer';
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  width: 100%;
  padding: 64px;
  gap: ${({ theme }) => theme.spacing[3]};
  justify-content: center;
`;

const BackButton = styled.button`
  border: 1px solid ${({ theme, $error }) => ($error ? theme.colors.error : theme.colors.gray[5])};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  width: 25%;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const SubmitButton1 = styled(SubmitButton)`
  width: 65%;
  border: 1px solid ${({ theme, $error }) => ($error ? theme.colors.error : theme.colors.gray[5])};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: white;
`;

const Plus = styled(FaPlus)`
  width: 30px;
  height: 30px;
  color: white;
`;
export default HireRegistration;
