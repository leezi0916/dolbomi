import React from 'react';
import { Title } from '../styles/Auth.styles';
import { userService } from '../api/users';
import useUserStore from '../store/userStore';

const MatchingMain = () => {
  const { user } = useUserStore();

  const getUser = async () => {
    const userInfo = userService.getUserProfile(user.id);
    console.log(userInfo);
  };

  return (
    <>
      <Title>매칭됨 돌봄 대상자 관리</Title>
      {/* 상태에 따라 컴포넌트를 다르게 */}
      {}
      <>
        <nav>
          <div>
            <sapn>진행중</sapn>
            <sapn>종료된 매칭</sapn>
          </div>

          <div>
            <input type="text" />
            <button></button>
          </div>
        </nav>
        {/* 간병인ver =(돌봄대상자모집)*/}

        <div>
          {' '}
          <img src="" alt="" />
          <div>
            <span>이름</span>
            <span>나이/ 성별</span>
          </div>
        </div>

        <div>
          <button>돌봄대상자</button>
          <button>간병종료</button>
        </div>

        {/* 보호자ver=(간병사모집) */}
        <>
          <div>
            <img src="" alt="" />
            <div>
              <span>이름</span>
              <span>나이</span>
              <button>간병사 정보</button>
            </div>
          </div>

          <div>
            <img src="" alt="" />
            <div>
              <span>이름</span>
              <span>나이</span>
              <button>간병사 정보</button>
            </div>
          </div>
        </>
      </>
    </>
  );
};

export default MatchingMain;
