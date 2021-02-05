import React from 'react';
import './Chart.css';

export default function Chart({ dataSet, extraColumn }) {
  // Error handling for empty arrays
  if (!dataSet.length) return <p>Chart was given an empty array</p>;

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
          {extraColumn === 'priceDifference' && <th>Price difference</th>}
          {extraColumn === 'percentage' && <th>Price change %</th>}
        </tr>
      </thead>
      <tbody>
        {dataSet.map((item) => (
          <tr key={item[0]}>
            <td>{item[0]}</td>
            <td>{item[1]}</td>
            <td>{item[2]}</td>
            <td>{item[3]}</td>
            <td>{item[4]}</td>
            <td>{item[5]}</td>
            {extraColumn === 'priceDifference' && <td>{item[6]}</td>}
            {extraColumn === 'percentage' && <td>{item[6].toFixed(3)} %</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
