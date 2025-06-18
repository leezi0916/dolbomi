import React, { useState, useEffect } from 'react';
import {
  AuthContainer,
  Button,
  Input,
  InputGroup,
  Label,
  Title,
  Form,
  AuthLink,
  ErrorMessage,
  InputContainer,
} from '../styles/Auth.styles';
import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { IoCheckmarkOutline } from 'react-icons/io5'; // 체크마크 아이콘 import
import { useSignUpForm } from '../hooks/useSignUpForm';

const SignUp = () => {
  // watch 함수를 useSignUpForm 훅에서 가져옵니다.
  const { register, handleSubmit, errors, isSubmitting, watch } = useSignUpForm();

  // 'gender' 필드의 현재 값을 watch하여 라디오 버튼의 checked 상태를 제어합니다.
  const currentGender = watch('gender');

  // 동의 항목 상태 관리
  const [allAgreed, setAllAgreed] = useState(false); // 모두 동의 체크박스 상태
  const [agreements, setAgreements] = useState({
    // 개별 동의 항목 상태
    ageOver19: false,
    termsOfService: false,
    requiredPersonalInfo: false,
    optionalPersonalInfo: false,
    optionalMarketingEmail: false,
    optionalMarketingSMS: false,
  });

  // 서버로 보내는 버튼이라 클릭시 화면이 올라가게 되는데 이를 방지
  const handleClick = (e) => {
    e.preventDefault();
  };

  // 개별 체크박스 변경 핸들러
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setAgreements((prevAgreements) => ({
      ...prevAgreements,
      [name]: checked,
    }));
  };

  // "모두 동의" 체크박스 변경 핸들러
  const handleAllAgreedChange = () => {
    const newAllAgreed = !allAgreed; // 현재 상태를 토글
    setAllAgreed(newAllAgreed);
    setAgreements({
      ageOver19: newAllAgreed,
      termsOfService: newAllAgreed,
      requiredPersonalInfo: newAllAgreed,
      optionalPersonalInfo: newAllAgreed,
      optionalMarketingEmail: newAllAgreed,
      optionalMarketingSMS: newAllAgreed,
    });
  };

  // 개별 동의 항목이 변경될 때 "모두 동의" 체크박스 상태 업데이트
  useEffect(() => {
    const allRequiredAgreed = agreements.ageOver19 && agreements.termsOfService && agreements.requiredPersonalInfo;
    const allOptionalAgreed =
      agreements.optionalPersonalInfo && agreements.optionalMarketingEmail && agreements.optionalMarketingSMS;

    // 모든 항목이 체크되었는지 확인 (선택 항목은 필수가 아님)
    // 필수 항목만 모두 동의 체크박스에 영향을 주도록 하거나, 선택 항목까지 포함할지 로직을 결정해야 합니다.
    // 현재 코드는 모든 항목이 체크되어야 '모두 동의'가 체크되도록 되어 있습니다.
    const allChecked = allRequiredAgreed && allOptionalAgreed;
    setAllAgreed(allChecked);
  }, [agreements]);

  return (
    <>
      <AuthContainer>
        {/* <MainTitle>회원가입</MainTitle> */}
        <Form onSubmit={handleSubmit}>
          <Head>
            <Title>SNS 회원가입</Title>
            <GoogleLogin>
              <Text>SNS 계정으로 간편하게 로그인하세요</Text>
              <GoogleLogo />
            </GoogleLogin>
          </Head>
          <Center>
            <Title>회원가입</Title>
            <InputContainer1>
              <InputGroup>
                <Label htmlFor="userId">아이디</Label>
                <Row>
                  <Inputs
                    type="text"
                    id="userId"
                    placeholder="아이디를 입력해주세요"
                    {...register('userId')}
                    $error={errors.userId}
                  />

                  <CheckDuplicateButton onClick={handleClick}>중복확인</CheckDuplicateButton>
                </Row>
                {errors.userId && <ErrorMessage>{errors.userId.message}</ErrorMessage>}
              </InputGroup>

              <InputGroup>
                <Label htmlFor="userPwd">비밀번호</Label>
                <Input
                  id="userPwd"
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  {...register('userPwd')}
                  $error={errors.userPwd}
                />
                {errors.userPwd && <ErrorMessage>{errors.userPwd.message}</ErrorMessage>}
              </InputGroup>
              <InputGroup>
                <Label htmlFor="userName">이름</Label>
                <Input
                  id="userName"
                  type="text"
                  placeholder="이름을 입력해주세요"
                  {...register('userName')}
                  $error={errors.userName}
                />
                {errors.userName && <ErrorMessage>{errors.userName.message}</ErrorMessage>}
              </InputGroup>
              <InputGroup>
                <Label htmlFor="age">나이</Label>
                <Row>
                  <Inputs
                    id="age"
                    type="number"
                    placeholder="나이를 입력해주세요"
                    {...register('age')}
                    $error={errors.age}
                  />

                  <GenderRadioGroup>
                    <RadioWrapper checked={currentGender === 'M'}>
                      {' '}
                      {/* checked prop 전달 */}
                      <input
                        type="radio"
                        id="M"
                        name="gender"
                        value="M"
                        checked={currentGender === 'M'} // watch 값으로 제어
                        {...register('gender')} // register만 남김
                      />
                      <label htmlFor="M">남성</label>
                    </RadioWrapper>
                    <RadioWrapper checked={currentGender === 'F'}>
                      {' '}
                      {/* checked prop 전달 */}
                      <input
                        type="radio"
                        id="F"
                        name="gender"
                        value="F"
                        checked={currentGender === 'F'} // watch 값으로 제어
                        {...register('gender')} // register만 남김
                      />
                      <label htmlFor="F">여성</label>
                    </RadioWrapper>
                  </GenderRadioGroup>
                </Row>
                {/* 성별 에러 메시지는 나이 InputGroup 아래에서 한 번에 표시 */}
                {errors.gender && <ErrorMessage>{errors.gender.message}</ErrorMessage>}
                {errors.age && <ErrorMessage>{errors.age.message}</ErrorMessage>}
              </InputGroup>

              <InputGroup>
                <Label htmlFor="phone">연락처</Label>
                <Input id="phone" type="text" placeholder="연락처" {...register('phone')} $error={errors.phone} />
                {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
              </InputGroup>
              <InputGroup>
                <Label htmlFor="address">주소</Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="주소를 입력해주세요"
                  {...register('address')}
                  $error={errors.address}
                />
                {errors.address && <ErrorMessage>{errors.address.message}</ErrorMessage>}
              </InputGroup>
              <InputGroup>
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="이메일을 입력해주세요"
                  {...register('email')}
                  $error={errors.email}
                />
                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
              </InputGroup>
            </InputContainer1>
          </Center>

          <Bottom>
            <AllAgreementContainer>
              <AllAgreementText>
                필수동의 항목 및 개인정보 수집 및 이용동의(선택), 광고성 정보 수신(선택)에 모두 동의합니다.
              </AllAgreementText>
              <CustomCheckbox checked={allAgreed} onClick={handleAllAgreedChange}>
                {allAgreed && <IoCheckmarkOutline size="20px" color="white" />}
                {/* 실제 체크박스는 숨겨두고 클릭 이벤트를 CustomCheckbox div에서 처리 */}
                <input
                  type="checkbox"
                  style={{ display: 'none' }}
                  checked={allAgreed}
                  onChange={() => {}} // 부모 요소에서 클릭 이벤트 처리
                />
              </CustomCheckbox>
            </AllAgreementContainer>

            <AgreementList>
              <AgreementItem>
                <AgreementLabel>
                  <HiddenCheckbox
                    type="checkbox"
                    name="ageOver19"
                    checked={agreements.ageOver19}
                    onChange={handleCheckboxChange}
                  />
                  <StyledCheckbox checked={agreements.ageOver19}>
                    {agreements.ageOver19 && <IoCheckmarkOutline size="20px" color="white" />}
                  </StyledCheckbox>
                  <RequiredText>[필수]</RequiredText> 만 19 세 이상입니다.
                </AgreementLabel>
              </AgreementItem>

              <AgreementItem>
                <AgreementLabel>
                  <HiddenCheckbox
                    type="checkbox"
                    name="termsOfService"
                    checked={agreements.termsOfService}
                    onChange={handleCheckboxChange}
                  />
                  <StyledCheckbox checked={agreements.termsOfService}>
                    {agreements.termsOfService && <IoCheckmarkOutline size="20px" color="white" />}
                  </StyledCheckbox>
                  <RequiredText>[필수]</RequiredText> 서비스약관 동의
                </AgreementLabel>
                <ViewContentButton onClick={handleClick}>내용보기</ViewContentButton>
              </AgreementItem>

              <AgreementItem>
                <AgreementLabel>
                  <HiddenCheckbox
                    type="checkbox"
                    name="requiredPersonalInfo"
                    checked={agreements.requiredPersonalInfo}
                    onChange={handleCheckboxChange}
                  />
                  <StyledCheckbox checked={agreements.requiredPersonalInfo}>
                    {agreements.requiredPersonalInfo && <IoCheckmarkOutline size="20px" color="white" />}
                  </StyledCheckbox>
                  <RequiredText>[필수]</RequiredText> 개인정보 수집 및 동의
                </AgreementLabel>
                <ViewContentButton onClick={handleClick}>내용보기</ViewContentButton>
              </AgreementItem>

              <Divider />

              <AgreementItem>
                <AgreementLabel>
                  <HiddenCheckbox
                    type="checkbox"
                    name="optionalPersonalInfo"
                    checked={agreements.optionalPersonalInfo}
                    onChange={handleCheckboxChange}
                  />
                  <StyledCheckbox checked={agreements.optionalPersonalInfo}>
                    {agreements.optionalPersonalInfo && <IoCheckmarkOutline size="20px" color="white" />}
                  </StyledCheckbox>
                  <OptionalText>[선택]</OptionalText> 개인정보 수집 및 이용동의
                </AgreementLabel>
                <ViewContentButton onClick={handleClick}>내용보기</ViewContentButton>
              </AgreementItem>

              <AgreementItem>
                <AgreementLabel>
                  <HiddenCheckbox
                    type="checkbox"
                    name="optionalMarketingEmail"
                    checked={agreements.optionalMarketingEmail}
                    onChange={handleCheckboxChange}
                  />
                  <StyledCheckbox checked={agreements.optionalMarketingEmail}>
                    {agreements.optionalMarketingEmail && <IoCheckmarkOutline size="20px" color="white" />}
                  </StyledCheckbox>
                  <OptionalText>[선택]</OptionalText> 광고 정보 이메일 수신 동의
                </AgreementLabel>
                <ViewContentButton onClick={handleClick}>내용보기</ViewContentButton>
              </AgreementItem>

              <AgreementItem>
                <AgreementLabel>
                  <HiddenCheckbox
                    type="checkbox"
                    name="optionalMarketingSMS"
                    checked={agreements.optionalMarketingSMS}
                    onChange={handleCheckboxChange}
                  />
                  <StyledCheckbox checked={agreements.optionalMarketingSMS}>
                    {agreements.optionalMarketingSMS && <IoCheckmarkOutline size="20px" color="white" />}
                  </StyledCheckbox>
                  <OptionalText>[선택]</OptionalText> 광고 정보 SMS 수신 동의
                </AgreementLabel>
                <ViewContentButton onClick={handleClick}>내용보기</ViewContentButton>
              </AgreementItem>
            </AgreementList>
          </Bottom>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? '처리중...' : '가입하기'}
          </Button>
        </Form>
      </AuthContainer>
    </>
  );
};

