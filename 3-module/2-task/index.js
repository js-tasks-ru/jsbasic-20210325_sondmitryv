function filterRange(arr, a, b) {
  let newArr = [];
  arr.forEach(function(item, index, array) {
    if (item >= a && item <= b) {
      newArr.push(item);
    }
  });
  return newArr;
}
