import React from 'react';
import {
  AuthContainer,
  Input,
  InputGroup,
  Label,
  Title,
  InputContainer,
  Button,
  Form,
  ErrorMessage,
} from '../../styles/Auth.styles';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { emailService } from '../../api/email';
import { userService } from '../../api/users';

const schema = yup.object().shape({
  userPwd: yup
    .string()
    .required('비밀번호를 입력하세요.')
    .matches(/^(?=.*[a-zA-Z]).{5,}$/, '비밀번호는 영문자를 포함해 5자 이상이어야 합니다.'),

  userPwdCheck: yup
    .string()
    .oneOf([yup.ref('userPwd'), null], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호 확인을 입력하세요.'),
});

const ResetPassword = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email');
  const code = searchParams.get('code');

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    // 1. 비밀번호 변경을 누르면 이메일과 코드를 우선 확인
    // 2. 코드와 이메일이 일치하면 비밀번호 변경
    // 3. 변경이 완료되면 로그인 창으로 보내기

    // 수정 -> 위와같이 하면 인증코드 없이 비밀번호 api만 쏴도 비밀번호가 바뀜 -> 로직 분리 x 하나로 합치기

    try {
      const resetResponse = await userService.resetPassword(email, data.userPwd, code);

      if (resetResponse.status === 200) {
        toast.success(resetResponse?.data);
        navigate('/login');
      }
    } catch (error) {
      if (error.status === 400) {
        toast.error(error.response?.data);
        setTimeout(() => {
          toast.info('비밀번호 재설정을 원하시면 다시 인증해주세요.');
          navigate('/login');
        }, 1500);
      } else if (error.status === 404) {
        toast.error(error.response?.data?.message);
        setTimeout(() => {
          toast.info('회원가입 페이지로 이동합니다.');
          navigate('/signup');
        }, 1500);
      } else {
        // 기타 서버 오류 또는 네트워크 문제
        toast.error('비밀번호 재설정에 실패하였습니다');
        console.error('서버 오류 또는 알 수 없는 에러:', error);
      }
    }
  };

  return (
    <AuthContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Center>
          <Title>비밀번호 재설정</Title>
          <Description>새로운 비밀번호를 입력해주세요.</Description>

          <InputContainer1>
            <InputGroup>
              <Label htmlFor="userPwd">새 비밀번호</Label>
              <Input type="password" placeholder="새 비밀번호 입력" {...register('userPwd')} />
              {errors.userPwd && <ErrorMessage>{errors.userPwd.message}</ErrorMessage>}
            </InputGroup>

            <InputGroup>
              <Label htmlFor="userPwdCheck">비밀번호 확인</Label>
              <Input type="password" placeholder="비밀번호 확인 입력" {...register('userPwdCheck')} />
              {errors.userPwdCheck && <ErrorMessage>{errors.userPwdCheck.message}</ErrorMessage>}
            </InputGroup>

            <SubmitButton type="submit">비밀번호 변경</SubmitButton>
          </InputContainer1>
        </Center>
      </Form>
    </AuthContainer>
  );
};

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
  gap: ${({ theme }) => theme.spacing[3]};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray[700]};
  margin-top: ${({ theme }) => theme.spacing[2]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  text-align: center;
`;

const SubmitButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing[4]};
`;

export default ResetPassword;
