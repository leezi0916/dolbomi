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
          </Tab>
        </TitleDiv>
      </HeadSection>


      {/* {activeTab === 'matched' ? (

 
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
      )} */}


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
              <EmptyMessage> 매칭된 환자가 없습니다. </EmptyMessage>
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
              <EmptyMessage> 종료된 매칭 환자가 없습니다. </EmptyMessage>
            )}

            <Paging currentPage={endedCurrentPage} totalPage={endedTotalPage} chagneCurrentPage={chagneCurrentPage} />
          </>
        )}
      </MatchSection>
    </>
  );
};

const HeadSection = styled(Section)`
  height: 200px;
  display: flex;
  justify-content: space-between;
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const CaregiverSearch = styled(SearchBar)``;

const SerachDiv = styled.div`
  display: flex;
  align-items: flex-end;
  width: 30%;
`;
const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: center;

  color: ${({ theme }) => theme.colors.gray[800]};
  padding: ${({ theme }) => theme.spacing[3]};
  display: flex;
  justify-content: flex-start;
`;

const SubTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: center;

  color: ${({ theme }) => theme.colors.gray[800]};
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

const TipP = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const SearchDivWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 50px;
`;

const SearchInput = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.gray[5]};
  border-radius: ${({ theme }) => theme.borderRadius.md} 0 0 ${({ theme }) => theme.borderRadius.md};
  width: 250px;
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
  align-items: center;
  padding: ${({ theme }) => theme.spacing[6]};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  box-shadow: ${({ theme }) => theme.shadows.md};
  gap: ${({ theme }) => theme.spacing[4]};
  width: 100%; /* ProfileCardPair 내에서 각 카드의 너비 (gap을 고려하여 50%보다 약간 작게) */
  box-sizing: border-box; /* 패딩과 보더가 너비에 포함되도록 */
`;

// 프로필 이미지 스타일
const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  /* ProfileCard의 type prop에 따라 배경색이 변경됩니다. */
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  gap: ${({ theme }) => theme.spacing[5]};
`;

const UserName = styled.div`
  display: flex;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const UserAge = styled.div`
  display: flex;
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.gray[600]}; /* 어두운 회색으로 변경 */
  margin-top: ${({ theme }) => theme.spacing[1]};
`;

const ButtonRow = styled.div`
  display: flex;

  gap: ${({ theme }) => theme.spacing[2]};
  margin-top: ${({ theme }) => theme.spacing[2]};
  flex-grow: 1;
`;

const InfoButton = styled.button`
  width: 50%;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.secondary}; /* 주황색 */
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  white-space: nowrap; /* 버튼 텍스트가 줄바꿈되지 않도록 */
`;

const ReportButton = styled.button`
  width: 50%;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.danger}; /* 빨간색 */
  color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  white-space: nowrap;
`;

const EmptyMessage = styled.p`
  width: 100%;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray[3]};
  font-size: ${({ theme }) => theme.fontSizes.base};
  padding: ${({ theme }) => theme.spacing[8]} 0;
`;
export default MatchToPatient;
