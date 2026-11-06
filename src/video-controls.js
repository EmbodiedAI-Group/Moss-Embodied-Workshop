for (const tools of document.querySelectorAll('.promo-tools')) {
  const checkbox = tools.querySelector('[data-video-loop]');
  const video = tools.parentElement.querySelector('video');
  checkbox.addEventListener('change', () => { video.loop = checkbox.checked; });
  tools.hidden = false;
}
