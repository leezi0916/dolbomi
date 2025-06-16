import React, { useEffect, useState } from 'react';
import { Container, Section } from '../styles/common/Container';
import styled from 'styled-components';

import { toast } from 'react-toastify';
import profileImage from '../assets/images/pat.png'; // 프로필 이미지 경로

import { media } from '../styles/MediaQueries';
import { hireService } from '../api/hires';
import SearchBar from '../components/SearchBar';
import { IoCheckmarkOutline } from 'react-icons/io5';
import { ClipLoader } from 'react-spinners';

const HireList = () => {
  const [hireLists, setHireLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [gender, setGender] = useState('');
  const [account, setAccount] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [careStatus, setCareStatus] = useState(false);
  useEffect(() => {
    const loadHireLists = async () => {
      try {
        setLoading(true);
        const params = {
          location,
          startDate,
          endDate,
          gender,
          account,
          keyword: searchKeyword,
          care_status: careStatus ? true : undefined, // 숙식 제공 여부 추가, false일 땐 파라미터에서 제외
        };
        const hireList = await hireService.getHireLists(params); // getHireLists 함수가 파라미터를 받을 수 있도록 수정해야 합니다.
        setHireLists(hireList);
      } catch (error) {
        console.log(error);
        const errorMessage = '돌봄 대상자 구인리스트를 갖고오는데 실패 했습니다.';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    // 검색 파라미터가 변경될 때마다 데이터 다시 로드
    // 의존성 배열에 모든 검색 관련 상태를 추가하여 변경 시마다 호출
    loadHireLists();
  }, [location, startDate, endDate, gender, account, searchKeyword, careStatus]); // 의존성 배열 추가  }, []);

  const handleSearchSubmit = (keyword) => {
    setSearchKeyword(keyword);
    // 키워드 변경 시 useEffect가 호출되어 데이터 다시 로드
  };

  const handleCheckChange = (e) => {
    setCareStatus(e.target.checked);
  };

  return (
    <>
      <SearchSection>
        <Title>돌봄대상자 모집</Title>
        <SearchContainer>
          <SearchDivder>
            <Section1>
              <SearchDivder1>
                <SelectBox value={location} onChange={(e) => setLocation(e.target.value)}>
                  <option value="">지역</option>
                  <option value="seoul">서울</option>
                  <option value="busan">부산</option>
                  <option value="jeju">제주</option>
                  {/* 더 많은 지역 옵션 */}
                </SelectBox>
              </SearchDivder1>

              <SearchDivder1>
                <ACCOUNT
                  type="text"
                  placeholder="시급 ~ 이상"
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                />
              </SearchDivder1>
            </Section1>
            <Section2>
              <SearchDivder1>
                <DateInput type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <DateSeparator>-</DateSeparator>
                <DateInput type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </SearchDivder1>
              <SearchDivder1>
                <SearchBar onSearch={handleSearchSubmit} />
              </SearchDivder1>
            </Section2>
            <Section3>
              <SearchDivder1>
                <RadioGroup>
                  <RadioWrapper>
                    {/* checked prop 전달 */}
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="male"
                      checked={gender === 'male'}
                      onChange={() => setGender('male')}
                    />
                    <label htmlFor="male">남성</label>
                  </RadioWrapper>
                  <RadioWrapper>
                    {/* checked prop 전달 */}
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                      checked={gender === 'female'}
                      onChange={() => setGender('female')}
                    />
                    <label htmlFor="female">여성</label>
                  </RadioWrapper>
                </RadioGroup>
              </SearchDivder1>
              <SearchDivder1>
                <AccommodationCheckboxLabel>
                  <HiddenCheckbox type="checkbox" checked={careStatus} onChange={handleCheckChange} />
                  <StyledCheckbox checked={careStatus}>
                    {handleCheckChange && <IoCheckmarkOutline size="20px" color="white" />}
                  </StyledCheckbox>
                  숙식 제공
                </AccommodationCheckboxLabel>
              </SearchDivder1>
            </Section3>
          </SearchDivder>
        </SearchContainer>
      </SearchSection>

      {/* 여기부턴 돌봄 대상자 리스트 */}

      {loading ? (
        <LoaderWrapper>
          <ClipLoader size={50} color={({ theme }) => theme.colors.primary} />
        </LoaderWrapper>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <HireListSection>
          {hireLists.map((hire) => (
            <HireListCard key={hire.id}>
              <CardHeader>
                <ProfileImage src={hire.profile_image || profileImage} alt="프로필" />
                <HeaderContent>
                  <Divder>
                    <UserInfo>
                      <UserName>{hire.pat_name}</UserName>
                      <UserAge>
                        나이 {hire.pat_age}({hire.pat_gender})
                      </UserAge>
                    </UserInfo>
                    <CareContent>{hire.title}</CareContent>
                    <div></div>
                  </Divder>
                  <DateInfo>
                    {hire.startdate} ~ {hire.enddate}
                  </DateInfo>
                </HeaderContent>
              </CardHeader>
              <CardFooter>
                <LocationWage>
                  <LocationText>지역 {hire.pat_address}</LocationText>
                  <AccuontText>
                    시급 <BoldAccount>{hire.account}원</BoldAccount>
                  </AccuontText>
                </LocationWage>
                {hire.care_status && <AccommodationInfo>숙식 제공 가능</AccommodationInfo>}
              </CardFooter>
            </HireListCard>
          ))}
        </HireListSection>
      )}
    </>
  );
};

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[5]};
  color: ${({ theme }) => theme.colors.gray[800]};
  padding: ${({ theme }) => theme.spacing[3]};
  display: flex;
  justify-content: flex-start;
`;

const SearchContainer = styled(Container)`
  height: 300px;
  background-color: ${({ theme }) => theme.colors.gray[5]};
  border-radius: 4px;
`;
const SearchDivder1 = styled.div`
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[6]};
`;

const SearchDivder = styled.div`
  display: flex;
  height: 100%;
`;

const SearchSection = styled(Section)``;

const Section1 = styled(Section)`
  width: 25%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[5]};
  justify-content: center;
  text-align: center;
