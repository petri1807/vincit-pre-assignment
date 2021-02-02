import React, { useState, useEffect } from 'react';
import CSVReader from 'react-csv-reader';
import './App.css';

import Chart from './components/Chart/Chart';

const getStateFromLocalStorage = () => {
  const storage = localStorage.getItem('csvState');
  console.log('Getting state from local storage');
  if (storage) return JSON.parse(storage).csv;
  return null;
};

const storeStateInLocalStorage = (csv) => {
  localStorage.setItem('csvState', JSON.stringify({ csv }));
  console.log('Setting state to local storage', localStorage);
};

const clearLocalStorage = () => {
  localStorage.clear();
};

const App = () => {
  const [table, setTable] = useState(getStateFromLocalStorage());
  const [loaded, setLoaded] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    storeStateInLocalStorage(table);
  }, [table]);

  const handleStartDate = (event) => {
    // console.log(event.target.value);
    // console.log(typeof event.target.value);
    setStartDate(new Date(event.target.value));
  };

  const handleEndDate = (event) => {
    // console.log(event.target.value);
    // console.log(typeof event.target.value);
    setEndDate(new Date(event.target.value));
  };

  if (startDate && endDate) {
    console.log('End date is after start date: ', endDate > startDate);
  }

  return (
    <div className="App">
      <CSVReader
        onFileLoaded={(data, fileInfo) => {
          console.log('File loaded manually');
          setTable(data);
          setLoaded(true);
        }}
      />
      <button onClick={clearLocalStorage} name="clear">
        Clear local storage
      </button>

      {table && (
        <div>
          <section>
            <label htmlFor="startDate">Select start date</label>
            <select id="startDate" name="Start date" onChange={handleStartDate}>
              {table.map((item) => (
                <option key={item[0]} value={item[0]}>
                  {item[0]}
                </option>
              ))}
            </select>
          </section>
          <section>
            <label htmlFor="endDate">Select end date</label>
            <select id="endDate" name="End date" onChange={handleEndDate}>
              {table.map((item) => (
                <option key={item[0]} value={item[0]}>
                  {item[0]}
                </option>
              ))}
            </select>
          </section>
          <Chart dataSet={table} />
        </div>
      )}
    </div>
  );
};

export default App;
