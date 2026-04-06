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



function fitLogoWordSpacing() {
  const logoWords = document.querySelectorAll('#logotype-wrapper .logo-mark');

  logoWords.forEach((logo) => {
    const lines = logo.querySelectorAll('span');
    if (lines.length < 2) return;

    const first = lines[0];
    const second = lines[1];

    second.style.letterSpacing = '0px';

    const targetWidth = first.getBoundingClientRect().width;
    const text = (second.textContent || '').trim();

    if (!targetWidth || text.length < 2) return;

    let low = 0;
    let high = 40;

    for (let i = 0; i < 24; i += 1) {
      const mid = (low + high) / 2;
      second.style.letterSpacing = `${mid}px`;
      const currentWidth = second.getBoundingClientRect().width;

      if (currentWidth < targetWidth) {
        low = mid;
      } else {
        high = mid;
      }
    }

    second.style.letterSpacing = `${low.toFixed(3)}px`;
  });
}

window.addEventListener('load', fitLogoWordSpacing);
window.addEventListener('resize', fitLogoWordSpacing);
