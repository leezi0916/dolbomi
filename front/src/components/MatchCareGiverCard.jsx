import React from 'react';
import pat_profileImage from '../assets/images/pat.png'; // 프로필 이미지 경로
import care_profileImage from '../assets/images/cargiver.png'; // 프로필 이미지 경로
import {

  CargiverWrap,
  CaregiverImg,
  CaregiverDiv,
  CaregiverTextDiv,
  ProfileTextGray,
  ProfileTextStrong,
  CargiverButtonDiv,
  CareLogButton,

} from '../styles/MatchingCard';
import { ProfileCard } from '../styles/MatchingCard';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';




const MatchCareFiverCard = ({ caregiverList }) => {
  // if (!patient) return <p>선택된 환자 정보가 없습니다.</p>;
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
    {caregiverList && caregiverList.length > 0 ? (
      caregiverList.map((care) => (
        <CargiverWrap key={care.caregiverNo}>
          <CaregiverDiv>
            <CaregiverImg
              src={getProfileImageUrl(care.caregiverProfileImage, 'caregiver')}
              alt="간병인"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = care_profileImage;
              }}
            />
            <CaregiverTextDiv>
              <ProfileTextGray>
                <ProfileTextStrong>{care.userName}</ProfileTextStrong> 님
              </ProfileTextGray>
              <ProfileTextGray>
                나이
                <ProfileTextStrong>
                  {care.age} 세 ({care.gender === 'M' ? '남' : care.gender === 'F' ? '여' : '성별 정보 없음'})
                </ProfileTextStrong>
              </ProfileTextGray>
            </CaregiverTextDiv>
          </CaregiverDiv>

          <CargiverButtonDiv>
            <CareLogButton
              onClick={() =>
                navigate(`/caregiverProfile/${Number(care.caregiverNo)}`, {
                  state: { matNo: care.matNo },
                })
              }
            >
              간병인 정보
            </CareLogButton>
          </CargiverButtonDiv>
        </CargiverWrap>
      ))
    ) : (
      <EmptyMessage>매칭된 간병이 없습니다.</EmptyMessage>
    )}
  </div>
  );
};

export default MatchCareFiverCard;