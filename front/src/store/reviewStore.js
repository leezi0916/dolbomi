import axios from 'axios';
import { create } from 'zustand';
//삭제예정
const useReviewStore = create((set) => ({
  rating: 0,
  inputValue: '',

  setRating: (rating) => set({ rating }),

  setInputValue: (inputValue) => set({ inputValue }),

  reset: () => set({ rating: 0, inputValue: '' }),

  saveReview: async () => {
    try {
      const { rating, inputValue } = useReviewStore.getState();
      const response = await axios.post('/api/reviews', {
        rating,
        inputValue,
      });
      console.log('리뷰 저장: ', response.data);
    } catch (error) {
      console.error('에러: ', error.response?.data || '리뷰저장할때 에러발생');
    }
  },
}));

export default useReviewStore;
