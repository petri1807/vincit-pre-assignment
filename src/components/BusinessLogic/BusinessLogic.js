export const calculateBullishTrend = (arr) => {
  if (arr.length === 0) return;

  // Reverse the array so we can traverse through it in ascending order, oldest date to newest
  const data = [...arr].reverse();

  // An array of objects makes things easier to read below, and we don't need anything else for this
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

  // Initialize with first day in the array
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

  return sortedArray[0];
};

export const sortByPriceChange = (arr) => {
  if (arr.length === 0) return;

  const list = [...arr];

  // Add price differences to the array
  const listWithPriceDiff = list.map(
    ([date, close, volume, open, high, low]) => {
      // Dump the $-sign so we can evaluate the difference
      const highNum = Number(high.replace('$', ''));
      const lowNum = Number(low.replace('$', ''));

      // Evaluate and turn back to string with $-sign
      const priceDifference = `$${(highNum - lowNum).toFixed(3)}`;

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

  return sorted;
};

// The logic here is a bit flawed as it requires an array of 6 dates minimum to calculate SMA-5,
// and returns only the dates SMA-5 was calculated for, basically dumping the 5 oldest dates.
// Fix by giving this an array of the selected dates plus 5 dates prior to those to calculate SMA-5 for all selected dates
export const sortByTradingVolume = (arr) => {
  if (arr.length === 0) return;

  const list = [...arr];

  // Sort the array by volume in descending order
  const sorted = list.sort((a, b) => {
    const volumeA = Number(a[2]);
    const volumeB = Number(b[2]);
    return volumeA > volumeB ? -1 : 1;
  });

  return sorted;
};

export const sortByOpeningPriceSMA = (arr) => {
  if (arr.length < 6) return;

  const list = [...arr];

  const getPercentageChange = (high, low) => {
    const difference = high - low;
    return (difference / high) * 100;
  };

  const calculateSMA = (arr) => {
    if (arr.length < 6) return 'Not enough data';

    const date = arr[0][0];
    const openingPrice = Number(arr[0][3].replace('$', ''));
    const N1 = Number(arr[1][1].replace('$', ''));
    const N2 = Number(arr[2][1].replace('$', ''));
    const N3 = Number(arr[3][1].replace('$', ''));
    const N4 = Number(arr[4][1].replace('$', ''));
    const N5 = Number(arr[5][1].replace('$', ''));

    const SMA5 = (N5 + N4 + N3 + N2 + N1) / 5;

    const differenceInPercentage = getPercentageChange(
      Math.max(openingPrice, SMA5),
      Math.min(openingPrice, SMA5)
    );

    return [
      date,
      arr[0][1],
      arr[0][2],
      arr[0][3],
      arr[0][4],
      arr[0][5],
      differenceInPercentage,
    ];
  };

  const fiveDayIcrements = [];

  for (let i = 5; i < list.length; i++) {
    fiveDayIcrements.push([
      list[i - 5],
      list[i - 4],
      list[i - 3],
      list[i - 2],
      list[i - 1],
      list[i],
    ]);
  }

  const SMAlist = fiveDayIcrements.map((inc) => calculateSMA(inc));
  const sorted = SMAlist.sort((a, b) => (a[6] > b[6] ? -1 : 1));

  return sorted;
};
