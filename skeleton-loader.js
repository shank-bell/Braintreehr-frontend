/* ============================================================
   Skeleton loading controller — additive file.
   Shows the #skelLoader overlay (already painted in the HTML)
   until the page's images/fonts have finished loading, then
   fades it out. Safe no-op if #skelLoader isn't present.
   ============================================================ */
(function () {
  var MIN_MS = 450;   // keeps the skeleton from flashing on instant loads
  var MAX_MS = 3500;  // safety net so the overlay never hangs indefinitely
  var start = Date.now();
  var el = document.getElementById('skelLoader');
  if (!el) return;

  var done = false;
  function reveal() {
    if (done) return;
    done = true;
    el.classList.add('skel-fade');
    el.addEventListener('transitionend', function () {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, { once: true });
    // fallback in case transitionend doesn't fire (e.g. reduced motion)
    setTimeout(function () {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 500);
  }

  function ready() {
    var elapsed = Date.now() - start;
    var wait = Math.max(0, MIN_MS - elapsed);
    setTimeout(reveal, wait);
  }

  if (document.readyState === 'complete') {
    ready();
  } else {
    window.addEventListener('load', ready);
  }
  setTimeout(reveal, MAX_MS);
})();
