import React, { useEffect, useState } from 'react';
import { Container, Section } from '../styles/common/Container';
import styled from 'styled-components';

// import { toast } from 'react-toastify';
import profileImage from '../assets/images/pat.png'; // 프로필 이미지 경로
import { media } from '../styles/MediaQueries';
import SearchBar from '../components/SearchBar';
import { IoCheckmarkOutline } from 'react-icons/io5';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { hiringService } from '../api/hiring';
import Paging from '../components/Paging';
import { addressService } from '../api/address';
import { Button } from '@mui/material';

const HireList = () => {
  const [hireLists, setHireLists] = useState([]);
  const [loading, setLoading] = useState(false); // 초기 false
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // MUI Pagination은 1부터 시작
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({
    region: '',
    endDate: '',
    account: '',
    home: false,
    startDate: '',
    patGender: '',
    keyword: '',
  });
  const [region, setRegion] = useState([]); // 지역
  const [sgg, setSgg] = useState([]); // 시,군,구
  const [selectedCd, setSelectedCd] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedSgg, setSelectedSgg] = useState('');
  const [updateData, setUpdateData] = useState({});

  // 1. 컴포넌트가 처음 마운트될 때 전체 리스트를 불러옵니다.
  useEffect(() => {
    loadHireLists(page - 1, size, updateData); // API에선 0부터 시작일 가능성 있어 -1 처리
  }, [page, size, updateData]);

  // 이름 첫글자 O 처리하기
  const maskName = (name) => {
    if (name.length === 2) {
      return name[0] + '○';
    } else if (name.length >= 3) {
      return name[0] + '○' + name.slice(2);
    }

    return name;
  };

  const loadHireLists = async (pageNumber, pageSize, searchData) => {
    try {
      console.log('검색조건 JSON 데이터:', updateData);
      setLoading(true);
      setError(null);
      const res = await hiringService.getHiringList({ page: pageNumber, size: pageSize, searchData });
      console.log('돌봄대상자 Response:', res); // 여기서 totalPages, content 등 확인
      if (res.totalElements === 0) {
        setHireLists([]);
        setError('등록된 돌봄 대상자 모집 글이 없습니다.');
      } else {
        setHireLists(res.content);
        setTotalPages(res.totalPage);
      }
    } catch (err) {
      setError('돌봄 대상자 구인 리스트를 가져오지 못했습니다. ' + err);
    } finally {
      setLoading(false);
    }
  };

  // SearchBar에서 검색 버튼을 눌렀을 때 호출되는 함수
  const handleSearchSubmit = async (keyword) => {
    // SearchBar로부터 받은 키워드를 searchKeyword 상태에 저장합니다.

    let finalRegionValue = ``;
    if (selectedSgg) {
      finalRegionValue = selectedSgg;
    } else {
      finalRegionValue = selectedRegion;
    }

    const finalForm = {
      ...data,
      keyword: keyword,
      region: finalRegionValue.fullAddr,
    }; // 최신 상태 생성

    setUpdateData(finalForm); // 상태 업데이트
    setPage(1);

    await loadHireLists(updateData);
  };

  //상세검색 눌렀는가? 창 오픈
  const handleDetail = () => {
    setVisible((prev) => !prev);
  };

  //상세검색
  const dataInfo = (e) => {
    const { name, value, checked } = e.target;
    const today = new Date(); //오늘날짜
    today.setHours(0, 0, 0, 0); //시간초기화

    //시작일유효성
    if (name === 'startDate') {
      const newStartDate = new Date(value); // 새로 입력된 시작 날짜

      // 새로 입력된 시작일이 오늘 이전인지 확인
      if (newStartDate.getTime() < today.getTime()) {
        alert('시작일은 오늘 이후로 설정해야 합니다.');
        return false;
      }

      if (data.endDate) {
        const currentEndDate = new Date(data.endDate);
        if (newStartDate.getTime() > currentEndDate.getTime()) {
          alert('시작일은 종료일보다 이후일 수 없습니다.');
          return false;
        }
      }
    }

    //종료일 유효성
    if (name === 'endDate') {
      const newEndDate = new Date(value); // 새로 입력된 종료일

      // 종료일이 오늘 이전인지 확인
      if (newEndDate.getTime() < today.getTime()) {
        alert('종료일은 오늘 이후로 설정해야 합니다.');
        return false;
      }

      // 종료일이 시작일보다 이전인지 확인
      if (data.startDate) {
        const currentStartDate = new Date(data.startDate);
        if (newEndDate.getTime() < currentStartDate.getTime()) {
          alert('종료일은 시작일보다 이전일 수 없습니다.');
          return false;
        }
      }
    }

    if (name === 'home') {
      setData((data) => ({
        ...data,
        [name]: checked,
      }));
      return;
    }

    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const getRegion = async () => {
    try {
      setSelectedCd(null);
      setError(null);
      const res = await addressService.getRegionList(selectedCd);
      console.log('HireList에 온 값:', res);
      setRegion(res);
    } catch (err) {
      setError('행정구역 로드 실패.\n' + err);
    }
  };

  const handleRegionChange = async (region) => {
    setSelectedCd(region.cd);
    setSelectedRegion(region);

    //지역을 바꾸면 시군구도 초기화되게
    setSelectedSgg(null);
    setSgg([]);

    try {
      const sgg = await addressService.getRegionList(region.cd);
      setSgg(sgg);
    } catch (error) {
      console.error('시군구 조회 실패:', error);
    }
  };

  const handleSggChange = async (sgg) => {
    try {
      setSelectedSgg(sgg);
    } catch (error) {
      console.error('시군구 조회 실패:', error);
    }
  };

  return (
    <>
      <SearchSection>
        <Title>돌봄대상자 모집</Title>

        <SearchContainer2>
          <Search>
            <SearchBar onSearch={handleSearchSubmit} />
            <DetailBtn onClick={handleDetail}>상세검색</DetailBtn>
          </Search>
          {visible && (
            <Detail $visible={visible}>
              <Item>
                <RegionBtn onClick={getRegion}>지역선택</RegionBtn>
              </Item>
              {/* 테스트공간 */}
              <Item>
                <RegionDiv>
                  {region.map((region, index) => (
                    <RegionLabel key={index}>
                      <input
                        type="radio"
                        name="region"
                        value={region.cd}
                        checked={selectedCd === region.cd}
                        onChange={() => handleRegionChange(region)}
                      />
                      {region.addrName}
                    </RegionLabel>
                  ))}
                </RegionDiv>
              </Item>
              <Item>
                <RegionDiv>
                  {sgg.map((sgg, index) => (
                    <RegionLabel key={index}>
                      <input
                        type="radio"
                        name="sgg"
                        value={sgg}
                        // checked={}
                        onChange={() => handleSggChange(sgg)}
                      />
                      {sgg.addrName}
                    </RegionLabel>
                  ))}
                </RegionDiv>
              </Item>
              <Item>
                {selectedRegion && <p>지역 :{selectedSgg ? selectedSgg.fullAddr : selectedRegion.fullAddr}</p>}
              </Item>
              {/* 테스트끝 */}
              <SearchSelect>
                <DateBox>
                  <DateContentBox>
                    <SearchTitle> 시작일: </SearchTitle>
                    <DateInput name="startDate" type="date" value={data.startDate} onChange={dataInfo} />
                  </DateContentBox>
                  <DateContentBox>
                    <SearchTitle> 종료일: </SearchTitle>
                    <DateInput name="endDate" type="date" value={data.endDate} onChange={dataInfo} />
                  </DateContentBox>
                </DateBox>
                <Items>
                  <Item>
                    <SearchTitle>근무유형: </SearchTitle>
                    <SelectBox>
                      <option value="">전체</option>
                      <option value="">입주</option>
                      <option value="">출퇴근</option>
                    </SelectBox>
                  </Item>
                  <Item>
                    <SearchTitle>시급: </SearchTitle>
                    <ACCOUNT
                      name="account"
                      type="number"
                      min="0"
                      step="1000"
                      placeholder="시급"
                      value={data.account}
                      onChange={dataInfo}
                    />
                  </Item>
                </Items>
                <RadioGroup2>
                  <SearchTitle>성별:</SearchTitle>
                  <RadioWrapper>
                    {/* checked prop 전달 */}
                    <input
                      type="radio"
                      id="male"
                      name="patGender"
                      value="M"
                      checked={data.patGender === 'M'}
                      onChange={dataInfo}
                    />
                    <Label htmlFor="male">남성</Label>
                  </RadioWrapper>
                  <RadioWrapper>
                    {/* checked prop 전달 */}
                    <input
                      type="radio"
                      id="female"
                      name="patGender"
                      value="F"
                      checked={data.patGender === 'F'}
                      onChange={dataInfo}
                    />
                    <Label htmlFor="female">여성</Label>
                  </RadioWrapper>
                  <RadioWrapper>
                    <input
                      type="radio"
                      id="anyGender"
                      name="patGender"
                      value="" // 성별 무관을 위해 빈 문자열로 설정
                      checked={data.patGender === ''}
                      onChange={dataInfo}
                    />
                    <Label2 htmlFor="anyGender">성별 무관</Label2>
                  </RadioWrapper>
                </RadioGroup2>

                {/* <AccommodationCheckboxLabel>
                  <HiddenCheckbox
                    name="home"
                    type="checkbox"
                    value={data.home}
                    checked={data.home}
                    onChange={dataInfo}
                  />
                  <StyledCheckbox checked={data.home}>
                    {handleCheckChange && <IoCheckmarkOutline size="20px" color="white" />}
                  </StyledCheckbox>
                  상주 가능 여부
                </AccommodationCheckboxLabel> */}
              </SearchSelect>
            </Detail>
          )}
        </SearchContainer2>
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
            <HireListCard key={hire.hiringNo} to={`/hireDetail/${hire.hiringNo}`}>
              <CardHeader>
                <ProfileImage src={hire.profileImage || profileImage} alt="프로필" />
                <HeaderContent>
                  <Divder>
                    <UserInfo>
                      <UserName>{maskName(hire.patName)}</UserName>
                      <UserAge>
                        나이 {hire.patAge}세(
                        {hire.patGender === 'M' ? '남' : hire.patGender === 'F' ? '여' : ''})
                      </UserAge>
                    </UserInfo>
                    <CareContent>{hire.hiringTitle}</CareContent>
                    <div></div>
                  </Divder>
                  <DateInfo>
                    {hire.startDate?.substring(0, 10)} ~ {hire.endDate?.substring(0, 10)}
                  </DateInfo>
                </HeaderContent>
              </CardHeader>
              <CardFooter>
                <LocationWage>
                  <LocationText>
                    <GrayText>시급</GrayText> <BoldAccount>{hire.account}원</BoldAccount>
                  </LocationText>
                  <AccuontText>
                    <GrayText>지역 </GrayText>
                    {hire.patAddress}
                  </AccuontText>
                </LocationWage>
                {hire.careStatus === 'Y' && <AccommodationInfo>숙식 제공 가능</AccommodationInfo>}
              </CardFooter>
            </HireListCard>
          ))}
          <Paging totalPage={totalPages} currentPage={page} chagneCurrentPage={(newPage) => setPage(newPage)} />
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