// ... (아래 styled-components 정의는 동일)

const Head = styled.div`
  width: 100%;
  height: 200px;
  background-color: white;
  box-shadow: ${({ theme }) => theme.shadows.base};
  padding: ${({ theme }) => theme.spacing[8]};
`;

const Center = styled.div`
  width: 100%;
  height: auto; /* 고정된 높이 대신 내용에 따라 높이 자동 조절 */
  min-height: 850px; /* 최소 높이를 설정하여 초기 레이아웃이 너무 작아지는 것을 방지 */
  background-color: white;
  box-shadow: ${({ theme }) => theme.shadows.base};
  padding: ${({ theme }) => theme.spacing[8]};
`;
const Bottom = styled.div`
  width: 100%;
  height: auto; /* 내용에 따라 높이 자동 조절 */
  background-color: white;
  box-shadow: ${({ theme }) => theme.shadows.base};
  padding: ${({ theme }) => theme.spacing[8]}; /* 상하좌우 패딩 추가 */
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]}; /* 섹션 간 간격 */
`;

// const MainTitle = styled(Title)`
//   font-size: ${({ theme }) => theme.fontSizes['3xl']};
//   display: flex;
//   justify-content: flex-start;
//   padding: ${({ theme }) => theme.spacing[1]};
// `;

