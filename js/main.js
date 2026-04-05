const body = document.body;
const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');
const themeButtons = document.querySelectorAll('#theme-toggle, #theme-toggle-card');

function applySavedTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark');
  }
}

function toggleTheme() {
  body.classList.toggle('dark');
  const mode = body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', mode);
}

if (burger && menu) {
  burger.addEventListener('click', () => {
    menu.classList.toggle('showMenu');
    const expanded = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!expanded));
  });
}

themeButtons.forEach((button) => {
  button?.addEventListener('click', toggleTheme);
});

applySavedTheme();
