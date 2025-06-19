import React, { useState } from 'react';
import { Container, Section } from '../styles/common/Container';
import profileImage from '../assets/images/cargiver.png'; // 프로필 이미지 경로
import styled from 'styled-components';
import { Input, InputGroup, Title } from '../styles/Auth.styles';
import { media } from '../styles/MediaQueries';
import { SubmitButton } from '../styles/common/Button';

// import { useParams } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa6';
import chatImage from '../assets/icons/icon_채팅아이콘.png'; // 채팅 이미지 경로
// import { useResumeForm } from '../hooks/useResumeForm';

import Paging from '../components/Paging';
import { useNavigate } from 'react-router-dom';
import PatientSelectModal from '../components/PatientSelectModal';

function ResumeDetail() {
  const navigate = useNavigate();
  // const { resumeNo } = useParams();
  // const { register, handleSubmit, errors, licenseList, handleLicenseChange, user } = useResumeForm();

  const [activeTab, setActiveTab] = useState('info');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const handleSubmitModal = () => {
    const confirm = window.confirm('돌봄 대상자를 신청하시겠습니까?');
    if (confirm) {
      console.log('간병신청 완료');
      setModalOpen(false);
      navigate('/guardian/matchpage'); // 원하는 경로로 이동
    }
  };
  return (
    <HireRegistSection>
      <HireContainer>
        <HireHead>
          <HireHeadTitle>간병사 정보</HireHeadTitle>
        </HireHead>

        {/* <form onSubmit={handleSubmit}> */}
        <ContentWrapper>
          <div>
            <ProfilImageWrapper>
              <img src={profileImage} alt="프로필 이미지" />
            </ProfilImageWrapper>
            <ChatButton>
              <img src={chatImage} alt="프로필 이미지" />1 : 1 채팅하기
            </ChatButton>
          </div>
          <Divider>
            <InputRow>
              <InputGroup>
                <Label>이름</Label>
                <Input type="text" value={'김지원'} readOnly />
              </InputGroup>
              <InputGroup>
                <Label>나이</Label>
                <Input type="text" value={'35'} readOnly />
              </InputGroup>
            </InputRow>
            <RadioGroup>
              <Label>성별</Label>
              <RadioWrapper>
                <input type="radio" id="male" name="gender" value="M" readOnly />
                <label htmlFor="male">남성</label>
              </RadioWrapper>
              <RadioWrapper>
                <input type="radio" id="female" name="gender" value="F" readOnly />
                <label htmlFor="female">여성</label>
              </RadioWrapper>
            </RadioGroup>
            <InputGroup>
              <Label>전화번호</Label>
              <Input type="text" value={'010111111111'} readOnly />
            </InputGroup>
            <InputGroup>
              <Label>주소</Label>
              <Input type="text" value={'강원도 강릉시 ~~~'} readOnly />
            </InputGroup>
          </Divider>
        </ContentWrapper>

        <ContentWrapper2>
          <LicenseGroup>
            <Label>자격증 명</Label>
            <LicenseInput type="text" value={'운전면허증'} readOnly />
          </LicenseGroup>
          <LicenseGroup>
            <Label>발행처</Label>
            <LicenseInput type="text" value={'서울시청'} readOnly />
          </LicenseGroup>
          <LicenseGroup>
            <Label>발행일</Label>
            <LicenseInput type="date" value={'2025-12-20'} readOnly />
          </LicenseGroup>
        </ContentWrapper2>

        <HireBottom>
          <HireBottomTitle onClick={() => handleTabChange('info')} active={activeTab === 'info'}>
            지원 정보
          </HireBottomTitle>

          <HireBottomTitle onClick={() => handleTabChange('review')} active={activeTab === 'review'}>
            리뷰
          </HireBottomTitle>
        </HireBottom>
        {activeTab === 'info' && (
          <ContentWrapper1>
            <HireContent>
              <Label>제목</Label>
              <Input value={'지원합니다'} readOnly />

              <Label>내용</Label>
              <Content value={'지원합니다'} readOnly />

              <RadioGroup>
                <RadioContainer>
                  <Label>숙식 가능</Label>
                  <RadioWrapper>
                    <input type="radio" value="Y" checked readOnly />
                  </RadioWrapper>
                  <Label>숙식 불가</Label>
                  <RadioWrapper>
                    <input type="radio" value="N" readOnly />
                  </RadioWrapper>
                </RadioContainer>
                <AccountGroup>
                  <InputGroup>
                    <Label>희망 금액</Label>
                    <Input value={'12000'} readOnly />
                  </InputGroup>
                </AccountGroup>
              </RadioGroup>
            </HireContent>
          </ContentWrapper1>
        )}

        {activeTab === 'review' && (
          <ContentWrapper1>
            리뷰 내용입니다 (예: 별점, 텍스트 등)
            <Paging></Paging>
          </ContentWrapper1>
        )}

        <ButtonGroup>
          <BackButton onClick={() => navigate(-1)}>이전</BackButton>
          <SubmitButton1 type="button" onClick={handleOpenModal}>
            신청하기
          </SubmitButton1>
          {isModalOpen && <PatientSelectModal onClose={handleCloseModal} onSubmit={handleSubmitModal} />}
        </ButtonGroup>
        {/* </form> */}
      </HireContainer>
    </HireRegistSection>
  );
}

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

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.gray[700]};
  text-align: left;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[5]};
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

