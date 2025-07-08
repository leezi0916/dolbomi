import React, { useEffect, useState } from 'react';
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
  NewTitle,
  BtnWrap,
  BackBtn,
} from '../styles/PatientRegistration';
import { AuthContainer, Label, Input, InputGroup, ErrorMessage } from '../styles/Auth.styles';
import { usepatientRegistrationForm } from '../hooks/usePatientRegistrationForm';
import useUserStore from '../store/userStore';
import { useNavigate } from 'react-router-dom';
import { patientService } from '../api/patient';
import { toast } from 'react-toastify';
import Tags from '../components/Tags';
import styled from 'styled-components';
import PostcodeSearch from '../components/PostcodeSearch';

const PatientRegistration = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const { register, handleSubmit, errors, onSubmit, watch, setValue, formatPhoneNumber } =
    usepatientRegistrationForm(user);

  useEffect(() => {
    // 일단 접근가능하게 로그인 구현 되면 user -> !user 바꿀것
    if (!user) {
      alert('로그인 후 이용해주세요');
      navigate('/guardian');
    }
  }, [user]);

  // 'gender' 필드의 현재 값을 watch하여 라디오 버튼의 checked 상태를 제어합니다.
  const currentGender = watch('patGender');

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

  const [tags, setTags] = useState([]);
  useEffect(() => {
    setValue('tags', tags);
  }, [tags, setValue]);

  const handleTagChange = (newVal) => {
    setTags(newVal); // set을 대체하는 커스텀 함수
  };

  return (
    <>
      <AuthContainer>
        <FromWrap>
          <NewTitle>돌봄 대상자 등록</NewTitle>
          <Img src="/src/assets/profileImg/img_환자소.png"></Img>
          <GridForm onSubmit={handleSubmit(onSubmit)}>
            <GridInerContainer>
              <Label htmlFor="patName">이름</Label>
              <Label htmlFor="patAge">나이</Label>
              <Input
                type="text"
                id="patName"
                placeholder="이름을 입력해주세요"
                {...register('patName')}
                $error={errors.patName}
              />
              <Input
                type="number"
                id="patAge"
                min="0"
                placeholder="나이를 입력해주세요"
                onWheel={(e) => e.target.blur()}
                {...register('patAge')}
                $error={errors.patAge}
              />
              {errors.patName && <ErrorMessage>{errors.patName.message}</ErrorMessage>}
              {errors.patAge && <ErrorMessage>{errors.patAge.message}</ErrorMessage>}
            </GridInerContainer>

            <GenderRadioGroup>
              <Label>성별</Label>
              <RadioWrapper checked={currentGender === 'M'}>
                {/* checked prop 전달 */}
                <input
                  type="radio"
                  id="M"
                  name="patGender"
                  value="M"
                  checked={currentGender === 'M'} // watch 값으로 제어
                  {...register('patGender')}
                  $error={errors.patGender} // register만 남김
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
                  {...register('patGender')}
                  $error={errors.patGender} // register만 남김
                />
                <label htmlFor="F">여성</label>
              </RadioWrapper>
              {errors.patGender && <ErrorMessage>{errors.patGender.message}</ErrorMessage>}
            </GenderRadioGroup>

            <InputGroup>
              <Label htmlFor="phone">비상연락망</Label>
              <Input
                type="text"
                id="phone"
                placeholder="전화번호를 입력해주세요"
                {...register('patPhone')}
                $error={errors.patPhone}
                onChange={(e) => {
                  const formatted = formatPhoneNumber(e.target.value);
                  setValue('patPhone', formatted); // react-hook-form의 값도 갱신
                }}
              />
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
              <Label htmlFor="height">키</Label>
              <Label htmlFor="weight">몸무게</Label>

              <HeightWegithDiv>
                <Input type="number" step="0.01" id="patHeight" {...register('patHeight')} $error={errors.patHeight} />

                <span>cm</span>
              </HeightWegithDiv>

              <HeightWegithDiv>
                <Input type="number" step="0.01" id="patWeight" {...register('patWeight')} $error={errors.patWeight} />

                <span>kg</span>
              </HeightWegithDiv>

              {errors.patHeight && <ErrorMessage>{errors.patHeight.message}</ErrorMessage>}
              {errors.patWeight && <ErrorMessage>{errors.patWeight.message}</ErrorMessage>}
            </GridInerContainer>

            <InputGroup>
              <Tags tags={tags} handleTagChange={handleTagChange} $error={errors.tags} />
              {errors.tags && <ErrorMessage>{errors.tags.message}</ErrorMessage>}
            </InputGroup>

            <InputGroup>
              <Label htmlFor="patContent">돌봄대상자 특이사항</Label>
              <NotesTexttarea
                id="notes"
                className="textarea-field"
                rows="5"
                placeholder="돌봄대상자의 특이사항을 입력해주세요"
                {...register('patContent')}
                $error={errors.patContent}
              />
              {errors.patContent && <ErrorMessage>{errors.patContent.message}</ErrorMessage>}
            </InputGroup>

            <BtnWrap>
              <BackBtn type="button" onClick={() => navigate(-1)}>
                이전
              </BackBtn>
              <SubmitBtn type="submit">등록</SubmitBtn>
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

export default PatientRegistration;
