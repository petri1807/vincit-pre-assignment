import React, { useState, useEffect } from 'react';
import CSVReader from 'react-csv-reader';
import './App.css';
import DateInput from './components/DateInput/DateInput';
import { calculateBullishTrend } from './components/BusinessLogic/BusinessLogic';

import Chart from './components/Chart/Chart';
import {
  clearLocalStorage,
  getCSVStateFromLocalStorage,
  storeCSVStateInLocalStorage,
  getCurrentListStateFromLocalStorage,
  storeCurrentListStateInLocalStorage,
} from './components/LocalStorage/localStorageHandler';

const App = () => {
  const [originalList, setOriginalList] = useState(
    getCSVStateFromLocalStorage()
  );
  const [currentList, setCurrentList] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bullishCount, setBullishCount] = useState(0);
  const [bullishStart, setBullishStart] = useState('');
  const [bullishEnd, setBullishEnd] = useState('');

  const startDateHandler = (event) => {
    setStartDate(event.target.value);
  };

  const endDateHandler = (event) => {
    setEndDate(event.target.value);
  };

  const fileHandler = (data) => {
    // tossing the labels from csv file and returning only values that matter
    const list = data.slice(1);

    setOriginalList(list);

    // Start out with the previous 5 dates showing
    setStartDate(list[4][0]);
    setEndDate(list[0][0]);
  };

  const filterList = (list) => {
    return list.filter(
      ([date]) =>
        new Date(date) <= new Date(endDate) &&
        new Date(date) >= new Date(startDate)
    );
  };

  const updateCurrentList = () => {
    const updated = filterList(originalList);
    storeCurrentListStateInLocalStorage(updated);
    setCurrentList(updated);
  };

  useEffect(() => {
    storeCSVStateInLocalStorage(originalList);
  }, [originalList]);

  useEffect(() => {
    if (originalList) {
      updateCurrentList();
    }
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      updateCurrentList();
    }
  }, [startDate, endDate]);

  useEffect(() => {
    let bullishResponse = { days: 0, started: 'None', ended: 'Didnt' };
    if (currentList) {
      bullishResponse = calculateBullishTrend(currentList);
      if (bullishResponse !== undefined) {
        setBullishCount(bullishResponse.days);
        setBullishStart(bullishResponse.started);
        setBullishEnd(bullishResponse.ended);
      }
    }
  }, [currentList]);

  useEffect(() => {
    console.log('CURRENTLIST: ', currentList);
  }, [currentList]);

  return (
    <div className="App">
      <section className="fileInput">
        <CSVReader
          onFileLoaded={(data, fileInfo) => {
            console.log(fileInfo);
            fileHandler(data);
          }}
        />
        <button className="button" onClick={clearLocalStorage} name="clear">
          Clear local storage
        </button>
      </section>

      {originalList && (
        <div>
          <section className="dateInputs">
            <DateInput
              label="start"
              list={originalList}
              onChangeHandler={startDateHandler}
              selectedDate={startDate}
            />
            <DateInput
              label="end"
              list={originalList}
              onChangeHandler={endDateHandler}
              selectedDate={endDate}
            />
          </section>
          <section className="tableSection">
            {/* Update so it doesn't show with invalid dates */}
            {currentList && (
              <p>
                In Apple stock historical data the Close/Last price increased{' '}
                {bullishCount} days in a row between {bullishStart} and{' '}
                {bullishEnd}
              </p>
            )}

            {/* Both dates must be selected (should be by default as csv is loaded in), 
            and currentList must have content in it before rendering the chart component */}
            {new Date(startDate) <= new Date(endDate) && currentList ? (
              <Chart dataSet={currentList} />
            ) : (
              <p style={{ color: 'red' }}>Invalid dates selected</p>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default App;
