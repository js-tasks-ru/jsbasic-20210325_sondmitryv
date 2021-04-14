function highlight(table) {
  let row = table.rows;
  let positionGender;
  let positionAge;
  let positionStatus;

  for (let i = 0; i < row[0].children.length; i++) {
    if (row[0].children[i].innerHTML === 'Age') {
      positionAge = i;

    }
    if (row[0].children[i].innerHTML === 'Gender') {
      positionGender = i;

    }
    if (row[0].children[i].innerHTML === 'Status') {
      positionStatus = i;

    }
  };

  let classContainer = {
    m: 'male',
    f: 'female',
    true: 'available',
    false: 'unavailable'
  }

  for (let k = 1; k < row.length; k++) {
    let classGender = row[k].children[positionGender];

    classGender.parentNode.classList.add(classContainer[classGender.innerHTML]);

    let classAge = row[k].children[positionAge].innerHTML;

    if (classAge < 18) {
      classGender.parentNode.setAttribute('style', 'text-decoration: line-through');
    }

    let classStatus = row[k].children[positionStatus];

    if (classStatus.hasAttribute('data-available')) {
      let elem = classStatus.getAttribute('data-available');

      classStatus.parentNode.classList.add(classContainer[elem]);
    } else {
      classStatus.parentNode.hidden = true;
    }
  }
}
