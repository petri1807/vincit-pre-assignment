import React from 'react';
import { clearLocalStorage } from '../LocalStorage/localStorageHandler';
import CSVReader from 'react-csv-reader';

const FileInput = ({ handler }) => {
  return (
    <section className="fileInput">
      <CSVReader
        className="csvreader"
        onFileLoaded={(data, fileInfo) => {
          if (fileInfo.type === 'application/vnd.ms-excel') {
            handler(data);
          }
        }}
      />
      <button className="button" onClick={clearLocalStorage} name="clear">
        Clear local storage
      </button>
    </section>
  );
};

export default FileInput;
