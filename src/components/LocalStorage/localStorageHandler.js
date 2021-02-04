// CSV data
export const getRawCSVStateFromLocalStorage = () => {
  const storage = localStorage.getItem('csvState');
  if (storage) return JSON.parse(storage).csv;
  return null;
};

export const storeRawCSVStateInLocalStorage = (csv) => {
  localStorage.setItem('csvState', JSON.stringify({ csv }));
};

// List status depending on user selected date range
export const getDateRangeStateFromLocalStorage = () => {
  const storage = localStorage.getItem('currentListState');
  if (storage) return JSON.parse(storage).array;
  return null;
};

export const storeDateRangeStateInLocalStorage = (array) => {
  localStorage.setItem('currentListState', JSON.stringify({ array }));
};

// Selected start date
export const getStartDateStateFromLocalStorage = () => {
  const storage = localStorage.getItem('startDate');
  if (storage) return JSON.parse(storage).date;
};

export const storeStartDateStateInLocalStorage = (date) => {
  localStorage.setItem('startDate', JSON.stringify({ date }));
};

// Selected end date
export const getEndDateStateFromLocalStorage = () => {
  const storage = localStorage.getItem('endDate');
  if (storage) return JSON.parse(storage).date;
};

export const storeEndDateStateInLocalStorage = (date) => {
  localStorage.setItem('endDate', JSON.stringify({ date }));
};

export const clearLocalStorage = () => {
  localStorage.clear();
};
