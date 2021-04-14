function hideSelf() {
  let btn = document.querySelector('.hide-self-button');
  btn.addEventListener('click', (event) => {
    btn.setAttribute('hidden', '');
  });
}
