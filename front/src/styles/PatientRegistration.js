import { styled } from 'styled-components';
import { Button } from './Auth.styles';
import { Title } from './Auth.styles';

export const FromWrap = styled.div`
  background-color: white;
  box-shadow: ${({ theme }) => theme.shadows.base};
`;
export const GridForm = styled.form`
  display: grid;
  width: 80%;
  grid-template-columns: 1fr;
  text-align: left;
  gap: ${({ theme }) => theme.spacing[8]};
  margin: auto;
`;

export const NewTitle = styled(Title)`
  text-align: left;
  padding: ${({ theme }) => theme.spacing[8]};
`;

export const Img = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

export const GridInerContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  gap: ${({ theme }) => theme.spacing[1]} 10px;
`;

export const GenderRadioGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[8]};
  align-items: center;
`;

export const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};

  // 'checked' prop을 받아서 스타일을 동적으로 적용합니다.
  input[type='radio'] {
    appearance: none;
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    outline: none;
    cursor: pointer;
    position: relative;
    transition: all 0.2s ease-in-out;

    // RadioWrapper에서 전달받은 checked prop 사용
    border: 2px solid ${({ theme, checked }) => (checked ? theme.colors.primary : theme.colors.gray[400])};
  }

  input[type='radio']::before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.2s ease-in-out;
  }

  input[type='radio']:checked::before {
    transform: translate(-50%, -50%) scale(1);
  }

  label {
    font-size: ${({ theme }) => theme.fontSizes.base};
    color: ${({ theme }) => theme.colors.gray[3]};
    cursor: pointer;
  }
`;

export const HeightWegithDiv = styled.div`
  display: grid;
  grid-template-columns: auto 30px;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
`;

export const DiseaseDiv = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;

  input {
    border-radius: 4px 0px 4px 0px;
  }
`;

export const DiseaseBtn = styled(Button)`
  border-radius: 0 4px 4px 0;
`;
export const NotesTexttarea = styled.textarea`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.gray[5]};
  border-radius: 4px;
  resize: none;
`;

export const SubmitBtn = styled(Button)`
  margin-bottom: 50px;
`;
export const TagsUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 8px 0 0 0;

  li {
    width: auto;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.primary};
    padding: 0 ${({ theme }) => theme.spacing[3]};
    font-size: ${({ theme }) => theme.fontSizes.base};
    list-style: none;
    border-radius: 12px;
    margin: 0 8px 8px 0;
    background: ${({ theme }) => theme.colors.gray[5]};
    gap: ${({ theme }) => theme.spacing[2]};
  }
`;
