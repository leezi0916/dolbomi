import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { userService } from '../api/users';
import { useEffect, useState } from 'react';

// 유효성 검사 스키마
const signUpSchema = yup.object().shape({
  userId: yup
    .string()
    .required('아이디를 입력하세요.')
    .min(5, '아이디는 최소 5자 이상이어야 합니다.')
    .matches(
      /^[가-힣a-zA-Z][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/,
      '아이디에 특수문자가 포함되면 안되고 숫자로 시작하면 안됩니다!'
    ),

  userName: yup
    .string()
    .required('이름을 입력하세요.')
    .matches(/^[가-힣]+$/, '이름은 한글만 입력 가능합니다.')
    .max(4, '이름은 최대 4자까지만 입력 가능합니다.'),

  userPwd: yup
    .string()
    .required('비밀번호를 입력하세요.')
    .matches(/^(?=.*[a-zA-Z]).{5,}$/, '비밀번호는 영문자를 포함해 5자 이상이어야 합니다.'),

  userPwdCheck: yup
    .string()
    .oneOf([yup.ref('userPwd'), null], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호 확인을 입력하세요.'),

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
    .matches(/^010-\d{4}-\d{4}$/, '전화번호 형식은 010-0000-0000 이어야 합니다')
    .required('전화번호를 입력해주세요'),

  address: yup
    .string()
    .required('주소를 입력해주세요.')
    .min(5, '주소는 최소 5자 이상이어야 합니다.')
    .max(100, '주소는 100자 이하로 입력해주세요.'),

  email: yup.string().email('유효한 이메일 주소를 입력하세요.').required('이메일을 입력해주세요.'),
});

export const useSignUpForm = () => {
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [idCheckMessage, setIdCheckMessage] = useState('');

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    resolver: yupResolver(signUpSchema),
    mode: 'onChange',
    defaultValues: {
      gender: 'M',
    },
  });

  const userId = watch('userId');

  useEffect(() => {
    setIsIdChecked(false);
    setIdCheckMessage('');
  }, [userId]);

  const checkUserId = async () => {
    if (!userId || userId.length < 5) {
      setIdCheckMessage('아이디는 최소 5자 이상 입력해주세요');
      return;
    }
    try {
      const res = await userService.checkUserId(userId);
      if (res.available) {
        setIdCheckMessage('사용 가능한 아이디입니다.');
        setIsIdChecked(true);
        clearErrors('userId');
      } else {
        setIdCheckMessage('이미 사용 중인 아이디입니다.');
        setIsIdChecked(false);
        setError('userId', { message: '이미 사용 중인 아이디입니다.' });
      }
    } catch {
      setIdCheckMessage('중복 확인 중 오류가 발생했습니다.');
      setIsIdChecked(false);
    }
  };

  const formatPhoneNumber = (value) => {
    const numbersOnly = value.replace(/\D/g, '');
    if (numbersOnly.length < 4) return numbersOnly;
    if (numbersOnly.length < 8) return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3)}`;
    return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 7)}-${numbersOnly.slice(7, 11)}`;
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    watch,
    checkUserId,
    idCheckMessage,
    setValue,
    formatPhoneNumber,
    isIdChecked, // 외부에서 중복 체크 확인 필요
  };
};
