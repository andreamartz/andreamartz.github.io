const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');
const modalCardLinks = document.querySelectorAll('.portfolio__item__container--modal a[target="_blank"]');
const modalResumeEvents = ['pointermove', 'keydown', 'touchstart', 'scroll'];
let modalResumeController = null;

navToggle.addEventListener('click', () => {
  document.body.classList.toggle('nav-open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    document.body.classList.remove('nav-open');
  })
})

const clearModalFocus = () => {
  const activeElement = document.activeElement;

  if (!activeElement) return;

  if (activeElement.closest('.portfolio__item__container--modal')) {
    activeElement.blur();
  }
};

const resumePortfolioModals = () => {
  document.body.classList.remove('portfolio-modals-suspended');

  if (modalResumeController) {
    modalResumeController.abort();
    modalResumeController = null;
  }
};

const suspendPortfolioModals = () => {
  document.body.classList.add('portfolio-modals-suspended');

  if (modalResumeController) {
    modalResumeController.abort();
  }

  modalResumeController = new AbortController();

  modalResumeEvents.forEach(eventName => {
    window.addEventListener(eventName, resumePortfolioModals, {
      capture: true,
      once: true,
      signal: modalResumeController.signal
    });
  });
};

const handleModalLinkActivation = () => {
  suspendPortfolioModals();
  clearModalFocus();
};

modalCardLinks.forEach(link => {
  link.addEventListener('pointerdown', handleModalLinkActivation);
  link.addEventListener('click', handleModalLinkActivation);
});

window.addEventListener('focus', clearModalFocus);
