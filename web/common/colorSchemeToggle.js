let ele;
let toggledOnce = false;
let cur;
const STORAGE_KEY = 'colorSchemeToggle';

function getColor () {
  let tmp = 'light';

  if (window.matchMedia) {
    tmp = window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light';
  }

  if (toggledOnce && cur) {
    tmp = cur;
  }

  return tmp;
}

function detectColorScheme () {
  setColor(getColor());
}

function setColor (tmp) {
  cur = tmp;

  if (ele) {
    ele.className = tmp;
  }

  document.documentElement.setAttribute('data-theme', tmp);

  const nodes = document.querySelectorAll('object');
  for (const node of nodes) {
    node.getSVGDocument().documentElement.setAttribute('data-theme', tmp);
  }

  if (window.gradient) {
    window.gradient.disconnect();
    window.gradient.connect();
  }
}

function onClick (evt) {
  evt.preventDefault();
  evt.stopImmediatePropagation();

  const tmp = ele.className === 'dark' ? 'light' : 'dark';
  toggledOnce = true;
  setColor(tmp);
  localStorage.setItem(STORAGE_KEY, tmp);
}

function addColorSchemeToggle (_ele) {
  ele = _ele;
  ele.className = getColor();
  ele.innerHTML = '<div><div>☀️</div><div>🌙</div></div>';
  ele.addEventListener('click', onClick, false);
  // fix any settings after page load
  detectColorScheme();
}

window.addEventListener('load', function () {
  addColorSchemeToggle(document.querySelector('#colorSchemeToggle'));
}, false);

if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', detectColorScheme, false);
}

const pref = localStorage.getItem(STORAGE_KEY);
if (pref) {
  setColor(pref);
  toggledOnce = true;
}
