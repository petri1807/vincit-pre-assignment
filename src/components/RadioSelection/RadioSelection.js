import React from 'react';

const RadioSelection = ({ handler }) => {
  return (
    <div className="radioSelect" onChange={handler}>
      <input
        type="radio"
        id="bullish"
        value="Bullish"
        name="radioGroup"
        defaultChecked
      />
      <label htmlFor="bullish">Bullish trend</label>
      <input type="radio" id="volume" value="Volume" name="radioGroup" />{' '}
      <label htmlFor="volume">Highest volume</label>
      <input type="radio" id="price" value="Price" name="radioGroup" />{' '}
      <label htmlFor="price">Highest price change</label>
      <input type="radio" id="opening" value="Opening" name="radioGroup" />
      <label htmlFor="opening">Opening price</label>
    </div>
  );
};

export default RadioSelection;
