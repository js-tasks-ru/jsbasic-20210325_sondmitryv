function toggleText() {
  let btn = document.querySelector('.toggle-text-button');
  let text = document.getElementById('text');
  btn.addEventListener('click', (event) => {
    if (text.hasAttribute('hidden')) {
      text.removeAttribute('hidden');
    } else {
      text.setAttribute('hidden', '');
    }
  });

}
