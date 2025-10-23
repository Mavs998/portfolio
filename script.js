const menu = document.querySelector('#menu-btn');
const header = document.querySelector('.header');

if (menu && header) {
  menu.onclick = () => {
    menu.classList.toggle('fa-times');
    header.classList.toggle('active');
  };

  window.addEventListener('scroll', () => {
    menu.classList.remove('fa-times');
    header.classList.remove('active');
  });
}

const themeToggler = document.querySelector('#theme-toggler');
if (themeToggler) {
  themeToggler.onclick = () => {
    themeToggler.classList.toggle('fa-moon');
    if (themeToggler.classList.contains('fa-moon')) {
      document.body.classList.add('active');
    } else {
      document.body.classList.remove('active');
    }
  };
}

// Star path scroll-draw animation (guarded)
const starPath = document.querySelector('#star-path');
if (starPath && starPath.getAttribute('d')) {
  const pathLength = starPath.getTotalLength();
  starPath.style.strokeDasharray = pathLength + ' ' + pathLength;
  starPath.style.strokeDashoffset = pathLength;
  starPath.getBoundingClientRect();

  window.addEventListener('scroll', () => {
    const scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) /
      (document.documentElement.scrollHeight - document.documentElement.clientHeight);
    const drawLength = pathLength * scrollPercentage;
    starPath.style.strokeDashoffset = pathLength - drawLength;
    starPath.style.strokeDasharray = scrollPercentage >= 0.99 ? 'none' : (pathLength + ' ' + pathLength);
  });
} else {
  const starSvg = document.getElementById('star-svg');
  if (starSvg) starSvg.style.display = 'none';
}

// Optional preloader (guarded)
const preload = document.getElementById('loader');
function preloader() {
  if (preload) preload.style.display = 'none';
}

// Fun effect (not used by default)
function snap() {
  const targets = [document.getElementById('about'), document.getElementById('projects')];
  targets.forEach((el) => el && el.classList.add('disap'));
}

// Parallax effect (guarded)
window.addEventListener('scroll', () => {
  const targets = [document.querySelector('.parright'), document.querySelector('.parleft')].filter(Boolean);
  if (targets.length === 0) return;
  for (const el of targets) {
    const rate = parseFloat(el.dataset.rate || '0');
    if (!Number.isFinite(rate) || rate === 0) continue;
    const pos = window.pageYOffset * rate;
    el.style.transform = 'translate(' + pos + 'px , 0px)';
  }
});