function showSalary(users, age) {
  let resultStr = '';

  users.forEach((item, index, array) => {
    if (item.age <= age) {
      resultStr += `${item.name}, ${item.balance}\n`;
    }
  });
  return resultStr.slice(0, -1);
}
