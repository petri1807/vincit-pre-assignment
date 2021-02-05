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
  sortByOpeningPriceSMA,
} from './components/BusinessLogic/BusinessLogic';

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
  const [volumeList, setVolumeList] = useState([]);
  const [priceChangeList, setPriceChangeList] = useState([]);
  const [openingList, setOpeningList] = useState([]);

  const [startDate, setStartDate] = useState(
    getStartDateStateFromLocalStorage()
  );
  const [endDate, setEndDate] = useState(getEndDateStateFromLocalStorage());
  const [bullishCount, setBullishCount] = useState(0);
  const [bullishStart, setBullishStart] = useState('');
  const [bullishEnd, setBullishEnd] = useState('');
  const [openingError, setOpeningError] = useState(false);
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
    // Tossing the labels from csv file and returning only values that matter
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

  // Whenever csv file changes, store it in local storage
  useEffect(() => {
    storeRawCSVStateInLocalStorage(rawCSV);

    if (rawCSV) {
      updateDateRange();
    }
  }, [rawCSV]);

  // Whenever dates change, update the list
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
    let openingResponse = [];

    if (dateRange) {
      if (radioSelection === 'Bullish') {
        setBullishList(dateRange);
        bullishResponse = calculateBullishTrend(dateRange);

        if (bullishResponse) {
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

      if (radioSelection === 'Opening') {
        openingResponse = sortByOpeningPriceSMA(dateRange);
        if (openingResponse) {
          setOpeningError(false);
          setOpeningList(openingResponse);
        } else {
          setOpeningError(true);
        }
      }
    }
  }, [dateRange, radioSelection]);

  return (
    <div className="App">
      {!rawCSV && <p>Welcome, Scrooge! Open a .csv file to analyze the data</p>}
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

                {/* These could be abstracted away to a separate component */}
                {radioSelection === 'Bullish' && bullishList && (
                  <div className="tableSection">
                    <p>
                      In Apple stock historical data the Close/Last price
                      increased <b>{bullishCount}</b> days in a row between{' '}
                      <b>{bullishStart}</b> and <b>{bullishEnd}</b>
                    </p>
                    <Chart dataSet={dateRange} category="bullish" />
                  </div>
                )}

                {radioSelection === 'Volume' && volumeList.length > 0 && (
                  <div className="tableSection">
                    <p>
                      In Apple stock historical data <b>{volumeList[0][0]}</b>{' '}
                      had the highest trading volume at{' '}
                      <b>{volumeList[0][2]}</b>
                    </p>
                    <Chart dataSet={volumeList} category="volume" />
                  </div>
                )}

                {radioSelection === 'Price' && priceChangeList.length > 0 && (
                  <div className="tableSection">
                    <p>
                      In Apple stock historical data{' '}
                      <b>{priceChangeList[0][0]}</b> had the highest stock price
                      change within a day at <b>{priceChangeList[0][6]}</b>
                    </p>
                    <Chart dataSet={priceChangeList} category="price" />
                  </div>
                )}

                {radioSelection === 'Opening' && openingError && (
                  <p style={{ color: 'red' }}>
                    Needs at least a 6-day window selected to calculate SMA-5
                  </p>
                )}
                {radioSelection === 'Opening' &&
                  openingList.length > 0 &&
                  !openingError && (
                    <div className="tableSection">
                      <p>
                        In Apple stock historical data{' '}
                        <b>{openingList[0][0]}</b> had the highest stock price
                        change at <b>{openingList[0][6].toFixed(3)} %</b>
                      </p>
                      <Chart dataSet={openingList} category="opening" />
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
