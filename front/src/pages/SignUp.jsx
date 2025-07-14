// SignUp.jsx
import React, { useState, useEffect } from 'react';
import {
  AuthContainer,
  Button,
  Input,
  InputGroup,
  Label,
  Title,
  Form,
  ErrorMessage,
  InputContainer,
} from '../styles/Auth.styles';
import styled from 'styled-components';
import { IoCheckmarkOutline } from 'react-icons/io5'; // 체크마크 아이콘 import
import { useSignUpForm } from '../hooks/useSignUpForm';
import { useLocation, useNavigate } from 'react-router-dom';
import PostcodeSearch from '../components/PostcodeSearch';
import Timer from '../components/Timer';
// import { userService } from '../api/users';
// import { toast } from 'react-toastify';

const SignUp = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email');
  const name = searchParams.get('name');
  const socialType = searchParams.get('socialType');
  const verifiedFromSocial = searchParams.get('verified') === 'true'; // "true"일때만 true
  const socialId = searchParams.get('openId');
  const isSocialSignup = !!socialType; // 소셜이면 true

  const [addressData, setAddressData] = useState({
    zonecode: '',
    address: '',
    extraAddress: '',
  });

  const navigate = useNavigate();

  // watch 함수를 useSignUpForm 훅에서 가져옵니다.
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    watch,
    setValue,
    formatPhoneNumber,
    onSubmit,
    handleEmailAuth,
    handleVerifyCode,
    emailAuthStarted,
    emailVerified,
    authCode,
    setAuthCode,
    handleTimeout,
  } = useSignUpForm(socialType, socialId, verifiedFromSocial);

  const currentGender = watch('gender');

  // 주소 변화 시 전체 주소 필드 업데이트 (react-hook-form 내)
  useEffect(() => {
    const baseAddress = `${addressData.address}${addressData.extraAddress}`.trim();
    setValue('address', baseAddress);
  }, [addressData, setValue]);

  return (
    <AuthContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Center>
          <SignUpTitle>회원가입</SignUpTitle>
          <InputContainer1>
            <InputGroup>
              <Label htmlFor="email">이메일</Label>
              <Row>
                {email === null ? (
                  <Inputs
                    id="userId"
                    type="userId"
                    placeholder="이메일을 입력해주세요"
                    {...register('userId')}
                    $error={errors.userId}
                  />
                ) : (
                  <Inputs id="userId" type="userId" {...register('userId')} value={email} disabled />
                )}

                {!emailVerified && !emailAuthStarted && (
                  <CheckDuplicateButton type="button" onClick={handleEmailAuth}>
                    이메일 인증
                  </CheckDuplicateButton>
                )}

                {!emailVerified && emailAuthStarted && (
                  <>
                    <Input
                      type="text"
                      placeholder="인증코드 입력"
                      value={authCode}
                      onChange={(e) => setAuthCode(e.target.value)}
                      maxLength={8}
                      style={{ width: '120px' }}
                    />
                    <CheckDuplicateButton type="button" onClick={handleVerifyCode}>
                      확인
                    </CheckDuplicateButton>
                    <Timer seconds={180} isActive={emailAuthStarted} onTimeout={handleTimeout} />
                  </>
                )}

                {emailVerified && !isSocialSignup && (
                  <span style={{ color: '#388e3c', fontWeight: 'bold' }}>
                    <IoCheckmarkOutline size={20} /> 인증 완료
                  </span>
                )}
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
              <Label htmlFor="userPwdCheck">비밀번호 확인</Label>
              <Input
                id="userPwdCheck"
                type="password"
                placeholder="비밀번호를 다시 입력해주세요"
                {...register('userPwdCheck')}
                $error={errors.userPwdCheck}
              />
              {errors.userPwdCheck && <ErrorMessage>{errors.userPwdCheck.message}</ErrorMessage>}
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
                    <input
                      type="radio"
                      id="M"
                      name="gender"
                      value="M"
                      checked={currentGender === 'M'}
                      {...register('gender')}
                    />
                    <label htmlFor="M">남성</label>
                  </RadioWrapper>
                  <RadioWrapper checked={currentGender === 'F'}>
                    <input
                      type="radio"
                      id="F"
                      name="gender"
                      value="F"
                      checked={currentGender === 'F'}
                      {...register('gender')}
                    />
                    <label htmlFor="F">여성</label>
                  </RadioWrapper>
                </GenderRadioGroup>
              </Row>
              {errors.gender && <ErrorMessage>{errors.gender.message}</ErrorMessage>}
              {errors.age && <ErrorMessage>{errors.age.message}</ErrorMessage>}
            </InputGroup>

            <InputGroup>
              <Label htmlFor="phone">연락처</Label>
              <Input
                id="phone"
                placeholder="연락처"
                {...register('phone')}
                $error={errors.phone}
                onChange={(e) => {
                  const formatted = formatPhoneNumber(e.target.value);
                  setValue('phone', formatted);
                }}
              />
              {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
            </InputGroup>

            <InputGroup>
              <Label htmlFor="address">주소</Label>
              <Row>
                <Inputs
                  id="address"
                  type="text"
                  readOnly
                  placeholder="주소를 검색해주세요"
                  value={`${addressData.address}${addressData.extraAddress}`.trim()}
                  {...register('address')}
                />
                <PostcodeSearch onAddressSelected={setAddressData} />
              </Row>
              {errors.address && <ErrorMessage>{errors.address.message}</ErrorMessage>}
            </InputGroup>

            <div style={{ display: 'flex', gap: '20px' }}>
              <SignUpButton type="button" onClick={() => navigate(-1)}>
                뒤로가기
              </SignUpButton>
              <SignUpButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? '처리중...' : '가입하기'}
              </SignUpButton>
            </div>
          </InputContainer1>
        </Center>
      </Form>
    </AuthContainer>
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
