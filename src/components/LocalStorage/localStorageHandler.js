// CSV data
export const getCSVStateFromLocalStorage = () => {
  const storage = localStorage.getItem('csvState');
  // console.log('Getting state from local storage');
  if (storage) return JSON.parse(storage).csv;
  return null;
};

export const storeCSVStateInLocalStorage = (csv) => {
  localStorage.setItem('csvState', JSON.stringify({ csv }));
  // console.log('Setting state to local storage', localStorage);
};

// List status depending on user selected date range
export const getCurrentListStateFromLocalStorage = () => {
  const storage = localStorage.getItem('currentListState');
  // console.log('GET LOCALSTORAGE, currentList', storage);
  if (storage) return JSON.parse(storage).array;
  return null;
};

export const storeCurrentListStateInLocalStorage = (array) => {
  localStorage.setItem('currentListState', JSON.stringify({ array }));
  // console.log('SET LOCALSTORAGE, currentList', localStorage);
};

// Selected start date
export const getStartDateStateFromLocalStorage = () => {
  const storage = localStorage.getItem('startDate');
  // console.log('GET LOCALSTORAGE, startDate', storage);
  if (storage) return JSON.parse(storage).date;
};

export const storeStartDateStateInLocalStorage = (date) => {
  localStorage.setItem('startDate', JSON.stringify({ date }));
  // console.log('SET LOCALSTORAGE, startDate', localStorage);
};

// Selected end date
export const getEndDateStateFromLocalStorage = () => {
  const storage = localStorage.getItem('endDate');
  // console.log('GET LOCALSTORAGE, endDate', storage);
  if (storage) return JSON.parse(storage).date;
};

export const storeEndDateStateInLocalStorage = (date) => {
  localStorage.setItem('endDate', JSON.stringify({ date }));
  // console.log('SET LOCALSTORAGE, endDate', localStorage);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};
