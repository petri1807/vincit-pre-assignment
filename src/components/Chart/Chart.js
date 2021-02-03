import React from 'react';
import './Chart.css';

export default function Chart({ dataSet }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Close/Last</th>
          <th>Volume</th>
          <th>Open</th>
          <th>High</th>
          <th>Low</th>
        </tr>
      </thead>
      {dataSet.map(([date, close, volume, open, high, low]) => (
        <tbody key={date}>
          <tr>
            <td>{date}</td>
            <td>{close}</td>
            <td>{volume}</td>
            <td>{open}</td>
            <td>{high}</td>
            <td>{low}</td>
          </tr>
        </tbody>
      ))}
    </table>
  );
}
