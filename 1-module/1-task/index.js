function factorial(n) {
  let fac = n - 1;
  let result = n;
  if (n === 1 || n === 0) {
    return 1;
  }
  while (fac <= n && fac >= 1) {
    result = result * fac;
    fac--;
  }
  return result;
}
