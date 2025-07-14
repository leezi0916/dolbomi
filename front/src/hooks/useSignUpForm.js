import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { userService } from '../api/users';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { emailService } from '../api/email';
import { useState } from 'react';
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

export const useSignUpForm = (socialType, socialId, verifiedFromSocial) => {
  // 이메일 인증 시작 여부
  const [emailAuthStarted, setEmailAuthStarted] = useState(false);
  // 인증 여부 상태
  const [emailVerified, setEmailVerified] = useState(verifiedFromSocial);
  // 인증 요청 후 변경했는지 추적 (aa@naver.com으로 인증 번호 입력후 bb@naver.com으로 바꿀 수 있기때문)
  const [emailSentTo, setEmailSentTo] = useState(null);
  const [authCode, setAuthCode] = useState('');

  const navigate = useNavigate();

  // 타이머 종료
  const handleTimeout = () => {
    toast.error('이메일 인증 시간이 초과되었습니다.');
    setEmailAuthStarted(false);
    setAuthCode('');
  };

  // 이메일 인증코드 발송
  const handleEmailAuth = async () => {
    const currentEmail = watch('userId'); // 폼 상태에서 이메일 가져오기
    try {
      await emailService.sendCode(currentEmail);
      setEmailSentTo(currentEmail); // 요청 보낼시 입력 이메일 저장 -> 인증시에 같은 이메일인지 확인하기 위해
      setEmailAuthStarted(true); // 이메일 인증 시작 true
      toast.success('메일 전송 성공. 이메일을 확인해주세요.');
    } catch (error) {
      if (error.response?.data) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error('이메일 전송하는데 실패했습니다.');
      }
    }
  };

  // 인증코드 인증 함수
  const handleVerifyCode = async () => {
    const currentEmail = watch('userId');
    try {
      if (currentEmail !== emailSentTo) {
        toast.error('이메일을 인증 후 변경하셨습니다. 다시 인증해주세요.');
        setEmailVerified(false);
        return;
      }

      await emailService.verifyEmailCode(currentEmail, authCode);

      setEmailVerified(true);
      setEmailAuthStarted(false);
      toast.success('이메일 인증이 완료되었습니다!');
    } catch (e) {
      setEmailVerified(false);
      toast.error(e.response?.data?.message || '인증코드가 올바르지 않습니다.');
    }
  };

  const {
    register,
    handleSubmit,
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

  const formatPhoneNumber = (value) => {
    const numbersOnly = value.replace(/\D/g, '');
    if (numbersOnly.length < 4) return numbersOnly;
    if (numbersOnly.length < 8) return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3)}`;
    return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 7)}-${numbersOnly.slice(7, 11)}`;
  };

  const onSubmit = async (data) => {
    if (!emailVerified) {
      toast.error('이메일 인증을 해주세요.');
      return;
    }

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
    setValue,
    formatPhoneNumber,
    onSubmit,
    handleEmailAuth,
    handleVerifyCode,
    emailAuthStarted,
    emailVerified,
    authCode,
    setAuthCode,
    handleTimeout,
  };
};
