import React from 'react';
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
} from '../styles/Auth.styles';
import styled from 'styled-components';
const SignUp = () => {
  return (
    <>
      <AuthContainer>
        <Form>
          <FirstTitle>회원가입</FirstTitle>
          <Head>
            <Title>SNS 회원가입</Title>
            <p>SNS 계정으로 간편하게 로그인하세요</p>
          </Head>
          <Center>
            <Title>SNS 회원가입</Title>
            <p>SNS 계정으로 간편하게 로그인하세요</p>
          </Center>
          <Head>
            <Title>SNS 회원가입</Title>
            <p>SNS 계정으로 간편하게 로그인하세요</p>
          </Head>
        </Form>
      </AuthContainer>
    </>
  );
};

const Head = styled.div`
  width: 100%;
  height: 220px;

  background-color: white;
  box-shadow: ${({ theme }) => theme.shadows.base};
`;

const Center = styled.div`
  width: 100%;
  height: 600px;

  background-color: white;
  box-shadow: ${({ theme }) => theme.shadows.base};
`;

const FirstTitle = styled(Title)`
  font-weight: ${({ theme }) => theme.fontWeights.blac};
  display: flex;
  justify-content: flex-start;
`;
export default SignUp;
