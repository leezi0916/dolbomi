import React, { useState } from 'react';
import { AuthContainer } from '../styles/Auth.styles';
import { Title } from '../styles/Auth.styles';
import {
  GridForm,
  GridInerContainer,
  GenderRadioGroup,
  RadioWrapper,
  HeightWegithDiv,
  DiseaseDiv,
  DiseaseBtn,FromWrap, NotesTexttarea, SubmitBtn, Img
} from '../styles/PatientRegistration';
import { Label, Input, InputGroup, Button } from '../styles/Auth.styles';
import { usepatientRegistrationForm } from '../hooks/usePatientRegistrationForm';
import { diseaseService } from '../api/disease';

const PatientRegistration = () => {
  // watch 함수를 useSignUpForm 훅에서 가져옵니다.
  const { register, handleSubmit, errors, isSubmitting, watch } = usepatientRegistrationForm();

  // 'gender' 필드의 현재 값을 watch하여 라디오 버튼의 checked 상태를 제어합니다.
  const currentGender = watch('patGender');
  const {disNameInput, disNameList, setDisNameInput, setDisNameList, postDisease } = diseaseService();

  return (
    <>
      <AuthContainer>
        <FromWrap>
          <Title>돌봄 대상자 목록</Title>
<Img src="/src/assets/profileImg/img_환자소.png"></Img>
          <GridForm onSubmit={handleSubmit}>
            <GridInerContainer>
              <Label htmlFor="patName"                >이름</Label>
              <Label htmlFor="patAge">나이</Label>
              <Input type="text" id="patName" {...register('patName')} />
              <Input type="number" id="patAge"  {...register('patAge')}  />
            </GridInerContainer>

            <GenderRadioGroup>
              <Label>성별</Label>
              <RadioWrapper checked={currentGender === 'M'}>
                {' '}
                {/* checked prop 전달 */}
                <input
                  type="radio"
                  id='M'
                  name="patGender"
                  value='M'
                  checked={currentGender === 'M'} // watch 값으로 제어
                  {...register('patGender')} // register만 남김
                />
                <label htmlFor='M'>남성</label>
              </RadioWrapper>
              <RadioWrapper checked={currentGender === 'F'}>
                {/* checked prop 전달 */}
                <input
                  type="radio"
                  id='F'
                  name="patGender"
                  value='F'
                  checked={currentGender === 'F'} // watch 값으로 제어
                  {...register('patGender')} // register만 남김
                />
                <label htmlFor='F'>여성</label>
              </RadioWrapper>
            </GenderRadioGroup>

            <InputGroup>
              <Label htmlFor="phone">보호자 전화번호</Label>
              <Input type="text" id="phone" {...register('phone')} />
            </InputGroup>

            <InputGroup>
              <Label htmlFor="patAddress">주소</Label>
              <Input type="text" id="patAddress" {...register('patAddress')}  />
            </InputGroup>

            <GridInerContainer>
              <Label htmlFor="height">키</Label>
              <Label htmlFor="weight">몸무게</Label>
              <HeightWegithDiv>
                <Input type="number" id="patHeight" {...register('patHeight')} />
                <span >cm</span>
              </HeightWegithDiv>

              <HeightWegithDiv>
                <Input type="number" id="patWeight" {...register('patWeight')} />
                <span>kg</span>
              </HeightWegithDiv>
            </GridInerContainer>

            <InputGroup>
              <Label>보유한 질병을 작성해주세요.</Label>
              <DiseaseDiv>
                <Input type="text" placeholder="질병 입력" value={disNameInput} onChange={(e)=> setDisNameInput(e)} />
                <DiseaseBtn type="button" onClick={() => setDisNameList()} >질병 입력</DiseaseBtn>
                <input type="text" value={disNameList} {...register('disNameList')} />
              </DiseaseDiv>
            </InputGroup>

            <InputGroup>
              <Label htmlFor="patContent">환자 특이사항</Label>
              <NotesTexttarea id="notes" className="textarea-field" rows="5"  {...register('patContent')} />
            </InputGroup>

            <SubmitBtn type="submit" >
              등록
            </SubmitBtn>
          </GridForm>
        </FromWrap>
      </AuthContainer>
    </>
  );
};

export default PatientRegistration;
