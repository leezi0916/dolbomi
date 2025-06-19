import React from 'react';
import { useState } from 'react';

import { Label } from '../styles/Auth.styles';
import { Input } from '../styles/Auth.styles';
import { DiseaseDiv,DiseaseBtn, TagsUl } from '../styles/PatientRegistration';
const Tags = ({tags, setTags}) => {
  
  const [inputValue, setInputValue] = useState();
  const removeTags = (indexToRemove) => {
    const filter = tags.filter((_, index) => index !== indexToRemove);
    setTags(filter);
  };
  const addTags = () => {
    if (inputValue !== '' && !tags.includes(inputValue)) {
      
      setTags([...tags, inputValue]);
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
        <Input type="text" placeholder="질병 입력" value={inputValue} onChange={handleInputChange} />
        {/* <input type="hidden" {...register('tags')} value={tags}></input> */}
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
