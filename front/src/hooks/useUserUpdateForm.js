import * as yup from 'yup';
import { userService } from '../api/users';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { getUploadUrl, uploadFileToS3, completeUpload } from '../api/fileApi';
// 유효성 스키마
const updateSchema = yup.object().shape({
  userName: yup
    .string()
    .required('이름을 입력하세요.')
    .matches(/^[가-힣]+$/, '이름은 한글만 입력 가능합니다.')
    .max(4, '이름은 최대 4자까지만 입력 가능합니다.'),

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

  email: yup.string().email('유효한 이메일 주소를 입력하세요.').required('이메일을 입력해주세요.'),
  address: yup
    .string()
    .required('주소를 입력해주세요.')
    .min(5, '주소는 최소 5자 이상이어야 합니다.')
    .max(100, '주소는 100자 이하로 입력해주세요.'),
});

const useUserUpdateForm = ({ profile }) => {
  const [updating, setUpdating] = useState(false);

  const validateAndSubmit = async (formData, licenseList, profileImageFile) => {
    try {
      // 변경된 값만 필터링
      const changedFields = Object.entries(formData).reduce((acc, [key, value]) => {
        if (value !== profile[key]) {
          acc[key] = value;
        }
        return acc;
      }, {});

      // 자격증도 변경되었는지 체크
      const licensesChanged = JSON.stringify(profile.licenses || []) !== JSON.stringify(licenseList);

      // 이미지가 선택되었는지 체크
      const imageChanged = !!profileImageFile;

      if (Object.keys(changedFields).length === 0 && !licensesChanged && !imageChanged) {
        toast.info('변경된 정보가 없습니다.');
        return;
      }

      // 유효성 검사
      await updateSchema.validate(formData, { abortEarly: false });
      setUpdating(true);

      const updatedData = {
        ...changedFields,
        licenses: licenseList || [],
      };

      // 나이 문자열 -> 숫자 변환
      if (updatedData.age) {
        updatedData.age = Number(updatedData.age);
      }

      // 프로필 이미지가 변경된 경우
      if (imageChanged) {
        try {
          // 1. Presigned URL 요청
          const { presignedUrl, changeName } = await getUploadUrl(
            profileImageFile.name,
            profileImageFile.type,
            'profile/' // 업로드 경로
          );

          console.log('Presigned URL 응답:', { presignedUrl, changeName });

          // 2. S3 직접 업로드
          await uploadFileToS3(presignedUrl, profileImageFile);

          // 3. 파일 업로드 완료 후 메타데이터 저장
          const fileMeta = await completeUpload(profileImageFile.name, changeName, profileImageFile.type);
          console.log('completeUpload 응답:', fileMeta); // 👈 이걸 반드시 찍어보세요

          // 4. 유저 프로필에 파일명 저장
          updatedData.profileImage = fileMeta.changeName;
        } catch (uploadError) {
          toast.error('프로필 이미지 업로드에 실패했습니다.');
          setUpdating(false);
          throw uploadError;
        }
      }

      // 여기 userNo 사용! (profile.userNo 또는 profile.user_no)
      const userNo = profile.userNo || profile.user_no;
      if (!userNo) {
        throw new Error('사용자 번호(userNo)가 없습니다.');
      }

      await userService.updateUserProfile(userNo, updatedData);

      toast.success('회원정보가 성공적으로 수정되었습니다.');
    } catch (err) {
      if (err.name === 'ValidationError') {
        err.inner.forEach((e) => toast.error(e.message));
      } else {
        toast.error('회원정보 수정 중 문제가 발생했습니다.');
        console.error(err);
      }
    } finally {
      setUpdating(false);
    }
  };

  return { validateAndSubmit, updating };
};

export default useUserUpdateForm;
