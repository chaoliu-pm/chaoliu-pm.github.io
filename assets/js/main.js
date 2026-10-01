const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const open = navLinks.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

document.querySelectorAll('[data-email-link]').forEach((link) => {
  const address = ['liuc872015', 'gmail.com'].join('@');
  link.href = `mailto:${address}`;
  if (link.dataset.showAddress === 'true') link.textContent = address;
});

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const chapterNav = document.querySelector('.chapter-nav');
if (chapterNav) {
  const chapters = [...document.querySelectorAll('[data-chapter]')];
  const links = [...chapterNav.querySelectorAll('a')];
  let scheduled = false;
  const updateChapter = () => {
    const threshold = chapterNav.offsetHeight + 100;
    const active = chapters.filter(section => section.getBoundingClientRect().top <= threshold).pop() || chapters[0];
    links.forEach(link => {
      if (link.hash === `#${active.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    scheduled = false;
  };
  window.addEventListener('scroll', () => {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(updateChapter);
    }
  }, { passive: true });
  window.addEventListener('resize', updateChapter);
  links.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const target = document.querySelector(link.hash);
      history.pushState(null, '', link.hash);
      window.scrollTo({
        top: window.scrollY + target.getBoundingClientRect().top - chapterNav.offsetHeight - 16,
        behavior: 'instant'
      });
      updateChapter();
    });
  });
  updateChapter();
}
