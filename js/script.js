/**
 * script.js — ComplianceIQ
 * Handles: Right-side mobile drawer navigation
 */

(function () {
  'use strict';

  const hamburger  = document.getElementById('hamburger-btn');
  const drawer     = document.getElementById('mobile-drawer');
  const overlay    = document.getElementById('nav-overlay');
  const closeBtn   = document.getElementById('drawer-close-btn');

  if (!hamburger || !drawer || !overlay) return;

  /* ── Helpers ── */
  function openDrawer() {
    drawer.classList.add('is-open');
    overlay.classList.add('is-active');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close navigation menu');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // lock scroll
    // Focus first link inside drawer for accessibility
    const firstLink = drawer.querySelector('.mobile-drawer__link');
    if (firstLink) firstLink.focus();
  }

  function closeDrawer() {
    drawer.classList.remove('is-open');
    overlay.classList.remove('is-active');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open navigation menu');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    hamburger.focus();
  }

  /* ── Toggle on hamburger click ── */
  hamburger.addEventListener('click', function () {
    const isOpen = this.getAttribute('aria-expanded') === 'true';
    isOpen ? closeDrawer() : openDrawer();
  });

  /* ── Close on X button ── */
  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  /* ── Close on overlay click ── */
  overlay.addEventListener('click', closeDrawer);

  /* ── Close when a nav link is clicked ── */
  drawer.querySelectorAll('.mobile-drawer__link, .mobile-drawer__cta').forEach(function (link) {
    link.addEventListener('click', closeDrawer);
  });

  /* ── Close on Escape key ── */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });

  /* ── Auto-close drawer on resize to desktop ── */
  const mq = window.matchMedia('(min-width: 769px)');
  mq.addEventListener('change', function (e) {
    if (e.matches && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });

})();
