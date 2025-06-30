import React from 'react';
import { useState } from 'react';

import { Label } from '../styles/Auth.styles';
import { Input } from '../styles/Auth.styles';
import { DiseaseDiv, DiseaseBtn, TagsUl } from '../styles/PatientRegistration';
const Tags = ({ tags, handleTagChange }) => {
  const [inputValue, setInputValue] = useState('');
  const removeTags = (indexToRemove) => {
    const filter = tags.filter((_, index) => index !== indexToRemove);
    handleTagChange(filter);
  };
  const addTags = () => {
    if (inputValue !== '' && !tags.includes(inputValue)) {
      handleTagChange([...tags, inputValue]);
      setInputValue('');
    }
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <Label>보유한 질병을 작성해주세요.</Label>
      <DiseaseDiv>
        <Input
          type="text"
          placeholder="질병 입력"
          value={inputValue}
          onChange={handleInputChange}
          // 문제생길시 onKeyUp이든 onKeyDown이든 해결 방법 찾기
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault(); // 엔터 눌렀을 때 폼 제출 막기
              addTags(); // 대신 태그 추가 동작 실행
            }
          }}
        />
        <DiseaseBtn type="button" onClick={addTags}>
          질병 입력
        </DiseaseBtn>
        <TagsUl id="tags">
          {tags?.map((tag, index) => (
            <li key={index}>
              <span>{tag}</span>
              <span onClick={() => removeTags(index)}>
                <img src="/src/assets/icons/icon_닫기.png"></img>
              </span>
            </li>
          ))}
        </TagsUl>
      </DiseaseDiv>
    </>
  );
};

export default Tags;
