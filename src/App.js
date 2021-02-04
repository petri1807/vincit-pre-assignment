import React, { useState, useEffect } from 'react';
import './App.css';

// Components
import FileInput from './components/FileInput/FileInput';
import DateInput from './components/DateInput/DateInput';
import RadioSelection from './components/RadioSelection/RadioSelection';
import Chart from './components/Chart/Chart';

// Sorting & calculations
import {
  calculateBullishTrend,
  sortByPriceChange,
  sortByTradingVolume,
} from './components/BusinessLogic/businessLogic';

// Using local storage so we don't lose the file, selected dates, or the current state of the list on page reload
import {
  getRawCSVStateFromLocalStorage,
  getDateRangeStateFromLocalStorage,
  getStartDateStateFromLocalStorage,
  getEndDateStateFromLocalStorage,
  storeRawCSVStateInLocalStorage,
  storeDateRangeStateInLocalStorage,
  storeStartDateStateInLocalStorage,
  storeEndDateStateInLocalStorage,
} from './components/LocalStorage/localStorageHandler';

const App = () => {
  const [rawCSV, setRawCSV] = useState(getRawCSVStateFromLocalStorage());
  const [dateRange, setDateRange] = useState(
    getDateRangeStateFromLocalStorage()
  );

  const [bullishList, setBullishList] = useState([]);
  const [priceChangeList, setPriceChangeList] = useState([]);
  const [volumeList, setVolumeList] = useState([]);
  const [startDate, setStartDate] = useState(
    getStartDateStateFromLocalStorage()
  );
  const [endDate, setEndDate] = useState(getEndDateStateFromLocalStorage());
  const [bullishCount, setBullishCount] = useState(0);
  const [bullishStart, setBullishStart] = useState('');
  const [bullishEnd, setBullishEnd] = useState('');
  const [radioSelection, setRadioSelection] = useState('Bullish');

  const startDateHandler = (event) => {
    storeStartDateStateInLocalStorage(event.target.value);
    setStartDate(event.target.value);
  };

  const endDateHandler = (event) => {
    storeEndDateStateInLocalStorage(event.target.value);
    setEndDate(event.target.value);
  };

  // Handles the CSV file
  const fileHandler = (data) => {
    // tossing the labels from csv file and returning only values that matter
    const list = data.slice(1);

    setRawCSV(list);

    // Start out with the previous 5 dates showing
    const initialStartDate = list[4][0];
    const initialEndtDate = list[0][0];

    // Set the date range in the hooks
    setStartDate(initialStartDate);
    setEndDate(initialEndtDate);

    // Set the date range in local storage
    storeStartDateStateInLocalStorage(initialStartDate);
    storeEndDateStateInLocalStorage(initialEndtDate);
  };

  const radioButtonHandler = (event) => {
    setRadioSelection(event.target.value);
  };

  // Filters the array with user defined date range
  const filterDateRange = (list) => {
    return list.filter(
      ([date]) =>
        new Date(date) <= new Date(endDate) &&
        new Date(date) >= new Date(startDate)
    );
  };

  // Updates the array with selected dates only
  const updateDateRange = () => {
    const updated = filterDateRange(rawCSV);
    storeDateRangeStateInLocalStorage(updated);
    setDateRange(updated);
  };

  useEffect(() => {
    storeRawCSVStateInLocalStorage(rawCSV);
    if (rawCSV) {
      updateDateRange();
    }
  }, [rawCSV]);

  useEffect(() => {
    if (startDate && endDate) {
      updateDateRange();
    }
  }, [startDate, endDate]);

  // The side effect deciding which way to sort the list based on date range and radio button selection
  useEffect(() => {
    let bullishResponse = { days: 0, started: 'None', ended: 'Didnt' };
    let priceResponse = [];
    let volumeResponse = [];

    if (dateRange) {
      if (radioSelection === 'Bullish') {
        setBullishList(dateRange);
        bullishResponse = calculateBullishTrend(dateRange);
        if (bullishResponse !== undefined) {
          setBullishCount(bullishResponse.days);
          setBullishStart(bullishResponse.started);
          setBullishEnd(bullishResponse.ended);
        }
      }

      if (radioSelection === 'Volume') {
        volumeResponse = sortByTradingVolume(dateRange);
        setVolumeList(volumeResponse);
      }

      if (radioSelection === 'Price') {
        priceResponse = sortByPriceChange(dateRange);
        setPriceChangeList(priceResponse);
      }
    }
  }, [dateRange, radioSelection]);

  // TODO LIST
  // - Sort currentList by price change percentages
  // - Display message for Price change percentage
  // - Save radio selection to local storage
  // - Refactor
  // - Write tests for each component
  // - Push to GitHub and send to Vincit for review

  return (
    <div className="App">
      <FileInput handler={fileHandler} />

      {/* Once a CSV file is loaded, display the rest */}
      {rawCSV && (
        <div>
          <section className="dateInputs">
            <DateInput
              label="start"
              list={rawCSV}
              onChangeHandler={startDateHandler}
              selectedDate={startDate}
            />
            <DateInput
              label="end"
              list={rawCSV}
              onChangeHandler={endDateHandler}
              selectedDate={endDate}
            />
          </section>
          <section>
            {/* Date range has to be set with start date being the same as or before end date */}
            {new Date(startDate) <= new Date(endDate) && dateRange ? (
              <div>
                {/* Selecting which way to sort the data */}
                <RadioSelection handler={radioButtonHandler} />

                {/* These could be abstracted away to it's own component */}
                {radioSelection === 'Bullish' && bullishList && (
                  <div className="tableSection">
                    <p>
                      In Apple stock historical data the Close/Last price
                      increased {bullishCount} days in a row between{' '}
                      {bullishStart} and {bullishEnd}
                    </p>
                    <Chart dataSet={dateRange} />
                  </div>
                )}

                {radioSelection === 'Volume' && volumeList.length > 0 && (
                  <div className="tableSection">
                    <p>
                      In Apple stock historical data {volumeList[0][0]} had the
                      highest trading volume at {volumeList[0][2]}
                    </p>
                    <Chart dataSet={volumeList} />
                  </div>
                )}

                {radioSelection === 'Price' && priceChangeList.length > 0 && (
                  <div className="tableSection">
                    <p>
                      In Apple stock historical data {priceChangeList[0][0]} had
                      the highest stock price change at {priceChangeList[0][6]}
                    </p>
                    <Chart dataSet={priceChangeList} />
                  </div>
                )}

                {radioSelection === 'Opening' && (
                  <div className="tableSection">
                    <p>This feature is still in development... Sorry</p>
                  </div>
                )}
              </div>
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
