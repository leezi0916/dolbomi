import React from 'react';
import {
  AuthContainer,
  Input,
  InputGroup,
  Label,
  Title,
  InputContainer,
  Button,
  ErrorMessage,
} from '../styles/Auth.styles';
import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { useLoginForm } from '../hooks/useLoginForm';
import { useNavigate } from 'react-router-dom';
import { media } from '../styles/MediaQueries';

const Login = () => {
  const { register, handleSubmit, errors, onSubmit, isLoading } = useLoginForm();
  const navigate = useNavigate();

  const googleServerLogin = () => {
    window.location.href = 'http://localhost:8555/oauth2/authorization/google';
  };

  return (
    <AuthContainer>
      <LoginSection>
        <LoginTitle>{/* 로그인 */}</LoginTitle>
        <LogoWrap>
          <LogoImg src="logo.png" />
          <LogoImg src="dolbomi.png" />
        </LogoWrap>
        <LoginInputContainer>
          <LoginForm onSubmit={handleSubmit(onSubmit)}>
            <LoginInputGroup>
              <LoginLabel htmlFor="userId">아이디</LoginLabel>
              <InputWrapper>
                <Icon src="/src/assets/icons/icon_아이디.png" alt="" />
                <LoginInput
                  id="userId"
                  type="text"
                  placeholder="아이디를 입력해주세요"
                  {...register('userId')}
                  $error={errors.userId}
                />
              </InputWrapper>
              {errors.userId && <ErrorMessage>{errors.userId.message}</ErrorMessage>}
            </LoginInputGroup>
            <LoginInputGroup>
              <LoginLabel htmlFor="userPwd">비밀번호</LoginLabel>
              <InputWrapper>
                <Icon src="/src/assets/icons/icon_비밀번호.png" alt="" />
                <LoginInput
                  id="userPwd"
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  {...register('userPwd')}
                  $error={errors.userPwd}
                />
              </InputWrapper>
              {errors.userPwd && <ErrorMessage>{errors.userPwd.message}</ErrorMessage>}
            </LoginInputGroup>
            <LoginButtonGroup>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? '로그인 중...' : '로그인'}
              </Button>
              <Button type="button" onClick={() => navigate('/signup')}>
                회원가입
              </Button>
              <Button type="button">비밀번호 찾기</Button>
            </LoginButtonGroup>
            <SnsWrap>
              <SnsDivider />
              <SnsText>SNS 로그인</SnsText>
              <SnsDivider />
            </SnsWrap>
            <GoogleLogoContainer>
              <GoogleLogo onClick={googleServerLogin} />
            </GoogleLogoContainer>
          </LoginForm>
        </LoginInputContainer>
      </LoginSection>
    </AuthContainer>
  );
};
const LoginTitle = styled(Title)`
  /* font-size: ${({ theme }) => theme.fontSizes['4xl']}; */
`;

const LoginSection = styled.div`
  width: 100%;
  height: auto; /* 고정된 높이 대신 내용에 따라 높이 자동 조절 */
  min-height: 900px; /* 최소 높이를 설정하여 초기 레이아웃이 너무 작아지는 것을 방지 */
  background-color: white;
  box-shadow: ${({ theme }) => theme.shadows.base};
  padding: ${({ theme }) => theme.spacing[8]};
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[5]};
`;

const LogoImg = styled.img`
  width: 80px;
`;

const LogoWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  padding-bottom: ${({ theme }) => theme.spacing[8]};
`;

const LoginInputGroup = styled(InputGroup)`
  gap: ${({ theme }) => theme.spacing[2]};
`;

const LoginLabel = styled(Label)`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const LoginInputContainer = styled(InputContainer)`
  gap: ${({ theme }) => theme.spacing[2]};
`;

const LoginButtonGroup = styled.div`
  display: flex;
  margin-top: ${({ theme }) => theme.spacing[8]};
  gap: ${({ theme }) => theme.spacing[6]};
  button {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    ${media.md`
      font-size: ${({ theme }) => theme.fontSizes.xl};
  `}
  }
`;

const GoogleLogo = styled(FcGoogle)`
  width: 70px;
  height: 70px;
  border: 1px solid ${({ theme }) => theme.colors.gray[500]};
  border-radius: 100%;
  padding: ${({ theme }) => theme.spacing[3]};
  cursor: pointer;
`;

const GoogleLogoContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: ${({ theme }) => theme.spacing[4]}; /* Add some padding to separate it from the SNSWrap */
`;

const SnsWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* Center the entire SNS login section */
  margin-top: ${({ theme }) => theme.spacing[8]}; /* Add some space above */
  gap: ${({ theme }) => theme.spacing[6]}; /* Space between divider and text */
  padding: ${({ theme }) => theme.spacing[6]};
`;

const SnsDivider = styled.div`
  flex-grow: 1;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.black1};
`;

const SnsText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.lg}; /* Adjust font size as needed */
  color: ${({ theme }) => theme.colors.gray[700]}; /* Darker text color */
  white-space: nowrap; /* Prevent text from wrapping */
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const Icon = styled.img`
  width: 20px;
  height: 24px;
`;

const LoginInput = styled.input`
  padding: ${({ theme }) => theme.spacing[3]};
  border: none;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.base};
  height: auto;
  &:focus {
    outline: none;
  }
`;
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 55px;
  padding: ${({ theme }) => theme.spacing[3]};
  border: 1px solid ${({ theme, $error }) => ($error ? theme.colors.error : theme.colors.gray[5])};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.base};

  transition: all 0.2s ease;
  height: 55px;
  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    cursor: not-allowed;
  }

  &:focus-within {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
  }
`;

export default Login;
