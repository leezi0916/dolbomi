import React, { useEffect, useState } from 'react';
import { Section } from '../styles/common/Container';
import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
import profileImage from '../assets/images/pat.png'; // 프로필 이미지 경로
import { useNavigate } from 'react-router-dom';
import { patientService } from '../api/patient';
import useUserStore from '../store/userStore';
import { matchingService } from '../api/matching';
import Paging from '../components/Paging';
import { CiCircleInfo } from 'react-icons/ci';
import { IoSearchOutline } from 'react-icons/io5';
import { media } from '../styles/MediaQueries';

const MatchToPatient = () => {
  const [activeTab, setActiveTab] = useState('matching');
  const { user } = useUserStore();
  const [patientList, setPatientList] = useState();
  const navigate = useNavigate();

  // 진행중 매칭 관련
  const [caregiverList, setCareGiverList] = useState([]);
  const [userPatients, setUserpatients] = useState([]);

  // // 종료된 매칭 관련 페이징 상태
  const [endedPatientList, setEndedPatientList] = useState([]);
  const [endedCurrentPage, setEndedCurrentPage] = useState(1);
  const [endedTotalPage, setEndedTotalPage] = useState(1);
  // const [selectedPatNo, setSelectedPatNo] = useState(null);
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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    fetchAll();
  }, [user]);

  const fetchAll = async () => {
    if (!user) {
      alert('로그인 후 이용해주세요');
      return;
    }
    try {
      const patientList = await matchingService.getMatchingPatient(user.userNo, 'Y');
      console.log(patientList);
      patientList.length === 0 ? setPatientList([]) : setPatientList(patientList);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEndMatching = async (matNo) => {
    try {
      console.log(matNo);
      const confirmDelete = window.confirm('종료된 매칭으로 이동됩니다. 정말로 간병을 종료하시겠습니까?');

      if (!confirmDelete) return;

      await matchingService.getMatchingChangeStatus(matNo, 'N');
      await fetchAll();

      // 상태 변경 후 다시 불러오기
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchEndedMatching = async () => {
      if (!user || activeTab !== 'matched') return;

      try {
        const res = await matchingService.findMatchedPatients(user.userNo, 'N', endedCurrentPage - 1);
        console.log(res);
        setEndedPatientList(res.content);
        setEndedCurrentPage(res.currentPage + 1); // ← 여기가 핵심
        setEndedTotalPage(res.totalPage); // ← 주의: API에선 totalPage로 오네요
      } catch (err) {
        console.error('종료된 매칭 불러오기 실패:', err);
      }
    };

    fetchEndedMatching();
  }, [user, activeTab, endedCurrentPage]);

  const chagneCurrentPage = (value) => {
    setEndedCurrentPage(value);
  };

  const CLOUDFRONT_URL = 'https://d20jnum8mfke0j.cloudfront.net/';
  //이미지 경로 갖고오고 없다면 기본이미지
  const getProfileImageUrl = (path) => {
    if (!path) return profileImage; // 기본 이미지
    const cleanPath = path.replace(/^\//, ''); // 앞에 / 있으면 제거
    return `${CLOUDFRONT_URL}${cleanPath}`;
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

      {activeTab === 'matched' ? (
        <SearchDivWrap>
          <SearchInput placeholder="찾으시는 돌봄대상자를 검색하세요"></SearchInput>
          <SearchBtn>
            <SearchIcon>
              <IoSearchOutline />
            </SearchIcon>
          </SearchBtn>
        </SearchDivWrap>
      ) : (
        <></>
      )}

      {/*진행중 매칭 */}
      <MatchSection>
        {activeTab === 'matching' && (
          <>
            {patientList && patientList.length > 0 ? (
              patientList.map((pat) => (
                <ProfileCardPair key={pat.matNo}>
                  <ProfileCard type="patient">
                    <ProfileImage src={getProfileImageUrl(pat?.profileImage)} alt="프로필" />
                    <ProfileInfo>
                      <UserName>{pat.patName} 님</UserName>
                      <UserAge>
                        나이 {pat.patAge}세({pat.patGender === 'F' ? '여' : '남'})
                      </UserAge>
                    </ProfileInfo>
                    <div style={{ width: '142px' }}></div>
                    <ButtonRow>
                      <InfoButton onClick={() => navigate(`/report/${pat.patNo}`)}>간병일지보기</InfoButton>
                      <ReportButton type="button" onClick={() => handleEndMatching(pat.matNo)}>
                        간병 종료
                      </ReportButton>
                    </ButtonRow>
                  </ProfileCard>
                </ProfileCardPair>
              ))
            ) : (
              <InfoP> 매칭된 환자가 없습니다. </InfoP>
            )}
          </>
        )}

        {activeTab === 'matched' && (
          <>
            {endedPatientList && endedPatientList.length > 0 ? (
              endedPatientList.map((pat) => (
                <ProfileCardPair key={pat.matNo}>
                  <ProfileCard type="patient">
                    <ProfileImage src={getProfileImageUrl(pat?.profileImage)} alt="프로필" />
                    <ProfileInfo>
                      <UserName>{pat.patName} 님</UserName>
                      <UserAge>
                        나이 {pat.patAge}세 ({pat.patGender === 'F' ? '여' : '남'})
                      </UserAge>
                    </ProfileInfo>

                    <UserName>
                      {pat.startDate?.slice(0, 10)} ~ {pat.endDate?.slice(0, 10)}
                    </UserName>
                    <ButtonRow>
                      <InfoButton
                        onClick={() =>
                          navigate(`/report/${pat.patNo}`, {
                            state: { matNo: pat.matNo, status: pat.status },
                          })
                        }
                      >
                        간병일지
                      </InfoButton>
                    </ButtonRow>
                  </ProfileCard>
                </ProfileCardPair>
              ))
            ) : (
              <InfoP> 종료된 매칭 환자가 없습니다. </InfoP>
            )}

            <Paging currentPage={endedCurrentPage} totalPage={endedTotalPage} chagneCurrentPage={chagneCurrentPage} />
          </>
        )}
      </MatchSection>
    </>
  );
};

const HeadSection = styled(Section)`
  height: auto; /* 모바일 우선: 높이 자동 조절 */
  display: flex;
  flex-direction: column; /* 모바일 우선: 세로 정렬 */
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[4]}; /* 모바일 기본 패딩 */
  align-items: flex-start; /* 모바일 기본: 왼쪽 정렬 */

  ${media.md` /* 768px 이상 (태블릿/데스크톱) */
    height: 200px;
    padding: 40px 16px 10px 16px;
    flex-direction: row; /* 가로 정렬 */
    align-items: flex-end;
  `}
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing[4]}; /* 모바일 기본 마진 */

  ${media.md` /* 768px 이상 */
    margin-bottom: 0;
  `}
`;
const CaregiverSearch = styled(SearchBar)``;

const SerachDiv = styled.div`
  display: flex;
  align-items: flex-end;
  width: 30%;
`;
const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xl}; /* 모바일 기본 폰트 크기 */
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: left; /* 모바일 기본: 왼쪽 정렬 */
  color: ${({ theme }) => theme.colors.black1};
  padding: ${({ theme }) => theme.spacing[2]} 0; /* 모바일 기본 패딩 */
  display: flex;
  justify-content: flex-start;

  ${media.sm` /* 576px 이상 */
    font-size: ${({ theme }) => theme.fontSizes.xl};
  `}
  ${media.md` /* 768px 이상 */
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
    padding: ${({ theme }) => theme.spacing[3]};
    text-align: center; /* 데스크톱에서 중앙 정렬 (원래 위치) */
  `}
`;

const SubTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.lg}; /* 모바일 기본 폰트 크기 */
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: left; /* 모바일 기본: 왼쪽 정렬 */
  color: ${({ $active, theme }) => ($active ? theme.colors.black1 : theme.colors.gray[3])};
  padding: ${({ theme }) => theme.spacing[1]} 0; /* 모바일 기본 패딩 */
  display: flex;
  justify-content: flex-start;
  cursor: pointer;

  ${media.sm` /* 576px 이상 */
    font-size: ${({ theme }) => theme.fontSizes.lg};
  `}
  ${media.md` /* 768px 이상 */
    font-size: ${({ theme }) => theme.fontSizes['xl']};
    padding: ${({ theme }) => theme.spacing[3]};
    text-align: center; /* 데스크톱에서 중앙 정렬 (원래 위치) */
  `}
`;
const Tab = styled.div`
  display: flex;
  flex-direction: column; /* 모바일 기본: 세로 정렬 */
  align-items: flex-start; /* 모바일 기본: 왼쪽 정렬 */
  gap: ${({ theme }) => theme.spacing[1]};

  /* '/' 구분자 숨기기 */
  ${SubTitle}:nth-child(even) {
    display: none;
  }

  ${media.md` /* 768px 이상 */
    flex-direction: row; /* 가로 정렬 */
    align-items: center;
    gap: ${({ theme }) => theme.spacing[2]};
    ${SubTitle}:nth-child(even) { /* 데스크톱에서 '/' 다시 보이기 */
      display: flex;
    }
  `}
`;
const MatchSection = styled(Section)`
  height: auto;
  display: flex;
  flex-direction: column; /* 모바일 우선: 카드 쌍들이 세로로 쌓이도록 */
  align-items: center;
  padding: ${({ theme }) => theme.spacing[4]} 0; /* 모바일 기본 패딩 */

  ${media.sm` /* 576px 이상 */
    padding: ${({ theme }) => theme.spacing[6]} 0;
  `}
  ${media.md` /* 768px 이상 */
    padding: ${({ theme }) => theme.spacing[8]} 0;
  `}
`;

const TipP = styled.p`
  display: flex;
  justify-content: flex-start; /* 모바일 기본: 왼쪽 정렬 */
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray[3]};
  /* margin-top: ${({ theme }) => theme.spacing[4]};  이동되었으므로 삭제 */

  ${media.md` /* 768px 이상 */
    justify-content: flex-end; /* 데스크톱에서 오른쪽 정렬 (원래 위치) */
    /* margin-top: 0; */
  `}
`;

const SearchDivWrap = styled.div`
  display: flex;
  justify-content: center; /* 모바일 기본: 중앙 정렬 */
  padding: ${({ theme }) => theme.spacing[4]}; /* 모바일 기본 패딩 */
  width: 100%;
  max-width: 1200px; /* 최대 너비 설정 */
  margin: 0 auto; /* 중앙 정렬 */
  box-sizing: border-box;

  ${media.md` /* 768px 이상 */
    justify-content: flex-end; /* 데스크톱에서 오른쪽 정렬 */
    margin-right: 50px; /* 원래 마진 유지 */
    padding: ${({ theme }) => theme.spacing[2]} 0; /* 패딩 조정 */
  `}
`;

const SearchInput = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.gray[5]};
  border-radius: ${({ theme }) => theme.borderRadius.md} 0 0 ${({ theme }) => theme.borderRadius.md};
  width: 70%; /* 모바일에서 너비 더 넓게 */
  max-width: 250px; /* 최대 너비 설정 */
  padding: ${({ theme }) => theme.spacing[2]};
  outline: none;
  font-size: ${({ theme }) => theme.fontSizes.base}; /* 모바일 폰트 크기 */
  color: #333;

  &::placeholder {
    color: #999;
  }

  ${media.md` /* 768px 이상 */
    width: 250px; /* 데스크톱 너비 */
    font-size: 16px;
  `}
