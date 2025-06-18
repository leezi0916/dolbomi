import React, { useEffect, useState } from 'react';

import { proposerSevice } from '../api/propose.js';
import useUserStatusStore from '../store/userStatusStore.js';
import styled from 'styled-components';


const Supportstatus = () => {
  const [proposerList, setproposerList] = useState([]);
  const { userStatus } = useUserStatusStore();


  useEffect(() => {
    const fetchList = async () => {
      if (userStatus) {
        // 간병인 구직글의 돌봄지원자 지원현황 => 돌봄지원자일때
        const getList = await proposerSevice.getguardianLists(1);
        setproposerList(getList);
        // 돌봄대상자 구인글의 간병인 지원현황 => 간병사일때
      } else {
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
          src={list.image}
          style={{ left: `${index * 20}px`, zIndex: proposerList.length - index }}
        />
      ))}
    </ImageStack>

    <NewTitle>지원현황 {proposerList.length}명</NewTitle>
    <ActionButton>확인하기</ActionButton>
  </Wrapper>
);

};

export default Supportstatus;

const Wrapper = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  gap: 50px;
  margin-top: 30px;
  border: 1px solid ${({ theme }) => theme.colors.gray[5]};
  box-shadow: ${({ theme }) => theme.shadows.base};
  

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
 font-size: ${({ theme }) => theme.fontSizes['4xl']};
  margin-bottom: 10px;
`;

const ActionButton = styled.button`
  width: 200px;

  background-color: ${({ theme }) => theme.colors.primary };
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

