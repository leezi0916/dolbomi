import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
  display: flex;
  flex-direction: column;
  position: relative;
  height: 600px;
  width: 100%;
  gap: 10px;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const ProfileImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;

  border: 2px solid white;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const Td = styled.td`
  height: 30px;
  padding: 12px;
`;

const EnterButton = styled.button`
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #115293;
  }
`;
const LeaveButton = styled.button`
  background: #6c757d;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #5a6268;
  }
  &:disabled {
    background: #e9ecef;
    color: #6c757d;
    cursor: not-allowed;
  }
`;
const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;
// -----------------------------------------------

const ChatHome = () => {
  const [chatList, setChatList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyChats();
  }, []);

  const fetchMyChats = async () => {
    try {
      const data = await getMyChatRooms();
      setChatList(data);
    } catch (error) {
      console.error('내 채팅 목록 로드 실패:', error);
    }
  };

  const handleEnterChatRoom = (roomId) => {
    navigate(`/chatpage/${roomId}`);
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
    <Container>
      <Header>
        <Logo src="/public/logo.png" alt="로고" />
        <Title>채팅</Title>
        <Close src="/public/Union.png" alt="" />
      </Header>

      <Main>
        {chatList.map((chat) => (
          <Card>
            <tr key={chat.roomId}>
              <Td>{chat.roomName}</Td>
              <Td>{chat.unReadCount}</Td>
              <Td>
                <ButtonGroup>
                  <EnterButton onClick={() => handleEnterChatRoom(chat.roomId)}>입장</EnterButton>
                  <LeaveButton
                    disabled={chat.isGroupChat !== 'Y'}
                    onClick={() => handleLeaveChatRoom(chat.roomId, chat.isGroupChat)}
                  >
                    나가기
                  </LeaveButton>
                </ButtonGroup>
              </Td>
            </tr>
          </Card>
        ))}
        <Card>
          <tr>
            <Td>
              <ProfileImg src="/src/assets/profileImg/img_환자소.png" alt="" />
            </Td>
            <Td>백승환</Td>
            <Td>3</Td>
            <Td>
              <ButtonGroup>
                <EnterButton
                // onClick={() => handleEnterChatRoom(chat.roomId)}
                >
                  입장
                </EnterButton>
                <LeaveButton
                //   disabled={chat.isGroupChat !== 'Y'}
                //   onClick={() => handleLeaveChatRoom(chat.roomId, chat.isGroupChat)}
                >
                  나가기
                </LeaveButton>
              </ButtonGroup>
            </Td>
          </tr>
        </Card>
        <Card></Card>
        <Card></Card>
      </Main>
    </Container>
  );
};

export default ChatHome;
