function getMinMax(str) {
  // ваш код...
  const numArr = str
                  .split(' ')
                  .filter(item => !isNaN(item));

  const result = {
    min: Math.min(...numArr),
    max: Math.max(...numArr)
  };

  return result;
}
