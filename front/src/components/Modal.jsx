import React, { useState } from 'react';
import styled from 'styled-components';
import { ModalCloseButton, ModalContainer, ModalInput, ModalText } from '../styles/common/Modal';
import { ButtonText, SubmitButton } from '../styles/common/Button';
import { FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const Modal = ({ maxHearts = 5 }) => {
  const [inputValue, setInputValue] = useState(null);
  const [rating, setRating] = useState('');
  const [hovered, setHovered] = useState(0); //마우스 호버된 별점
  const [error, setError] = useState(null);
  
  const navigator = useNavigate();

  const handleSubmit = async () => {
    try {
    } catch (error) {
      console.error(error);
      const errorMessage = '리뷰를 불러오는데 실패했습니다.';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  if (error) {
    return null;
  }

  return (
    <ModalConatainerInfo>
      <LogoImg src="logo.png" />
      <LogoImg src="dolbomi.png" />
      
      <TextWrap>
        <TextWrapP> 환자등록이 완료되었습니다 </TextWrapP>
        <TextWrapP> 구인글 작성해야 돌봄대상자 목록에 올라갑니다.</TextWrapP>
      </TextWrap>
      
      <BtnDiv onClick={handleSubmit}>
        <Button  onClick={() => navigator('/guardian/patient')}>
            <TextP> 환자목록</TextP>
            <FaArrowRight color="white" ></FaArrowRight>
        </Button>
        <Button  onClick={() => navigator('/guardian/jobopening-management')}>
          <TextP>구인등록</TextP>
          <FaArrowRight color="white"></FaArrowRight>
        </Button>
      </BtnDiv>

    </ModalConatainerInfo>
  );
};
const ModalConatainerInfo = styled(ModalContainer)`
margin-top: 100px;
height: fit-content;
`

const TextWrap =styled.div`
display: flex;
flex-direction: column;
gap: 5px;
justify-content: center;
margin: 30px;
`
const TextWrapP =styled.p`
    font-size: ${({theme}) => theme.fontSizes.m};
    font-weight: ${({theme}) => theme.fontWeights.regular};

`
const Button = styled(SubmitButton)`
  display: flex;
  gap: 10px;
  width: fit-content;
  align-items: center;
  justify-content: center;
`;

const TextP = styled.p`
  color: white;
`;

const LogoImg = styled.img`
  width: 80px;
`;

const Input = styled(ModalInput)`
  margin-top: 30px;
`;

const BtnDiv = styled.div`
  display: flex;
  gap: 10px;
`;

export default Modal;
