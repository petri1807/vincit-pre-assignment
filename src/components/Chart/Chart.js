import React from 'react';
import './Chart.css';

export default function Chart({ dataSet, category }) {
  // Error handling for empty arrays
  if (!dataSet.length) return <p>Chart was given an empty array</p>;

  return (
    <table className="content-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Close/Last</th>
          <th>Volume</th>
          <th>Open</th>
          <th>High</th>
          <th>Low</th>
          {category === 'price' && <th>Price change ($)</th>}
          {category === 'opening' && <th>Price change (%)</th>}
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
            {category === 'price' && <td>{item[6]}</td>}
            {category === 'opening' && <td>{item[6].toFixed(3)} %</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
