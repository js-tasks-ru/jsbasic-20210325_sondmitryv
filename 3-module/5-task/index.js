function getMinMax(str) {
  let resultObject = { min: undefined, max: undefined };
  str = str
    .split(" ")
    .join()
    .split(",")
    .filter((el) => Number(el) && el);
  resultObject.min = Math.min(...str);
  resultObject.max = Math.max(...str);
  return resultObject;
}
