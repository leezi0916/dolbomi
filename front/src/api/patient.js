import { useStore } from 'zustand';
import api from './axios';
import { API_ENDPOINTS } from './config';
import { snakeToCamel } from '../utils/formatData';

export const patientService = {
  //환자목록조회
  getPatients: async (guardianNo) => {
    try {
      console.log(guardianNo);
      const { data } = await api.get(API_ENDPOINTS.PATIENT.DETAIL(guardianNo));

      return snakeToCamel(data);
    } catch (error) {
      if (error.response) {
        const message = error.response?.data?.message || '환자목록을 불러오는데 실패했습니다.';
        throw new Error(message);
      }

      throw new Error('서버 통신 불량');
    }
  },

  //환자등록
  postNewPatient: async (data) => {
    try {
      await api.post(API_ENDPOINTS.PATIENT.BASE, data);
    } catch (error) {
      console.log(error);
      throw new Error('서버 통신 불량');
    }
  },

  //환자번호로 정보 가져오기
  getPatientId: async (id) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.PATIENT.PATDETAIL(id));
      return snakeToCamel(data[0]);
    } catch (error) {
      if (error.response) {
        const message = error.response?.data?.message || '환자목록을 불러오는데 실패했습니다.';
        throw new Error(message);
      }
      throw new Error('서버 통신 불량');
    }
  },
  updatePatinet: async (data) => {
    try {
      await api.put(API_ENDPOINTS.PATIENT.PUT(data.id), { ...data });
    } catch (error) {
      console.error('돌봄대상자 수정 실패:', error);
      throw new Error('돌봄대상자 수정하는데 실패했습니다.');
    }
  },

  deletPatient: async (id) => {
    try {
      await api.delete(API_ENDPOINTS.PATIENT.DELETE(id));
    } catch (error) {
      console.error('돌봄대상자 수정 실패:', error);
      throw new Error('돌봄대상자 수정하는데 실패했습니다.');
    }
  },
};
