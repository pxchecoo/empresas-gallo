// Shared by the main site and its emergency fallback. Galleries load on first open.
(() => {
  let activeModal = null;
  let lastFocus = null;
  let inertElements = [];
  let savedScroll = 0;
  let savedBodyStyle = '';

  const close = () => {
    if (!activeModal) return;
    const modal = activeModal;
    activeModal = null;
    modal.classList.remove('is-open');
    inertElements.forEach(element => { element.inert = false; });
    inertElements = [];
    document.body.style.cssText = savedBodyStyle;
    document.body.classList.remove('modal-open');
    window.scrollTo({ top: savedScroll, behavior: 'instant' });
    lastFocus?.focus({ preventScroll: true });
    modal.setAttribute('aria-hidden', 'true');
    modal.inert = true;
  };

  const open = (modal, trigger) => {
    if (!modal) return;
    close();
    lastFocus = trigger || document.activeElement;
    savedScroll = window.scrollY;
    savedBodyStyle = document.body.style.cssText;
    // Fixed positioning also locks the background on iOS Safari.
    const gutter = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${savedScroll}px`;
    document.body.style.width = '100%';
    if (gutter) document.body.style.paddingRight = `${gutter}px`;
    document.body.classList.add('modal-open');
    const template = modal.querySelector('template[data-material-gallery]');
    if (template) template.replaceWith(template.content.cloneNode(true));
    activeModal = modal;
    modal.inert = false;
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('is-open');
    modal.querySelector('.material-modal-panel').scrollTop = 0;
    // Preserve pre-existing inert states while shielding the rest of the page.
    let branch = modal;
    while (branch.parentElement && branch !== document.body) {
      [...branch.parentElement.children].forEach(sibling => {
        if (sibling !== branch && !sibling.inert && !['SCRIPT', 'STYLE'].includes(sibling.tagName)) {
          sibling.inert = true;
          inertElements.push(sibling);
        }
      });
      branch = branch.parentElement;
    }
    modal.querySelector('.modal-close').focus({ preventScroll: true });
  };

  document.querySelectorAll('[data-material-modal-open]').forEach(button => {
    button.addEventListener('click', () => open(document.querySelector(button.dataset.materialModalOpen), button));
  });
  document.querySelectorAll('[data-material-modal-close]').forEach(button => {
    button.addEventListener('click', close);
  });
  document.addEventListener('keydown', event => {
    if (!activeModal) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
    } else if (event.key === 'Tab') {
      const focusable = [...activeModal.querySelectorAll('button:not([tabindex="-1"]), [tabindex="0"]')];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
  document.addEventListener('focusin', event => {
    if (activeModal && !activeModal.contains(event.target)) activeModal.querySelector('.modal-close').focus();
  });
  window.TMIMaterials = { close };
})();
