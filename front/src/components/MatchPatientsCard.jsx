import React from 'react';
import pat_profileImage from '../assets/images/pat.png'; // 프로필 이미지 경로
import care_profileImage from '../assets/images/cargiver.png'; // 프로필 이미지 경로
import {
  ProfileImage,
  ProfileInfo,
  UserAge,
  UserName,
  InfoButton,
  RightLineDiv,
  CargiverWrap,
  CaregiverImg,
  CaregiverDiv,
  CaregiverTextDiv,
  ProfileTextGray,
  ProfileTextStrong,
  CargiverButtonDiv,
  ReportButton,
  CareLogButton,
  PageWrapper,
} from '../styles/MatchingCard';
import { ProfileCard } from '../styles/MatchingCard';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Btn } from '../styles/common/Board';
import { BtnWrap } from '../styles/PatientRegistration';
import { Button } from '../styles/Auth.styles';



const MatchPatientsCard
 = ({ patient }) => {
  if (!patient) return <p>선택된 환자 정보가 없습니다.</p>;
  
  const CLOUDFRONT_URL = 'https://d20jnum8mfke0j.cloudfront.net/';
  //이미지 경로 갖고오고 없다면 기본이미지
  const getProfileImageUrl = (path, type = 'caregiver') => {
    if (!path) {
      return type === 'patient' ? pat_profileImage : care_profileImage;
    }
    const cleanPath = path.replace(/^\//, ''); // 슬래시 제거
    return `${CLOUDFRONT_URL}${cleanPath}`;
  };


  const navigate = useNavigate();

  return(
  <div>
    <ProfileCard type="patient">
      <ProfileImage
        src={getProfileImageUrl(patient.profileImage, 'patient')}
        alt="환자"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = pat_profileImage;
        }}
      />
      <ProfileInfo>
        <UserName>{patient.patName} 님</UserName>
        <UserAge>
          나이 {patient.patAge}세({patient?.patGender === 'M' ? '남' : '여'})
        </UserAge>

        <InfoButton onClick={() => navigate(`/report/${patient.patNo}`)}>간병일지 보기</InfoButton>
      </ProfileInfo>
    </ProfileCard>
  </div>
  );
};

export default MatchPatientsCard;