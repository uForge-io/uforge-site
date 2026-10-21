(() => {
  // Torn down (via AbortController) at the start of every init() call, so
  // a page that had the hero doesn't leak its `resize` listener onto the
  // next one navigated to via instant loading.
  let teardown;

  const init = () => {
    if (teardown) teardown();
    teardown = undefined;

    const hero = document.querySelector('.uf-spotlight-hero');
    if (!hero || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const field = hero.querySelector('.uf-spotlight-field');
    const items = [...hero.querySelectorAll('.uf-spotlight-item')];
    if (!field || !items.length) return;

    const controller = new AbortController();
    const { signal } = controller;
    let frame;
    teardown = () => {
      controller.abort();
      if (frame) cancelAnimationFrame(frame);
    };

    let pointer = { x: innerWidth / 2, y: innerHeight / 2 };

    const update = () => {
      frame = undefined;
      // --spotlight-x/y are read by .uf-spotlight-hero's own ::before/::after
      // (the background grid mask + cursor glow), so they must be set on
      // `hero` itself — CSS custom properties only flow down the DOM tree.
      // Setting them on `field` (a descendant) never reaches the ancestor's
      // background, which is why the continuous cursor-following glow was
      // invisible/static.
      const bounds = hero.getBoundingClientRect();
      hero.style.setProperty('--spotlight-x', `${pointer.x - bounds.left}px`);
      hero.style.setProperty('--spotlight-y', `${pointer.y - bounds.top}px`);

      items.forEach((item) => {
        const box = item.getBoundingClientRect();
        const centerX = box.left + box.width / 2;
        const centerY = box.top + box.height / 2;
        const radius = Number(item.dataset.radius) || 240;
        const proximity = Math.max(0, 1 - Math.hypot(pointer.x - centerX, pointer.y - centerY) / radius);
        const reveal = Math.pow(proximity, 1.8); // eased ramp, matches the reference file's feel
        item.style.setProperty('--reveal', reveal.toFixed(3));
      });
    };

    hero.addEventListener('pointermove', (event) => {
      pointer = { x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(update);
    }, { signal });
    addEventListener('resize', update, { signal });
    hero.addEventListener('pointerleave', () => {
      items.forEach((item) => item.style.setProperty('--reveal', '0'));
      hero.style.removeProperty('--spotlight-x');
      hero.style.removeProperty('--spotlight-y');
    }, { signal });

    // Show/Hide toggle: forces every card to full visibility via the
    // .uf-spotlight-force-reveal class (see uforge-home.css), bypassing the
    // pointer-proximity --reveal value entirely. Button label text lives in
    // two nested spans toggled by [aria-pressed] in CSS, so this stays
    // language-agnostic — same script serves both docs/ and docs_zh/.
    const toggle = document.getElementById('uf-spotlight-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        const pressed = toggle.getAttribute('aria-pressed') === 'true';
        toggle.setAttribute('aria-pressed', pressed ? 'false' : 'true');
        hero.classList.toggle('uf-spotlight-force-reveal', !pressed);
      }, { signal });
    }
  };

  // Zensical/Material's "navigation.instant" feature (see zensical.toml)
  // swaps page content via XHR instead of a real browser navigation —
  // including back/forward — so a plain top-level IIFE only ever runs once,
  // on whichever page happened to be the first real load of the session.
  // Landing on/returning to the homepage any other way leaves the hero
  // without its listeners until a hard refresh (the exact "animation isn't
  // showing up until I refresh" symptom this fixes). document$ is the
  // instant-navigation-aware observable Material/Zensical exposes globally;
  // it emits on the initial load AND every subsequent virtual page load, so
  // subscribing to it alone covers both cases. Same fallback pattern as
  // product-selector.js for when instant navigation is disabled.
  if (typeof document$ !== "undefined" && document$ && typeof document$.subscribe === "function") {
    document$.subscribe(init);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
