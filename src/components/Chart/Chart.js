import React from 'react';
import Item from '../Item/Item';

export default function Chart({ dataSet }) {
  return (
    <div>
      {dataSet.map((item) => (
        <Item key={item[0]} data={item} />
      ))}
    </div>
  );
}
