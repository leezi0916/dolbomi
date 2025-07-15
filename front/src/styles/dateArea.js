import { css } from '@emotion/react';

export const dateArea = css`
  height: 50px;

  > form {
    height: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: space-between;

    .datePickerArea {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 100%;
      border-radius: 30px;
      overflow: hidden;
      background: #ffd480;

      .rangeSign {
        font-size: 20px;
        margin: 0 10px;
      }
      .react-datepicker-wrapper {  // input 영역
        height: 100%;
        flex: 1;

        .react-datepicker__input-container { // input 영역
          height: 100%;

          input {
            width: 100%;
            height: 100%;
            font-size: 18px;
            border: none;
            text-align: center;
            background: #ffd480;
          }
        }
      }

      .react-datepicker {  // 달력 전체 
        border: none;
        background-color: #ffd480;
        overflow: hidden;
        border-radius: 8px;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

        .react-datepicker__navigation { // 월변경 하는 화살표 
          top: 5px;
        }

        .react-datepicker__header, // 헤더
        .react-datepicker__month-container {  // 달력 전체 
          background: #ffd480;
        }

        .react-datepicker__navigation-icon::before {  // 월변경 하는 화살표 
          border-color: #000;
        }

        .react-datepicker__header {
          padding: 12px 0 0 0;

          .react-datepicker__current-month { // 달력에 표기되는 년도 월
            font-size: 12px;
          }

          .react-datepicker__day-names { // 요일을 감싸고 있는 div 태그
            margin-bottom: 0;
            padding-top: 12px;
          }
        }
        .react-datepicker__current-month,
        .react-datepicker__day-names > div,
        .react-datepicker__day {  // 날짜 
          color: #000;
        }

        .react-datepicker__day--disabled { // 선택이 안된 날짜
          color: #838383;
        }

        .react-datepicker__day--today { // 오늘 날짜
          color: #e21700;
        }

        .react-datepicker__day--selected,   
        .react-datepicker__day--in-range,
        .react-datepicker__day:hover:not(.react-datepicker__day--disabled) { //선택된 날짜
          background-color: #fa935f;
        }

        .react-datepicker__day--in-range:not(
            .react-datepicker__day--in-selecting-range  
          ) {                                            // 선택된 날자 변경시            
          background-color: rgba(33, 107, 165, 0.5);
        }
      }
    }

    .searchBtn {
      width: 150px;
      height: 100%;
      font-size: 16px;
      border-radius: 30px;
      background-color: #ffd480;
    }
  }
`;
