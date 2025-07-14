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
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { emailService } from '../../api/email';
import { toast } from 'react-toastify';

const FindPassword = () => {
  const schema = yup.object().shape({
    email: yup.string().email('유효한 이메일 주소를 입력하세요.').required('이메일을 입력해주세요.'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await emailService.sendResetLink(data.email);

      toast.success('메일 전송 성공. 이메일을 확인해주세요.');
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const navigate = useNavigate();

  return (
    <AuthContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Center>
          <Title>비밀번호 찾기</Title>
          <Description>
            가입한 이메일 주소를 입력해주세요. 이메일로 <strong>전송된 링크를 통해</strong> 비밀번호를 변경할 수
            있습니다.
          </Description>
          <InputContainer1>
            <InputGroup>
              <Label htmlFor="email">이메일</Label>
              <Row>
                <Inputs type="email" placeholder="이메일을 입력해주세요" {...register('email')} />
                <CheckButton type="submit">이메일 전송</CheckButton>
              </Row>
              {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
            </InputGroup>

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
export default FindPassword;
