import React, { useState } from 'react'
import styled from 'styled-components'
import { ModalCloseButton, ModalContainer, ModalInput, ModalText } from '../styles/common/Modal'
import { ButtonText, SubmitButton } from '../styles/common/Button'
import { FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const ReviewModal = ({maxHearts = 5}) => {

  const [rating, setRating] = useState(0); //선택후 고정된 별점
  const [hovered, setHovered] = useState(0); //마우스 호버된 별점
  const navigate = useNavigate();

  const handleRating = (index) => {
    setRating(index + 1); // 0부터 시작
  }

  const handleSubmit = () => {
    navigate('/', {state : rating, })
  }
  return (
    <ModalContainer>
      <LogoImg src='logo.png'/>
      <LogoImg src='dolbomi.png'/>
      <ModalText>리뷰를 작성해주세요.</ModalText>
      <Heart>
      {Array.from({ length: maxHearts }).map((_, index) => (
        <FaHeart
          key={index}
          onClick={() => handleRating(index)}
          onMouseEnter={() => setHovered(index + 1)} // 마우스를 올렸을 때 효과
          onMouseLeave={() => setHovered(0)} // 마우스가 벗어나면 초기화
          size={40}
          style={{
            cursor: "pointer",
            color: index < (hovered || rating) ? "#EB5757" : '#ddd',
            transition: "color 0.3s ease",
          }}
        />
      ))}
    </Heart>

      <Input placeholder='ex) 좋은 간병 감사합니다!'/>

      <Button onClick={() => handleSubmit}>
        <ButtonText>리뷰 작성하기</ButtonText>
      </Button>

    <ModalCloseButton onClick='#'><img src='Union.png'/></ModalCloseButton>
    </ModalContainer>
    
  )
}

const Button = styled(SubmitButton)`
  width: 60%;
`

const LogoImg = styled.img`
  width: 80px;
`

const Input = styled(ModalInput)`
  margin-top: 30px;
`

const Heart = styled.div`
  display: flex;
  gap: 10px;
`

export default ReviewModal