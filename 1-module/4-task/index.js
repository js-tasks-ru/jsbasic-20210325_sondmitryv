function checkSpam(str) {
  let testString = str.toLowerCase();
  if (testString.indexOf("1xBet".toLowerCase()) !== -1 || testString.indexOf("XXX".toLowerCase()) !== -1) {
    return true;
  }
  return false;
}
