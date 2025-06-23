import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { userService } from '../api/users';
import { ClipLoader } from 'react-spinners';
import { FaPlus } from 'react-icons/fa6';
import useUserStore from '../store/userStore';
import useUserUpdateForm from '../hooks/useUserUpdateForm';
import {
  GridForm,
  GridInerContainer,
  GenderRadioGroup,
  RadioWrapper,
  FromWrap,
  SubmitBtn,
  Img,
  NewTitle,
} from '../styles/PatientRegistration';

import { AuthContainer, Label, Input, InputGroup } from '../styles/Auth.styles';
import styled from 'styled-components';

const MyProfile = () => {
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = useUserStore((state) => state.user?.userId);
  const [licenseList, setLicenseList] = useState([]);
  const [formData, setFormData] = useState({
    userId: '', // 아이디 필드도 포함
    userName: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
  });

  useEffect(() => {
    const loadProfile = async () => {
      if (!userId) {
        setLoading(false);
        setError('사용자 ID를 사용할 수 없습니다.');
        toast.error('사용자 ID를 사용할 수 없습니다.');
        return;
      }
      try {
        const info = await userService.getUserProfile(userId);
        console.log(info);

        if (info && info.length > 0) {
          const userProfileData = info[0]; // 배열의 첫 번째 요소 사용
          setProfile(userProfileData); // 프로필 원본 데이터 저장

          // formData 초기화
          setFormData({
            userId: userProfileData.userId || '', // 아이디 필드 추가
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
        } else {
          setError('프로필 데이터를 찾을 수 없습니다.');
          toast.warn('프로필 데이터를 찾을 수 없습니다.');
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
  }, []);

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

    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const handleDivClick = () => {
    inputRef.current?.click(); // 파일 선택창 열기
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('선택된 파일:', file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result); // base64 저장
      };
      reader.readAsDataURL(file); // base64 인코딩
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
    try {
      await validateAndSubmit(formData, licenseList);
      console.log('회원정보 업데이트 데이터:', formData);
      toast.success('회원정보가 성공적으로 수정되었습니다.');
    } catch (err) {
      console.error('회원정보 수정 실패:', err);
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
    setLicenseList([...licenseList, { license_name: '', license_publisher: '', license_date: '' }]);
  };

  const removeLicense = (index) => {
    setLicenseList(licenseList.filter((_, i) => i !== index));
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
        <ProfileImage onClick={handleDivClick}>
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="미리보기"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
            />
          ) : (
            <Plus />
          )}
        </ProfileImage>
        <input type="file" accept="image/*" ref={inputRef} onChange={handleFileChange} style={{ display: 'none' }} />
        <Form onSubmit={handleSubmit}>
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
            <Input type="text" id="phone" value={formData.phone} onChange={handleChange} />
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
                  value={license.license_name}
                  onChange={(e) => handleLicenseChange(index, 'license_name', e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="발급기관"
                  value={license.license_publisher}
                  onChange={(e) => handleLicenseChange(index, 'license_publisher', e.target.value)}
                />
                <Input
                  type="date"
                  value={license.license_date}
                  onChange={(e) => handleLicenseChange(index, 'license_date', e.target.value)}
                />
                <Button type="button" onClick={() => removeLicense(index)}>
                  삭제
                </Button>
              </div>
            ))}
            <Button type="button" onClick={addLicense}>
              자격증 추가
            </Button>
          </LicenseGroup>
          <ButtonGroup>
            <Button type="button" onClick={() => toast.info('회원탈퇴 기능은 아직 구현되지 않았습니다.')}>
              회원탈퇴
            </Button>
            <Button type="button" onClick={() => toast.info('비밀번호 변경 기능은 아직 구현되지 않았습니다.')}>
              비밀번호 변경
            </Button>

            <Button type="submit" disabled={updating}>
              {' '}
              {updating ? '수정 중...' : '수정하기'}
            </Button>
            <Button type="button" onClick={() => toast.info('뒤로가기 기능은 아직 구현되지 않았습니다.')}>
              뒤로가기
            </Button>
          </ButtonGroup>
        </Form>
      </FromWrap>
    </AuthContainer>
  );
};

const ButtonGroup = styled.div`
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
