(() => {
  const track = document.getElementById('home-review-track');
  if (!track) return;

  // Capture review-track keys before the shared carousel handler runs.
  track.addEventListener('keydown', event => {
    if (event.target !== track) return;
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const card = track.querySelector('.customer-review');
    const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap);
    const behavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
    if (event.key === 'Home' || event.key === 'End') {
      track.scrollTo({ left: event.key === 'Home' ? 0 : track.scrollWidth, behavior });
    } else {
      track.scrollBy({ left: event.key === 'ArrowLeft' ? -step : step, behavior });
    }
  }, { capture: true });
})();
