(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Theme toggle (light/dark) with system default
  const THEME_KEY = "bl_theme_v1";
  const root = document.documentElement;
  const themeBtn = $("[data-theme-toggle]");
  const themeIcon = $("[data-theme-icon]");
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');

  const prefersDark = () => window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  function getEffectiveTheme() {
    const attr = root.getAttribute("data-theme");
    if (attr === "light" || attr === "dark") return attr;
    return prefersDark() ? "dark" : "light";
  }

  function setTheme(theme, persist = true) {
    if (theme === "light" || theme === "dark") {
      root.setAttribute("data-theme", theme);
      if (persist) {
        try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
      }
    } else {
      root.removeAttribute("data-theme");
      try { localStorage.removeItem(THEME_KEY); } catch (e) {}
    }
    updateThemeUI();
  }

  function updateThemeColor() {
    if (!metaThemeColor) return;
    const bg = getComputedStyle(root).getPropertyValue("--bg").trim();
    if (bg) metaThemeColor.setAttribute("content", bg);
  }

  function updateThemeUI() {
    const effective = getEffectiveTheme();
    const next = effective === "dark" ? "light" : "dark";
    if (themeBtn) themeBtn.setAttribute("aria-label", `Switch to ${next} theme`);
    if (themeIcon) themeIcon.textContent = effective === "dark" ? "☀" : "☾";
    updateThemeColor();
  }

  // Keep icon in sync on load/system changes (when no explicit user choice)
  updateThemeUI();
  try {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener?.("change", () => {
      if (!root.getAttribute("data-theme")) updateThemeUI();
    });
  } catch (e) {}

  themeBtn?.addEventListener("click", () => {
    const effective = getEffectiveTheme();
    const next = effective === "dark" ? "light" : "dark";
    setTheme(next, true);
  });

  // Navigation (mobile + dropdowns)
  const navToggle = $(".nav-toggle");
  const siteNav = $("#site-nav");
  const navClose = $("[data-nav-close]", siteNav || document);

  const isMobileNav = () => window.matchMedia("(max-width: 980px)").matches;
  const NAV_OPEN_CLASS = "nav-open";
  let scrollLockY = 0;
  let scrollLocked = false;
  let navTouchStartY = 0;

  /*
    IMPORTANT: Avoid locking scroll via `body { position: fixed }` on mobile.
    On some iOS/Android WebViews this can cause rendering glitches where the
    full-screen fixed menu becomes "corrupted"/shows artifacts.

    Instead we use an `overflow:hidden` class on <html>/<body> and add a small
    iOS overscroll guard to stop the background from rubber-banding.
  */
  function lockScroll() {
    if (scrollLocked) return;
    scrollLockY = window.scrollY || window.pageYOffset || 0;
    document.documentElement.classList.add(NAV_OPEN_CLASS);
    document.body.classList.add(NAV_OPEN_CLASS);
    scrollLocked = true;
  }

  function unlockScroll() {
    if (!scrollLocked) return;
    document.documentElement.classList.remove(NAV_OPEN_CLASS);
    document.body.classList.remove(NAV_OPEN_CLASS);
    // Some browsers may nudge scroll position when toggling overflow.
    window.scrollTo(0, scrollLockY);
    scrollLocked = false;
  }

  function closeAllDropdowns(exceptLi = null) {
    $$(".has-dropdown.open").forEach((li) => {
      if (exceptLi && li === exceptLi) return;
      li.classList.remove("open");
      const caret = $(".nav-caret", li);
      caret?.setAttribute("aria-expanded", "false");
    });
  }

  function setInert(el, on) {
    if (!el) return;
    // `inert` prevents focus + hides content from assistive tech.
    // We also mirror it as an attribute for broader compatibility.
    try { el.inert = !!on; } catch (e) {}
    if (on) el.setAttribute("inert", "");
    else el.removeAttribute("inert");
  }

  function syncNavA11y() {
    if (!siteNav || !navToggle) return;
    const open = siteNav.classList.contains("open");
    if (isMobileNav()) {
      siteNav.setAttribute("aria-hidden", open ? "false" : "true");
      setInert(siteNav, !open);
    } else {
      siteNav.removeAttribute("aria-hidden");
      setInert(siteNav, false);
    }
  }
  function updateNavToggleLabel() {
    if (!navToggle || !siteNav) return;
    const open = siteNav.classList.contains("open");
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }


  function openNav() {
    if (!siteNav || !navToggle) return;
    siteNav.classList.add("open");
    navToggle.setAttribute("aria-expanded", "true");
    updateNavToggleLabel();
    if (isMobileNav()) lockScroll();
    syncNavA11y();
    // Move focus into the menu for keyboard users.
    const firstLink = $("a", siteNav);
    firstLink?.focus?.({ preventScroll: true });
  }

  function closeNav({ returnFocus = true } = {}) {
    if (!siteNav || !navToggle) return;

    // If focus is currently inside the nav, move it away BEFORE we hide it.
    // Otherwise browsers can warn and may block aria-hidden.
    const active = document.activeElement;
    const focusInside = !!(active && siteNav.contains(active));
    if (focusInside) {
      if (returnFocus) navToggle.focus?.({ preventScroll: true });
      else active?.blur?.();
    }

    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    updateNavToggleLabel();
    unlockScroll();
    closeAllDropdowns();
    syncNavA11y();
    if (returnFocus) navToggle.focus?.({ preventScroll: true });
  }

  if (navToggle && siteNav) {
    // Default state on load.
    syncNavA11y();
    updateNavToggleLabel();

    navToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.contains("open");
      if (isOpen) closeNav();
      else openNav();
    });

    navClose?.addEventListener("click", () => {
      // Make closing obvious + keep focus in a safe place for a11y.
      closeNav({ returnFocus: true });
    });


    // Close nav on any link click (mobile).
    $$("a", siteNav).forEach((a) => {
      a.addEventListener("click", () => {
        if (isMobileNav()) closeNav({ returnFocus: false });
      });
    });

    // iOS/WebView: prevent "rubber-band" scrolling the page behind the open menu.
    // This is intentionally minimal and only runs while the menu is open.
    siteNav.addEventListener("touchstart", (e) => {
      if (!isMobileNav() || !siteNav.classList.contains("open")) return;
      const t = e.touches && e.touches[0];
      navTouchStartY = t ? t.clientY : 0;
    }, { passive: true });

    siteNav.addEventListener("touchmove", (e) => {
      if (!isMobileNav() || !siteNav.classList.contains("open")) return;
      const t = e.touches && e.touches[0];
      if (!t) return;
      const deltaY = t.clientY - navTouchStartY;
      const atTop = siteNav.scrollTop <= 0;
      const atBottom = siteNav.scrollHeight - siteNav.scrollTop <= siteNav.clientHeight + 1;
      if ((atTop && deltaY > 0) || (atBottom && deltaY < 0)) {
        e.preventDefault();
      }
    }, { passive: false });

    document.addEventListener("touchmove", (e) => {
      if (!isMobileNav() || !siteNav.classList.contains("open")) return;
      const target = e.target;
      // Allow scrolling inside the menu itself.
      // @ts-ignore
      if (target && typeof target === "object" && target.closest && target.closest("#site-nav")) return;
      e.preventDefault();
    }, { passive: false });

    // Keep things sane when resizing/rotating.
    window.addEventListener("resize", () => {
      if (!isMobileNav()) {
        unlockScroll();
        siteNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        updateNavToggleLabel();
        closeAllDropdowns();
      } else if (siteNav.classList.contains("open")) {
        lockScroll();
      }
      syncNavA11y();
    });
  }

  // Dropdown toggle (caret button) — works on touch devices + optional click on desktop.
  $$(".has-dropdown").forEach((li) => {
    const caret = $(".nav-caret", li);
    if (!caret) return;
    caret.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const willOpen = !li.classList.contains("open");
      closeAllDropdowns(li);
      li.classList.toggle("open", willOpen);
      caret.setAttribute("aria-expanded", String(willOpen));
    });
  });

  // Close dropdowns when clicking outside.
  document.addEventListener("click", (e) => {
    const target = e.target;
    // Ignore clicks inside the nav; only close dropdowns if the click is outside any dropdown item.
    if (target && typeof target === "object") {
      // @ts-ignore
      if (target.closest?.(".has-dropdown")) return;
    }
    closeAllDropdowns();
  });

  // Escape closes open menus.
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (siteNav?.classList.contains("open")) {
      closeNav();
    } else {
      closeAllDropdowns();
    }
  });

  // Tracking helper
  function track(eventName, payload = {}) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...payload });
  }

  // Click tracking
  $$('[data-track]').forEach((el) => {
    el.addEventListener('click', () => {
      const name = el.getAttribute('data-track');
      if (name) track(name);
    });
  });

  // Cookie consent + GTM loader
  const CONSENT_KEY = "bl_consent_v1";
  const cookieBar = $('[data-cookie]');
  const cookieModal = $('[data-cookie-modal]');
  const btnAccept = $('[data-cookie-accept]');
  const btnManage = $('[data-cookie-manage]');
  const btnSave = $('[data-cookie-save]');
  const btnReject = $('[data-cookie-reject]');
  const btnCloses = $$('[data-cookie-close]');
  const chkAnalytics = $('[data-cookie-analytics]');
  const openSettings = $$('[data-open-cookie-settings]');

  function readConsent() {
    try {
      const raw = localStorage.getItem(CONSENT_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function writeConsent(consent) {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({
      analytics: !!consent.analytics,
      decidedAt: new Date().toISOString()
    }));
  }

  function showBar() {
    if (!cookieBar) return;
    cookieBar.hidden = false;
  }

  function hideBar() {
    if (!cookieBar) return;
    cookieBar.hidden = true;
  }

  function openModal() {
    if (!cookieModal) return;
    const consent = readConsent();
    if (chkAnalytics) chkAnalytics.checked = consent ? !!consent.analytics : false;
    cookieModal.hidden = false;
  }

  function closeModal() {
    if (!cookieModal) return;
    cookieModal.hidden = true;
  }

  function loadGTM() {
    const id = window.BONDAR_SITE?.gtmId;
    if (!id || id === "GTM-XXXXXXX") return;
    if (window.__gtmLoaded) return;
    window.__gtmLoaded = true;

    // Standard GTM loader (executed after consent)
    (function(w,d,s,l,i){
      w[l]=w[l]||[];
      w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
      var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
      j.async=true;
      j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
      f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer',id);

    // noscript fallback (still useful even after consent)
    const ns = document.createElement('noscript');
    ns.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${id}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    document.body.appendChild(ns);
  }

  // Init consent state
  const existing = readConsent();
  if (!existing) {
    showBar();
  } else {
    if (existing.analytics) loadGTM();
  }

  btnAccept?.addEventListener('click', () => {
    writeConsent({ analytics: true });
    hideBar();
    loadGTM();
  });

  btnManage?.addEventListener('click', () => {
    openModal();
  });

  btnSave?.addEventListener('click', () => {
    const analytics = !!chkAnalytics?.checked;
    writeConsent({ analytics });
    hideBar();
    closeModal();
    if (analytics) loadGTM();
  });

  btnReject?.addEventListener('click', () => {
    writeConsent({ analytics: false });
    hideBar();
    closeModal();
  });

  btnCloses.forEach((b) => b.addEventListener('click', closeModal));
  openSettings.forEach((b) => b.addEventListener('click', openModal));

  // Fire page-level events
  const fire = $('[data-fire-event]');
  if (fire) {
    const ev = fire.getAttribute('data-fire-event');
    if (ev) track(ev);
  }

  // Simple horizontal carousels (e.g. home portfolio)
  $$('[data-carousel]').forEach((carousel) => {
    const track = $('[data-carousel-track]', carousel);
    if (!track) return;

    const btnPrev = $('[data-carousel-prev]', carousel);
    const btnNext = $('[data-carousel-next]', carousel);
    let pointerDown = false;
    let dragging = false;
    let dragStartX = 0;
    let dragStartScroll = 0;
    let suppressClick = false;
    let activePointerId = null;

    function getStep() {
      const first = track.querySelector('.carousel-item');
      const styles = getComputedStyle(track);
      const gapRaw = styles.columnGap || styles.gap || '16px';
      const gap = parseFloat(gapRaw) || 16;
      if (first) {
        const w = first.getBoundingClientRect().width;
        const full = w + gap;
        const visible = Math.max(1, Math.floor((track.clientWidth + gap) / full));
        return Math.max(120, Math.round(visible * full));
      }
      return Math.max(120, Math.round(track.clientWidth * 0.9));
    }

    function updateButtons() {
      const max = track.scrollWidth - track.clientWidth;
      const x = track.scrollLeft;
      const atStart = x <= 1;
      const atEnd = x >= max - 1;
      if (btnPrev) btnPrev.disabled = atStart;
      if (btnNext) btnNext.disabled = atEnd;
    }

    function scrollByDir(dir) {
      track.scrollBy({ left: dir * getStep(), behavior: 'smooth' });
    }

    function removeDragListeners() {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerCancel);
      window.removeEventListener('blur', endDrag);
    }

    function endDrag() {
      if (!pointerDown && activePointerId === null) return;
      pointerDown = false;
      activePointerId = null;
      removeDragListeners();
      track.classList.remove('is-pointer-down');
      track.classList.remove('is-dragging');
      window.setTimeout(() => {
        dragging = false;
      }, 0);
    }

    function onPointerMove(e) {
      if (!pointerDown) return;
      if (activePointerId !== null && e.pointerId !== activePointerId) return;
      const deltaX = e.clientX - dragStartX;
      if (!dragging && Math.abs(deltaX) > 6) {
        dragging = true;
        suppressClick = true;
        track.classList.add('is-dragging');
      }
      if (!dragging) return;
      e.preventDefault();
      track.scrollLeft = dragStartScroll - deltaX;
    }

    function onPointerUp(e) {
      if (activePointerId !== null && e.pointerId !== activePointerId) return;
      endDrag();
    }

    function onPointerCancel(e) {
      if (activePointerId !== null && e.pointerId !== activePointerId) return;
      endDrag();
    }

    btnPrev?.addEventListener('click', () => scrollByDir(-1));
    btnNext?.addEventListener('click', () => scrollByDir(1));

    track.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'touch') return;
      if (typeof e.button === 'number' && e.button !== 0) return;
      if (pointerDown) return;
      // Avoid pointer capture here: it can suppress native link clicks inside the carousel.
      pointerDown = true;
      dragging = false;
      suppressClick = false;
      activePointerId = e.pointerId;
      dragStartX = e.clientX;
      dragStartScroll = track.scrollLeft;
      track.classList.add('is-pointer-down');
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
      window.addEventListener('pointercancel', onPointerCancel);
      window.addEventListener('blur', endDrag);
    });

    track.addEventListener('dragstart', (e) => e.preventDefault());

    track.addEventListener('click', (e) => {
      if (!suppressClick) return;
      e.preventDefault();
      e.stopPropagation();
      suppressClick = false;
    }, true);

    track.addEventListener('scroll', () => {
      window.requestAnimationFrame(updateButtons);
    }, { passive: true });

    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollByDir(1);
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollByDir(-1);
      }
    });

    window.addEventListener('resize', updateButtons);
    updateButtons();
  });


  // Hero proof slider (page-by-page highlights inside the hero card)
  $$('[data-proof-slider]').forEach((slider) => {
    const pages = $$('[data-proof-page]', slider);
    const btnPrev = $('[data-proof-prev]', slider);
    const btnNext = $('[data-proof-next]', slider);
    const dots = $$('[data-proof-dot]', slider);
    if (!pages.length) return;

    let activeIndex = Math.max(0, pages.findIndex((page) => page.classList.contains('is-active')));
    if (activeIndex < 0) activeIndex = 0;

    function update() {
      pages.forEach((page, index) => {
        const active = index === activeIndex;
        page.classList.toggle('is-active', active);
        page.setAttribute('aria-hidden', String(!active));
      });

      dots.forEach((dot, index) => {
        const active = index === activeIndex;
        dot.classList.toggle('is-active', active);
        dot.setAttribute('aria-pressed', String(active));
      });

      const multiple = pages.length > 1;
      if (btnPrev) btnPrev.hidden = !multiple;
      if (btnNext) btnNext.hidden = !multiple;
      slider.classList.toggle('proof-slider-single', !multiple);
    }

    function setPage(nextIndex) {
      const count = pages.length;
      if (!count) return;
      activeIndex = (nextIndex + count) % count;
      update();
    }

    btnPrev?.addEventListener('click', () => setPage(activeIndex - 1));
    btnNext?.addEventListener('click', () => setPage(activeIndex + 1));

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => setPage(index));
    });

    let touchStartX = 0;
    let touchStartY = 0;

    slider.addEventListener('touchstart', (e) => {
      const touch = e.changedTouches && e.changedTouches[0];
      if (!touch) return;
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
      const touch = e.changedTouches && e.changedTouches[0];
      if (!touch) return;
      const deltaX = touch.clientX - touchStartX;
      const deltaY = touch.clientY - touchStartY;
      if (Math.abs(deltaX) < 40 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
      if (deltaX < 0) setPage(activeIndex + 1);
      else setPage(activeIndex - 1);
    }, { passive: true });

    slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setPage(activeIndex + 1);
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setPage(activeIndex - 1);
      }
    });

    update();
  });
})();
