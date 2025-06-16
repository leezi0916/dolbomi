import { useStore } from 'zustand';
import api from './axios';
import { API_ENDPOINTS } from './config';

export const patientService = {
  //환자목록조회
  getPatients: async (guardianNo) => {

    try {
      const { data } = await api.get(API_ENDPOINTS.PATIENT.DETAIL(guardianNo));
      return data;
    } catch (error) {
      if (error.response) {
        const message = error.response?.data?.message || '환자목록을 불러오는데 실패했습니다.';
        throw new Error(message);
      }

      throw new Error('서버 통신 불량');
    }
  },

  postNewPatient : async (data) => {
    try{

      await api.post(API_ENDPOINTS.PATIENT.BASE,data)
    }catch(error){
      throw new Error('서버 통신 불량')
    }
   

  }
};
