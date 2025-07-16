import styled from 'styled-components';

export const ModalContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[8]};
  border: 1px solid ${({ theme }) => theme.colors.gray[5]};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  width: 650px;
  height: 500px;
  gap: 10px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
`;

export const ModalCloseButton = styled.button`
  top: 30px;
  right: 40px;
  position: absolute;
`;

export const ModalText = styled.p`
  margin: 30px;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.black};
`;

export const ModalInput = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.gray[5]};
  padding: ${({ theme }) => theme.spacing[4]};
  width: 60%;
`;
