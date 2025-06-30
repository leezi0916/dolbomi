import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { userService } from '../api/users';
import { ClipLoader } from 'react-spinners';
import { FaPlus } from 'react-icons/fa6';
import { FaMinus } from 'react-icons/fa6';
import useUserStore from '../store/userStore';
import useUserUpdateForm from '../hooks/useUserUpdateForm';
import profileImg from '../assets/profileImg/img_간병인.png';
import {
  GridForm,
  GridInerContainer,
  GenderRadioGroup,
  RadioWrapper,
  FromWrap,
  SubmitBtn,
  Img,
  NewTitle,
  BackBtn,
} from '../styles/PatientRegistration';

import { AuthContainer, Label, Input, InputGroup } from '../styles/Auth.styles';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const userNo = useUserStore((state) => state.user?.userNo);
  const [profile, setProfile] = useState(null);
  const [licenseList, setLicenseList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null); // 추가
  const [formData, setFormData] = useState({
    userId: '',
    userName: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const formatPhoneNumber = (value) => {
    // 숫자만 남기기
    const numbersOnly = value.replace(/\D/g, '');

    // 010부터 시작하고 길이에 따라 포맷팅
    if (numbersOnly.length < 4) return numbersOnly;
    if (numbersOnly.length < 8) return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3)}`;
    return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 7)}-${numbersOnly.slice(7, 11)}`;
  };

  useEffect(() => {
    const loadProfile = async () => {
      if (!userNo) {
        setLoading(false);
        setError('사용자 ID를 사용할 수 없습니다.');
        toast.error('사용자 ID를 사용할 수 없습니다.');
        return;
      }
      try {
        const info = await userService.getUserProfile(userNo);
        console.log('profile data:', info);

        // info가 배열인지 객체인지에 따라 처리
        const userProfileData = Array.isArray(info) ? info[0] : info;

        if (userProfileData) {
          setProfile(userProfileData);

          setFormData({
            userId: userProfileData.userId || '',
            userName: userProfileData.userName || '',
            age: userProfileData.age || '',
            gender: userProfileData.gender || '',
            phone: userProfileData.phone || '',
            email: userProfileData.email || '',
            address: userProfileData.address || '',
          });

          if (userProfileData.licenses && userProfileData.licenses.length > 0) {
            setLicenseList(userProfileData.licenses);
          }
        }
      } catch (error) {
        console.error('프로필 로드 실패:', error);
        const errorMessage = '개인정보 불러오는데 실패했습니다.';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [userNo]);

  const { validateAndSubmit, updating } = useUserUpdateForm({ profile });

  // 폼 입력 값 변경 핸들러
  const handleChange = (e) => {
    const { id, value } = e.target;
    // input의 id와 formData의 키를 매핑
    const fieldName =
      {
        userId: 'userId', // readOnly 필드지만 혹시 몰라 추가
        userName: 'userName',
        age: 'age',
        phone: 'phone',
        email: 'email',
        address: 'address',
      }[id] || id; // 매핑되지 않으면 id 그대로 사용

    const newValue = fieldName === 'phone' ? formatPhoneNumber(value) : value;

    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: newValue,
    }));
  };

  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const handleDivClick = () => {
    inputRef.current?.click(); // 파일 선택창 열기
  };

  // 파일 선택 핸들러 수정
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file); // 파일 저장
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 성별 라디오 버튼 변경 핸들러
  const handleGenderChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      gender: e.target.value,
    }));
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userNo) {
      toast.error('사용자 번호가 없습니다.');
      return;
    }
    try {
      // userNo 포함해서 넘기기
      await validateAndSubmit({ ...formData, userNo }, licenseList, selectedFile);
    } catch (err) {
      toast.error('회원정보 수정 중 문제가 발생했습니다.');
    }
  };

  // 자격증 입력 관리
  const handleLicenseChange = (index, field, value) => {
    const updatedList = [...licenseList];
    updatedList[index][field] = value;
    setLicenseList(updatedList);
  };

  const addLicense = () => {
    setLicenseList([...licenseList, { licenseName: '', licensePublisher: '', licenseDate: '' }]);
  };

  const removeLicense = (index) => {
    setLicenseList(licenseList.filter((_, i) => i !== index));
  };

  //회원 탈퇴 기능
  const handleDeleteUser = async (userNo) => {
    if (!userNo) {
      toast.error('사용자 번호가 없습니다.');
      return;
    }

    const confirmed = window.confirm('정말 회원탈퇴하시겠습니까? 탈퇴 시 복구할 수 없습니다.');
    if (!confirmed) return;

    try {
      await userService.deleteUser(userNo);
      toast.success('회원탈퇴가 완료되었습니다.');
      sessionStorage.removeItem('token');
      localStorage.removeItem('user-storage');
      navigate('/login');
    } catch (error) {
      console.error(error);
      toast.error('회원탈퇴 처리 중 오류가 발생했습니다.');
    }
  };

  if (loading) {
    return (
      <AuthContainer>
        <ClipLoader size={50} aria-label="로딩 중" />
      </AuthContainer>
    );
  }

  if (error || !profile) {
    return (
      <AuthContainer>
        <div>{error || '프로필 정보를 불러올 수 없습니다.'}</div>
      </AuthContainer>
    );
  }

  return (
    <AuthContainer>
      <FromWrap>
        <NewTitle>회원정보 수정 / 탈퇴</NewTitle>
        <Form onSubmit={handleSubmit}>
          <ProfileImage onClick={handleDivClick}>
            {previewUrl ? (
              <img
                src={previewUrl || profileImg}
                alt="미리보기"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
              />
            ) : (
              <Plus />
            )}
          </ProfileImage>
          <input type="file" accept="image/*" ref={inputRef} onChange={handleFileChange} style={{ display: 'none' }} />
          <InputGroup>
            <Label htmlFor="userId">아이디</Label>
            <Input type="text" id="userId" value={formData.userId} readOnly />
          </InputGroup>
          <GridInerContainer>
            <Label htmlFor="userName">이름</Label>
            <Label htmlFor="age">나이</Label>
            <Input type="text" id="userName" value={formData.userName} onChange={handleChange} />
            <Input type="number" id="age" value={formData.age} onChange={handleChange} />
          </GridInerContainer>
          <GenderRadioGroup>
            <Label>성별</Label>
            <RadioWrapper checked={formData.gender === 'M'}>
              <input
                type="radio"
                id="M"
                name="gender"
                value="M"
                checked={formData.gender === 'M'}
                onChange={handleGenderChange}
              />
              <label htmlFor="M">남성</label>
            </RadioWrapper>
            <RadioWrapper checked={formData.gender === 'F'}>
              <input
                type="radio"
                id="F"
                name="gender"
                value="F"
                checked={formData.gender === 'F'}
                onChange={handleGenderChange}
              />
              <label htmlFor="F">여성</label>
            </RadioWrapper>
          </GenderRadioGroup>
          <InputGroup>
            <Label htmlFor="phone">전화번호</Label>
            <Input type="text" id="phone" value={formData.phone} 
            onChange={handleChange} 
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="email">이메일</Label>
            <Input type="email" id="email" value={formData.email} onChange={handleChange} />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="address">주소</Label>
            <Input type="text" id="address" value={formData.address} onChange={handleChange} />
          </InputGroup>
          <LicenseGroup>
            <Label>자격증</Label>

            {licenseList.map((license, index) => (
              <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <Input
                  type="text"
                  placeholder="자격증명"
                  value={license.licenseName}
                  onChange={(e) => handleLicenseChange(index, 'licenseName', e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="발급기관"
                  value={license.licensePublisher}
                  onChange={(e) => handleLicenseChange(index, 'licensePublisher', e.target.value)}
                />
                <Input
                  type="date"
                  value={license.licenseDate}
                  onChange={(e) => handleLicenseChange(index, 'licenseDate', e.target.value)}
                />
                <MinusButton type="button" onClick={() => removeLicense(index)}>
                  <FaMinus></FaMinus>
                </MinusButton>
              </div>
            ))}
            <PlustButton type="button" onClick={addLicense}>
              <Plus></Plus>
            </PlustButton>
          </LicenseGroup>
          <ButtonGroup>
            <BackBtn type="button" onClick={() => navigate(-1)}>
              이전
            </BackBtn>
            <Button type="button" onClick={() => handleDeleteUser(userNo)}>
              회원탈퇴
            </Button>
            <Button type="button" onClick={() => toast.info('비밀번호 변경 기능은 아직 구현되지 않았습니다.')}>
              비밀번호 변경
            </Button>

            <Button type="submit" disabled={updating}>
              {' '}
              {updating ? '저장 중...' : '저장하기'}
            </Button>
          </ButtonGroup>
        </Form>
      </FromWrap>
    </AuthContainer>
  );
};

const ButtonGroup = styled.div`
  margin-top: ${({ theme }) => theme.spacing[8]};
  display: flex;
  justify-content: center;
  width: 100%;
  gap: ${({ theme }) => theme.spacing[5]};
  padding: ${({ theme }) => theme.spacing[5]} 0;
`;

const Form = styled(GridForm)`
  gap: 10px;
`;

const Button = styled(SubmitBtn)`
  font-size: ${({ theme }) => theme.fontSizes.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: 0px;
`;

const PlustButton = styled(SubmitBtn)`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.gray[5]};
  margin-bottom: 0px;
`;

const MinusButton = styled(SubmitBtn)`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.gray[5]};
  margin-bottom: 0px;
`;

const LicenseGroup = styled(InputGroup)`
  justify-content: center;
`;

const ProfileImage = styled.div`
  width: 200px;
  height: 200px;
  background-color: ${({ theme }) => theme.colors.gray[5]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  border-radius: 50%;
`;

const Plus = styled(FaPlus)`
  width: 30px;
  height: 30px;
  color: white;
`;

export default MyProfile;
