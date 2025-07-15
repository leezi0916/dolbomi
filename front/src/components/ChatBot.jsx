// ChatBot.jsx
import React, { useState } from 'react';
import styled from 'styled-components';

const ChatBotContainer = styled.div`
  position: fixed;
  bottom: 40px;
  right: 30px;
  z-index: 9999;
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
`;

const ChatBotBox = styled.div`
  width: 300px;
  height: 400px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ChatBotHeader = styled.h4`
  margin: 0;
  background: ${({theme}) => theme.colors.primary};
  color: white;
  padding: 12px;
  font-size: 16px;
`;

const ChatBotContent = styled.div`
  flex: 1;
  padding: 12px;
  overflow-y: auto;
  font-size: 14px;
  color: #333;
`;

const ChatBotInput = styled.input`
  border: none;
  border-top: 1px solid #ddd;
  padding: 10px;
  font-size: 14px;
  outline: none;
`;



const ToggleButton = styled.button`
  position: fixed;
  bottom: 40px;
  right: 40px;
  z-index: 10000;
  padding: 8px 16px;
  background-color: ${({theme}) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState();
  return (
    <>
      <ToggleButton onClick={() => setIsOpen(!isOpen)}>{isOpen ? '닫기' : '열기'}</ToggleButton>

      <ChatBotContainer isOpen={isOpen}>
        <ChatBotBox>
          <ChatBotHeader>챗봇</ChatBotHeader>
          <ChatBotContent>안녕하세요! 무엇을 도와드릴까요?</ChatBotContent>
          <ChatBotInput placeholder="메시지를 입력하세요..." />
        </ChatBotBox>
      </ChatBotContainer>
    </>
  );
};

export default ChatBot;
