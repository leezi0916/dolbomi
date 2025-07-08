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
import { IoCheckmarkOutline } from 'react-icons/io5'; // 체크마크 아이콘 import
import { useSignUpForm } from '../hooks/useSignUpForm';
import { useLocation } from 'react-router-dom';

const SignUp = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email');
  const name = searchParams.get('name');
  const socialType = searchParams.get('socialType');
  const emailVerified = searchParams.get('verified');
  const socialId = searchParams.get('openId');

  // watch 함수를 useSignUpForm 훅에서 가져옵니다.
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    watch,
    checkUserId,
    idCheckMessage,
    setValue,
    formatPhoneNumber,
  } = useSignUpForm(socialType, socialId);

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
          {/* <Head>
            <Title>SNS 회원가입</Title>
            <GoogleLogin>
              <Text>SNS 계정으로 간편하게 로그인하세요</Text>
              <GoogleLogo />
            </GoogleLogin>
          </Head> */}
          <Center>
            <SignUpTitle>회원가입</SignUpTitle>
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

                  <CheckDuplicateButton type="button" onClick={checkUserId}>
                    중복확인
                  </CheckDuplicateButton>
                </Row>
                {errors.userId && <ErrorMessage>{errors.userId.message}</ErrorMessage>}
                {idCheckMessage && !errors.userId && (
                  <p style={{ color: 'green', marginTop: '4px' }}>{idCheckMessage}</p>
                )}
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
                {name === null ? (
                  <Input
                    id="userName"
                    type="text"
                    placeholder="이름을 입력해주세요"
                    {...register('userName')}
                    $error={errors.userName}
                  />
                ) : (
                  <Input id="userName" type="text" value={name} {...register('userName')} disabled />
                )}

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
                <Input
                  id="phone"
                  type="text"
                  placeholder="연락처"
                  {...register('phone')}
                  $error={errors.phone}
                  onChange={(e) => {
                    const formatted = formatPhoneNumber(e.target.value);
                    setValue('phone', formatted); // react-hook-form의 값도 갱신
                  }}
                />
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
                <Row>
                  {email === null ? (
                    <Inputs
                      id="email"
                      type="email"
                      placeholder="이메일을 입력해주세요"
                      {...register('email')}
                      $error={errors.email}
                    />
                  ) : (
                    <Inputs id="email" type="email" {...register('email')} value={email} disabled />
                  )}

                  {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

                  {emailVerified === null ? (
                    <CheckDuplicateButton type="button" onClick={checkUserId}>
                      인증하기
                    </CheckDuplicateButton>
                  ) : (
                    ''
                  )}
                </Row>
              </InputGroup>
              <SignUpButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? '처리중...' : '가입하기'}
              </SignUpButton>
            </InputContainer1>
          </Center>
        </Form>
      </AuthContainer>
    </>
  );
};

// styled-components (필요시 조절)
const SignUpTitle = styled(Title)`
  margin: 0;
`;

const SignUpButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing[6]};
`;

const Center = styled.div`
  width: 100%;
  min-height: 850px;
  background-color: white;
  box-shadow: ${({ theme }) => theme.shadows.base};
  padding: ${({ theme }) => theme.spacing[8]};
`;

const InputContainer1 = styled(InputContainer)`
  max-width: 600px;
  margin: 0 auto;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const Inputs = styled(Input)`
  flex-grow: 1;
`;

const CheckDuplicateButton = styled(Button)`
  width: auto;
  min-width: 100px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  white-space: nowrap;
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

  input[type='radio'] {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    outline: none;
    cursor: pointer;
    position: relative;
    border: 2px solid ${({ theme, checked }) => (checked ? theme.colors.primary : theme.colors.gray[400])};
    transition: all 0.2s ease-in-out;
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

export default SignUp;