const HireBottom = styled.div`
  width: 100%;
  display: flex;
  padding: 0 ${({ theme }) => theme.spacing[20]};
`;
const HireBottomTitle = styled(Title)`
  margin: 0;
  color: ${({ active, theme }) => (active ? theme.colors.black1 : theme.colors.gray[3])};
  cursor: pointer;
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

const ButtonGroup = styled.div`
  display: flex;
  width: 100%;
  max-width: 800px;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[3]};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[8]} 0;
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

const LicenseGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${({ theme }) => theme.spacing[1]};
`;

const LicenseInput = styled(Input)``;

//기존
const ContentWrapper2 = styled.div`
  display: flex;
  flex-direction: column; /* 작은 화면에서 세로로 쌓이도록 */
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  ${media.md`

flex-direction: row; 
gap: ${({ theme }) => theme.spacing[5]};
padding : ${({ theme }) => theme.spacing[3]};
`}
`;

//변경(contentWrapper2 -> gridWrapper)인혜작성
const GridWrapper = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  padding-top: ${({ theme }) => theme.spacing[3]};

  ${media.lg`

display: grid;
grid-template-columns: repeat(5,1fr);
justify-content: center;
gap: 4px;
`}
`;

//인혜작성 시간나면 고치자
const Div = styled.div`
  width: 66px;
`;

const AccountGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;

const RadioContainer = styled.div`
  display: flex;
  width: 55%;
  gap: ${({ theme }) => theme.spacing[5]};
  align-items: center;
`;

const LicenseAdd = styled.button`
  display: flex;
  border-radius: 4px;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing[2]};
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.gray[5]};

  color: black;

  // 인혜 작성(반응형)
  ${media.lg`

span {
width: 50px;
}
padding: 0;
background-color:white; 
margin-top: ${({ theme }) => theme.spacing[6]};
`}
`;

const LicenseDelete = styled.button`
  display: flex;
  gap: 10px;
  align-items: center;
  span {
    width: 50px;
  }
  padding: 0;
  margin-top: ${({ theme }) => theme.spacing[6]};
`;
const ChatButton = styled.button`
  border: 1px solid ${({ theme, $error }) => ($error ? theme.colors.error : theme.colors.gray[5])};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  width: 25%;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-top: ${({ theme }) => theme.spacing[6]};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  img {
    width: 33px;
    height: 33px;
  }
`;

const TabsWrapper = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin: ${({ theme }) => theme.spacing[3]} 0 ${({ theme }) => theme.spacing[5]};
`;

const Tab = styled.span`
  font-weight: ${({ active, theme }) => (active ? theme.fontWeights.bold : theme.fontWeights.regular)};
  color: ${({ active, theme }) => (active ? theme.colors.black1 : theme.colors.gray[3])};
  cursor: pointer;
  margin: 0 ${({ theme }) => theme.spacing[1]};
`;

export default ResumeDetail;
