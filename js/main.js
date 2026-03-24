(function () {
  const cursor = document.getElementById("cursor");
  const ring = document.getElementById("cursorRing");
  const modal = document.getElementById("modal");
  const modalVideo = document.getElementById("modalVideo");
  const modalPlaceholder = document.getElementById("modalPlaceholder");
  const ytFrame = document.getElementById("ytFrame");

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    setTimeout(() => {
      ring.style.left = e.clientX + "px";
      ring.style.top = e.clientY + "px";
    }, 60);
  });

  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".dot");
  const counter = document.getElementById("slideCounter");
  let current = 0;

  window.goSlide = function (n) {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");
    current = n;
    slides[current].classList.add("active");
    dots[current].classList.add("active");
    counter.textContent =
      String(current + 1).padStart(2, "0") + " / 0" + slides.length;
  };

  setInterval(() => {
    window.goSlide((current + 1) % slides.length);
  }, 5000);

  document.querySelectorAll(".slide-dots .dot").forEach((dot) => {
    const n = parseInt(dot.getAttribute("data-slide"), 10);
    dot.addEventListener("click", () => window.goSlide(n));
    dot.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        window.goSlide(n);
      }
    });
  });

  function showPlaceholder(show) {
    if (!modalPlaceholder) return;
    modalPlaceholder.classList.toggle("is-hidden", !show);
  }

  function resetPlayer() {
    if (modalVideo) {
      modalVideo.onerror = null;
      modalVideo.pause();
      modalVideo.removeAttribute("src");
      modalVideo.load();
      modalVideo.style.display = "none";
    }
    if (ytFrame) {
      ytFrame.src = "";
      ytFrame.style.display = "none";
    }
  }

  window.openModal = function (opts) {
    const videoSrc = opts && opts.video ? opts.video : "";
    const youtubeId = opts && opts.youtube ? opts.youtube : "";

    resetPlayer();
    modal.classList.add("open");
    document.body.style.overflow = "hidden";

    if (youtubeId && ytFrame) {
      ytFrame.src =
        "https://www.youtube.com/embed/" +
        youtubeId +
        "?autoplay=1&rel=0";
      ytFrame.style.display = "block";
      showPlaceholder(false);
      return;
    }

    if (videoSrc && modalVideo) {
      modalVideo.onerror = () => {
        modalVideo.style.display = "none";
        showPlaceholder(true);
      };
      modalVideo.src = videoSrc;
      modalVideo.style.display = "block";
      modalVideo.play().catch(() => {});
      showPlaceholder(false);
      return;
    }

    showPlaceholder(true);
  };

  window.closeModal = function () {
    modal.classList.remove("open");
    document.body.style.overflow = "";
    resetPlayer();
    showPlaceholder(true);
  };

  modal.addEventListener("click", (e) => {
    if (e.target === modal) window.closeModal();
  });

  document.querySelectorAll(".work-card[data-open-modal]").forEach((card) => {
    card.addEventListener("click", () => {
      window.openModal({
        video: card.getAttribute("data-video") || "",
        youtube: card.getAttribute("data-youtube") || "",
      });
    });
  });

  const revealEls = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = i * 0.08 + "s";
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  revealEls.forEach((el) => io.observe(el));

  document.querySelectorAll(".gallery-series li").forEach((li) => {
    li.addEventListener("click", () => {
      const active = document.querySelector(".gallery-series li.active");
      if (active) active.classList.remove("active");
      li.classList.add("active");
    });
  });

  document.querySelectorAll(
    "a, button, .work-card, .gal-item, .track-item, .nav-lang button"
  ).forEach((el) => {
    el.addEventListener("mouseenter", () => {
      ring.style.transform = "translate(-50%, -50%) scale(1.8)";
      ring.style.borderColor = "rgba(184,150,90,0.8)";
    });
    el.addEventListener("mouseleave", () => {
      ring.style.transform = "translate(-50%, -50%) scale(1)";
      ring.style.borderColor = "rgba(184,150,90,0.5)";
    });
  });

  document.querySelectorAll(".work-thumb").forEach((img) => {
    img.addEventListener("error", () => {
      img.classList.add("is-hidden");
    });
    img.addEventListener("load", () => {
      if (img.naturalWidth > 0) img.classList.remove("is-hidden");
    });
  });
})();
