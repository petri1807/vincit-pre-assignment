export const calculateBullishTrend = (arr) => {
  if (arr === []) return;

  // Reverse the array so we can traverse through it in ascending order, oldest date to newest
  const data = [...arr].reverse();

  // An array of objects makes things easier to read below, and we don't need anything else from the original anyway
  const dataObjects = data.map(([date, closingPrice]) => {
    return { date: date, price: Number(closingPrice.replace('$', '')) };
  });

  // Error handling for invalid dates and page refresh
  if (!dataObjects[0]) return;

  // Need to keep track of prices over the last 3 days
  let currentClosingPrice = 0;
  let oneDatePriorClosingPrice = 0;
  let twoDatesPriorClosingPrice = 0;

  let currentDate = '';
  let previousDate = '';

  // Initialize with first day in the array, ERROR PRONE
  let newStartingDate = dataObjects[0].date;
  let newEndingDate = '';

  let bullishTrends = [];

  // Helper function
  const calculateDays = () => {
    // Values need to be numbers for correct evaluation, returns milliseconds since 1970(?)
    let endDateInMS = new Date(newEndingDate);
    // Including the last day means adding one day to it
    endDateInMS.setDate(endDateInMS.getDate() + 1);
    const startDateInMS = new Date(newStartingDate);

    // Calculate the difference in milliseconds, then divide into full days
    const differenceInDays = Math.ceil(
      (endDateInMS - startDateInMS) / (1000 * 60 * 60 * 24)
    );
    return differenceInDays;
  };

  for (let i = 0; i < dataObjects.length; i++) {
    currentClosingPrice = dataObjects[i].price;
    currentDate = dataObjects[i].date;

    if (currentClosingPrice > oneDatePriorClosingPrice) {
      // First check if previous date was the start of a new bullish trend
      if (oneDatePriorClosingPrice < twoDatesPriorClosingPrice) {
        // If it was, now is the time to push that bullish trend to our array
        bullishTrends.push({
          days: calculateDays(),
          started: newStartingDate,
          ended: newEndingDate,
        });

        // Save yesterday's date as a new starting point for next trend
        newStartingDate = previousDate;
      }

      // If we have reached the end of the array
      if (i + 1 === dataObjects.length) {
        newEndingDate = currentDate;
        // Push the last bullish trend
        bullishTrends.push({
          days: calculateDays(),
          started: newStartingDate,
          ended: newEndingDate,
        });
      }

      // Update the end date regardless of either if-statement passing
      newEndingDate = currentDate;
    }

    // twoDatesPriorClosingPrice is needed for recognizing a new starting bullish date
    twoDatesPriorClosingPrice = oneDatePriorClosingPrice;
    // Save the current dates price as yesterday's price for next loop iteration
    oneDatePriorClosingPrice = currentClosingPrice;
    // Save the current date as previous date for next loop iteration
    previousDate = currentDate;
  }

  // TODO: This needs to still sort them by latest date in the case of multiple trends being the same length
  const sortedArray = [
    ...bullishTrends.sort((a, b) => (a.days > b.days ? -1 : 1)),
  ];

  console.log('This should have correct amount of days YES?!', sortedArray);
  return sortedArray[0];
};

export const sortByPriceChange = (arr) => {
  const list = [...arr];

  // Add price differences to the array
  const listWithPriceDiff = list.map(
    ([date, close, volume, open, high, low]) => {
      // Dump the $-sign so we can evaluate the difference
      const highNum = Number(high.replace('$', ''));
      const lowNum = Number(low.replace('$', ''));

      // Evaluate and turn back to string with $-sign
      // Would it be better to have this as just a number?
      // We could just add the $-sign when printing the table
      const priceDifference = `$${(highNum - lowNum).toFixed(4)}`;

      // Create a new array with price difference included
      const newArray = [date, close, volume, open, high, low, priceDifference];
      return newArray;
    }
  );

  // Sort the array by price difference in descending order
  const sorted = listWithPriceDiff.sort((a, b) => {
    // This would be simpler with numbers to begin with
    const diffA = Number(a[6].replace('$', ''));
    const diffB = Number(b[6].replace('$', ''));

    return diffA > diffB ? -1 : 1;
  });

  // console.log('SORTED BY HIGHEST PRICE CHANGE', sorted);
  return sorted;
};

export const sortByTradingVolume = (arr) => {
  const list = [...arr];
  // Sort the array by volume in descending order
  const sorted = list.sort((a, b) => {
    const volumeA = Number(a[2]);
    const volumeB = Number(b[2]);
    return volumeA > volumeB ? -1 : 1;
  });

  return sorted;
};

export const sortBySimpleMovingAverage = (arr) => {
  const list = [...arr];

  // WTF is this task?? :D
};
