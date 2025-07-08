import React, { useState, useEffect } from 'react';
import {
  AuthContainer,
  Input,
  InputGroup,
  Label,
  Title,
  InputContainer,
  Button,
  ErrorMessage,
  Form,
} from '../styles/Auth.styles';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { userService } from '../api/users';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
  } = useForm();

  const [emailSent, setEmailSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(countdown);
    }
    return () => clearInterval(countdown);
  }, [timer]);

  const handleSendEmail = async () => {
    const email = getValues('email');
    if (!email) {
      toast.error('이메일을 입력해주세요.');
      return;
    }
    try {
      // 실제 인증번호 전송 로직
      await userService.resetPassword({ email });
      setEmailSent(true);
      setTimer(180); // 3분 타이머
      toast.success('인증 메일이 전송되었습니다.');
    } catch (error) {
      toast.error('인증 메일 전송 실패');
      console.error(error);
    }
  };

  const handleAuthComplete = () => {
    // 실제 인증번호 확인 로직 필요
    setAuthenticated(true);
    toast.success('인증 완료');
  };

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, '0');
    const sec = String(seconds % 60).padStart(2, '0');
    return `${min}:${sec}`;
  };

  const onSubmit = async (data) => {
    if (!authenticated) {
      toast.error('이메일 인증을 완료해주세요.');
      return;
    }
    try {
      const { newPassword } = data;
      const email = getValues('email');
      await userService.updatePassword({ email, newPassword });
      toast.success('비밀번호 재설정 완료!');
      navigate('/login');
    } catch (error) {
      toast.error('비밀번호 변경 중 오류 발생');
      console.error(error);
    }
  };

  return (
    <AuthContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Center>
          <Title>비밀번호 찾기</Title>
          <Description>가입한 이메일 주소를 입력해주세요. 인증 후 비밀번호를 변경할 수 있습니다.</Description>
          <InputContainer1>
            <InputGroup>
              <Label htmlFor="email">이메일</Label>
              <Row>
                <Inputs
                  id="email"
                  type="email"
                  placeholder="이메일을 입력해주세요"
                  {...register('email', {
                    required: '이메일을 입력해주세요.',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: '올바른 이메일 형식이 아닙니다.',
                    },
                  })}
                  $error={errors.email}
                  disabled={emailSent}
                />
                <CheckButton type="button" onClick={handleSendEmail} disabled={emailSent}>
                  이메일 전송
                </CheckButton>
              </Row>
              {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
            </InputGroup>

            {emailSent && !authenticated && (
              <InputGroup>
                <Label htmlFor="code">인증번호</Label>
                <Row>
                  <Inputs
                    id="code"
                    placeholder="인증번호를 입력해주세요"
                    {...register('code', {
                      required: '인증번호를 입력해주세요.',
                    })}
                    $error={errors.code}
                  />
                  <CheckButton type="button" onClick={handleAuthComplete}>
                    인증하기
                  </CheckButton>
                </Row>
                <TimerText>{formatTime(timer)}</TimerText>
              </InputGroup>
            )}

            {authenticated && (
              <>
                <InputGroup>
                  <Label htmlFor="newPassword">새 비밀번호</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="새 비밀번호를 입력해주세요"
                    {...register('newPassword', {
                      required: '새 비밀번호를 입력해주세요.',
                      minLength: { value: 6, message: '6자 이상 입력해주세요.' },
                    })}
                    $error={errors.newPassword}
                  />
                  {errors.newPassword && <ErrorMessage>{errors.newPassword.message}</ErrorMessage>}
                </InputGroup>

                <InputGroup>
                  <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="다시 입력해주세요"
                    {...register('confirmPassword', {
                      required: '비밀번호를 다시 입력해주세요.',
                      validate: (value) => value === getValues('newPassword') || '비밀번호가 일치하지 않습니다.',
                    })}
                    $error={errors.confirmPassword}
                  />
                  {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>}
                </InputGroup>

                <SubmitButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? '처리 중...' : '비밀번호 변경하기'}
                </SubmitButton>
              </>
            )}

            <BackButton type="button" onClick={() => navigate(-1)}>
              뒤로가기
            </BackButton>
          </InputContainer1>
        </Center>
      </Form>
    </AuthContainer>
  );
};

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray[700]};
  margin-top: ${({ theme }) => theme.spacing[2]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  text-align: center;
`;

const Center = styled.div`
  width: 100%;
  min-height: 500px;
  background-color: white;
  box-shadow: ${({ theme }) => theme.shadows.base};
  padding: ${({ theme }) => theme.spacing[8]};
`;

const InputContainer1 = styled(InputContainer)`
  max-width: 600px;
  margin: 0 auto;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const SubmitButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing[6]};
`;

const BackButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing[3]};
  background-color: ${({ theme }) => theme.colors.gray[400]};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const Inputs = styled(Input)`
  flex-grow: 1;
`;

const CheckButton = styled(Button)`
  width: auto;
  min-width: 100px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const TimerText = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-left: ${({ theme }) => theme.spacing[2]};
`;

export default ChangePassword;