const Detail = styled.div`
  margin-top: 30px;
  user-select: none;
  display: ${({ $visible }) => ($visible ? 'flex' : 'none')};
  flex-direction: column;
`;

const RegionBtn = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.gray[3]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 기본 그림자 */
  margin-bottom: 10px;
  &:hover {
    transform: scale(0.95); /* 5% 확대 */
  }
`;

const SearchContainer2 = styled(Container)`
  padding: 20px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray[5]};
  border-radius: 4px;
`;

const DetailBtn = styled.p`
  width: 100px;
  padding-left: 16px;
  color: ${({ theme }) => theme.colors.gray[3]};
  cursor: pointer;
  user-select: none;
  &:hover {
    color: ${({ theme }) => theme.colors.gray[2]};
  }
`;

const SearchSection = styled(Section)`
  padding-bottom: 0;
`;

const SelectBox = styled.select`
  width: 120px;
  height: 50px;
  padding: 0 ${({ theme }) => theme.spacing[5]};
  border: none;
  border-radius: ${({ theme }) => theme.spacing[1]};
  font-size: ${({ theme }) => theme.spacing[4]};
`;

const DateInput = styled.input`
  height: 50px;
  width: 100%;
  border-radius: ${({ theme }) => theme.spacing[1]};
  padding: 0 ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.spacing[4]};
  background-color: white;
