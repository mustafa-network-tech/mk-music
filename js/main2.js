/**
 * index2 / “stil 2” katmanı: özel imleç + scroll reveal.
 * site.js (i18n, modal, video) ile çakışmaz; sadece görsel etkileşim.
 */
(function () {
  "use strict";

  function prefersReducedMotion() {
    try {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (e) {
      return false;
    }
  }

  function isFinePointer() {
    try {
      return window.matchMedia("(pointer: fine)").matches;
    } catch (e) {
      return true;
    }
  }

  function initCursor() {
    /* Dokunmatik / coarse pointer’da özel imleç yok; reduced-motion’da da fareyle halka kullanılabilir */
    if (!isFinePointer()) return;
    var dot = document.getElementById("cursorDot") || document.getElementById("cursor");
    var ring = document.getElementById("cursorRing");
    if (!dot || !ring) return;

    document.body.classList.add("has-custom-cursor");

    var mx = 0;
    var my = 0;
    var rx = 0;
    var ry = 0;
    /* index2 main.js: halkada scale(1.8) + borderColor — yumuşak geçiş için lerp */
    var ringScale = 1;
    var ringScaleTarget = 1;
    /* sanatcı2 main.js: halka + nokta hover’da hafif büyüme */
    var dotScale = 1;
    var dotScaleTarget = 1;

    var halfDot = 4;
    var halfRing = 18;

    var hoverSelector =
      "a, button, input, textarea, .gal-item, .lang-switch__btn, .submit-btn, [data-gallery-open], [role='button'], .modal__close, .site-nav__mark, .slide-dots .dot, .contact-link, .press-item, .hero-buttons .btn-gold, .hero-buttons .btn-ghost, .film-ctrl, .gallery-all__link, .gallery-back__link";

    function bindRingHover() {
      document.querySelectorAll(hoverSelector).forEach(function (el) {
        el.addEventListener("mouseenter", function () {
          ringScaleTarget = 1.8;
          dotScaleTarget = 1.35;
          ring.classList.add("cursor-ring--hover");
          ring.style.borderColor = "rgba(184, 150, 90, 0.88)";
          dot.classList.add("cursor-dot--hover");
        });
        el.addEventListener("mouseleave", function () {
          ringScaleTarget = 1;
          dotScaleTarget = 1;
          ring.classList.remove("cursor-ring--hover");
          ring.style.borderColor = "";
          dot.classList.remove("cursor-dot--hover");
        });
      });
    }
    bindRingHover();

    window.addEventListener(
      "mousemove",
      function (e) {
        mx = e.clientX;
        my = e.clientY;
      },
      { passive: true }
    );

    function tick() {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      ringScale += (ringScaleTarget - ringScale) * 0.18;
      dotScale += (dotScaleTarget - dotScale) * 0.22;
      dot.style.transform =
        "translate3d(" +
        (mx - halfDot * dotScale) +
        "px," +
        (my - halfDot * dotScale) +
        "px,0) scale(" +
        dotScale +
        ")";
      ring.style.transform =
        "translate3d(" +
        (rx - halfRing * ringScale) +
        "px," +
        (ry - halfRing * ringScale) +
        "px,0) scale(" +
        ringScale +
        ")";
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function initHeroSlides() {
    var slides = document.querySelectorAll(".hero .hero__slide");
    var dots = document.querySelectorAll(".slide-dots .dot");
    var counter = document.getElementById("slideCounter");
    if (!slides.length || !dots.length || !counter) return;

    var current = 0;
    var total = slides.length;

    function goSlide(n) {
      if (n < 0 || n >= total) return;
      slides[current].classList.remove("is-current");
      dots[current].classList.remove("active");
      current = n;
      slides[current].classList.add("is-current");
      dots[current].classList.add("active");
      counter.textContent =
        String(current + 1).padStart(2, "0") + " / " + String(total).padStart(2, "0");
    }

    window.__heroGoSlide = goSlide;

    dots.forEach(function (dot) {
      var idx = parseInt(dot.getAttribute("data-slide"), 10);
      if (isNaN(idx)) return;
      dot.addEventListener("click", function () {
        goSlide(idx);
      });
      dot.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          goSlide(idx);
        }
      });
    });

    if (prefersReducedMotion()) return;

    setInterval(function () {
      goSlide((current + 1) % total);
    }, 4500);
  }

  function initReveal() {
    var nodes = document.querySelectorAll(".reveal");
    if (!nodes.length) return;

    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      nodes.forEach(function (n) {
        n.classList.add("is-revealed");
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("is-revealed");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.07, rootMargin: "0px 0px -6% 0px" }
    );

    nodes.forEach(function (n) {
      io.observe(n);
    });
  }

  function boot() {
    initCursor();
    initHeroSlides();
    initReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
