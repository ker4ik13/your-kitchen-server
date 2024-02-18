export const sortBubble = (array: number[]): number[] => {
  const resultArray: number[] = array.slice();

  for (let i = 0; i < resultArray.length; i++) {
    for (let j = 0; j < (resultArray.length - 1 - i); j++) {
      if (resultArray[j] > resultArray[j + 1]) {
        [resultArray[j], resultArray[j + 1]] = [resultArray[j + 1], resultArray[j]];

        // Simple swap
        // let temp = resultArray[j];
        // resultArray[j] = resultArray[j + 1];
        // resultArray[j + 1] = temp;
      }
    }
  }

  return resultArray;
}