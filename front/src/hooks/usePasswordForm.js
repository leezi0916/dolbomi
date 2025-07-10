import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { userService } from '../api/users';
import { toast } from 'react-toastify';

const passwordSchema = yup.object().shape({
  currentPassword: yup.string().required('현재 비밀번호를 입력해주세요.'),
  newPassword: yup
    .string()
    .required('새 비밀번호를 입력해주세요.')
    .min(5, '비밀번호는 최소 5자 이상이어야 합니다.')
    .matches(/^(?=.*[a-zA-Z]).+$/, '영문자를 포함해야 합니다.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], '비밀번호가 일치하지 않습니다.')
    .required('새 비밀번호 확인을 입력해주세요.'),
});

export const usePasswordForm = (userNo, onSuccess) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(passwordSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    try {
      await userService.changePassword({
        userNo,
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      reset(); // 입력값 초기화
      onSuccess?.(); // 모달 닫기 등 처리
    } catch (error) {
      toast.error(error.message || '비밀번호 변경에 실패했습니다.');
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
  };
};
