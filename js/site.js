(function () {
  "use strict";

  var LANG_STORAGE = "musty.lang";
  var bundles = {};
  var currentDict = {};
  var currentLang = "tr";

  function getInitialLang() {
    try {
      var params = new URLSearchParams(window.location.search);
      var q = (params.get("lang") || "").toLowerCase();
      if (q === "tr" || q === "en") return q;
    } catch (e) {}
    try {
      var s = localStorage.getItem(LANG_STORAGE);
      if (s === "tr" || s === "en") return s;
    } catch (e) {}
    var nav = (navigator.language || "").toLowerCase();
    if (nav.indexOf("tr") === 0) return "tr";
    return "tr";
  }

  function t(key) {
    return currentDict[key] || key;
  }

  function applyI18n() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria")));
    });

    document.querySelectorAll("[data-i18n-gallery]").forEach(function (el) {
      var id = el.getAttribute("data-i18n-gallery");
      var text = t("gallery." + id);
      el.setAttribute("data-gallery-cap", text);
      var img = el.querySelector("img");
      if (img) img.setAttribute("alt", text);
      var cap = el.querySelector(".gal-caption__text, .gal-caption span, .gallery__cap, .gal-ed__cap");
      if (cap) cap.textContent = text;
      el.setAttribute("aria-label", t("gallery.view") + ": " + text);
    });

    document.querySelectorAll("[data-i18n-work]").forEach(function (el) {
      var w = el.getAttribute("data-i18n-work");
      el.setAttribute("data-video-title", t(w + ".fullName"));
      el.setAttribute("data-video-desc", t(w + ".desc"));
      if (el.classList.contains("work-card__play")) {
        el.setAttribute("aria-label", t(w + ".playAria"));
      } else if (el.classList.contains("discog__row") || el.classList.contains("tracklist__row")) {
        el.setAttribute("aria-label", t(w + ".fullName") + " — " + t("discog.hint"));
      }
    });

    document.querySelectorAll(".lang-switch [data-set-lang]").forEach(function (btn) {
      var l = btn.getAttribute("data-set-lang");
      btn.textContent = t("lang." + l);
      btn.classList.toggle("is-active", l === currentLang);
    });

    if (document.body && document.body.classList.contains("page-kareler")) {
      document.title = t("meta.titleKareler");
    } else {
      document.title = t("meta.title");
    }
    var md = document.getElementById("meta-desc");
    if (md) md.setAttribute("content", t("meta.description"));

    document.documentElement.lang = currentLang === "tr" ? "tr" : "en";

    if (typeof window.__filmPlayerSync === "function") {
      window.__filmPlayerSync();
    }
  }

  function persistLang() {
    try {
      localStorage.setItem(LANG_STORAGE, currentLang);
    } catch (e) {}
    try {
      var url = new URL(window.location.href);
      url.searchParams.set("lang", currentLang);
      window.history.replaceState({}, "", url);
    } catch (e) {}
  }

  function getEmbeddedBundle(lang) {
    var L = typeof window.__SITE_LOCALES === "object" && window.__SITE_LOCALES !== null ? window.__SITE_LOCALES : null;
    if (!L || !L[lang] || typeof L[lang] !== "object") return null;
    return L[lang];
  }

  function fetchBundle(lang) {
    if (bundles[lang]) return Promise.resolve(bundles[lang]);
    var embedded = getEmbeddedBundle(lang);
    if (embedded) {
      bundles[lang] = embedded;
      return Promise.resolve(embedded);
    }
    return fetch("i18n/" + lang + ".json", { credentials: "same-origin" })
      .then(function (r) {
        if (!r.ok) throw new Error("i18n " + lang);
        return r.json();
      })
      .then(function (json) {
        bundles[lang] = json;
        return json;
      });
  }

  function setLang(lang) {
    if (lang !== "tr" && lang !== "en") return Promise.resolve();
    return fetchBundle(lang)
      .then(function (dict) {
        currentLang = lang;
        currentDict = dict;
        applyI18n();
        persistLang();
      })
      .catch(function () {
        if (lang !== "tr") {
          return fetchBundle("tr").then(function (d) {
            currentLang = "tr";
            currentDict = d;
            applyI18n();
            persistLang();
          });
        }
      });
  }

  function initLangSwitch() {
    document.querySelectorAll(".lang-switch [data-set-lang]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var lang = btn.getAttribute("data-set-lang");
        setLang(lang).catch(function () {});
      });
    });
  }

  /* ——— Scroll nav ——— */
  var nav = document.querySelector(".site-nav");

  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  }

  /* ——— Hero: video varsa hata/yüklenemezse slayta geç (döngü main2.js initHeroSlides) ——— */
  var hero = document.querySelector(".hero");
  var heroVideo = document.querySelector(".hero__video");
  var heroSlides = document.querySelector(".hero__slides");

  if (heroVideo && hero && heroSlides) {
    heroVideo.addEventListener("error", function () {
      hero.classList.add("hero--slides-only");
      heroVideo.classList.add("is-hidden");
      heroSlides.classList.add("is-active");
    });
    if (heroVideo.readyState === 0) {
      setTimeout(function () {
        if (heroVideo.readyState === 0 && heroVideo.networkState === 3) {
          hero.classList.add("hero--slides-only");
          heroVideo.classList.add("is-hidden");
          heroSlides.classList.add("is-active");
        }
      }, 2500);
    }
  }

  /* ——— Video modal ——— */
  var modal = document.getElementById("video-modal");
  var modalVideo = modal ? modal.querySelector(".modal__player") : null;
  var modalTitle = modal ? modal.querySelector("[data-modal-title]") : null;
  var modalDesc = modal ? modal.querySelector("[data-modal-desc]") : null;
  var modalCloseEls = modal ? modal.querySelectorAll(".modal__close") : [];
  var lastFocus = null;

  function openVideoModal(src, title, desc) {
    if (!modal || !modalVideo) return;
    lastFocus = document.activeElement;
    modalVideo.pause();
    modalVideo.removeAttribute("src");
    modalVideo.load();
    modalVideo.src = src;
    modalVideo.play().catch(function () {});
    if (modalTitle) modalTitle.textContent = title || "";
    if (modalDesc) modalDesc.textContent = desc || "";
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    var firstClose = modalCloseEls[0];
    if (firstClose) firstClose.focus();
  }

  function closeVideoModal() {
    if (!modal || !modalVideo) return;
    modalVideo.pause();
    modalVideo.removeAttribute("src");
    modalVideo.load();
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }

  function bindVideoOpen(el) {
    function go() {
      var src = el.getAttribute("data-video-src");
      var title = el.getAttribute("data-video-title") || "";
      var desc = el.getAttribute("data-video-desc") || "";
      openVideoModal(src, title, desc);
    }
    el.addEventListener("click", go);
    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        go();
      }
    });
  }

  /* ——— Image modal ——— */
  var imgModal = document.getElementById("image-modal");
  var imgModalImg = imgModal ? imgModal.querySelector(".modal__img") : null;
  var imgModalCloseEls = imgModal ? imgModal.querySelectorAll(".modal__close") : [];

  function openImageModal(src, alt) {
    if (!imgModal || !imgModalImg) return;
    lastFocus = document.activeElement;
    imgModalImg.src = src;
    imgModalImg.alt = alt || "";
    imgModal.classList.add("is-open");
    imgModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    var c = imgModalCloseEls[0];
    if (c) c.focus();
  }

  function closeImageModal() {
    if (!imgModal || !imgModalImg) return;
    imgModalImg.removeAttribute("src");
    imgModal.classList.remove("is-open");
    imgModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }

  function initFilmPlayer() {
    var root = document.querySelector("[data-film-player]");
    var video = document.getElementById("filmPlayerVideo");
    var items = Array.prototype.slice.call(document.querySelectorAll(".film-playlist__src"));
    if (!root || !video || !items.length) return;

    var titleEl = root.querySelector("[data-film-meta-title]");
    var descEl = root.querySelector("[data-film-meta-desc]");
    var btnPrev = root.querySelector("[data-film-prev]");
    var btnNext = root.querySelector("[data-film-next]");
    var btnToggle = root.querySelector("[data-film-toggle]");
    var iconPlay = btnToggle ? btnToggle.querySelector(".film-ctrl__icon-play") : null;
    var iconPause = btnToggle ? btnToggle.querySelector(".film-ctrl__icon-pause") : null;

    var currentIndex = 0;

    function updateMeta() {
      var item = items[currentIndex];
      if (!item || !titleEl || !descEl) return;
      titleEl.textContent = item.getAttribute("data-video-title") || "";
      descEl.textContent = item.getAttribute("data-video-desc") || "";
    }

    function setPlayingUi(playing) {
      if (!btnToggle) return;
      btnToggle.classList.toggle("is-playing", playing);
      if (iconPlay) iconPlay.hidden = playing;
      if (iconPause) iconPause.hidden = !playing;
      btnToggle.setAttribute("aria-label", playing ? t("film.pause") : t("film.play"));
    }

    function goClip(delta) {
      var wasPlaying = !video.paused;
      var len = items.length;
      currentIndex = (currentIndex + delta + len) % len;
      var item = items[currentIndex];
      var src = item.getAttribute("data-src");
      var poster = item.getAttribute("data-poster");
      video.setAttribute("poster", poster);
      if (wasPlaying) {
        video.src = src;
        video.setAttribute("data-film-index", String(currentIndex));
        video.load();
        video.play().catch(function () {});
        setPlayingUi(true);
      } else {
        video.pause();
        video.removeAttribute("src");
        video.removeAttribute("data-film-index");
        video.load();
        setPlayingUi(false);
      }
      updateMeta();
    }

    function togglePlay() {
      if (video.paused) {
        if (video.getAttribute("data-film-index") !== String(currentIndex)) {
          video.src = items[currentIndex].getAttribute("data-src");
          video.setAttribute("data-film-index", String(currentIndex));
          video.load();
        }
        video.play().catch(function () {});
      } else {
        video.pause();
      }
    }

    video.addEventListener("play", function () {
      setPlayingUi(true);
    });
    video.addEventListener("pause", function () {
      setPlayingUi(false);
    });
    video.addEventListener("ended", function () {
      setPlayingUi(false);
    });

    if (btnPrev) btnPrev.addEventListener("click", function () { goClip(-1); });
    if (btnNext) btnNext.addEventListener("click", function () { goClip(1); });
    if (btnToggle) btnToggle.addEventListener("click", togglePlay);

    window.__filmPlayerSync = function () {
      updateMeta();
      setPlayingUi(!video.paused);
    };

    var first = items[0];
    video.setAttribute("poster", first.getAttribute("data-poster"));
    updateMeta();
    setPlayingUi(false);
  }

  function bindDuration(el) {
    var v = document.createElement("video");
    v.preload = "metadata";
    v.muted = true;
    v.src = el.getAttribute("data-duration-src");
    v.addEventListener("loadedmetadata", function () {
      if (!v.duration || !isFinite(v.duration)) return;
      var m = Math.floor(v.duration / 60);
      var s = Math.floor(v.duration % 60);
      el.textContent = (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
    });
  }

  function bindUi() {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    document.querySelectorAll("[data-video-open]").forEach(bindVideoOpen);

    modalCloseEls.forEach(function (btn) {
      btn.addEventListener("click", closeVideoModal);
    });
    if (modal) {
      modal.addEventListener("click", function (e) {
        if (e.target === modal) closeVideoModal();
      });
    }

    imgModalCloseEls.forEach(function (btn) {
      btn.addEventListener("click", closeImageModal);
    });
    if (imgModal) {
      imgModal.addEventListener("click", function (e) {
        if (e.target === imgModal) closeImageModal();
      });
    }

    document.querySelectorAll("[data-gallery-open]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var src = btn.getAttribute("data-gallery-src");
        var cap = btn.getAttribute("data-gallery-cap") || "";
        openImageModal(src, cap);
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        if (modal && modal.classList.contains("is-open")) closeVideoModal();
        if (imgModal && imgModal.classList.contains("is-open")) closeImageModal();
      }
    });

    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href").slice(1);
        var el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

    document.querySelectorAll("[data-duration-src]").forEach(bindDuration);

    initFilmPlayer();

    var y = document.getElementById("y");
    if (y) y.textContent = String(new Date().getFullYear());

    initLangSwitch();
  }

  function finishBoot() {
    applyI18n();
    persistLang();
    bindUi();
  }

  function boot() {
    currentLang = getInitialLang();
    var hasEmbed = !!(getEmbeddedBundle("tr") || getEmbeddedBundle("en"));
    if (!hasEmbed) {
      fetchBundle(currentLang)
        .catch(function () {
          currentLang = "tr";
          return fetchBundle("tr").catch(function () {
            return {};
          });
        })
        .then(function (dict) {
          currentDict = dict || {};
          finishBoot();
        });
      return;
    }
    var dict = getEmbeddedBundle(currentLang);
    if (!dict) {
      currentLang = "tr";
      dict = getEmbeddedBundle("tr");
    }
    if (dict) bundles[currentLang] = dict;
    currentDict = dict || {};
    finishBoot();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
