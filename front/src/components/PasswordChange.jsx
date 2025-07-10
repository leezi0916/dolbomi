import { SITE_CONFIG } from '../config/site';
import React from 'react';
import styled from 'styled-components';
import closeIcon from '../assets/icons/icon_닫기.png';
import { Input, InputGroup } from '../styles/Auth.styles';
import { usePasswordForm } from '../hooks/usePasswordForm';

const PasswordChange = ({ userNo, onClose, onSuccess }) => {
  const { register, handleSubmit, errors, isSubmitting, onSubmit } = usePasswordForm(userNo, onSuccess);

  return (
    <ModalOverlay>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContainer>
          <CloseButton onClick={onClose}>
            <img src={closeIcon} alt="닫기" />
          </CloseButton>
          <Title>비밀번호 변경</Title>
          <TextGroup>
            <FirstText>안전한 비밀번호로 내정보를 보호하세요</FirstText>
            <SecondText>다른 아이디/사이트에서 사용한 적 없는 비밀번호가 안전합니다.</SecondText>
          </TextGroup>

          <Group>
            <Input type="password" placeholder="현재 비밀번호" {...register('currentPassword')} />
            {errors.currentPassword && <ErrorMessage>{errors.currentPassword.message}</ErrorMessage>}

            <Input type="password" placeholder="새 비밀번호" {...register('newPassword')} />
            {errors.newPassword && <ErrorMessage>{errors.newPassword.message}</ErrorMessage>}

            <Input type="password" placeholder="새 비밀번호 확인" {...register('confirmPassword')} />
            {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>}

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? '변경 중...' : '변경하기'}
            </SubmitButton>
          </Group>
        </ModalContainer>
      </form>
    </ModalOverlay>
  );
};
const Group = styled(InputGroup)`
  gap: ${({ theme }) => theme.spacing[3]};
`;

const TextGroup = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: column;
  text-align: left;
  p {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const FirstText = styled.p`
  color: ${({ theme }) => theme.colors.primary};
`;

const SecondText = styled.p`
  color: ${({ theme }) => theme.colors.success};
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContainer = styled.div`
  width: 500px;
  background: white;
  border-radius: 4px;
  padding: 40px 30px;
  position: relative;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  img {
    width: 20px;
    height: 20px;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
  flex-direction: column;
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
`;

const LogoImg = styled.img`
  width: 80px;
  margin: 0 auto;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const Card = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray[5]};
  padding: 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
  justify-content: flex-start;
  margin-bottom: 30px;
`;

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Name = styled.div`
  font-weight: bold;
  font-size: 16px;
`;

const Age = styled.div`
  color: ${({ theme }) => theme.colors.gray[6]};
  font-size: 14px;
`;

const SelectBox = styled.select`
  width: 100%;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.gray[5]};
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeights.md};
`;

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  width: 100%;
  padding: 14px;
  font-weight: bold;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  text-align: left;
  margin-bottom: 10px;
`;
export default PasswordChange;