`;
const Section2 = styled(Section)`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[5]};
`;
const Section3 = styled(Section)`
  width: 25%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[5]};
  justify-content: center;
  text-align: center;
  align-items: center;
`;

const SelectBox = styled.select`
  width: 80%;
  height: 50px;
  padding: 0 ${({ theme }) => theme.spacing[5]};
  border: none;
  border-radius: ${({ theme }) => theme.spacing[1]};
  font-size: ${({ theme }) => theme.spacing[4]};
`;

const DateInput = styled.input`
  height: 50px;

  border-radius: ${({ theme }) => theme.spacing[1]};
  padding: 0 ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.spacing[4]};
  background-color: white;
`;

const DateSeparator = styled.span`
  margin: 0 5px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.gray[1]};
`;
const RadioGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};

  // 'checked' prop을 받아서 스타일을 동적으로 적용합니다.
  input[type='radio'] {
    appearance: none;
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    outline: none;
    cursor: pointer;
    position: relative;
    transition: all 0.2s ease-in-out;
    background-color: white;
    // RadioWrapper에서 전달받은 checked prop 사용
    border: 1px solid ${({ theme, checked }) => (checked ? theme.colors.primary : theme.colors.gray[4])};
  }

  input[type='radio']::before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.2s ease-in-out;
  }

  input[type='radio']:checked::before {
    transform: translate(-50%, -50%) scale(1);
  }

  label {
    font-size: ${({ theme }) => theme.fontSizes.base};
    color: ${({ theme }) => theme.colors.gray[1]};
    cursor: pointer;
  }
`;

const ACCOUNT = styled.input`
  width: 80%;
  height: 50px;
  padding: 0 ${({ theme }) => theme.spacing[5]};
  border: none;
  border-radius: ${({ theme }) => theme.spacing[1]};
  font-size: ${({ theme }) => theme.spacing[4]};
`;

const AccommodationCheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  white-space: nowrap; /* 텍스트가 줄바꿈되지 않도록 */
  color: ${({ theme }) => theme.colors.gray[800]}; /* 텍스트 색상 */
  font-size: ${({ theme }) => theme.fontSizes.base};
  gap: ${({ theme }) => theme.spacing[6]};
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div`
  width: 18px;
  height: 18px;
  border: 1px solid ${({ theme, checked }) => (checked ? theme.colors.primary : theme.colors.gray[4])}; /* 회색 400으로 통일 */
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, checked }) => (checked ? theme.colors.primary : 'white')};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`;
/*돌봄 대상자 리스트 관련 */
const HireListSection = styled(Section)`
  height: auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
`;

const HireListCard = styled.div`
  width: 100%;
  margin: 0 auto; /* 중앙 정렬 */
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  overflow: hidden; /* 내부 요소가 넘치지 않도록 */
`;

// --- 상단 영역 스타일 ---
const CardHeader = styled.div`
  display: flex;
  flex-direction: column; /* 작은 화면에서 세로로 쌓이도록 */
  padding: ${({ theme }) => theme.spacing[4]}; /* 작은 화면용 패딩 */
  align-items: center; /* 세로 중앙 정렬 */
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  gap: ${({ theme }) => theme.spacing[3]}; /* 작은 화면용 간격 */
  font-size: ${({ theme }) => theme.fontSizes.xs};

  ${media.sm`
    flex-direction: row; /* sm 이상에서는 가로로 나열 */
    padding: ${({ theme }) => theme.spacing[6]}; /* 큰 화면용 패딩 */
    gap: ${({ theme }) => theme.spacing[6]}; /* 큰 화면용 간격 */
    font-size: ${({ theme }) => theme.fontSizes.base};
  `}
`;

