import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { userService } from '../api/users';
import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';
import useUserStore from '../store/userStore';

const MyProfile = () => {
  // const { user, isAuthenticated } = useUserStore();
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = useUserStore((state) => state.user?.user_id);
  // const userId = isAuthenticated ? user.user_id : null;
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
      <Form>
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
          {profile.map((info) => (
            <Infos key={info.user_id}>
              <div>{info.user_id}</div>
              <div>
                <Input type="text" defaultValue={info.user_name} />
              </div>
              <div>
                <Input type="text" defaultValue={info.age} />
              </div>
              <div>
                <label>
                  <input type="radio" name="gender" value="male" defaultChecked={info.gender === 'male'} />
                  남성
                </label>

                <label>
                  <input type="radio" name="gender" value="female" defaultChecked={info.gender === 'female'} />
                  여성
                </label>
              </div>
              <div>
                <Input type="text" defaultValue={info.phone} />
              </div>
              <div>
                <Input type="email" defaultValue={info.email} />
              </div>
              <div>
                <Input type="text" style={{ width: '100%' }} defaultValue={info.address} />
              </div>
            </Infos>
          ))}
        </ProfilerArray>

        <Buttons>
          <button type="button">뒤로가기</button>
          <button type="button">회원탈퇴</button>
          <button type="button">비밀번호 변경</button>
          <button type="submit">수정하기</button>
        </Buttons>
      </Form>
    </Page>
  );
};
const Page = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Form = styled.form`
  width: 60%;
`;
const PageTitle = styled.div`
  float: left;
  padding-top: 50px;
  padding-left: 10px;
  padding-bottom: 20px;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const ProfilerArray = styled.div`
  width: 100%;
  display: flex;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[3]};
  > div {
  }
`;
const ProfilerTitles = styled.div`
  width: 20%;
  > div {
    height: 50px;
    align-content: center;
    background-color: ${({ theme }) => theme.colors.gray[5]};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[3]};
  }
`;
const Infos = styled.div`
  width: 80%;
  > div {
    text-align: left;
    height: 50px;
    align-content: center;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[3]};
    padding: 0 20px;
    > label {
      float: left;
      padding-right: 30px;
    }
  }
`;

const Input = styled.input`
  float: left;
  height: 80%;
  border: 1px solid ${({ theme }) => theme.colors.gray[5]};
  border-radius: 4px;

  padding: 0 4px;
`;
const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 0;
  gap: 10px;
  > button {
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }
`;
export default MyProfile;
