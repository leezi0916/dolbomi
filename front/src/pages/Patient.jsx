import React from 'react';
import { Title, AuthContainer } from '../styles/Auth.styles';
import { SubmitButton, ButtonText } from '../styles/common/Button';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';
import { useEffect } from 'react';

const Patient = () => {
  const { user, isAuthenticated } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    // 일단 접근가능하게 로그인 구현 되면 user -> !user 바꿀것
    if (user) {
      alert('로그인 후 이용해주세요');
      navigate('/');
    }
  }, [user]);
  return (
    <>
      <AuthContainer>
        <Head>
          <Title>돌봄 대상자 목록</Title>
          <RegistrationButton>
            <ButtonText onClick={() => navigate('/PatientRegistration')}>등록</ButtonText>
          </RegistrationButton>
        </Head>

        <CardWrap>
          <Card>
            <ProfileDiv>
              <Img src="../assets/profileImg/img_환자소.png" alt="" />
              <div>
                <p>김건희 님</p>
                <p>나이 80세 (여) </p>
              </div>
            </ProfileDiv>

            <ButtonDiv>
              <SubmitButton>
                <ButtonText>관리</ButtonText>
              </SubmitButton>

              <SubmitButton>
                <ButtonText>일지</ButtonText>
              </SubmitButton>
            </ButtonDiv>
          </Card>

          <Card>
            <ProfileDiv>
              <Img src="../assets/profileImg/img_환자소.png" alt="" />
              <div>
                <p>김건희 님</p>
                <p>나이 80세 (여) </p>
              </div>
            </ProfileDiv>

            <ButtonDiv>
              <SubmitButton>
                <ButtonText>관리</ButtonText>
              </SubmitButton>

              <SubmitButton>
                <ButtonText>일지</ButtonText>
              </SubmitButton>
            </ButtonDiv>
          </Card>

          <Card>
            <ProfileDiv>
              <Img src="../assets/profileImg/img_환자소.png" alt="" />
              <div>
                <p>김건희 님</p>
                <p>나이 80세 (여) </p>
              </div>
            </ProfileDiv>

            <ButtonDiv>
              <SubmitButton>
                <ButtonText>관리</ButtonText>
              </SubmitButton>

              <SubmitButton>
                <ButtonText>일지</ButtonText>
              </SubmitButton>
            </ButtonDiv>
          </Card>
          <Card>
            <ProfileDiv>
              <Img src="../assets/profileImg/img_환자소.png" alt="" />
              <div>
                <p>김건희 님</p>
                <p>나이 80세 (여) </p>
              </div>
            </ProfileDiv>

            <ButtonDiv>
              <SubmitButton>
                <ButtonText>관리</ButtonText>
              </SubmitButton>

              <SubmitButton>
                <ButtonText>일지</ButtonText>
              </SubmitButton>
            </ButtonDiv>
          </Card>

          <Card>
            <ProfileDiv>
              <Img src="../assets/profileImg/img_환자소.png" alt="" />
              <div>
                <p>김건희 님</p>
                <p>나이 80세 (여) </p>
              </div>
            </ProfileDiv>

            <ButtonDiv>
              <SubmitButton>
                <ButtonText>관리</ButtonText>
              </SubmitButton>

              <SubmitButton>
                <ButtonText>일지</ButtonText>
              </SubmitButton>
            </ButtonDiv>
          </Card>
        </CardWrap>
      </AuthContainer>
    </>
  );
};

export default Patient;

const CardWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  align-content: start;
  gap: ${({ theme }) => theme.spacing[5]}; /* 카드 간 간격 */
  padding: ${({ theme }) => theme.spacing[8]};
  background-color: white;
  box-shadow: ${({ theme }) => theme.shadows.base};
  min-height: 850px;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RegistrationButton = styled(SubmitButton)`
  height: fit-content;
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
`;

const ProfileDiv = styled.div`
  display: flex;
  text-align: left;
  align-items: center;
  margin: ${({ theme }) => theme.spacing[5]};
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: ${({ theme }) => theme.spacing[5]};
  gap: ${({ theme }) => theme.spacing[4]};
`;

const Card = styled.div`
  max-height: fit-content;
  box-shadow: ${({ theme }) => theme.shadows.base};
`;
