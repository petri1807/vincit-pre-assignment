import React from 'react';
import './RadioSelection.css';

const RadioSelection = ({ handler }) => {
  return (
    <div className="radio" onChange={handler}>
      <input
        className="radio__input"
        type="radio"
        id="bullish"
        value="Bullish"
        name="radioGroup"
        defaultChecked
      />
      <label className="radio__label" htmlFor="bullish">
        Bullish trend
      </label>
      <input
        className="radio__input"
        type="radio"
        id="volume"
        value="Volume"
        name="radioGroup"
      />{' '}
      <label className="radio__label" htmlFor="volume">
        Highest volume
      </label>
      <input
        className="radio__input"
        type="radio"
        id="price"
        value="Price"
        name="radioGroup"
      />{' '}
      <label className="radio__label" htmlFor="price">
        Highest price change
      </label>
      <input
        className="radio__input"
        type="radio"
        id="opening"
        value="Opening"
        name="radioGroup"
      />
      <label className="radio__label" htmlFor="opening">
        Opening price
      </label>
    </div>
  );
};

export default RadioSelection;
