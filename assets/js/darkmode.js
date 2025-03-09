const themeSwitch = document.getElementById('theme-switch');

const enableDarkmode = () => {
  document.documentElement.classList.add('darkmode');
  localStorage.setItem('darkmode', 'active');
};

const disableDarkmode = () => {
  document.documentElement.classList.remove('darkmode');
  localStorage.setItem('darkmode', null);
};

themeSwitch.addEventListener('click', () => {
  let darkmode = localStorage.getItem('darkmode');
  darkmode !== 'active' ? enableDarkmode() : disableDarkmode();
});