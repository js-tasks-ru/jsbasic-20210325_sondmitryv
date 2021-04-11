function camelize(str) {
  let tempArr = str.split('-');
  let resultStr = '';
  tempArr.forEach(function(item, index, array) {
    if (item !== '' && index <= 0) {
      resultStr += item;
    } else {
      resultStr += item.charAt(0).toUpperCase() + item.slice(1);
    }
  });
  return resultStr;
}
