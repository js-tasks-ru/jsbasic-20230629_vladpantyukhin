function getMinMax(str) {
  // ваш код...
  const numArr = str
                  .split(' ')
                  .filter(item => !isNaN(parseFloat(item)))
                  .map(item => parseFloat(item));

  const result = {
    min: Math.min(...numArr),
    max: Math.max(...numArr)
  };

  return result;
}
