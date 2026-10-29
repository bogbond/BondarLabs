/* Basic consent mode: no Google container until explicit analytics consent. */
(() => {
  'use strict';
  const KEY = 'bl_consent_v1';
  const MEASUREMENT_ID = 'G-NZ8GQHBH8V';
  const CONTRACT = '2';
  const bar = document.querySelector('[data-cookie]');
  const modal = document.querySelector('[data-cookie-modal]');
  const checkbox = document.querySelector('[data-cookie-analytics]');
  const allowedEvents = new Set(['whatsapp_click', 'phone_click', 'email_click', 'quote_cta_click', 'form_submit_attempt', 'generate_lead']);
  let allowed = false;
  let loaded = false;
  let returnFocus = null;

  function readConsent() {
    try {
      const value = JSON.parse(localStorage.getItem(KEY));
      return value && typeof value.analytics === 'boolean' && typeof value.decidedAt === 'string' &&
        Number.isFinite(Date.parse(value.decidedAt)) ? value : null;
    } catch { return null; }
  }

  function push(value) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(value);
  }

  function clearAnalyticsCookies() {
    const hostParts = location.hostname.split('.');
    const domains = [''];
    for (let i = 0; i < hostParts.length - 1; i++) domains.push(hostParts.slice(i).join('.'));
    document.cookie.split(';').forEach((item) => {
      const name = item.trim().split('=')[0];
      if (!/^(_ga(?:_|$)|_gid$|_gat(?:_|$))/.test(name)) return;
      domains.forEach((domain) => {
        document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax${domain ? `; domain=${domain}` : ''}`;
      });
    });
  }

  function applyConsent(value, reloadOnRevoke = true) {
    const wasAllowed = allowed;
    allowed = value === true;
    // Disable GA before notifying GTM or unloading. Consent denied alone can send cookieless pings.
    window['ga-disable-' + MEASUREMENT_ID] = !allowed;
    push({
      event: 'bl_consent_update',
      bl_analytics_contract: CONTRACT,
      bl_analytics_consent: allowed ? 'granted' : 'denied'
    });
    if (!allowed) {
      clearAnalyticsCookies();
      if (reloadOnRevoke && (loaded || wasAllowed)) location.reload();
      return;
    }
    if (loaded) return;
    const id = window.BONDAR_SITE?.gtmId;
    if (!/^GTM-[A-Z0-9]+$/.test(id || '') || id === 'GTM-XXXXXXX') return;
    loaded = true;
    push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(id);
    document.head.appendChild(script);
    // Sent once per document; the consent template runs at Consent Initialization first.
    push({ event: 'bl_analytics_ready' });
  }

  function openSettings() {
    if (!modal || modal.open) return;
    returnFocus = document.activeElement;
    // These are draft preferences, not permission to load analytics.
    const saved = readConsent();
    if (checkbox) checkbox.checked = saved ? saved.analytics : true;
    modal.showModal();
    modal.querySelector('[data-cookie-close]')?.focus({ preventScroll: true });
  }

  function closeSettings() {
    if (!modal?.open) return;
    modal.close();
    const target = returnFocus?.isConnected && !returnFocus.closest('[hidden]') ? returnFocus :
      document.querySelector('[data-open-cookie-settings]');
    target?.focus({ preventScroll: true });
  }

  function saveConsent(value) {
    try {
      localStorage.setItem(KEY, JSON.stringify({ analytics: value === true, decidedAt: new Date().toISOString() }));
    } catch {
      // A failed write must not leave a previously permitted container running.
      try { localStorage.removeItem(KEY); } catch { /* Keep this document disabled if storage is read-only. */ }
      applyConsent(false, false);
      if (bar) bar.hidden = false;
      if (checkbox) checkbox.checked = false;
      document.querySelectorAll('[data-cookie-status]').forEach((status) => {
        status.textContent = 'Your choice could not be saved. Analytics remains off. Please allow site storage and try again.';
      });
      return;
    }
    if (bar) bar.hidden = true;
    closeSettings();
    applyConsent(value);
  }

  function track(event, payload = {}) {
    if (!allowed || !loaded || !allowedEvents.has(event)) return;
    const clean = { event, bl_analytics_contract: CONTRACT, bl_analytics_consent: 'granted',
      link_placement: '', form_type: '' };
    if (['header', 'footer', 'main'].includes(payload.link_placement)) clean.link_placement = payload.link_placement;
    if (['quote', 'contact'].includes(payload.form_type)) clean.form_type = payload.form_type;
    push(clean);
  }
  window.BondarAnalytics = Object.freeze({ track });

  document.querySelectorAll('[data-cookie-accept]').forEach((el) => el.addEventListener('click', () => saveConsent(true)));
  document.querySelectorAll('[data-cookie-reject]').forEach((el) => el.addEventListener('click', () => saveConsent(false)));
  document.querySelector('[data-cookie-save]')?.addEventListener('click', () => saveConsent(checkbox?.checked === true));
  document.querySelectorAll('[data-cookie-manage], [data-open-cookie-settings]').forEach((el) => el.addEventListener('click', openSettings));
  document.querySelectorAll('[data-cookie-close]').forEach((el) => el.addEventListener('click', closeSettings));
  modal?.addEventListener('cancel', (event) => { event.preventDefault(); closeSettings(); });
  modal?.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const stops = [...modal.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])')]
      .filter((el) => el.getClientRects().length > 0);
    const first = stops[0], last = stops[stops.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  });

  document.addEventListener('click', (event) => {
    const link = event.target.closest?.('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    let name = link.getAttribute('data-track');
    if (!name && /^mailto:/i.test(href)) name = 'email_click';
    if (!name && /^tel:/i.test(href)) name = 'phone_click';
    try {
      const url = new URL(href, location.href);
      if (!name && ['wa.me', 'api.whatsapp.com'].includes(url.hostname)) name = 'whatsapp_click';
      if (!name && url.origin === location.origin && /\/quote\/?$/.test(url.pathname)) name = 'quote_cta_click';
    } catch { return; }
    if (name) track(name, { link_placement: link.closest('header') ? 'header' : link.closest('footer') ? 'footer' : 'main' });
  });

  // A different tab can withdraw consent while this document is still open.
  window.addEventListener('storage', (event) => {
    if (event.key !== KEY && event.key !== null) return;
    const consent = readConsent();
    if (allowed && consent?.analytics !== true) applyConsent(false);
    if (!consent && bar) bar.hidden = false;
  });
  // Restore from the back/forward cache only if persisted permission still exists.
  window.addEventListener('pageshow', (event) => {
    if (event.persisted && readConsent()?.analytics !== true && allowed) applyConsent(false);
  });

  const consent = readConsent();
  if (bar) bar.hidden = consent !== null;
  applyConsent(consent?.analytics === true);
})();
