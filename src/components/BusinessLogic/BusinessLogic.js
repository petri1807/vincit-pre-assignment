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
    let endDateInMS = new Date(newEndingDate);
    endDateInMS.setDate(endDateInMS.getDate() + 1);
    const startDateInMS = new Date(newStartingDate);
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

      // Update the end date regardless
      newEndingDate = currentDate;
    }

    // twoDatesPriorClosingPrice is needed for recognizing a new starting bullish date
    twoDatesPriorClosingPrice = oneDatePriorClosingPrice;
    // Save the current dates price as yesterday's price for next loop iteration
    oneDatePriorClosingPrice = currentClosingPrice;
    // Save the current date as previous date for next loop iteration
    previousDate = currentDate;
  }

  const sortedArray = [
    ...bullishTrends.sort((a, b) => (a.days > b.days ? -1 : 1)),
  ];

  console.log('This should have correct amount of days YES?!', sortedArray);
  return sortedArray[0];
};
