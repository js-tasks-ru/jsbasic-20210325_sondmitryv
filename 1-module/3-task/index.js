function ucFirst(str) {
  let resultLine = '';
  for (let i =  0; i<str.length; i++) {
    if (i === 0) {
      resultLine = str[i].toUpperCase();
    } else {
      resultLine += str[i];
    }
  }
  return resultLine;
}
