import React from 'react';
import './DateInput.css';

const DateInput = ({ label, list, onChangeHandler, selectedDate }) => {
  let labelMessage = '';
  if (label === 'start') labelMessage = 'Start date: ';
  if (label === 'end') labelMessage = 'End date: ';

  return (
    <div className="dateSelector">
      <label htmlFor={label}>{labelMessage}</label>
      <select className="select" id={label} onChange={onChangeHandler}>
        {list.map(([date]) => (
          // Chrome warns about using 'selected', but this is the only way I know of having the correct dates being shown
          <option key={date} value={date} selected={date === selectedDate}>
            {date}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DateInput;
