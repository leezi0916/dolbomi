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
import { IoSearchOutline } from 'react-icons/io5';

const MatchToCaregiver = () => {
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
  const [selectedCaregiver, setSelectedCaregiver] = useState(null); // 간병인 정보

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
    const getList = async () => {
      try {
        const careGiverList = await matchingService.getMatchginCargiver(patNo, 'Y');
        console.log('확인 :', careGiverList);
        careGiverList.length === 0 ? setCareGiverList([]) : setCareGiverList(careGiverList);
      } catch (err) {
        console.error(err);
      }
    };
    getList();
  };

  // 종료된 매칭정보
  const getEndedMatchingList = async (patNo, page = 1) => {
    try {
      const res = await matchingService.getEndedMatchingCaregivers(patNo, page - 1, 5, 'N');
      console.log(res);
      setEndedCaregiverList(res.content);

      setEndedTotalPage(res.totalPage || res.totalPages || 1);
      setEndedCurrentPage((res.currentPage || res.number || 0) + 1);
      setSelectedPatNo(patNo);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // if (tab === 'matched' && userPatients.length > 0) {
    //   // 기본 첫 환자 종료된 매칭 호출
    //   getEndedMatchingList(userPatients[0].patNo, 1);
    // }
  };

  // 종료된 매칭 페이지 변경 핸들러
  const handleEndedPageChange = (page) => {
    setEndedCurrentPage(page);
    if (selectedPatNo) {
      getEndedMatchingList(selectedPatNo, page);
    }
  };

  return (
    <>
      <HeadSection>
        <TitleDiv>
          <Title>매칭된 간병보기</Title>
          <Tab>
            <SubTitle onClick={() => handleTabChange('matching')} $active={activeTab === 'matching'}>
              진행중
            </SubTitle>
            <SubTitle>/</SubTitle>
            <SubTitle onClick={() => handleTabChange('matched')} $active={activeTab === 'matched'}>
              종료된 매칭
            </SubTitle>
            <TipP>
              <CiCircleInfo color="#EF7A46" size={'20px'}></CiCircleInfo> 환자에 마우스를 올려 종료된 매칭 목록을
              확인하세요.
            </TipP>
          </Tab>
        </TitleDiv>
      </HeadSection>

      {/*진행중 매칭 */}
      <MatchSection>
        {activeTab === 'matching' && (
          <>
            <ProfileCardPair>
              <RightLineDiv>
                {userPatients && userPatients.length > 0 ? (
                  userPatients?.map((pat) => (
                    <ProfileCard key={pat.patNo} type="patient" onMouseEnter={() => getCareGiver(pat.patNo)}>
                      <ProfileImage src={pat_profileImage} alt="환자" />
                      <ProfileInfo>
                        <UserName>{pat.patName} 님</UserName>
                        <UserAge>
                          나이 {pat.patAge}세({pat.patGender === 'M' ? '남' : '여'})
                        </UserAge>
                        <InfoButton onClick={() => navigate(`/report/${pat.patNo}`)}> 간병일지 보기</InfoButton>
                      </ProfileInfo>
                    </ProfileCard>
                  ))
                ) : (
                  <InfoP>등록된 환자가 없습니다. </InfoP>
                )}
              </RightLineDiv>
              <div>
                {caregiverList && caregiverList.length > 0 ? (
                  caregiverList?.map((care) => (
                    <>
                      <CargiverWrap key={care.caregiverNo}>
                        <CaregiverImg src={care_profileImage} alt="" />
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
                    </>
                  ))
                ) : (
                  <InfoP> 매칭된 간병이 없습니다. </InfoP>
                )}
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
                  <ProfileImage src={pat_profileImage} alt="환자" />
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
                <SearchInput placeholder="찾으시는 간병인이름을 검색하세요"></SearchInput>
                <SearchBtn>
                  <SearchIcon>
                    <IoSearchOutline />
                  </SearchIcon>
                </SearchBtn>
              </SearchDivWrap>

              {selectedPatNo ? (
                <>
                  {endedCaregiverList.map((care) => (
                    <CargiverWrap key={care.matNo}>
                      <CaregiverImg
                        src={care.profileImage ? care.profileImage : care_profileImage}
                        alt="간병인 프로필"
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
          <ReviewModal matNo={selectedCaregiver?.matNo} onClose={() => setShowReviewModal(false)} />
        </>
      )}
    </>
  );
};

const HeadSection = styled(Section)`
  height: 200px;
  display: flex;
  justify-content: space-between;
  padding: 40px 16px 10px 16px;
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TipP = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const SearchDivWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[5]};
`;

const SearchInput = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.gray[5]};
  border-radius: ${({ theme }) => theme.borderRadius.md} 0 0 ${({ theme }) => theme.borderRadius.md};
  width: 80%;
  padding: ${({ theme }) => theme.spacing[2]};
  outline: none; /* 포커스 시 아웃라인 제거 */
  font-size: 16px; /* 폰트 크기 */
  color: #333; /* 텍스트 색상 */

  &::placeholder {
    color: #999; /* 플레이스홀더 텍스트 색상 */
  }
`;

const SearchBtn = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 0 ${({ theme }) => theme.borderRadius.md} ${({ theme }) => theme.borderRadius.md} 0;
  width: 20%;
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

const SearchIcon = styled.span`
  font-size: 18px; /* 아이콘 크기 */
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
const Tab = styled.div`
  display: flex;
  align-items: center;
`;

const MatchSection = styled(Section)`
  height: auto;
  display: flex;
  flex-direction: column;

  align-items: center; /* 카드 쌍 전체를 가로 중앙으로 정렬 */
  padding: ${({ theme }) => theme.spacing[8]} 0; /* 상하 패딩 추가 */
`;

const InfoP = styled.p`
  margin: 50px;
`;

const Div = styled.div`
  position: relative;
`;

//=== 종료된 매칭
const EndProfileCard = styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.gray[5]};
  padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[16]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  display: flex;
  gap: ${({ theme }) => theme.spacing[40]};
  align-items: center;
`;

const RowProfileCard = styled.div`
  display: flex;
  justify-content: left;
  gap: ${({ theme }) => theme.spacing[8]};
`;

// 환자정보랑 간병인 정보 분리
const ProfileCardPair = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  border: 1px solid ${({ theme }) => theme.colors.gray[5]};
  box-shadow: ${({ theme }) => theme.shadows.md};
  width: 100%; /* 부모 컨테이너의 너비 전체 사용 */
  max-width: 1200px; /* 전체 카드 쌍의 최대 너비 (조절 가능) */
  margin-bottom: ${({ theme }) => theme.spacing[8]}; /* 각 카드 쌍 아래쪽 간격 */
`;

/*====== 환자 스타일 =====*/
const ProfileCard = styled.div`
  display: flex;

  align-items: center;
  padding: ${({ theme }) => theme.spacing[6]};
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[5]};

  gap: ${({ theme }) => theme.spacing[8]};
  width: 100%; /* ProfileCardPair 내에서 각 카드의 너비 (gap을 고려하여 50%보다 약간 작게) */
  box-sizing: border-box; /* 패딩과 보더가 너비에 포함되도록 */

  &:hover {
    background-color: #fcfaf0;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  }
`;

// 프로필 이미지 스타일
const ProfileImage = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  /* ProfileCard의 type prop에 따라 배경색이 변경됩니다. */
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1; /* 남은 공간을 채우도록 */
  gap: ${({ theme }) => theme.spacing[2]};
`;

const UserName = styled.div`
  display: flex;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-top: ${({ theme }) => theme.spacing[3]};
`;

const UserAge = styled.div`
  display: flex;
  font-size: ${({ theme }) => theme.fontSizes.base};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.gray[3]}; /* 어두운 회색으로 변경 */
`;

const InfoButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary}; /* 주황색 */
  color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[8]}`};
  margin: ${({ theme }) => theme.spacing[3]} 0;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  white-space: nowrap; /* 버튼 텍스트가 줄바꿈되지 않도록 */
`;

const RightLineDiv = styled.div`
  min-height: 800px;
  border-right: 1px solid ${({ theme }) => theme.colors.gray[5]};
`;

/*====== 간병인 스타일 =====*/
const CargiverWrap = styled.div`
  display: flex;
  justify-content: space-around;
  gap: ${({ theme }) => theme.spacing[12]};
  height: fit-content;
  align-items: center;
  margin: ${({ theme }) => theme.spacing[4]} 0;
  padding: ${({ theme }) => theme.spacing[2]};
`;

const CaregiverImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

const CaregiverTextDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  align-items: start;
`;

const ProfileTextGray = styled.p`
  color: ${({ theme }) => theme.colors.gray[3]};
`;

const ProfileTextStrong = styled.strong`
  color: ${({ theme }) => theme.colors.black1};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

const CargiverButtonDiv = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
`;
const ReportButton = styled.button`
  background-color: ${({ theme }) => theme.colors.danger}; /* 빨간색 */
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  white-space: nowrap;
`;

const CareLogButton = styled.button`
  width: 200px;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  white-space: nowrap;
`;

const PageWrapper = styled.div`
  position: absolute;
  width: inherit;
  bottom: 0;
  width: 100%;
  padding: ${({ theme }) => theme.spacing[5]};
`;
export default MatchToCaregiver;
