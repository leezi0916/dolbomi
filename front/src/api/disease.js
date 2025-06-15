import { useStore } from 'zustand';
import api from './axios';
import { API_ENDPOINTS } from './config';
import { create } from 'zustand';

export const diseaseService = create((set,get) => ({
  
  disNameInput : '',
  disNameList : [],

  setDisNameInput : (e) => set({disNameInput:e.target.value}),
  

  setDisNameList: () => {
    const {disNameInput, disNameList} = get();
    if (disNameInput.trim()) {
   set({disNameList : [...disNameList, disNameInput.trim()],
   disNameInput : ''
   });
  }

  }, 
  
  postDisease : async () => {
    const {disNameList} = get();
    const disNameLists = disNameList?
    
    disNameList:"";

    console.log('질병 리스트:',disNameLists);
    try{
      await api.post(API_ENDPOINTS.DISEASE.BASE,
        {disName : disNameLists});
    }catch(error){
      throw new Error('서버 통신 불량')
    }
  },
}));

