// hooks/useResumeForm.js
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { resumeService } from '../api/resume';
import { userService } from '../api/users';

// 유효성 스키마
const resumeSchema = yup.object().shape({
  resume_title: yup.string().required('제목을 입력해주세요'),
  resume_content: yup.string().required('내용을 입력해주세요'),
  desired_account: yup.number().typeError('숫자로 입력해주세요').required('희망 금액을 입력해주세요'),
  provide_hope: yup.string().required('숙식 여부를 선택해주세요'),
});

export const useResumeForm = () => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const [licenseList, setLicenseList] = useState([{ license_name: '', license_publisher: '', license_date: '' }]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resumeSchema),
    mode: 'onChange',
  });

  // 유저 정보 불러오기

  useEffect(() => {
    const storedData = localStorage.getItem('user-storage'); // 👈 zustand persist의 key
    if (!storedData) {
      console.warn('로컬스토리지에 user-storage 정보 없음');
      return;
    }

    try {
      const parsedState = JSON.parse(storedData);
      const user = parsedState.state.user;
      const userId = user?.user_id;

      console.log('저장된 유저 ID:', userId);

      if (userId) {
        userService
          .getUserProfile(userId)
          .then((data) => {
            const userData = data[0];
            console.log('받은 유저 정보:', userData);
            setUser(userData);

            if (userData.licenses && userData.licenses.length > 0) {
              setLicenseList(userData.licenses);
            }
          })
          .catch((err) => {
            console.error('유저 정보 가져오기 실패:', err);
            setUser(null);
          });
      }
    } catch (e) {
      console.error('user-storage 파싱 실패:', e);
    }
  }, []);

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

  // 제출 핸들러
  const onSubmit = async (formData) => {
    try {
      const payload = {
        ...formData,
        user_no: user.user_no,
        licenses: licenseList,
      };
      console.log('전송 데이터:', payload);

      await resumeService.createResume(payload);
      toast.success('이력서가 저장되었습니다!');
      navigate('/');
    } catch (error) {
      console.error('이력서 저장 실패:', error);
      toast.error('이력서 저장 중 문제가 발생했습니다.');
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    user,
    licenseList,
    handleLicenseChange,
    addLicense,
    removeLicense,
  };
};
