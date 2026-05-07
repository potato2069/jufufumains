document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.createElement('div');
  cursor.id = 'custom-cursor';
  cursor.style.visibility = 'hidden'; // hide until first mousemove
  document.body.appendChild(cursor);
  document.body.classList.add('custom-cursor-active');

  const IMAGES = {
    default: '/media/img/cursor.png',
    pointer: '/media/img/cursor-click.png',
  };

  const SIZE = { default: 80, pointer: 80 };

  Object.values(IMAGES).forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  function setCursor(type) {
    cursor.style.width = `${SIZE[type]}px`;
    cursor.style.height = `${SIZE[type]}px`;
    cursor.style.backgroundImage = `url('${IMAGES[type]}')`;
  }

  setCursor('default');

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    cursor.style.visibility = 'visible'; // show on first move
  });

  const POINTER_SELECTOR = 'a, button, input, textarea, [contenteditable], [data-cursor="pointer"]';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(POINTER_SELECTOR)) setCursor('pointer');
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(POINTER_SELECTOR)) setCursor('default');
  });
});