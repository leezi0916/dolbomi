import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';

// 유효성 스키마
const resumeSchema = yup.object().shape({
  resumeTitle: yup.string().required('제목을 입력해주세요'),
  resumeContent: yup.string().required('내용을 입력해주세요'),
  resumeAccount: yup.number().typeError('숫자로 입력해주세요').required('희망 시급을 입력해주세요'),
  careStatus: yup.string().required('숙식 여부를 선택해주세요'),
});

export const useResumeForm = (resumeNo) => {
  const { user } = useUserStore();
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

  return {
    register,
    handleSubmit,
    errors,
    user,
    setValue,
    careGiverResume,
    setCareGiverResume,
  };
};
