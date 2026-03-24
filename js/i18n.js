(function () {
  const STORAGE_KEY = "musty-lang";

  const DICT = {
    tr: {
      "meta.title": "Musty — Görsel Sanatçı",
      "lang.label": "Dil",
      "nav.works": "İşler",
      "nav.gallery": "Galeri",
      "nav.about": "Hakkında",
      "nav.contact": "İletişim",
      "hero.eyebrow": "Görsel Sanatçı · Film",
      "hero.tagline": "Görüntü, ses ve hissin birleştiği yer.",
      "hero.watch": "İzle",
      "hero.gallery": "Galeri",
      "hero.contact": "İletişim",
      "hero.scroll": "Kaydır",
      "works.label": "Seçili İşler",
      "works.title": "Görsel<br />Performanslar",
      "work1.num": "İş 01",
      "work1.title": "Sessizliğin Sesi",
      "work1.desc": "Canlı performans belgeseli · 2024",
      "work1.trackSub": "Canlı Performans · 2024",
      "work1.tag": "Canlı",
      "work1.alt": "Sessizliğin Sesi — önizleme",
      "work2.num": "İş 02",
      "work2.title": "Fragment",
      "work2.desc": "Sinematik kısa · 2024",
      "work2.trackSub": "Sinematik Kısa · 2024",
      "work2.tag": "Film",
      "work2.alt": "Fragment — önizleme",
      "work3.num": "Seans 03",
      "work3.title": "Karanlık Ritüel",
      "work3.desc": "Stüdyo seansı · 2023",
      "work3.trackSub": "Stüdyo Seansı · 2023",
      "work3.tag": "Seans",
      "work3.alt": "Karanlık Ritüel — önizleme",
      "work4.num": "Canlı Kesit 04",
      "work4.title": "Işık İzleri",
      "work4.desc": "Canlı kayıt · 2023",
      "work4.trackSub": "Canlı Kayıt · 2023",
      "work4.tag": "Canlı",
      "work4.alt": "Işık İzleri — önizleme",
      "work5.num": "Görsel 05",
      "work5.title": "Duman ve Gölge",
      "work5.desc": "Sanat filmi · 2023",
      "work5.trackSub": "Sanat Filmi · 2023",
      "work5.tag": "Görsel",
      "work5.alt": "Duman ve Gölge — önizleme",
      "gallery.label": "Editöryal Galeri",
      "gallery.title": "Kareler",
      "gal.all": "Tümü",
      "gal.backstage": "Kulis",
      "gal.portraits": "Portreler",
      "gal.silence": "Sessizlik",
      "gal.motion": "Hareket",
      "gal.cap1": "Kulis · 01",
      "gal.cap2": "Portre · 01",
      "gal.cap3": "Sessizlik · 01",
      "gal.cap4": "Hareket · 01",
      "gal.cap5": "Kulis · 02",
      "gal.cap6": "Portre · 02",
      "about.label": "Hakkında",
      "about.title": "Bir Sanatçının<br />Dili",
      "about.m1":
        "Görüntüyü sadece <strong>kayıt</strong> için değil, <strong>his bırakmak</strong> için kullanıyorum.",
      "about.m2":
        "Video ve fotoğraf benim için içerik değil, <strong>anlatım biçimi.</strong>",
      "about.m3": "Her kare bir sahne. Her sahne bir <strong>iz.</strong>",
      "about.m4":
        "Karanlık olmak güçsüzlük değil; <strong>seçilmiş bir dil.</strong>",
      "press.label": "Basın",
      "press.title": "Söylenenler",
      "press.q1":
        "Sinematik bir görsel dil. Her karede bilinçli bir his var.",
      "press.src1": "— Sanat Türkiye Dergisi",
      "press.q2": "Ham duygu, kontrollü çerçeve. Nadir bulunan bir denge.",
      "press.src2": "— Bant Mag",
      "press.q3":
        "Kişisel ve evrensel arasında kurulan köprü. Özgün bir imza.",
      "press.src3": "— Kolektif Istanbul",
      "contact.label": "İletişim",
      "contact.title": "Birlikte<br />Çalışalım",
      "contact.desc":
        "İşbirliği, booking ve proje soruları için. Her mesaja dönüş yapıyorum.",
      "contact.name": "Ad Soyad",
      "contact.phName": "İsminiz",
      "contact.email": "E-posta",
      "contact.phEmail": "email@alanadiniz.com",
      "contact.subject": "Konu",
      "contact.phSubject": "İşbirliği / Proje / Diğer",
      "contact.message": "Mesaj",
      "contact.phMessage": "Projenizden bahsedin...",
      "contact.submit": "Gönder",
      "footer.copy": "© 2024 Musty. Tüm hakları saklıdır.",
      "modal.close": "✕ Kapat",
      "modal.line1": "Video burada oynatılır.",
      "modal.hint":
        "assets/videos klasörüne MP4 ekleyin veya kartta data-youtube ile video kimliği verin.",
    },
    en: {
      "meta.title": "Musty — Visual Artist",
      "lang.label": "Language",
      "nav.works": "Works",
      "nav.gallery": "Gallery",
      "nav.about": "About",
      "nav.contact": "Contact",
      "hero.eyebrow": "Visual Artist · Filmmaker",
      "hero.tagline": "Where image, sound, and feeling meet.",
      "hero.watch": "Watch",
      "hero.gallery": "Gallery",
      "hero.contact": "Contact",
      "hero.scroll": "Scroll",
      "works.label": "Selected Works",
      "works.title": "Visual<br />Performances",
      "work1.num": "Work 01",
      "work1.title": "The Sound of Silence",
      "work1.desc": "Live performance documentation · 2024",
      "work1.trackSub": "Live Performance · 2024",
      "work1.tag": "Live",
      "work1.alt": "The Sound of Silence — thumbnail",
      "work2.num": "Work 02",
      "work2.title": "Fragment",
      "work2.desc": "Cinematic short · 2024",
      "work2.trackSub": "Cinematic Short · 2024",
      "work2.tag": "Film",
      "work2.alt": "Fragment — thumbnail",
      "work3.num": "Session 03",
      "work3.title": "Dark Ritual",
      "work3.desc": "Studio session · 2023",
      "work3.trackSub": "Studio Session · 2023",
      "work3.tag": "Session",
      "work3.alt": "Dark Ritual — thumbnail",
      "work4.num": "Live Cut 04",
      "work4.title": "Trails of Light",
      "work4.desc": "Live recording · 2023",
      "work4.trackSub": "Live Recording · 2023",
      "work4.tag": "Live",
      "work4.alt": "Trails of Light — thumbnail",
      "work5.num": "Visual 05",
      "work5.title": "Smoke and Shadow",
      "work5.desc": "Art film · 2023",
      "work5.trackSub": "Art Film · 2023",
      "work5.tag": "Visual",
      "work5.alt": "Smoke and Shadow — thumbnail",
      "gallery.label": "Editorial Gallery",
      "gallery.title": "Frames",
      "gal.all": "All",
      "gal.backstage": "Backstage",
      "gal.portraits": "Portraits",
      "gal.silence": "Silence",
      "gal.motion": "Motion",
      "gal.cap1": "Backstage · 01",
      "gal.cap2": "Portraits · 01",
      "gal.cap3": "Silence · 01",
      "gal.cap4": "Motion · 01",
      "gal.cap5": "Backstage · 02",
      "gal.cap6": "Portraits · 02",
      "about.label": "About",
      "about.title": "An Artist’s<br />Language",
      "about.m1":
        "I use image not only to <strong>record</strong>, but to <strong>leave a feeling.</strong>",
      "about.m2":
        "Video and photography are not content for me—they are a <strong>mode of speech.</strong>",
      "about.m3": "Every frame is a scene. Every scene a <strong>trace.</strong>",
      "about.m4":
        "Darkness is not weakness; it is a <strong>chosen language.</strong>",
      "press.label": "Press",
      "press.title": "What They Say",
      "press.q1": "A cinematic visual language. A conscious emotion in every frame.",
      "press.src1": "— Sanat Türkiye Magazine",
      "press.q2": "Raw emotion, controlled frame. A rare balance.",
      "press.src2": "— Bant Mag",
      "press.q3": "A bridge between personal and universal. A singular voice.",
      "press.src3": "— Kolektif Istanbul",
      "contact.label": "Contact",
      "contact.title": "Let’s Work<br />Together",
      "contact.desc":
        "For collaborations, bookings, and project inquiries. I reply to every message.",
      "contact.name": "Full name",
      "contact.phName": "Your name",
      "contact.email": "Email",
      "contact.phEmail": "email@domain.com",
      "contact.subject": "Subject",
      "contact.phSubject": "Collaboration / Project / Other",
      "contact.message": "Message",
      "contact.phMessage": "Tell me about your project…",
      "contact.submit": "Send",
      "footer.copy": "© 2024 Musty. All rights reserved.",
      "modal.close": "✕ Close",
      "modal.line1": "The video plays here.",
      "modal.hint":
        "Add MP4 files under assets/videos or set a YouTube id with data-youtube on the card.",
    },
    fr: {
      "meta.title": "Musty — Artiste visuel",
      "lang.label": "Langue",
      "nav.works": "Œuvres",
      "nav.gallery": "Galerie",
      "nav.about": "À propos",
      "nav.contact": "Contact",
      "hero.eyebrow": "Artiste visuel · Cinéaste",
      "hero.tagline": "Là où l’image, le son et la sensation se rencontrent.",
      "hero.watch": "Regarder",
      "hero.gallery": "Galerie",
      "hero.contact": "Contact",
      "hero.scroll": "Défiler",
      "works.label": "Œuvres choisies",
      "works.title": "Performances<br />visuelles",
      "work1.num": "Œuvre 01",
      "work1.title": "Le son du silence",
      "work1.desc": "Documentation de performance live · 2024",
      "work1.trackSub": "Performance live · 2024",
      "work1.tag": "Live",
      "work1.alt": "Le son du silence — vignette",
      "work2.num": "Œuvre 02",
      "work2.title": "Fragment",
      "work2.desc": "Court métrage cinématographique · 2024",
      "work2.trackSub": "Court métrage · 2024",
      "work2.tag": "Film",
      "work2.alt": "Fragment — vignette",
      "work3.num": "Session 03",
      "work3.title": "Rituel sombre",
      "work3.desc": "Session studio · 2023",
      "work3.trackSub": "Session studio · 2023",
      "work3.tag": "Session",
      "work3.alt": "Rituel sombre — vignette",
      "work4.num": "Live 04",
      "work4.title": "Traces de lumière",
      "work4.desc": "Enregistrement live · 2023",
      "work4.trackSub": "Enregistrement live · 2023",
      "work4.tag": "Live",
      "work4.alt": "Traces de lumière — vignette",
      "work5.num": "Visuel 05",
      "work5.title": "Fumée et ombre",
      "work5.desc": "Film d’art · 2023",
      "work5.trackSub": "Film d’art · 2023",
      "work5.tag": "Visuel",
      "work5.alt": "Fumée et ombre — vignette",
      "gallery.label": "Galerie éditoriale",
      "gallery.title": "Cadres",
      "gal.all": "Tout",
      "gal.backstage": "Coulisses",
      "gal.portraits": "Portraits",
      "gal.silence": "Silence",
      "gal.motion": "Mouvement",
      "gal.cap1": "Coulisses · 01",
      "gal.cap2": "Portrait · 01",
      "gal.cap3": "Silence · 01",
      "gal.cap4": "Mouvement · 01",
      "gal.cap5": "Coulisses · 02",
      "gal.cap6": "Portrait · 02",
      "about.label": "À propos",
      "about.title": "La langue<br />d’un artiste",
      "about.m1":
        "J’utilise l’image pas seulement pour <strong>enregistrer</strong>, mais pour <strong>laisser une sensation.</strong>",
      "about.m2":
        "La vidéo et la photo ne sont pas du contenu pour moi—ce sont un <strong>mode d’expression.</strong>",
      "about.m3": "Chaque cadre est une scène. Chaque scène une <strong>trace.</strong>",
      "about.m4":
        "L’obscurité n’est pas faiblesse ; c’est une <strong>langue choisie.</strong>",
      "press.label": "Presse",
      "press.title": "Ils en parlent",
      "press.q1":
        "Un langage visuel cinématographique. Une émotion consciente dans chaque cadre.",
      "press.src1": "— Sanat Türkiye Magazine",
      "press.q2": "Émotion brute, cadrage maîtrisé. Un équilibre rare.",
      "press.src2": "— Bant Mag",
      "press.q3":
        "Un pont entre l’intime et l’universel. Une voix singulière.",
      "press.src3": "— Kolektif Istanbul",
      "contact.label": "Contact",
      "contact.title": "Travaillons<br />ensemble",
      "contact.desc":
        "Collaborations, réservations et projets. Je réponds à chaque message.",
      "contact.name": "Nom complet",
      "contact.phName": "Votre nom",
      "contact.email": "E-mail",
      "contact.phEmail": "email@domaine.com",
      "contact.subject": "Sujet",
      "contact.phSubject": "Collaboration / Projet / Autre",
      "contact.message": "Message",
      "contact.phMessage": "Parlez-moi de votre projet…",
      "contact.submit": "Envoyer",
      "footer.copy": "© 2024 Musty. Tous droits réservés.",
      "modal.close": "✕ Fermer",
      "modal.line1": "La vidéo s’affiche ici.",
      "modal.hint":
        "Ajoutez des MP4 dans assets/videos ou un identifiant YouTube via data-youtube sur la carte.",
    },
  };

  let current = "tr";

  function t(key) {
    const pack = DICT[current] || DICT.tr;
    if (pack[key] !== undefined) return pack[key];
    const en = DICT.en[key];
    return en !== undefined ? en : key;
  }

  function applyModalPlaceholder() {
    const wrap = document.getElementById("modalPlaceholder");
    if (!wrap) return;
    wrap.innerHTML =
      "<p>" +
      t("modal.line1") +
      "<br /><span class=\"modal-hint\">" +
      t("modal.hint") +
      "</span></p>";
  }

  function apply() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      if (!key) return;
      el.textContent = t(key);
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      const key = el.getAttribute("data-i18n-html");
      if (!key) return;
      el.innerHTML = t(key);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      const key = el.getAttribute("data-i18n-placeholder");
      if (!key) return;
      el.placeholder = t(key);
    });

    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      const key = el.getAttribute("data-i18n-alt");
      if (!key) return;
      el.alt = t(key);
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      const key = el.getAttribute("data-i18n-aria");
      if (!key) return;
      el.setAttribute("aria-label", t(key));
    });

    document.title = t("meta.title");
    applyModalPlaceholder();
  }

  function setLang(lang) {
    if (!DICT[lang]) return;
    current = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}

    const htmlLang = lang === "en" ? "en" : lang === "fr" ? "fr" : "tr";
    document.documentElement.lang = htmlLang;

    document.querySelectorAll(".nav-lang button").forEach(function (btn) {
      const on = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });

    apply();
  }

  window.I18n = { setLang: setLang, t: t, apply: apply };

  document.addEventListener("DOMContentLoaded", function () {
    let saved = "tr";
    try {
      saved = localStorage.getItem(STORAGE_KEY) || "tr";
    } catch (e) {}
    if (!DICT[saved]) saved = "tr";
    setLang(saved);

    document.querySelectorAll(".nav-lang button[data-lang]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(btn.getAttribute("data-lang"));
      });
    });
  });
})();
