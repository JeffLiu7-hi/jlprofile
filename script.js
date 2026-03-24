const root = document.documentElement;

window.addEventListener('pointermove', (event) => {
  const x = `${(event.clientX / window.innerWidth) * 100}%`;
  const y = `${(event.clientY / window.innerHeight) * 100}%`;
  root.style.setProperty('--pointer-x', x);
  root.style.setProperty('--pointer-y', y);
});

const yearTarget = document.getElementById('year');
if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

const copyButton = document.querySelector('[data-copy]');
if (copyButton) {
  copyButton.addEventListener('click', async (event) => {
    const content = event.currentTarget.getAttribute('data-copy');
    try {
      await navigator.clipboard.writeText(content);
      copyButton.textContent = 'Copied';
      setTimeout(() => {
        copyButton.textContent = 'Copy email';
      }, 1500);
    } catch (error) {
      copyButton.textContent = content;
      setTimeout(() => {
        copyButton.textContent = 'Copy email';
      }, 2000);
    }
  });
}