`;

const SearchBtn = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 0 ${({ theme }) => theme.borderRadius.md} ${({ theme }) => theme.borderRadius.md} 0;

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

// 카드를 두 개씩 묶어 가로로 배치하는 컨테이너
const ProfileCardPair = styled.div`
  display: flex;
  justify-content: center; /* 내부 카드들을 중앙으로 정렬 */
  gap: ${({ theme }) => theme.spacing[8]}; /* 카드 사이의 간격 */
  width: 100%; /* 부모 컨테이너의 너비 전체 사용 */
  max-width: 1200px; /* 전체 카드 쌍의 최대 너비 (조절 가능) */
  margin-bottom: ${({ theme }) => theme.spacing[8]}; /* 각 카드 쌍 아래쪽 간격 */
`;

// 개별 카드 스타일
const ProfileCard = styled.div`
  display: flex;
  flex-direction: column; /* 모바일: 프로필 정보가 세로로 쌓이도록 */
  align-items: center; /* 모바일: 내부 요소 중앙 정렬 */
  padding: ${({ theme }) => theme.spacing[4]}; /* 모바일 패딩 */
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  box-shadow: ${({ theme }) => theme.shadows.md};
  gap: ${({ theme }) => theme.spacing[4]};
  width: 100%; /* 모바일: ProfileCardPair 내에서 각 카드의 너비 */
  box-sizing: border-box;
  text-align: center; /* 텍스트 중앙 정렬 */

  ${media.sm` /* 576px 이상 (모바일 조금 더 넓은 화면) */
    flex-direction: row; /* 가로 정렬 */
    text-align: left; /* 텍스트 왼쪽 정렬 */
    gap: ${({ theme }) => theme.spacing[6]};
    padding: ${({ theme }) => theme.spacing[5]};
    
  `}

  ${media.md` /* 768px 이상 (태블릿/데스크톱) */
    
    padding: ${({ theme }) => theme.spacing[6]}; /* 데스크톱 패딩 */
    gap: ${({ theme }) => theme.spacing[4]};
  `}