`;

const SearchTitle = styled.span`
  text-align: end;
  margin: 0 20px 0 5px;
  width: 80px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.gray[1]};
`;

const RadioGroup2 = styled.div`
  display: flex;
  grid-column: span 1;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const Label = styled.label`
  padding-left: 10px;
  width: 40px;
  text-align: center;
`;

const Label2 = styled.label`
  width: 70px;
  text-align: center;
`;
const RadioWrapper = styled.div`
  display: flex;
  gap: 0;
  align-items: center;
  /* gap: ${({ theme }) => theme.spacing[3]}; */

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
  width: 150px;
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
  gap: ${({ theme }) => theme.spacing[3]};
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

const HireListCard = styled(Link)`
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

const Item = styled.div`
  display: flex;
  align-items: center;
`;
const Items = styled.div`
  display: flex;
  align-items: center;
  grid-column: span 1;
`;
const Search = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchSelect = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: min-content;
  row-gap: 20px;
`;

const DateBox = styled.div`
  margin-top: 20px;
  display: flex;
  grid-column: span 4;
  width: 100%;
  gap: 20px;
`;

const DateContentBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const DateInfo = styled.span`
  grid-column: 1 / span 2; //작은 화면에서는 1줄 전체 사용
  grid-row: auto;
  font-size: ${({ theme }) => theme.fontSizes.xs}; /* 작은 화면 폰트 크기 */
  color: ${({ theme }) => theme.colors.gray[500]};
  white-space: nowrap;
  align-self: center;
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
const GrayText = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.gray[4]};
`;
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

const RegionDiv = styled.div`
  display: flex;
`;
const RegionLabel = styled.label`
  display: flex;
  margin-bottom: 20px;
`;
export default HireList;
