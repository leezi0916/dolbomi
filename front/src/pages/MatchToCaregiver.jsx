import React, { useState, useEffect } from 'react';
import { Section } from '../styles/common/Container';
import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
import pat_profileImage from '../assets/images/pat.png'; // 프로필 이미지 경로
import care_profileImage from '../assets/images/cargiver.png'; // 프로필 이미지 경로
import useUserStore from '../store/userStore';
import { matchingService } from '../api/matching';
import { patientService } from '../api/patient';
import { useNavigate } from 'react-router-dom';
import Paging from '../components/Paging';
import ReviewModal from '../components/ReviewModal';
import { CiCircleInfo } from 'react-icons/ci';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/DatePiker.css';
import { searchForm } from '../hooks/searchForm';
import { media } from '../styles/MediaQueries';
import {
  ProfileCardPair,
  ProfileImage,
  ProfileInfo,
  UserAge,
  UserName,
  InfoButton,
  RightLineDiv,
  CaregiverImg,
  CaregiverDiv,
  CaregiverTextDiv,
  ProfileTextGray,
  ProfileTextStrong,
  CargiverButtonDiv,
  ReportButton,
  CareLogButton,
  PageWrapper,
  BtnSection,
} from '../styles/MatchingCard';
import PatientCardGroup from '../components/PatientCardGroup';
import MatchCareGiverCard from '../components/MatchCareGiverCard'
const MatchToCaregiver = () => {
  const CustomDateButton = React.forwardRef(({ value, onClick }, ref) => (
    <button className="custom-datepicker-button" onClick={onClick} ref={ref}>
      <span>{value || '날짜 선택'}</span>
    </button>
  ));

  const { user } = useUserStore();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('matching');

  // 진행중 매칭 관련
  const [caregiverList, setCareGiverList] = useState([]);
  const [userPatients, setUserpatients] = useState([]);

  // 종료된 매칭 관련 페이징 상태
  const [endedCaregiverList, setEndedCaregiverList] = useState([]);
  const [endedCurrentPage, setEndedCurrentPage] = useState(1);
  const [endedTotalPage, setEndedTotalPage] = useState(1);
  const [selectedPatNo, setSelectedPatNo] = useState(null);

  //리뷰 관련 모달
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedCaregiver, setSelectedCaregiver] = useState(null);



  //카드색상변경

  // 날짜검색
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleStartDateChange = (date) => {
    if (!date) return;
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0); // 오전 00:00:00
    setStartDate(startOfDay);
  };

  const handleEndDateChange = (date) => {
    if (!date) return;
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59); // 오후 11:59:59
    setEndDate(endOfDay);
  };

  // 날짜 검색 함수
  const { getSearchDateList } = searchForm();

  const handleSearchClick = async (page = 1) => {
    if (!selectedPatNo) {
      alert('돌봄대상자를 선택해주세요');
    }
    try {
      const res = await getSearchDateList(selectedPatNo, page, 5, startDate, endDate);

      if (res) {
        setEndedCaregiverList(res.content || []);
        setEndedTotalPage(res.totalPage || res.totalPages || 1);
        setEndedCurrentPage((res.currentPage || res.number || 0) + 1);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      if (!user) {
        alert('로그인 후 이용해주세요');
        return;
      }
      try {
        const patientsList = await patientService.getPatients(user.userNo);
        setUserpatients(patientsList);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAll();
  }, [user]);

  // 현재 매칭정보 : 특정 환자의 간병인 목록 가져오기
  const getCareGiver = (patNo) => {
    setCareGiverList([]);
    const getList = async () => {
      try {
        const careGiverList = await matchingService.getMatchginCargiver(patNo, 'Y');
        careGiverList.length === 0 ? setCareGiverList([]) : setCareGiverList(careGiverList);
      } catch (err) {
        console.error(err);
      }
    };
    getList();
  };

  // 반응형 브레이크 포인트 잡기
  const [isOpen, setIsOpen] = useState(false);
  const BREAKPOINT = 576;
 
  useEffect(() => {
    if (window.innerWidth >= BREAKPOINT) {
      setIsOpen(false); // 페이지 진입 시 큰 화면이면 상세 보기 닫기
    }
  }, []);

  const [isMobile, setIsMobile] = useState(window.innerWidth < BREAKPOINT);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < BREAKPOINT;
      setIsMobile(mobile);

      if (!mobile) {
        setIsOpen(false); // 데스크탑 전환 시 상세 보기 닫기
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 종료된 매칭정보
  const getEndedMatchingList = async (patNo, page = 1) => {
    try {
      const res = await matchingService.getEndedMatchingCaregivers(patNo, page - 1, 5, 'N');
      console.log(res);

      setEndedCaregiverList(res.content);
      setEndedTotalPage(res.totalPage || res.totalPages || 1);
      setEndedCurrentPage((res.currentPage || res.number || 0) + 1);
      setSelectedPatNo(patNo);
      setStartDate('');
      setEndDate('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleClick = (patNo) => {
    setSelectedPatNo(patNo);
    setIsOpen(true);
    getCareGiver(patNo);
  };
  const handleClose = (patNo) => {
    setSelectedPatNo(patNo);
    setIsOpen(false);
  };

  // 종료된 매칭 페이지 변경 핸들러
  const handleEndedPageChange = (page) => {
    setEndedCurrentPage(page);

    if (selectedPatNo) {
      if (startDate && endDate) {
        handleSearchClick(page);
        return;
      }
      getEndedMatchingList(selectedPatNo, page);
    }
  };

  const CLOUDFRONT_URL = 'https://d20jnum8mfke0j.cloudfront.net/';
  //이미지 경로 갖고오고 없다면 기본이미지

  const getProfileImageUrl = (path, type = 'caregiver') => {
    if (!path) {
      return type === 'patient' ? pat_profileImage : care_profileImage;
    }
    const cleanPath = path.replace(/^\//, ''); // 슬래시 제거
    return `${CLOUDFRONT_URL}${cleanPath}`;
  };
  console.log(caregiverList);
  return (
    <>
      <HeadSection>
        <Title>매칭된 간병보기</Title>
        <TitleDiv>
          <Tab>
            <SubTitle onClick={() => handleTabChange('matching')} $active={activeTab === 'matching'}>
              진행중
            </SubTitle>
            <SubTitle>/</SubTitle>
            <SubTitle onClick={() => handleTabChange('matched')} $active={activeTab === 'matched'}>
              종료된 매칭
            </SubTitle>
          </Tab>

          <TipDiv>
            <CiCircleInfo color="#EF7A46" size="20px" style={{ margin: 'auto', width: 'fit-content' }} />
            <p> 돌봄대상자를 클릭하여 종료된 매칭 간병인을 확인하세요.</p>
          </TipDiv>
        </TitleDiv>
      </HeadSection>

      {/*진행중 매칭 */}
      <MatchSection>
        {activeTab === 'matching' && (
          <>
            <ProfileCardPair>
              <RightLineDiv>
                {userPatients && userPatients.length > 0 ? (
                  isOpen && isMobile ? (
                    // 상세 보기일 때만 보여줄 컴포넌트
                    <PatientCardGroup
                      patient={userPatients.find((p) => p.patNo === selectedPatNo)}
                      caregiverList={caregiverList}
                      onClose={() => handleClose}
                    />
                  ) : (
                    // 환자 전체 리스트 (상세보기 아닐 때만)
                    userPatients.map((pat) => (
                      <div key={pat.patNo}>
                        <ProfileCard type="patient" onClick={() => getCareGiver(pat.patNo)}>
                          <ProfileImage
                            src={getProfileImageUrl(pat.profileImage, 'patient')}
                            alt="환자"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = pat_profileImage;
                            }}
                          />
                          <ProfileInfo>
                            <UserName>{pat.patName} 님</UserName>
                            <UserAge>
                              나이 {pat.patAge}세({pat.patGender === 'M' ? '남' : '여'})
                            </UserAge>
                            <BtnSection>
                              <InfoButton onClick={() => navigate(`/report/${pat.patNo}`)}>간병일지 보기</InfoButton>
                              <TestBtn onClick={() => handleClick(pat.patNo)}>간병인 보기</TestBtn>
                            </BtnSection>
                          </ProfileInfo>
                        </ProfileCard>
                      </div>
                    ))
                  )
                ) : (
                  <EmptyMessage>등록된 환자가 없습니다.</EmptyMessage>
                )}
              </RightLineDiv>

              <div>
                {!isMobile ? (
                  caregiverList && caregiverList.length > 0 ? (
                    caregiverList.map((care) => (

                      // <MatchCareGiverCard caregiverList={care}></MatchCareGiverCard>
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
                                {care.age} 세 (
                                {care.gender === 'M' ? '남' : care.gender === 'F' ? '여' : '성별 정보 없음'})
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
                  )
                ) : null}
              </div>
            </ProfileCardPair>
          </>
        )}

        {activeTab === 'matched' && (
          <ProfileCardPair>
            <RightLineDiv>
              {/*환자 호버시 patNo을 저장 페이징 처리하느라.. */}
              {userPatients?.map((pat) => (
                <ProfileCard
                  key={pat.patNo}
                  onMouseEnter={() => getEndedMatchingList(pat.patNo, 1)}
                  style={{ cursor: 'pointer' }}
                >
                  <ProfileImage src={getProfileImageUrl(pat.profileImage, 'patient')} />
                  <ProfileInfo>
                    <UserName>{pat.patName} 님</UserName>
                    <UserAge>
                      나이 {pat.patAge}세({pat.patGender === 'M' ? '남' : '여'})
                    </UserAge>
                    <InfoButton onClick={() => navigate(`/report/${pat.patNo}`)}> 간병일지 보기</InfoButton>
                  </ProfileInfo>
                </ProfileCard>
              ))}
            </RightLineDiv>

            <Div>
              <SearchDivWrap>
                <SearchDateWrap>
                  <DatePicker
                    dateFormat={'yyyy/MM/dd'}
                    selected={startDate}
                    onChange={handleStartDateChange}
                    customInput={<CustomDateButton />}
                  ></DatePicker>
                  <p> ~ </p>
                  <DatePicker
                    dateFormat={'yyyy/MM/dd'}
                    selected={endDate}
                    onChange={handleEndDateChange}
                    customInput={<CustomDateButton />}
                  ></DatePicker>

                  <SearchBtn onClick={handleSearchClick}>검색</SearchBtn>
                </SearchDateWrap>
              </SearchDivWrap>

              {selectedPatNo ? (
                <>
                  {endedCaregiverList?.map((care) => (
                    <CargiverWrap key={care.matNo}>
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
                      <CargiverButtonDiv>
                        <CareLogButton onClick={() => navigate(`/caregiverProfile/${Number(care.caregiverNo)}`)}>
                          간병인 정보
                        </CareLogButton>
                        <ReportButton
                          style={{ visibility: care.reviewNo ? 'hidden' : 'visible' }}
                          onClick={() => {
                            console.log('selected care:', care);
                            setSelectedCaregiver(care); // 선택한 매칭 정보 저장
                            setShowReviewModal(true); // 모달 표시
                          }}
                        >
                          리뷰 작성
                        </ReportButton>
                      </CargiverButtonDiv>
                    </CargiverWrap>
                  ))}
                  {/* 페이징 컴포넌트 */}
                  <PageWrapper>
                    <Paging
                      currentPage={endedCurrentPage}
                      totalPage={endedTotalPage}
                      chagneCurrentPage={handleEndedPageChange}
                    />
                  </PageWrapper>
                </>
              ) : (
                <p></p>
              )}
            </Div>
          </ProfileCardPair>
        )}
      </MatchSection>
      {showReviewModal && (
        <>
          {console.log('ReviewModal에 전달된 matNo:', selectedCaregiver?.matNo)}
          <ReviewModal
            matNo={selectedCaregiver?.matNo}
            onClose={() => setShowReviewModal(false)}
            onSubmitSuccess={() => getEndedMatchingList(selectedPatNo, endedCurrentPage)}
          />
        </>
      )}
    </>
  );
};

const HeadSection = styled(Section)`
  display: flex;
  height: auto;
  justify-content: space-between;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[2]}
    ${({ theme }) => theme.spacing[4]};
  align-items: flex-start;

  ${media.md` /* 768px 이상 (태블릿/데스크톱) */
    padding: 40px 16px 10px 16px;
  `}
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing[4]};

  ${media.md` /* 768px 이상 (태블릿/데스크톱) */
    flex-direction: row;
  `}
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: center;

  color: ${({ theme }) => theme.colors.black1};
  padding: ${({ theme }) => theme.spacing[3]};
  display: flex;
  justify-content: flex-start;
`;

export const TipDiv = styled.div`
  display: flex;
  gap: 10px;
  padding: ${({ theme }) => theme.spacing[3]};

  p {
    width: 95%;
    text-align: left;
  }

  ${media.md`  // 예: 768px 이하일 때
    align-items: flex-start; // 왼쪽 정렬로 자연스럽게
  `}
`;

const Tab = styled.div`
  display: flex;
`;

const SubTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: center;

  color: ${({ theme }) => theme.colors.gray[5]};
  padding: ${({ theme }) => theme.spacing[3]};
  display: flex;
  justify-content: flex-start;
  color: ${({ $active, theme }) => ($active ? theme.colors.black1 : theme.colors.gray[3])};
  cursor: pointer;
`;

const SearchDivWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[5]};
`;

const SearchDateWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[5]};
`;

const SearchBtn = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md} ${({ theme }) => theme.borderRadius.md};
  width: 150px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;

  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease; /* 호버 효과 */

  &:hover {
    background-color: #e07243; /* 호버 시 약간 어두운 오렌지 */
  }
`;

const MatchSection = styled(Section)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[2]};
  border: 1px solid ${({ theme }) => theme.colors.gray[5]};
`;

const EmptyMessage = styled.p`
  width: 100%;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray[3]};
  font-size: ${({ theme }) => theme.fontSizes.base};
  padding: ${({ theme }) => theme.spacing[8]} 0;
`;

const Div = styled.div`
  position: relative;
`;

const TestBtn = styled(InfoButton)`
  margin: auto 5px;
  cursor: pointer;

  ${media.md`
        display: none;
    `}
`;

const ProfileCard = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'none' : 'flex')};

  align-items: center;
  padding: ${({ theme }) => theme.spacing[6]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[5]};

  gap: ${({ theme }) => theme.spacing[8]};
  width: 100%;
  box-sizing: border-box;

  &:hover {
    background-color: ${({ $isSelected }) => ($isSelected ? '#fbe2d4' : '#f5f5f5')};
  }
`;

/*====== 간병인 스타일 =====*/
const CargiverWrap = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'none' : 'flex')};
  justify-content: center;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[5]};
  height: fit-content;
  align-items: center;
  margin: ${({ theme }) => theme.spacing[4]} 0;
  padding: ${({ theme }) => theme.spacing[2]};
  justify-content: space-around;

  ${media.md`  // 예: 768px 이하일 때
   
 `}

  ${media.lg`  // 예: 768px 이하일 때
    justify-content: space-around;
    flex-direction : row;
    gap: ${({ theme }) => theme.spacing[12]};
   
 `}
`;
export default MatchToCaregiver;
