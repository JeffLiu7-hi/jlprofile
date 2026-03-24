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

const revealTargets = [
  ...document.querySelectorAll('.hero, .panel, .project-row, .site-footer'),
];

revealTargets.forEach((element, index) => {
  element.classList.add('reveal');
  if (element.classList.contains('project-row')) {
    element.style.setProperty('--reveal-delay', `${Math.min(index * 45, 260)}ms`);
  }
});

const revealVisible = (element) => {
  element.classList.add('is-visible');
};

const hideReveal = (element) => {
  element.classList.remove('is-visible');
};

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealTargets.forEach(revealVisible);
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealVisible(entry.target);
        } else {
          hideReveal(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: '0px 0px -8% 0px',
    }
  );

  revealTargets.forEach((element) => {
    observer.observe(element);
  });
}

