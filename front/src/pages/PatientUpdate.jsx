import React, { useState, useEffect } from 'react';
import { AuthContainer } from '../styles/Auth.styles';
import { Title } from '../styles/Auth.styles';
import {
  GridForm,
  GridInerContainer,
  GenderRadioGroup,
  RadioWrapper,
  HeightWegithDiv,
  FromWrap,
  NotesTexttarea,
  SubmitBtn,
  Img,
  BackBtn,
  BtnWrap,
} from '../styles/PatientRegistration';
import { Label, Input, InputGroup, ErrorMessage } from '../styles/Auth.styles';
import { usepatientRegistrationForm } from '../hooks/usePatientRegistrationForm';
import { useNavigate, useParams } from 'react-router-dom';
import useUserStore from '../store/userStore';
import { patientService } from '../api/patient';
import { toast } from 'react-toastify';
import Tags from '../components/Tags';
import styled from 'styled-components';
import PostcodeSearch from '../components/PostcodeSearch';

const PatientUpdate = () => {
  const { user, userStatus } = useUserStore();
  const { patNo } = useParams();
  const [patient, setPatinet] = useState();

  const { register, handleSubmit, errors, isSubmitting, formatPhoneNumber, watch, setValue } =
    usepatientRegistrationForm();
  const currentGender = watch('patGender');

  const navigate = useNavigate();

  const handleTagChange = (newVal) => {
    setTags(newVal); // set을 대체하는 커스텀 함수
  };

  useEffect(() => {
    if (!user) {
      alert('로그인 후 이용해주세요');
      // navigate('/guardian');
    } else {
      const getPatient = async () => {
        try {
          const onePatient = await patientService.getPatientId(patNo);
          setPatinet(onePatient);
        } catch (error) {
          console.log(error);
        }
      };
      getPatient();
    }
  }, [user, userStatus, patNo]);

  useEffect(() => {
    if (patient) {
      setValue('patName', patient.patName || '');
      setValue('patAge', patient.patAge || '');
      setValue('patGender', patient.patGender || '');
      setValue('patAddress', patient.patAddress || '');
      setValue('patHeight', patient.patHeight || '');
      setValue('patWeight', patient.patWeight || '');
      setValue('patContent', patient.patContent || '');
      setValue('patPhone', patient.patPhone || '');
      setValue('diseaseTags', patient.diseaseTags || '');
      setTags(patient.diseaseTags ? patient.diseaseTags : []);
    }
  }, [patient, setValue]);

  //주소 관련
  const [addressData, setAddressData] = useState({
    zonecode: '',
    address: '',
    extraAddress: '',
  });

  useEffect(() => {
    const fullAddress = `${addressData.address}${addressData.extraAddress}`.trim();
    if (fullAddress) {
      setValue('patAddress', fullAddress);
    }
  }, [addressData, setValue]);

  // tag 관련
  const [tags, setTags] = useState([]);

  // 이게 있어야 tag가 변경됌
  useEffect(() => {
    setValue('diseaseTags', tags);
  }, [tags]);

  const onSubmit = async (data) => {
    try {
      await patientService.updatePatient(patient.patNo, { ...patient, ...data });
      toast.success('돌봄대상자 수정완료!');
      navigate('/guardian/patient');
    } catch (error) {
      console.log(error);
    }
  };

  const deletePatient = async (patNo) => {
    const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');

    if (!confirmDelete) return; // 사용자가 취소하면 함수 종료

    const updatedPatient = {
      ...patient,
      status: 'N',
    };

    try {
      await patientService.updatePatient(patNo, updatedPatient);
      toast.success('돌봄대상자 삭제완료!');
      navigate('/guardian/patient');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AuthContainer>
        <FromWrap>
          <Title>돌봄 대상자 목록</Title>
          <Img src="/src/assets/profileImg/img_환자소.png"></Img>
          <GridForm onSubmit={handleSubmit(onSubmit)}>
            <GridInerContainer>
              <Label htmlFor="patName">이름</Label>
              <Label htmlFor="patAge">나이</Label>
              <Input type="text" id="patName" {...register('patName')} $error={errors.patName} />
              <Input type="number" id="patAge" {...register('patAge')} $error={errors.patAge} />
              {errors.patName && <ErrorMessage>{errors.patName.message}</ErrorMessage>}
              {errors.patAge && <ErrorMessage>{errors.patAge.message}</ErrorMessage>}
            </GridInerContainer>

            <GenderRadioGroup>
              <Label>성별</Label>
              <RadioWrapper checked={currentGender === 'M'}>
                {' '}
                {/* checked prop 전달 */}
                <input
                  type="radio"
                  id="M"
                  name="patGender"
                  value="M"
                  checked={currentGender === 'M'} // watch 값으로 제어
                  {...register('patGender')} // register만 남김
                  $error={errors.patGender}
                />
                <label htmlFor="M">남성</label>
              </RadioWrapper>
              <RadioWrapper checked={currentGender === 'F'}>
                {/* checked prop 전달 */}
                <input
                  type="radio"
                  id="F"
                  name="patGender"
                  value="F"
                  checked={currentGender === 'F'} // watch 값으로 제어
                  {...register('patGender')} // register만 남김
                  $error={errors.patGender}
                />
                <label htmlFor="F">여성</label>
              </RadioWrapper>
              {errors.patGender && <ErrorMessage>{errors.patGender.message}</ErrorMessage>}
            </GenderRadioGroup>

            <InputGroup>
              <Label htmlFor="phone">보호자 전화번호</Label>
              <Input
                type="text"
                id="phone"
                {...register('patPhone')}
                $error={errors.patPhone}
                onChange={(e) => {
                  const formatted = formatPhoneNumber(e.target.value);
                  setValue('patPhone', formatted); // react-hook-form의 값도 갱신
                }}
              />{' '}
              {errors.patPhone && <ErrorMessage>{errors.patPhone.message}</ErrorMessage>}
            </InputGroup>

            <InputGroup>
              <Label htmlFor="patAddress">주소</Label>
              <Row>
                <AddressInput
                  type="text"
                  id="patAddress"
                  {...register('patAddress')}
                  $error={errors.patAddress}
                  placeholder="주소를 검색해주세요"
                  readOnly
                />
                <PostcodeSearch onAddressSelected={setAddressData} />
              </Row>

              {errors.patAddress && <ErrorMessage>{errors.patAddress.message}</ErrorMessage>}
            </InputGroup>

            <GridInerContainer>
              <Label htmlFor="patHeight">키</Label>
              <Label htmlFor="patWeight">몸무게</Label>
              <HeightWegithDiv>
                <Input type="number" id="patHeight" {...register('patHeight')} $error={errors.patHeight} />
                <span>cm</span>
              </HeightWegithDiv>

              <HeightWegithDiv>
                <Input type="number" id="patWeight" {...register('patWeight')} $error={errors.patWeight} />
                <span>kg</span>
              </HeightWegithDiv>

              {errors.patWeight && <ErrorMessage>{errors.patWeight.message}</ErrorMessage>}
              {errors.patHeight && <ErrorMessage>{errors.patHeight.message}</ErrorMessage>}
            </GridInerContainer>

            <InputGroup>
              <Tags
                tags={tags}
                id="diseaseTags"
                handleTagChange={handleTagChange}
                {...register('diseaseTags')}
                $error={errors.tags}
              />
            </InputGroup>

            <InputGroup>
              <Label htmlFor="patContent">환자 특이사항</Label>
              <NotesTexttarea
                id="notes"
                className="textarea-field"
                rows="5"
                {...register('patContent')}
                $error={errors.patContent}
              />
              {errors.patContent && <ErrorMessage>{errors.patContent.message}</ErrorMessage>}
            </InputGroup>
            <BtnWrap>
              <BackBtn type="button" onClick={() => navigate(-1)}>
                이전
              </BackBtn>
              <SubmitBtn type="submit">수정</SubmitBtn>
              <SubmitBtn type="button" onClick={() => deletePatient(patNo)}>
                삭제
              </SubmitBtn>
            </BtnWrap>
          </GridForm>
        </FromWrap>
      </AuthContainer>
    </>
  );
};

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const AddressInput = styled(Input)`
  width: 100%;
`;

export default PatientUpdate;
