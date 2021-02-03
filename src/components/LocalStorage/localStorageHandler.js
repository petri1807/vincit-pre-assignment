export const getCSVStateFromLocalStorage = () => {
  const storage = localStorage.getItem('csvState');
  // console.log('Getting state from local storage');
  if (storage) return JSON.parse(storage).csv;
  return null;
};

export const getCurrentListStateFromLocalStorage = () => {
  const storage = localStorage.getItem('currentListState');
  console.log('GET LOCALSTORAGE, currentList', storage);
  if (storage) return JSON.parse(storage).array;
  // return null;
};

export const storeCSVStateInLocalStorage = (csv) => {
  localStorage.setItem('csvState', JSON.stringify({ csv }));
  // console.log('Setting state to local storage', localStorage);
};

export const storeCurrentListStateInLocalStorage = (array) => {
  localStorage.setItem('currentListState', JSON.stringify({ array }));
  console.log('SET LOCALSTORAGE, currentList', localStorage);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};
