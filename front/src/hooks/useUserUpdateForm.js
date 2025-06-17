import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { userService } from '../api/users';
import { toast } from 'react-toastify';

// 유효성 스키마
const updateSchema = yup.object().shape({
  user_name: yup
    .string()
    .required('이름을 입력하세요.')
    .matches(/^[가-힣]+$/, '이름은 한글만 입력 가능합니다.')
    .max(4, '이름은 최대 4자까지만 입력 가능합니다.'),

  user_pwd: yup
    .string()
    .required('비밀번호를 입력하세요.')
    .matches(/^(?=.*[a-zA-Z]).{5,}$/, '비밀번호는 영문자를 포함해 5자 이상이어야 합니다.'),

  age: yup
    .number()
    .typeError('나이는 숫자여야 합니다.')
    .required('나이를 입력해주세요.')
    .integer('정수를 입력해주세요.')
    .min(0, '0세 이상이어야 합니다.')
    .max(120, '120세 이하로 입력해주세요.'),

  gender: yup.string().oneOf(['M', 'F'], '성별을 선택해주세요').required('성별은 필수입니다.'),

  phone: yup
    .string()
    .required('전화번호를 입력하세요.')
    .matches(/^010\d{8}$/, "010으로 시작하고 '-' 제외한 11자리여야 합니다."),

  address: yup
    .string()
    .required('주소를 입력해주세요.')
    .min(5, '주소는 최소 5자 이상이어야 합니다.')
    .max(100, '주소는 100자 이하로 입력해주세요.'),

  email: yup.string().email('유효한 이메일 주소를 입력하세요.').required('이메일을 입력해주세요.'),
});

export const useUserUpdateForm = ({ defaultValues, defaultLicenses, onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(updateSchema),
    mode: 'onChange',
    defaultValues,
  });

  // 배열 비교 유틸 함수
  const isLicenseChanged = (a = [], b = []) => {
    if (a.length !== b.length) return true;
    return a.some((item, i) => {
      return (
        item.license_name !== b[i]?.license_name ||
        item.license_publisher !== b[i]?.license_publisher ||
        item.license_date !== b[i]?.license_date
      );
    });
  };

  const onSubmit = async (formData) => {
    const changedFields = {};

    // 필드 값 비교
    for (const key in formData) {
      if (formData[key] !== defaultValues[key]) {
        changedFields[key] = formData[key];
      }
    }

    // 라이선스 비교
    const currentLicenses = watch('licenses') || [];
    if (isLicenseChanged(currentLicenses, defaultLicenses)) {
      changedFields.licenses = currentLicenses;
    }

    if (Object.keys(changedFields).length === 0) {
      toast.info('변경된 내용이 없습니다.');
      return;
    }

    try {
      await userService.updateUserProfile({
        userId: defaultValues.userId,
        ...changedFields,
      });
      toast.success('회원정보가 성공적으로 수정되었습니다.');
      onSuccess?.(); // 성공 콜백
    } catch (error) {
      toast.error('회원정보 수정 실패');
      console.error('Update error:', error);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    setValue,
    watch,
  };
};
