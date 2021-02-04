import React, { useState, useEffect } from 'react';
import CSVReader from 'react-csv-reader';
import './App.css';
import DateInput from './components/DateInput/DateInput';
import Chart from './components/Chart/Chart';
import {
  calculateBullishTrend,
  sortByPriceChange,
  sortByTradingVolume,
} from './components/BusinessLogic/businessLogic';

// Using local storage so we don't lose the file, selected dates, or the current state of the list on page reload
import {
  clearLocalStorage,
  getCSVStateFromLocalStorage,
  getCurrentListStateFromLocalStorage,
  getStartDateStateFromLocalStorage,
  getEndDateStateFromLocalStorage,
  storeCSVStateInLocalStorage,
  storeCurrentListStateInLocalStorage,
  storeStartDateStateInLocalStorage,
  storeEndDateStateInLocalStorage,
} from './components/LocalStorage/localStorageHandler';

const App = () => {
  const [originalList, setOriginalList] = useState(
    getCSVStateFromLocalStorage()
  );
  const [currentList, setCurrentList] = useState(
    getCurrentListStateFromLocalStorage()
  );
  const [priceChangeList, setPriceChangeList] = useState(null);
  const [volumeList, setVolumeList] = useState([]);
  const [startDate, setStartDate] = useState(
    getStartDateStateFromLocalStorage()
  );
  const [endDate, setEndDate] = useState(getEndDateStateFromLocalStorage());
  const [bullishCount, setBullishCount] = useState(0);
  const [bullishStart, setBullishStart] = useState('');
  const [bullishEnd, setBullishEnd] = useState('');
  const [radioSelection, setRadioSelection] = useState(null);

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

    setOriginalList(list);

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
    console.log('Radio button selected', event.target.value);
    setRadioSelection(event.target.value);
  };

  // Filters the array with user defined date range
  const filterList = (list) => {
    return list.filter(
      ([date]) =>
        new Date(date) <= new Date(endDate) &&
        new Date(date) >= new Date(startDate)
    );
  };

  // Updates the array of values displayed in the table
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

  // The side effect deciding which way to sort the list based on date range and radio button selection
  useEffect(() => {
    let bullishResponse = { days: 0, started: 'None', ended: 'Didnt' };
    let priceResponse = [];
    let volumeResponse = [];

    if (currentList) {
      if (radioSelection === 'Bullish') {
        bullishResponse = calculateBullishTrend(currentList);
        if (bullishResponse !== undefined) {
          setBullishCount(bullishResponse.days);
          setBullishStart(bullishResponse.started);
          setBullishEnd(bullishResponse.ended);
        }
      }

      if (radioSelection === 'Price') {
        priceResponse = sortByPriceChange(currentList);
        console.log('PRICE DIFF');
        console.table(priceResponse);
        setPriceChangeList(priceResponse);
      }

      if (radioSelection === 'Volume') {
        volumeResponse = sortByTradingVolume(currentList);
        console.log('VOLUME');
        console.table(volumeResponse);
        setVolumeList(volumeResponse);
      }
    }
  }, [currentList]);

  // TODO LIST
  // - DONE Sort currentList by Volume
  // - DONE Sort currentList by Price change
  // - Sort currentList by price change percentages
  // - Add price change column to Chart-component when highest price change is selected
  // - DONE Select sorting method by radio button
  // - PARTLY DONE Display message for Volume / Price change
  // - PARTLY DONE Display message for Price change percentage
  // - Save radio selection to local storage
  // - Refactor
  // - Write tests for each component
  // - Push to GitHub and send to Vincit for review

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
          <section>
            {new Date(startDate) <= new Date(endDate) && currentList ? (
              <div className="tableSection">
                <div className="radioSelect" onChange={radioButtonHandler}>
                  <input
                    type="radio"
                    id="bullish"
                    value="Bullish"
                    name="radioGroup"
                  />
                  <label htmlFor="bullish">Bullish trend</label>
                  <input
                    type="radio"
                    id="volume"
                    value="Volume"
                    name="radioGroup"
                  />{' '}
                  <label htmlFor="volume">Highest volume</label>
                  <input
                    type="radio"
                    id="pricechange"
                    value="Price"
                    name="radioGroup"
                  />{' '}
                  <label htmlFor="pricechange">Highest price change</label>
                  <input
                    type="radio"
                    id="opening"
                    value="Opening"
                    name="radioGroup"
                  />
                  <label htmlFor="opening">Opening price</label>
                </div>
                {radioSelection === 'Bullish' && (
                  <p>
                    In Apple stock historical data the Close/Last price
                    increased {bullishCount} days in a row between{' '}
                    {bullishStart} and {bullishEnd}
                  </p>
                )}

                {radioSelection === 'Volume' && (
                  <p>
                    In Apple stock historical data the DATE A had the highest
                    trading volume and significant stock price change between{' '}
                    {bullishStart} and {bullishEnd}
                  </p>
                )}

                {radioSelection === 'Opening' && (
                  <p>
                    In Apple stock historical data the DATE A had the highest
                    price change % with 8.69% in a day between {bullishStart}{' '}
                    and {bullishEnd}
                  </p>
                )}
                <Chart dataSet={currentList} />
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
