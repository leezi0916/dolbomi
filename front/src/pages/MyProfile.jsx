import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { userService } from '../api/users';
import useUserStore from '../store/userStore';
import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';

const MyProfile = () => {
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = useUserStore((state) => state.user?.userid);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const info = await userService.getUserProfile(userId);
        console.log(info);
        setProfile(info);
      } catch (error) {
        console.error(error);
        const errorMessage = '개인정보 불러오는데 실패했습니다.';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [userId]);

  if (loading) {
    return (
      <div>
        <ClipLoader size={50} aria-label="Loading Spinner" />
      </div>
    );
  }

  if (error) {
    return null;
  }
  return (
    <Page>
      <div>
        <PageTitle>회원정보 수정 / 탈퇴</PageTitle>
        <ProfilerArray>
          <ProfilerTitles>
            <div>아이디</div>
            <div>이름</div>
            <div>나이</div>
            <div>성별</div>
            <div>전화번호</div>
            <div>이메일</div>
            <div>주소</div>
          </ProfilerTitles>
          {profile.map((user) => (
            <Infos key={user.userid}>
              <div>{user.userid}</div>
              <div>{user.username}</div>
              <div>{user.age}</div>
              <div>{user.gender}</div>
              <div>{user.phone}</div>
              <div>{user.email}</div>
              <div>{user.address}</div>
            </Infos>
          ))}
        </ProfilerArray>

        <Buttons>
          <button>뒤로가기</button>
          <button>회원탈퇴</button>
          <button>비밀번호 변경</button>
          <button>수정하기</button>
        </Buttons>
      </div>
    </Page>
  );
};
const Page = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const PageTitle = styled.div`
  float: left;
  padding-top: 50px;
  padding-left: 10px;
  padding-bottom: 20px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;
const ProfilerArray = styled.div`
  width: 100%;
  display: flex;
  > div {
  }
`;
const ProfilerTitles = styled.div`
  > div {
    width: 100px;
    height: 50px;
    margin: 4px;
    align-content: center;
    background-color: ${({ theme }) => theme.colors.gray[5]};
  }
`;
const Infos = styled.div`
  > div {
    width: 100%;
    height: 50px;
    margin: 4px;
    align-content: center;
  }
`;
const Buttons = styled.button`
  display: flex;
  > button {
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.white};
  }
`;
export default MyProfile;
