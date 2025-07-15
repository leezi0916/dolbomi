import React, { useState } from 'react';
import styled from 'styled-components';

import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, Avatar } from '@chatscope/chat-ui-kit-react';
import { leaveGroupChatRoom } from '../../api/chatApi';

//메인-----------------------------------------
const Main = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 600px;
  width: 100%;
  gap: 10px;
  max-width: 1200px;
  padding: 10px 1rem;
`;

const MessageBox = styled(MainContainer)`
  border: 0;
  box-shadow: 0 0 6px rgba(239, 122, 70, 0.6);
`;
const OneMessage = styled(Message)`
  padding: 10px 0;
`;

//하단------------------------------------------
const Footer = styled.div`
  display: flex;
  justify-content: space-around;
  padding-bottom: 30px;
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
  padding: 0.5rem 2rem;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;

  max-width: 320px;
  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const LeaveButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 2rem;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
  &:disabled {
    background: #e9ecef;
    color: #6c757d;
    cursor: not-allowed;
  }
`;
// -----------------------------------------------

const AVATAR_IMAGE = '/src/assets/profileImg/img_환자소.png';

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
      <OneMessage key={index} model={item.model}>
        {item.avatar ? <Avatar src={item.avatar.src} name={item.avatar.name} /> : null}
      </OneMessage>
    );
  });
};

const ChatRoom = ({ onBack }) => {
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

  const handleLeaveChatRoom = async (roomId, isGroupChat) => {
    if (isGroupChat !== 'Y') return;
    try {
      await leaveGroupChatRoom(roomId);
      setChatList(chatList.filter((chat) => chat.roomId !== roomId));
    } catch (error) {
      console.error('채팅방 나가기 실패:', error);
      alert('채팅방 나가기에 실패했습니다.');
    }
  };

  return (
    <>
      <Main>
        {/* <Search /> */}
        <MessageBox>
          <ChatContainer>
            <MessageList>{getMessageComponent(messages)}</MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MessageBox>
      </Main>
      {/* <LeaveButton
              disabled={chat.isGroupChat !== 'Y'}
              onClick={() => handleLeaveChatRoom(chat.roomId, chat.isGroupChat)}
            >
              나가기
            </LeaveButton> */}

      <Footer>
        <ButtonGroup>
          <MenuButton onClick={onBack}>채팅방목록</MenuButton>
          <LeaveButton>채팅나가기</LeaveButton>
        </ButtonGroup>
      </Footer>
    </>
  );
};

export default ChatRoom;