`;

// 프로필 이미지 스타일
const ProfileImage = styled.img`
  width: 120px; /* 모바일 이미지 크기 */
  height: 120px;
  border-radius: 50%;
  object-fit: cover;

  ${media.sm` /* 576px 이상 */
    width: 150px;
    height: 150px;
  `}
  ${media.md` /* 768px 이상 */
    width: 200px;
    height: 200px;
  `}
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%; /* 모바일에서 너비 꽉 채움 */
  gap: ${({ theme }) => theme.spacing[3]}; /* 모바일 간격 */
  align-items: center; /* 모바일: 중앙 정렬 */

  ${media.sm` /* 576px 이상 */
    width: auto; /* 너비 자동 조절 */
    gap: ${({ theme }) => theme.spacing[4]};
    align-items: flex-start; /* 왼쪽 정렬 */
  `}
  ${media.md` /* 576px 이상 */
    width: 30%; /* 너비 자동 조절 */
  `}
`;
const UserName = styled.div`
  display: flex;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const UserAge = styled.div`
  display: flex;
  font-size: ${({ theme }) => theme.fontSizes.sm}; /* 모바일 폰트 크기 */
  color: ${({ theme }) => theme.colors.gray[600]};
  margin-top: ${({ theme }) => theme.spacing[1]};
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: column; /* 모바일: 버튼 세로 정렬 */
  gap: ${({ theme }) => theme.spacing[2]};
  margin-top: ${({ theme }) => theme.spacing[2]};
  width: 100%; /* 모바일: 버튼 너비 꽉 채움 */

  ${media.sm` /* 576px 이상 */
    flex-direction: row; /* 가로 정렬 */
    width: auto; /* 너비 자동 조절 */
  `}
`;

