import React from 'react';
import './DateInput.css';

const DateInput = ({ label, list, onChangeHandler, selectedDate }) => {
  let labelMessage = '';
  if (label === 'start') labelMessage = 'Start date: ';
  if (label === 'end') labelMessage = 'End date: ';

  return (
    <div className="dateSelector">
      <label htmlFor={label}>{labelMessage}</label>
      <select id={label} onChange={onChangeHandler}>
        {list.map(([date]) => (
          <option key={date} value={date} defaultValue={selectedDate}>
            {date}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DateInput;
