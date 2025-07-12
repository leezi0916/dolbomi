import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { userService } from '../api/users';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// 유효성 검사 스키마
const signUpSchema = yup.object().shape({
  userId: yup.string().email('유효한 이메일 주소를 입력하세요.').required('이메일을 입력해주세요.'),
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
});

export const useSignUpForm = (socialType, socialId) => {
  const navigate = useNavigate();

  //아이디 중복 검사
  const [isEmailChecked, setIsEmailChecked] = useState(false); // 아이디 중복확인 완료 여부
  const [emailCheckMessage, setEmailCheckMessage] = useState('');

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

  useEffect(() => {
    setIsEmailChecked(false);
    setEmailCheckMessage('');
  }, []);

  const formatPhoneNumber = (value) => {
    const numbersOnly = value.replace(/\D/g, '');
    if (numbersOnly.length < 4) return numbersOnly;
    if (numbersOnly.length < 8) return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3)}`;
    return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 7)}-${numbersOnly.slice(7, 11)}`;
  };

  const onSubmit = async (data) => {
    // if (!isEmailChecked) {
    //   toast.error('이메일 중복을 확인해주세요.');
    //   return;
    // }

    // 주소 정리
    const submitData = {
      ...data,
      address: `${data.address}`.trim(),
    };

    // 소셜 정보 추가
    if (socialId) submitData.socialId = socialId;
    if (socialType) submitData.socialType = socialType;

    try {
      await userService.signUp(submitData);
      toast.success('회원가입 완료!');
      navigate('/login');
    } catch (error) {
      toast.error('회원가입 중 문제가 발생하였습니다.');
      console.error(error);
    }
  };

  //컴포넌트에서 사용할 값들 반환

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    watch,
    emailCheckMessage,
    setValue,
    formatPhoneNumber,
    isEmailChecked, // 외부에서 이메일 검증 확인 필요
    onSubmit,
  };
};
