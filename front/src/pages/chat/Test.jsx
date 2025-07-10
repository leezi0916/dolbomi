import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, Avatar } from '@chatscope/chat-ui-kit-react';

const Container = styled.div`
  max-width: 600px;
  margin: 3rem auto;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
`;

// 상단---------------------------------------
const Header = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  height: 50px;
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const Close = styled.img`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

//검색창---------------------------------------

//메인-----------------------------------------
const Main = styled.div`
  position: relative;
  height: 600px;
  width: 100%;

  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const MessageBox = styled(MainContainer)`
  border: 0;

  box-shadow: 0 0 6px rgba(239, 122, 70, 0.6);
`;

//하단------------------------------------------
const Footer = styled.div`
  display: flex;
  justify-content: space-around;
`;
const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;
const MenuButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;

  max-width: 320px;
  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

// -----------------------------------------------

const AVATAR_IMAGE = '/public/logo.png';

const defaultMessage = [
  {
    model: {
      message: 'How are you?',
      direction: 'incoming',
    },
    avatar: {
      src: AVATAR_IMAGE,
      name: 'bloodstrawberry',
    },
  },
  {
    model: {
      message: "I'm fine, thank you, and you?",
      direction: 'outgoing',
    },
  },
  {
    model: {
      message: "I'm fine, too. thank you, and you?",
      direction: 'incoming',
    },
    avatar: {
      src: AVATAR_IMAGE,
      name: 'bloodstrawberry',
    },
  },
];

const getMessageComponent = (data) => {
  return data.map((item, index) => {
    return (
      <Message key={index} model={item.model}>
        {item.avatar ? <Avatar src={item.avatar.src} name={item.avatar.name} /> : null}
      </Message>
    );
  });
};

const ChatMenuPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState(defaultMessage);

  const handleSend = (input) => {
    let newMessage = {
      model: {
        message: input,
        direction: 'outgoing',
      },
    };

    setMessages([...messages, newMessage]);
  };

  return (
    <Container>
      <Header>
        <Logo src="/public/logo.png" alt="로고" />
        <Title>채팅</Title>
        <Close src="/public/Union.png" alt="" />
      </Header>

      <Main>
        <MessageBox>
          <ChatContainer>
            <MessageList>{getMessageComponent(messages)}</MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MessageBox>
      </Main>

      <Footer>
        <ButtonGroup>
          <MenuButton onClick={() => navigate('#')}>채팅방목록</MenuButton>
        </ButtonGroup>
      </Footer>
    </Container>
  );
};

export default ChatMenuPage;
