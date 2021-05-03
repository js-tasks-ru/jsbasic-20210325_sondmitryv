/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    let table = document.createElement('table');
    this.elem = table;
    let tableHead = document.createElement('thead');
    let rowTitle = document.createElement('tr');
    let tdTitle1 = document.createElement('th');
    let tdTitle2 = document.createElement('th');
    let tdTitle3 = document.createElement('th');
    let tdTitle4 = document.createElement('th');
    let tdClose = document.createElement('th')
    tdTitle1.insertAdjacentHTML('beforeEnd', `Имя`);
    tdTitle2.insertAdjacentHTML('beforeEnd', `Возраст`);
    tdTitle3.insertAdjacentHTML('beforeEnd', `Возраст`);
    tdTitle4.insertAdjacentHTML('beforeEnd', `Город`);
    rowTitle.appendChild(tdTitle1);
    rowTitle.appendChild(tdTitle2);
    rowTitle.appendChild(tdTitle3);
    rowTitle.appendChild(tdTitle4);
    rowTitle.appendChild(tdClose);
    tableHead.appendChild(rowTitle);
    table.appendChild(tableHead);
    let tableBody = document.createElement('tbody');
    for (let user of rows) {
      let row = document.createElement('tr')
      let td1 = document.createElement('td');
      let td2 = document.createElement('td');
      let td3 = document.createElement('td');
      let td4 = document.createElement('td');
      let tdClose = document.createElement('td');
      td1.innerHTML = user.name;
      row.appendChild(td1);
      td2.innerHTML = user.age;
      row.appendChild(td2);
      td3.innerHTML = user.salary;
      row.appendChild(td3);
      td4.innerHTML = user.city;
      row.appendChild(td4);
      tdClose.classList.add('removeBtn');
      tdClose.insertAdjacentHTML('beforeEnd', `<button>X</button>`);
      row.appendChild(tdClose);
      tableBody.appendChild(row);
    }
    table.appendChild(tableBody);
    table.addEventListener('click', this.removeRow);
    return;
  }
  removeRow(event) {
    if (event.target.closest('.removeBtn')) {
      event.target.closest("tr").remove();
    }
  }
}
