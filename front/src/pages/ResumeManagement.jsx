import React, { useState } from 'react';
import { Title, AuthContainer } from '../styles/Auth.styles';
import { SubmitButton, ButtonText } from '../styles/common/Button';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';
import { useEffect } from 'react';
import { ProfileImg } from '../styles/common/Profile';
import { IoCheckmarkOutline } from 'react-icons/io5';
import { jobSeekingService } from '../api/jobSeeking';
import { toast } from 'react-toastify';

const ResumeManagement = () => {
  const { user } = useUserStore();
  const [resumeLists, setResumeLists] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      if (!user) {
        alert('로그인 후 이용해주세요');
        return;
      }

      try {
        const getResumeLists = await jobSeekingService.getMyResumeList(user.userNo);
        console.log('목록 :', getResumeLists);

        setResumeLists(getResumeLists);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAll();
  }, []);

  const handleStatusToggle = async (resumeNo, currentStatus) => {
    const newStatus = currentStatus === 'Y' ? 'W' : 'Y';

    try {
      await jobSeekingService.updateResume(resumeNo, { status: newStatus });
      toast.success('상태가 변경되었습니다.');

      setResumeLists((prev) =>
        prev.map((resume) => (resume.resumeNo === resumeNo ? { ...resume, status: newStatus } : resume))
      );
    } catch (error) {
      toast.error('상태 변경 중 문제가 발생했습니다.');
      console.error('상태 변경 에러: ', error);
    }
  };
  return (
    <>
      <AuthContainer>
        <Head>
          <Title>이력서 목록</Title>
          <Text>체크 클릭시 이력서가 간병사로 신청됩니다!</Text>
          <RegistrationButton>
            <ButtonText onClick={() => navigate('/caregiver/resumeregistration')}>등록</ButtonText>
          </RegistrationButton>
        </Head>

        <CardWrap>
          {resumeLists?.map((resume) => (
            <Card key={resume.resumeNo}>
              <ProfileDiv>
                <ProfileTextGray>
                  NO <ProfileTextStrong>{resume.resumeNo}</ProfileTextStrong>
                </ProfileTextGray>
                <StyledCheckbox checked={resume.status ==='Y'}>
                  <HiddenCheckbox
                    checked={resume.status === 'Y'}
                    onChange={() => handleStatusToggle(resume.resumeNo, resume.status)}
                  />
                  {resume.status === 'Y' && <IoCheckmarkOutline size="20px" color="white" />}
                </StyledCheckbox>

              </ProfileDiv>

              <ButtonDiv>
                <SubmitButton1 onClick={() => navigate(`/caregiver/myresume/${resume.resumeNo}`)}>
                  <ButtonText>이력서 상세</ButtonText>
                </SubmitButton1>
              </ButtonDiv>
            </Card>
          ))}
        </CardWrap>
      </AuthContainer>
    </>
  );
};
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
  width: 120px;
`;

const Card = styled.div`
  max-height: fit-content;
  box-shadow: ${({ theme }) => theme.shadows.base};
`;

const ProfileDiv = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  margin: ${({ theme }) => theme.spacing[5]};
  gap: ${({ theme }) => theme.spacing[2]};
`;

const ProfileTextGray = styled.p`
  color: ${({ theme }) => theme.colors.gray[3]};
`;

const ProfileTextStrong = styled.strong`
  color: ${({ theme }) => theme.colors.black};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: ${({ theme }) => theme.spacing[5]};
  gap: ${({ theme }) => theme.spacing[4]};
`;
const SubmitButton1 = styled(SubmitButton)`
  width: 100%;
`;

const Text = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.base};
  padding: ${({ theme }) => theme.spacing[5]};
  color: ${({ theme }) => theme.colors.primary};
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  width: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
`;
const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 8px;
`;

const StyledCheckbox = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: ${({ checked, theme }) => (checked ? theme.colors.primary : '#eee')};
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
`;
export default ResumeManagement;