const Text = styled(Title)`
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

const GoogleLogo = styled(FcGoogle)`
  width: 60px;
  height: 60px;
  border: 1px solid ${({ theme }) => theme.colors.gray[500]};
  border-radius: 100%;
  padding: 10px;
`;

const GoogleLogin = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-around;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const CheckDuplicateButton = styled(Button)`
  width: auto; /* 버튼 너비 자동 조절 */
  min-width: 100px; /* 최소 너비 지정 */
  font-size: ${({ theme }) => theme.fontSizes.sm};
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
`;

const Inputs = styled(Input)`
  flex-grow: 1; /* 아이디 input이 남은 공간을 채우도록 flex-grow 추가 */
`;

const GenderRadioGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[8]};
  align-items: center;
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

    // RadioWrapper에서 전달받은 checked prop 사용
    border: 2px solid ${({ theme, checked }) => (checked ? theme.colors.primary : theme.colors.gray[400])};
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
    color: ${({ theme }) => theme.colors.gray[700]};
    cursor: pointer;
  }
`;

// New styled components for the Bottom section
const AllAgreementContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-bottom: ${({ theme }) => theme.spacing[4]}; /* 리스트 전 공간 */
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[300]}; /* 하단 구분선 */
`;

const AllAgreementText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.gray[800]};
`;

const AgreementList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]}; /* 동의 항목 간 간격 */
  padding-top: ${({ theme }) => theme.spacing[4]};
`;

const AgreementItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.gray[700]};
`;

const AgreementLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  cursor: pointer;
`;

const CustomCheckbox = styled.div`
  width: 24px;
  height: 24px;
  border: 1px solid ${({ theme, checked }) => (checked ? theme.colors.primary : theme.colors.gray[4])};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, checked }) => (checked ? theme.colors.primary : 'white')};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`;

//내용보기
const ViewContentButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.gray[600]};

  cursor: pointer;
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};

  white-space: nowrap; /* 텍스트 줄바꿈 방지 */

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.gray[200]};
  margin: ${({ theme }) => theme.spacing[4]} 0;
`;

const RequiredText = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
`;

const OptionalText = styled.span`
  color: ${({ theme }) => theme.colors.gray[500]};
  font-weight: bold;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  //기존 체크 박스 요소 숨기기
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div`
  width: 24px;
  height: 24px;
  border: 1px solid ${({ theme, checked }) => (checked ? theme.colors.primary : theme.colors.gray[4])};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, checked }) => (checked ? theme.colors.primary : 'white')};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`;
export const InputContainer1 = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export default SignUp;
