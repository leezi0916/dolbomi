import {  useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';

// 유효성 스키마
const resumeSchema = yup.object().shape({
  resumeTitle: yup.string().required('제목을 입력해주세요'),
  resumeContent: yup.string().required('내용을 입력해주세요'),
  account: yup.number().typeError('숫자로 입력해주세요').required('희망 금액을 입력해주세요'),
  careStatus: yup.string().required('숙식 여부를 선택해주세요'),
});

export const useResumeForm = (resumeNo) => {
  const { user } = useUserStore();
  // const [user, setUser] = useState(null);
  const [licenseList, setLicenseList] = useState([{ licenseName: '', licensePublisher: '', licenseDate: '' }]);
  const [careGiverResume, setCareGiverResume] = useState();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resumeSchema),
    mode: 'onChange',
  });

  // useEffect(() => {
  //   const fetchAll = async () => {
  //     try {
  //       const getcareGiverResume = await jobSeekingService.getResume(Number(resumeNo));
  //       setCareGiverResume(getcareGiverResume);
  //       console.log('시작 ', getcareGiverResume);
  //     } catch (error) {
  //       toast.error('상세 이력서 불러오기 중 문제가 발생하였습니다.');
  //       console.error('이력서 불러오기 오류 : ', error);
  //     }
  //   };
  //   fetchAll();
  // }, [user]);

  // // resumeNo가 있으면 이력서 데이터 불러와서 폼 초기화
  // useEffect(() => {
  //   if (!resumeNo) return;

  //   (async () => {
  //     try {
  //       const data = await jobSeekingService.getResume(Number(resumeNo));
  //       // data가 배열이라면 첫번째 객체 꺼내기
  //       const resume = Array.isArray(data) ? data[0] : data;
  //       console.log('불러온 이력서:', resume);

  //       reset({
  //         resumeTitle: resume.resumeTitle || '',
  //         resumeContent: resume.resumeContent || '',
  //         careStatus: resume.careStatus || '',
  //         account: resume.account || '',
  //       });

  //       if (resume.licenses?.length > 0) {
  //         setLicenseList(resume.licenses);
  //       }
  //     } catch (err) {
  //       console.error('이력서 조회 실패:', err);
  //     }
  //   })();
  // }, [resumeNo, reset]);

  // 제출 핸들러
  // const onSubmit = async (formData) => {
  //   if (!user) return;

  //   const payload = {
  //     ...formData,
  //     userNo: user.userNo,
  //   };

  //   try {
  //     if (resumeNo) {
  //       await jobSeekingService.updateResume(resumeNo, payload);
  //       toast.success('이력서가 수정되었습니다!');
  //     } else {
  //       await jobSeekingService.postNewResume(payload); // API 함수명 그대로 사용
  //       toast.success('이력서가 저장되었습니다!');
  //     }

  //     navigate('/caregiver/resumemanagement');
  //   } catch (error) {
  //     console.error('이력서 저장/수정 실패:', error);
  //     toast.error('이력서 저장 중 문제가 발생했습니다.');
  //   }
  // };

  return {
    register,
    handleSubmit,
    errors,
    user,
    licenseList,
    setLicenseList,
    setValue,
    careGiverResume,
    setCareGiverResume,
  };
};