const InfoButton = styled.button`
  width: 100%; /* 모바일: 버튼 너비 꽉 채움 */
  height: 45px; /* 모바일 버튼 높이 */
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  cursor: pointer;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  white-space: nowrap;

  ${media.sm` /* 576px 이상 */
    width: auto; /* 너비 자동 조절 */
    height: 50px;
    padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  `}
`;

const ReportButton = styled.button`
  width: 100%; /* 모바일: 버튼 너비 꽉 채움 */
  height: 45px; /* 모바일 버튼 높이 */
  background-color: ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  white-space: nowrap;

  ${media.sm` /* 576px 이상 */
    width: auto; /* 너비 자동 조절 */
    height: 50px;
    padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  `}
`;

const CareLogButton = styled(InfoButton)`
  /* InfoButton 스타일을 상속받아 '간병일지' 버튼 스타일링 */
  /* 필요하다면 여기에서 추가 스타일을 정의할 수 있습니다. */
  margin-top: ${({ theme }) => theme.spacing[2]}; /* 나이 아래 버튼 간격 */
  align-self: flex-start; /* 왼쪽 정렬 */
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const InfoP = styled.p`
  margin: ${({ theme }) => theme.spacing[8]} auto; /* 모바일에서 중앙 정렬 및 마진 */
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.gray[600]};
  text-align: center;
  width: 100%; /* 너비 꽉 채움 */
  max-width: 500px; /* 정보 메시지 최대 너비 */

  ${media.md` /* 768px 이상 */
    margin: 50px auto;
  `}
`;

const Date = styled.div`
  width: 30%;
`;
export default MatchToPatient;