const ProfileImage = styled.img`
  width: 60px; /* 작은 화면 이미지 크기 */
  height: 60px;
  border-radius: 50%;
  object-fit: cover;

  ${media.sm`
    width: 80px; /* sm 이상 이미지 크기 */
    height: 80px;
  `}
`;

const HeaderContent = styled.div`
  flex-grow: 1; /* 남은 공간을 차지하도록 */
  display: grid; /* 그리드 레이아웃으로 배치 */
  grid-template-columns: 1fr auto; /* 왼쪽(이름,내용)은 1프랙션, 오른쪽(날짜)은 자동 너비 */
  grid-template-rows: auto auto; /* 2개의 행 */
  gap: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[4]}; /* 행/열 간격 */
  align-items: center; /* 세로 중앙 정렬 */
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* 작은 화면에서 중앙 정렬 */
  grid-column: 1;
  gap: ${({ theme }) => theme.spacing[2]};

  ${media.sm`
    align-items: baseline; /* sm 이상에서 원래대로 */
  `}
`;

const UserName = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.lg}; /* 작은 화면 폰트 크기 */
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  ${media.sm`
    font-size: ${({ theme }) => theme.fontSizes.xl}; /* sm 이상 폰트 크기 */
  `}
`;

const UserAge = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm}; /* 작은 화면 폰트 크기 */
  color: ${({ theme }) => theme.colors.gray[600]};
  ${media.sm`
    font-size: ${({ theme }) => theme.fontSizes.md}; /* sm 이상 폰트 크기 */
  `};
`;

const CareContent = styled.span`
  grid-column: 1;
  font-size: ${({ theme }) => theme.fontSizes.sm}; /* 작은 화면 폰트 크기 */
  color: ${({ theme }) => theme.colors.gray[800]};
  text-align: center; /* 작은 화면에서 중앙 정렬 */

  ${media.sm`
    font-size: ${({ theme }) => theme.fontSizes.md}; /* sm 이상 폰트 크기 */
    text-align: left; /* sm 이상에서 왼쪽 정렬 */
  `}
`;

const DateInfo = styled.span`
  grid-column: 1 / span 2; /* 작은 화면에서는 1줄 전체 사용 */
  grid-row: auto;
  font-size: ${({ theme }) => theme.fontSizes.xs}; /* 작은 화면 폰트 크기 */
  color: ${({ theme }) => theme.colors.gray[500]};
  white-space: nowrap;
  align-self: center; /* 수직 중앙 정렬 */
  text-align: center; /* 작은 화면에서 중앙 정렬 */

  ${media.sm`
    grid-column: 2; /* sm 이상에서 원래 컬럼 */
    grid-row: 1 / span 2; /* sm 이상에서 원래 행 */
    font-size: ${({ theme }) => theme.fontSizes.sm}; /* sm 이상 폰트 크기 */
    text-align: right; /* sm 이상에서 오른쪽 정렬 */
  `}
`;

// --- 하단 영역 스타일 ---
const CardFooter = styled.div`
  display: flex;
  flex-direction: column; /* 작은 화면에서 세로로 쌓이도록 */
  justify-content: space-between;
  align-items: center; /* 작은 화면에서 중앙 정렬 */
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]}; /* 작은 화면 패딩 */
  gap: ${({ theme }) => theme.spacing[2]}; /* 작은 화면 간격 */

  ${media.sm`
    flex-direction: row; /* sm 이상에서는 가로로 나열 */
    padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[6]}; /* sm 이상 패딩 */
    gap: ${({ theme }) => theme.spacing[4]}; /* sm 이상 간격 */
  `}
`;

const LocationWage = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]}; /* 지역과 시급 사이 간격 */
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.gray[700]};
`;

const LocationText = styled.span``;

const AccuontText = styled.span`
  strong {
    font-size: ${({ theme }) => theme.fontSizes.base}; /* 작은 화면 시급 강조 */
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.primary};
  }

  ${media.sm`
    strong {
      font-size: ${({ theme }) => theme.fontSizes.lg}; /* sm 이상 시급 강조 */
    }
  `}
`;

const BoldAccount = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const AccommodationInfo = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.md}; /* 작은 화면 폰트 크기 */
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.gray[3]};
  white-space: nowrap;

  ${media.sm`
    font-size: ${({ theme }) => theme.fontSizes.xl}; /* sm 이상 폰트 크기 */
  `}
`;

const Divder = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  width: 100%; /* 부모 너비 채움 */

  ${media.sm`
    /* sm 이상에서는 그리드 레이아웃의 자식으로 적절히 동작 */
  `}
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
`;

const ErrorMessage = styled.p`
  text-align: center;
  color: red;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-top: ${({ theme }) => theme.spacing[5]};
`;

export default HireList;
