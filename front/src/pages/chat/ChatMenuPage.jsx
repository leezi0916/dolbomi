import React, { useEffect, useState } from 'react';

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
  position: relative;
  height: 600px;
  width: 100%;

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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
`;
const Th = styled.th`
  padding: 12px;
  text-align: center;
  border-bottom: 2px solid #dee2e6;
  background: #f8f9fa;
`;
const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #dee2e6;
`;
const ChatButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
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

const ChatMenuPage = () => {
  const navigate = useNavigate();
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const data = await getMemberList();
      setMemberList(data);
    } catch (error) {
      console.error('회원 목록 로드 실패:', error);
    }
  };

  const handleStartChat = async (otherMemberId) => {
    try {
      const roomId = await startPrivateChat(otherMemberId);
      navigate(`/chatpage/${roomId}`);
    } catch (error) {
      console.error('개인 채팅 시작 실패:', error);
      alert('채팅 시작에 실패했습니다.');
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
        <Card>
          <Title>환자목록</Title>
          <Table>
            <thead>
              <tr>
                <Th>ID</Th>
                <Th>이름</Th>
                <Th>이메일</Th>
                <Th>채팅</Th>
              </tr>
            </thead>
            <tbody>
              {memberList.map((member) => (
                <tr key={member.id}>
                  <Td>{member.id}</Td>
                  <Td>{member.name}</Td>
                  <Td>{member.email}</Td>
                  <Td>
                    <ChatButton onClick={() => handleStartChat(member.id)}>채팅하기</ChatButton>
                  </Td>
                </tr>
              ))}
              <tr>
                <Td>1</Td>
                <Td>백승환</Td>
                <Td>tmdghks605@gmail.com</Td>
                <Td>
                  <ChatButton onClick="#">채팅하기</ChatButton>
                </Td>
              </tr>
              <tr>
                <Td>2</Td>
                <Td>이지묵</Td>
                <Td>wlanrwlanr@gmail.com</Td>
                <Td>
                  <ChatButton onClick="#">채팅하기</ChatButton>
                </Td>
              </tr>
            </tbody>
          </Table>
        </Card>
      </Main>

      <Footer>
        <ButtonGroup>
          <MenuButton onClick={() => navigate('/chat/patientList')}>환자목록</MenuButton>
          <MenuButton onClick={() => navigate('#')}>채팅방목록</MenuButton>
        </ButtonGroup>
      </Footer>
    </Container>
  );
};

export default ChatMenuPage;
