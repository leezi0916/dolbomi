import React, { useState } from 'react';
import { styled } from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import ChatModal from './chat/ChatModal';
import ChatHome from '../pages/chat/ChatHome';
import ChatBot from './ChatBot';

const Layout = ({ children }) => {
  // 채팅 모달의 열림/닫힘 상태를 Layout에서 관리합니다.
  const [isChatOpen, setIsChatOpen] = useState(false);

  // 채팅 모달을 닫는 함수
  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  return (
    <>
      <Header openChat={() => setIsChatOpen(true)} />
      <Content>{children}</Content>
      <ChatBot></ChatBot>
      <Footer />

      {isChatOpen && (
        <ChatModal>
          <ChatHome onClose={handleCloseChat} />
        </ChatModal>
      )}
    </>
  );
};

const Content = styled.main`
  min-height: calc(100vh - 81px);
  max-width: 1280px;
  margin: 0 auto;
`;
export default Layout;
