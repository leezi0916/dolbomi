import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// --- styled components ---
const ChatMain = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 600px;
  width: 100%;
  max-width: 600px;
  gap: 10px;
  padding: 10px 1rem;
  background-color: #fff;
  box-shadow: 0 0 6px rgba(239, 122, 70, 0.6);
  margin: 0 auto;
  border-radius: 10px;
  margin-top: 100px;
`;

const MessageBox = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f8f9fa;
`;

const MessageList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const InputContainer = styled.form`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const ChatInput = styled.input.attrs({ type: 'text' })`
  flex-grow: 1;
  padding: 12px 15px;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ddd;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary || '#007bff'};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const SendButton = styled.button`
  background: ${({ theme }) => theme.colors.primary || '#007bff'};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0 25px;
  cursor: pointer;
  font-size: 1rem;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.secondary || '#0056b3'};
  }
  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
  }
`;

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
  background: ${({ theme }) => theme.colors.primary || '#007bff'};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 2rem;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
  max-width: 320px;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary || '#0056b3'};
  }
`;

const LeaveButton = styled.button`
  background: ${({ theme }) => theme.colors.primary || '#007bff'};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 2rem;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary || '#0056b3'};
  }

  &:disabled {
    background: #e9ecef;
    color: #6c757d;
    cursor: not-allowed;
  }
`;
const LogoImg = styled.img`
  width: 80px;
`;

const ResultBox = styled.div`
  margin-top: 20px;
  color: #212529;
  background: #f0f8ff;
  padding: 12px;
  border-radius: 8px;
`;

const ErrorBox = styled.div`
  margin-top: 20px;
  color: #dc3545;
  background: #f8d7da;
  padding: 12px;
  border-radius: 8px;
`;

// --- main component ---
const AiChat = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const askRag = async (e) => {
    e.preventDefault(); // form 제출시 페이지 리로드 방지
    if (!question.trim()) {
      alert('질문을 입력해주세요.');
      return;
    }
    setLoading(true);
    setAnswer('');
    setError('');

    try {
      const res = await fetch('http://localhost:8555/rag/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: question.trim() }),
      });
      const data = await res.json();
      if (data.status === 'success') {
        setAnswer(data.answer);
      } else {
        setError(data.error || '응답 실패');
      }
    } catch (e) {
      setError('네트워크 오류: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      askRag(e);
    }
  };

  return (
    <>
      <ChatMain>
        <MessageBox>
          <LogoImg src="/logo.png" alt="로고" />
          <InputContainer onSubmit={askRag}>
            <ChatInput
              placeholder="메시지를 입력하세요"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            <SendButton type="submit" disabled={loading}>
              {loading ? '전송 중...' : '전송'}
            </SendButton>
          </InputContainer>

          {/* 답변과 에러 메시지 표시 */}
          {answer && <ResultBox dangerouslySetInnerHTML={{ __html: answer }} />}
          {error && <ErrorBox>{error}</ErrorBox>}
        </MessageBox>
      </ChatMain>

      <Footer>
        <ButtonGroup>
          <LeaveButton disabled={loading} onClick={() => navigate('/')}>
            나가기
          </LeaveButton>
        </ButtonGroup>
      </Footer>
    </>
  );
};

export default AiChat;
