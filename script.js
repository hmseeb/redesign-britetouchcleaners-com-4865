/* =========================================================
   Brite Touch Cleaners — Cinco Ranch, Katy TX
   Interactions: mobile nav, sticky header, reveal, FAQ
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Mobile navigation ---------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  function closeNav() {
    if (!nav || !burger) return;
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  }

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Close when a nav link is tapped
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });

    // Close when resizing back to desktop
    var mq = window.matchMedia('(min-width: 1061px)');
    var onChange = function (ev) { if (ev.matches) closeNav(); };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }

  /* ---------- Sticky header shadow ---------- */
  var header = document.getElementById('header');
  if (header) {
    var lastKnown = false;
    var onScroll = function () {
      var stuck = window.scrollY > 8;
      if (stuck !== lastKnown) {
        header.classList.toggle('is-stuck', stuck);
        lastKnown = stuck;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Scroll reveal ---------- */
  var revealables = document.querySelectorAll('.reveal');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!('IntersectionObserver' in window) || reduceMotion) {
    Array.prototype.forEach.call(revealables, function (el) {
      el.classList.add('is-visible');
    });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    Array.prototype.forEach.call(revealables, function (el, i) {
      // Gentle stagger within a row of siblings
      el.style.transitionDelay = (i % 4) * 70 + 'ms';
      io.observe(el);
    });
  }

  /* ---------- FAQ accordion: one open at a time ---------- */
  var faqItems = document.querySelectorAll('.faq__item');
  Array.prototype.forEach.call(faqItems, function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      Array.prototype.forEach.call(faqItems, function (other) {
        if (other !== item) other.open = false;
      });
    });
  });

  /* ---------- Current year (if a placeholder exists) ---------- */
  var yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
