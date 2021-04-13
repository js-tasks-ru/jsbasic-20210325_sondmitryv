function makeDiagonalRed(table) {
  let cellItem = table.rows;
  console.log(cellItem.length)
  for (let i = 0;  i <= cellItem.length - 1; i++) {
    cellItem[i].cells[i].style.background = "red";
  }
}
