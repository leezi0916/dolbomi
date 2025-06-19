import React, { useEffect, useState } from 'react';

import { proposerSevice } from '../api/propose.js';
import useUserStatusStore from '../store/userStatusStore.js';
import styled from 'styled-components';
import useUserStore from '../store/userStore.js';
import { useNavigate } from 'react-router-dom';

const Supportstatus = () => {
  const {user} = useUserStore();
  const [proposerList, setproposerList] = useState([]);
  const { userStatus } = useUserStatusStore();
  const navigator = useNavigate();

  useEffect(() => {
    const fetchList = async () => {
      
      console.log(userStatus);

      if (userStatus) {
        //돌봄대상자ver() : 내 구인서에 대한 간병인지원현황
        // 매개변수값 : 구인서의 pk를 넘기자
        const getList = await proposerSevice.getguardianLists(1);
        setproposerList(getList);
        console.log(getList)
        
      } else {
        // 간병인ver : 내 구직서(이력서)에 대한 돌봄대상자지원현황
        // 매개변수값 : 구직서의 pk를 넘기자
        const getList = await proposerSevice.getcareGiverLists(1);
        setproposerList(getList);
      }
    };

    fetchList();
  }, [userStatus]); // ✅ 여기만 의존

  return (
    <Wrapper>
      <ImageStack>
        {proposerList.map((list, index) => (
          <ProfileImg
            key={index}
            src={list.profileImage}
            style={{ left: `${index * 20}px`, zIndex: proposerList.length - index }}
          />
        ))}
      </ImageStack>

      <NewTitle>지원현황 {proposerList.length}명</NewTitle>
      <ActionButton  onClick={() => navigator('/supportBorad')}>확인하기</ActionButton>
    </Wrapper>
  );
};

export default Supportstatus;

const Wrapper = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px;
  gap: 50px;
  margin: 20px auto;
  margin-top: 30px;
  border: 1px solid ${({ theme }) => theme.colors.gray[5]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const ImageStack = styled.div`
  position: relative;
  height: 50px;
  width: 20%;
  margin-bottom: 16px;
`;

const ProfileImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  position: absolute;
  border: 2px solid white;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const NewTitle = styled.h2`
  width: 20%;
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  margin-bottom: 10px;
`;

const ActionButton = styled.button`
  width: 200px;

  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;
