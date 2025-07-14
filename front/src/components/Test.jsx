import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // 달력 css
import { useState } from 'react';
import { ko } from "date-fns/locale"; 
import {dateArea} from '../styles/dateArea'

const Test = () => {
	const [startDate, setStartDate] = useState(
    new Date()  // 시작날짜를 오늘 날짜 7일전으로 설정
  );
  const [endDate, setEndDate] = useState(new Date());

	return (
    <div css={dateArea}>
       <form>
         <div className="datePickerArea">
           <DatePicker
              locale={ko}
              dateFormat="yyyy년 MM월 dd일"
              dateFormatCalendar="yyyy년 MM월"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              disabledKeyboardNavigation
              popperPlacement="bottom"
              popperModifiers={{
	             //@ts-ignore
	             flip: {
	               behavior: ["bottom"],
	             },
	             preventOverflow: {
	               enabled: false,
	             },
	             hide: {
	                enabled: false,
                },
              }}
            />
            <span className="rangeSign">-</span>
            {/* <DatePicker
              locale={ko}
              dateFormat="yyyy년 MM월 dd일"
              dateFormatCalendar="yyyy년 MM월"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              maxDate={new Date()}
              disabledKeyboardNavigation
              popperPlacement="bottom"
              popperModifiers={{
                //@ts-ignore
                flip: {
                  behavior: ["bottom"],
                },
                preventOverflow: {
                  enabled: false,
                },
                hide: {
                  enabled: false,
               },
             }}
           /> */}
         </div>
         <button className="searchBtn">검색</button>
       </form>
    </div>
  );
}
  export default Test;