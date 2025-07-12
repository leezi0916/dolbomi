import React from 'react';
import styled from 'styled-components';

// 모달 뒷배경 (화면 전체를 덮는 반투명 레이어)
const ModalOverlay = styled.div`
  position: fixed; /* 화면에 고정 */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1200; /* 다른 요소들보다 위에 오도록 설정 */
  pointer-events: none;
`;

const ChatModal = ({ children }) => {
  return <ModalOverlay>{children}</ModalOverlay>;
};

export default ChatModal;
