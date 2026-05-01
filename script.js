(function() {
  var btn = document.getElementById('st-hamburger');
  var nav = document.getElementById('st-nav');

  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    btn.classList.toggle('open');
    nav.classList.toggle('open');
  });

  document.addEventListener('click', function(e) {
    if (!nav.contains(e.target) && e.target !== btn) {
      btn.classList.remove('open');
      nav.classList.remove('open');
    }
  });

  nav.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function() {
      btn.classList.remove('open');
      nav.classList.remove('open');
    });
  });

  // Smooth scroll for all hash links
  document.addEventListener('click', function(e) {
    var a = e.target.closest('a[href^="#"]');
    if (a) {
      var id = a.getAttribute('href').slice(1);
      var el = document.getElementById(id);
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
    }
  });

  // ── Change 3: Rename "Bravo" card to "Kyoho Website Design" ──
  // ── Change 4: Thumbnail images for first two case study cards ──
  // ── Change 5: Override case study links to bypass Framer SPA router ──
  // ── Change 2: Inject custom footer ──
  function patchCaseStudyCards() {
    // Change 3: rename card titles
    var allLinks = document.querySelectorAll('a[href]');
    allLinks.forEach(function(a) {
      var href = a.getAttribute('href') || '';
      var renameFrom = null, renameTo = null;
      if (href.indexOf('bravo') !== -1) { renameFrom = 'Bravo'; renameTo = 'Kyoho Website Design'; }
      else if (href.indexOf('nitro') !== -1) { renameFrom = null; renameTo = 'Nuvama FinSmart'; }
      else if (href.indexOf('fargo') !== -1) { renameFrom = null; renameTo = 'Coming Soon'; }
      if (renameTo) {
        var titleEls = a.querySelectorAll('[class*="framer-"]');
        titleEls.forEach(function(el) {
          if (el.childElementCount === 0 && (!renameFrom || el.textContent.trim() === renameFrom)) {
            if (!renameFrom || el.textContent.trim() === renameFrom) el.textContent = renameTo;
          }
        });
        if (renameFrom) {
          var walker = document.createTreeWalker(a, NodeFilter.SHOW_TEXT);
          var node;
          while ((node = walker.nextNode())) {
            if (node.textContent.trim() === renameFrom) node.textContent = renameTo;
          }
        }
      }
    });

    // Change 4: set thumbnail images
    var cards = document.querySelectorAll('a[href]');
    cards.forEach(function(card) {
      var href = card.getAttribute('href') || '';
      var thumbContainer = card.querySelector('.framer-nygabs');
      if (!thumbContainer) return;
      if (href.indexOf('strida') !== -1) {
        thumbContainer.classList.add('st-has-thumb');
        var img = thumbContainer.querySelector('img');
        if (img) {
          img.src = 'assets/elevate-thumb.png';
          img.srcset = 'assets/elevate-thumb.png';
          img.alt = 'Elevate Golf';
          img.style.opacity = '1';
          img.style.objectFit = 'cover';
          img.style.width = '100%';
          img.style.height = '100%';
        }
      } else if (href.indexOf('bravo') !== -1) {
        thumbContainer.classList.add('st-has-thumb');
        var img2 = thumbContainer.querySelector('img');
        if (img2) {
          img2.src = 'assets/kyoho-thumb.png';
          img2.srcset = 'assets/kyoho-thumb.png';
          img2.alt = 'Kyoho Website Design';
          img2.style.opacity = '1';
          img2.style.objectFit = 'cover';
          img2.style.width = '100%';
          img2.style.height = '100%';
        }
      } else if (href.indexOf('nitro') !== -1) {
        thumbContainer.classList.add('st-has-thumb');
        var img3 = thumbContainer.querySelector('img');
        if (img3) {
          img3.src = 'images/image-import-53.png';
          img3.srcset = 'images/image-import-53.png';
          img3.alt = 'Nuvama FinSmart';
          img3.style.opacity = '1';
          img3.style.objectFit = 'cover';
          img3.style.width = '100%';
          img3.style.height = '100%';
        }
      } else if (href.indexOf('fargo') !== -1) {
        card.classList.add('st-coming-soon-card');
        if (!card.querySelector('.st-coming-soon')) {
          var badge = document.createElement('div');
          badge.className = 'st-coming-soon';
          badge.textContent = 'Coming soon';
          card.style.position = 'relative';
          card.appendChild(badge);
        }
      }
    });

    // Change 5: Override all work links to bypass Framer SPA router
    var workLinks = document.querySelectorAll('a[href*="./work/"]');
    workLinks.forEach(function(a) {
      var href = a.getAttribute('href') || '';
      var dest;
      if (href.indexOf('strida') !== -1) dest = 'elevate.html';
      else if (href.indexOf('bravo') !== -1) dest = 'kyoho.html';
      else if (href.indexOf('nitro') !== -1) dest = 'nuvama.html';
      if (dest) {
        a.setAttribute('href', dest);
        a.removeEventListener('click', a.__stHandler);
        a.__stHandler = function(e) {
          e.preventDefault();
          e.stopPropagation();
          if (dest.startsWith('#')) {
            var el = document.getElementById(dest.slice(1));
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.location.href = dest;
          }
        };
        a.addEventListener('click', a.__stHandler);
      } else if (href.indexOf('fargo') !== -1) {
        a.removeEventListener('click', a.__stHandler);
        a.__stHandler = function(e) { e.preventDefault(); e.stopPropagation(); };
        a.addEventListener('click', a.__stHandler);
      }
    });
  }

  setTimeout(patchCaseStudyCards, 300);
  setTimeout(patchCaseStudyCards, 1200);
  setTimeout(patchCaseStudyCards, 3000);

  // ── Patch work card pills to match real case study tags ──
  var CARD_PILLS = {
    strida: ['Brand Design', 'Responsive Web', '2025'],
    bravo:  ['SaaS', 'B2B & B2C', 'Marketplace'],
    nitro:  ['Fintech', 'Product Design', 'Tablet'],
    fargo:  ['Coming Soon']
  };

  function patchWorkCardPills() {
    document.querySelectorAll('a[href]').forEach(function(card) {
      var href = card.getAttribute('href') || '';
      var slug = null;
      if (href.indexOf('strida') !== -1) slug = 'strida';
      else if (href.indexOf('bravo') !== -1) slug = 'bravo';
      else if (href.indexOf('nitro') !== -1) slug = 'nitro';
      else if (href.indexOf('fargo') !== -1) slug = 'fargo';
      if (!slug) return;

      var pills = CARD_PILLS[slug];
      var pillEls = card.querySelectorAll('[data-framer-name="Tags"] h4 em.framer-text');
      pillEls.forEach(function(em, i) {
        if (pills[i] !== undefined) em.textContent = pills[i];
      });
    });
  }

  setTimeout(patchWorkCardPills, 400);
  setTimeout(patchWorkCardPills, 1400);
  setTimeout(patchWorkCardPills, 3200);

  // MutationObserver scoped to #work only — avoids firing on every scroll animation across #main
  var patchDebounce;
  var patchObserver = new MutationObserver(function() {
    clearTimeout(patchDebounce);
    patchDebounce = setTimeout(function() {
      patchCaseStudyCards();
    }, 120);
  });
  // Disconnect after 12s — Framer hydration is always done by then; no need to keep observing
  var bodyPollTimer = setInterval(function() {
    var workEl = document.getElementById('work');
    if (workEl) {
      clearInterval(bodyPollTimer);
      patchObserver.observe(workEl, { childList: true, subtree: true });
      setTimeout(function() { patchObserver.disconnect(); }, 12000);
    }
  }, 200);

  // ── Post-render: inject SVG illustrations into process cards ──
  // 2× larger (112px), positioned slightly upward via negative margin-top
  var illustrations = {
    '1': '<svg width="112" height="112" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="26" cy="26" r="16" stroke="#000" stroke-width="2.5"/><line x1="37.5" y1="37.5" x2="52" y2="52" stroke="#000" stroke-width="2.5" stroke-linecap="round"/><line x1="20" y1="26" x2="32" y2="26" stroke="#000" stroke-width="2" stroke-linecap="round"/><line x1="26" y1="20" x2="26" y2="32" stroke="#000" stroke-width="2" stroke-linecap="round"/></svg>',
    '2': '<svg width="112" height="112" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="32,6 58,32 32,58 6,32" stroke="#000" stroke-width="2.5" stroke-linejoin="round"/><polygon points="32,18 46,32 32,46 18,32" fill="rgba(0,0,0,0.07)" stroke="#000" stroke-width="1.5" stroke-linejoin="round"/><circle cx="32" cy="6" r="3" fill="#000"/><circle cx="58" cy="32" r="3" fill="#000"/><circle cx="32" cy="58" r="3" fill="#000"/><circle cx="6" cy="32" r="3" fill="#000"/></svg>',
    '3': '<svg width="112" height="112" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 52L20 31L43 8L56 21L33 44L12 52Z" stroke="#000" stroke-width="2.5" stroke-linejoin="round"/><line x1="20" y1="31" x2="33" y2="44" stroke="#000" stroke-width="1.5"/><circle cx="49.5" cy="14.5" r="4" stroke="#000" stroke-width="2"/><line x1="8" y1="56" x2="12" y2="52" stroke="#000" stroke-width="2" stroke-linecap="round"/></svg>'
  };

  function injectIllustrations() {
    var cards = document.querySelectorAll('[data-framer-name="Card Item"]');
    cards.forEach(function(card) {
      if (card.querySelector('.st-illustration')) return;
      var numEl = card.querySelector('strong');
      if (!numEl) return;
      var num = numEl.textContent.trim();
      if (!illustrations[num]) return;
      var wrapper = document.createElement('div');
      wrapper.className = 'st-illustration';
      wrapper.style.cssText = 'display:flex;justify-content:center;align-items:center;padding:8px 0 0;margin-top:-8px;opacity:0.85;';
      wrapper.innerHTML = illustrations[num];
      var numContainer = numEl.closest('[class*="framer-"]');
      if (numContainer && numContainer.parentNode) {
        numContainer.parentNode.insertBefore(wrapper, numContainer.nextSibling);
      }
    });
  }

  // Inject on multiple timeouts so we catch Framer's hydration whenever it finishes
  setTimeout(injectIllustrations, 300);
  setTimeout(injectIllustrations, 1000);
  setTimeout(injectIllustrations, 2500);
  setTimeout(injectIllustrations, 5000);

  // MutationObserver ONLY on #process-cards (never body — body is too noisy with animations)
  var illustrationDebounce;
  var illustrationObserver = new MutationObserver(function() {
    clearTimeout(illustrationDebounce);
    illustrationDebounce = setTimeout(injectIllustrations, 80);
  });
  // Poll until #process-cards exists, then attach observer (skip body entirely)
  var pcPollTimer = setInterval(function() {
    var pc = document.getElementById('process-cards');
    if (pc) {
      clearInterval(pcPollTimer);
      illustrationObserver.observe(pc, { childList: true, subtree: true });
    }
  }, 250);

  // ── Force real photo in about-me section after Framer hydration ──
  function fixAboutImage() {
    var containers = document.querySelectorAll('.framer-1c0vbc5');
    containers.forEach(function(c) {
      var img = c.querySelector('img');
      if (img) {
        img.src = 'assets/shraddha-photo.png';
        img.srcset = 'assets/shraddha-photo.png';
        img.alt = 'Shraddha Thorat';
        img.style.objectFit = 'cover';
        img.style.objectPosition = 'center top';
        img.style.display = 'block';
      } else if (!c.querySelector('.st-photo')) {
        var wrapper = c.querySelector('[data-framer-background-image-wrapper]') || c;
        var newImg = document.createElement('img');
        newImg.className = 'st-photo';
        newImg.src = 'assets/shraddha-photo.png';
        newImg.alt = 'Shraddha Thorat';
        newImg.style.cssText = 'display:block;width:100%;height:100%;object-fit:cover;object-position:center top;border-radius:inherit;';
        wrapper.appendChild(newImg);
      }
    });
  }
  setTimeout(fixAboutImage, 400);
  setTimeout(fixAboutImage, 1500);
  setTimeout(fixAboutImage, 3500);

  // Redirect About Me hero CTA + all #about-1/#experience links to our static section.
  // Framer hydration can restore the original lemon squeezy checkout URL, so we
  // match by href pattern AND by button text as a fallback.
  function fixAboutCTA() {
    document.querySelectorAll('a').forEach(function(a) {
      var href = a.getAttribute('href') || '';
      var isAbout = href === '#about-1' || href === '#experience' ||
                    href.indexOf('lemonsqueezy') !== -1 || href.indexOf('lmsq') !== -1;
      if (!isAbout) return;
      if (a.__stAboutFixed) return;
      a.__stAboutFixed = true;
      a.setAttribute('href', '#st-about-section');
      a.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var target = document.getElementById('st-about-section');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }, true); // capture phase — fires before Framer's router
    });
  }
  fixAboutCTA();
  setTimeout(fixAboutCTA, 300);
  setTimeout(fixAboutCTA, 1200);
  setTimeout(fixAboutCTA, 3000);

  // ── AFK Detour — 3D carousel ──
  function buildAFKCarousel(images) {
    var container = document.getElementById('st-afk-carousel-root');
    if (!container) return;
    if (container.querySelector('.st-afk-wrap')) return;
    if (!images || images.length === 0) return;

    // Build DOM
    var wrap = document.createElement('div');
    wrap.className = 'st-afk-wrap';

    var scene = document.createElement('div');
    scene.className = 'st-afk-scene';

    var drum = document.createElement('div');
    drum.className = 'st-afk-drum';

    images.forEach(function(src) {
      var card = document.createElement('div');
      card.className = 'st-afk-card';
      var img = document.createElement('img');
      img.src = src;
      img.alt = '';
      img.loading = 'lazy';
      card.appendChild(img);
      drum.appendChild(card);
    });

    scene.appendChild(drum);

    var chevronL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>';
    var chevronR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';

    var prev = document.createElement('button');
    prev.className = 'st-afk-arr st-afk-prev';
    prev.innerHTML = chevronL;
    prev.setAttribute('aria-label', 'Previous');

    var next = document.createElement('button');
    next.className = 'st-afk-arr st-afk-next';
    next.innerHTML = chevronR;
    next.setAttribute('aria-label', 'Next');

    wrap.appendChild(prev);
    wrap.appendChild(scene);
    wrap.appendChild(next);
    container.appendChild(wrap);

    // ── 3D carousel logic ──
    var cards = drum.querySelectorAll('.st-afk-card');
    var N = cards.length;
    var THETA = 360 / N;
    var SPEED = 0.2;
    var angle = 0, paused = false, snapping = false, snapTarget = 0;
    var RADIUS = 320;

    // Radius so adjacent cards never overlap: r = (cardWidth/2) / sin(π/N) + gap
    function calcRadius() {
      var isMobile = window.innerWidth <= 809;
      var cardW = isMobile ? 200 : 260;
      var minR = (cardW / 2) / Math.sin(Math.PI / N);
      return Math.max(isMobile ? 220 : 320, Math.ceil(minR) + 30);
    }

    function layoutCards() {
      RADIUS = calcRadius();
      for (var i = 0; i < N; i++) {
        cards[i].style.transform = 'rotateY(' + (THETA * i) + 'deg) translateZ(' + RADIUS + 'px)';
      }
    }

    function applyAngle() {
      drum.style.transform = 'translateX(-50%) rotateY(' + angle + 'deg)';
    }

    function tick() {
      if (snapping) {
        var diff = snapTarget - angle;
        while (diff > 180) diff -= 360;
        while (diff < -180) diff += 360;
        angle += diff * 0.12;
        if (Math.abs(diff) < 0.2) { angle = snapTarget; snapping = false; }
        applyAngle();
      } else if (!paused) {
        angle -= SPEED;
        applyAngle();
      }
      requestAnimationFrame(tick);
    }

    prev.addEventListener('click', function() {
      snapTarget = Math.round(angle / THETA) * THETA + THETA;
      snapping = true;
    });
    next.addEventListener('click', function() {
      snapTarget = Math.round(angle / THETA) * THETA - THETA;
      snapping = true;
    });

    scene.addEventListener('mouseenter', function() { paused = true; });
    scene.addEventListener('mouseleave', function() { paused = false; });

    // Drag support
    var dragActive = false, mouseDownX = 0, dragBaseAngle = 0;
    scene.addEventListener('mousedown', function(e) {
      if (e.button !== 0) return;
      mouseDownX = e.clientX; dragBaseAngle = angle;
      dragActive = false;
      e.preventDefault();
      function onMove(e) {
        var dx = e.clientX - mouseDownX;
        if (!dragActive && Math.abs(dx) > 5) { dragActive = true; paused = true; }
        if (dragActive) { angle = dragBaseAngle + (dx / scene.offsetWidth) * 180; applyAngle(); }
      }
      function onUp() {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        if (dragActive) { dragActive = false; paused = false; snapTarget = Math.round(angle / THETA) * THETA; snapping = true; }
      }
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });

    // Touch support
    var touchStartX = null;
    scene.addEventListener('touchstart', function(e) { touchStartX = e.touches[0].clientX; paused = true; }, { passive: true });
    scene.addEventListener('touchend', function(e) {
      if (touchStartX === null) return;
      var dx = e.changedTouches[0].clientX - touchStartX;
      paused = false;
      if (Math.abs(dx) > 40) { snapTarget = Math.round(angle / THETA) * THETA + (dx > 0 ? THETA : -THETA); snapping = true; }
      touchStartX = null;
    }, { passive: true });

    window.addEventListener('resize', layoutCards);
    layoutCards();
    tick();
  }

  function initAFKCarousel() {
    fetch('afk-manifest.json')
      .then(function(r) { return r.json(); })
      .then(function(images) {
        buildAFKCarousel(images);
      })
      .catch(function() {});
  }

  // #st-afk-carousel-root is static HTML — init immediately on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAFKCarousel);
  } else {
    initAFKCarousel();
  }


  // ── Inject "View More" CTA after work section cards ──
  function injectViewMoreCTA() {
    var work = document.getElementById('work');
    if (!work || document.getElementById('st-view-more-wrap')) return;
    var wrap = document.createElement('div');
    wrap.id = 'st-view-more-wrap';
    wrap.style.cssText = 'display:flex;justify-content:center;padding:0 0 48px;';
    var a = document.createElement('a');
    a.href = 'projects.html';
    a.className = 'st-view-more-btn';
    a.innerHTML = 'View More Projects <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-left:4px" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    wrap.appendChild(a);
    work.appendChild(wrap);
  }

  setTimeout(injectViewMoreCTA, 400);
  setTimeout(injectViewMoreCTA, 1500);
  setTimeout(injectViewMoreCTA, 3500);

  // ── Playground — polaroid scatter canvas ──
  (function() {
    var PG_W = 185, PG_H = 241; // card width, height (incl. bottom caption space)
    var polaroids = [];
    var scatterPos = []; // [{left, top, rot}] — scatter state, updated on drag
    var isGrid = false;
    var anyDragging = false;

    var GRID_ICON = '<svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1.75" y="1.75" width="5.5" height="5.5" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="8.75" y="1.75" width="5.5" height="5.5" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="1.75" y="8.75" width="5.5" height="5.5" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="8.75" y="8.75" width="5.5" height="5.5" rx="1" stroke="currentColor" stroke-width="1.5"/></svg>';
    var SCATTER_ICON = '<svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="2" width="7" height="7" rx="1" transform="rotate(-12 1 2)" stroke="currentColor" stroke-width="1.5"/><rect x="8" y="6" width="7" height="7" rx="1" transform="rotate(10 8 6)" stroke="currentColor" stroke-width="1.5"/></svg>';

    // Deterministic pseudo-random (no seed drift between images)
    function rand(n) {
      var x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
      return x - Math.floor(x);
    }

    function computeScatter(n, cW, cH) {
      var out = [];
      for (var i = 0; i < n; i++) {
        out.push({
          left: 10 + rand(i * 3 + 1) * Math.max(0, cW - PG_W - 20),
          top:  10 + rand(i * 3 + 2) * Math.max(0, cH - PG_H - 20),
          rot:  (rand(i * 3 + 3) - 0.5) * 26 // ‑13° to +13°
        });
      }
      return out;
    }

    function computeGrid(n, cW) {
      var gap = 16, pad = 24;
      var cols = Math.max(2, Math.floor((cW - pad * 2 + gap) / (PG_W + gap)));
      var out = [];
      for (var i = 0; i < n; i++) {
        out.push({
          left: pad + (i % cols) * (PG_W + gap),
          top:  pad + Math.floor(i / cols) * (PG_H + gap),
          rot:  0
        });
      }
      return out;
    }

    function applyCards(pos, animate) {
      polaroids.forEach(function(card, i) {
        if (animate) {
          card.style.transition = 'left 0.42s cubic-bezier(0.4,0,0.2,1), top 0.42s cubic-bezier(0.4,0,0.2,1), transform 0.42s cubic-bezier(0.4,0,0.2,1)';
        } else {
          card.style.transition = 'none';
        }
        card.style.left = pos[i].left + 'px';
        card.style.top  = pos[i].top  + 'px';
        card.style.transform = 'rotate(' + pos[i].rot + 'deg)';
      });
      if (animate) {
        setTimeout(function() {
          polaroids.forEach(function(c) { c.style.transition = 'box-shadow 0.2s'; });
        }, 480);
      }
    }

    function setCanvasHeight(h, animate) {
      var canvas = document.getElementById('pg-canvas');
      if (!canvas) return;
      canvas.style.transition = animate ? 'height 0.42s cubic-bezier(0.4,0,0.2,1)' : 'none';
      canvas.style.height = h + 'px';
    }

    function gridHeight(n, cW) {
      var gap = 16, pad = 24;
      var cols = Math.max(2, Math.floor((cW - pad * 2 + gap) / (PG_W + gap)));
      var rows = Math.ceil(n / cols);
      return pad + rows * (PG_H + gap) + 60; // +60 so toggle doesn't cover last row
    }

    // ── Lightbox ──
    function openLightbox(src) {
      var lb  = document.getElementById('pg-lightbox');
      var img = document.getElementById('pg-lb-img');
      if (!lb || !img) return;
      img.src = src;
      lb.classList.add('pg-lb-open');
      lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      // Re-trigger animation each open
      var frame = document.getElementById('pg-lb-frame');
      if (frame) { frame.style.animation = 'none'; frame.offsetHeight; frame.style.animation = ''; }
    }
    function closeLightbox() {
      var lb = document.getElementById('pg-lightbox');
      if (!lb) return;
      lb.classList.remove('pg-lb-open');
      lb.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    // ── Build a single polaroid card ──
    function buildCard(src, idx) {
      var card = document.createElement('div');
      card.className = 'pg-polaroid';
      card.style.zIndex = idx + 1;

      var photo = document.createElement('div');
      photo.className = 'pg-photo';
      var img = document.createElement('img');
      img.src = src;
      img.alt = '';
      img.loading = 'lazy';
      img.draggable = false;
      photo.appendChild(img);
      card.appendChild(photo);

      // Hover — straighten + lift (only in scatter mode)
      // Grid mode: plain click opens lightbox (no drag tracking in grid)
      card.addEventListener('click', function() {
        if (isGrid) openLightbox(img.src);
      });

      card.addEventListener('mouseenter', function() {
        if (anyDragging || isGrid) return;
        card.classList.add('pg-hovered');
        card.style.transition = 'transform 0.22s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s, z-index 0s';
        card.style.transform = 'rotate(0deg) scale(1.07)';
        card.style.zIndex = 120;
      });
      card.addEventListener('mouseleave', function() {
        if (anyDragging) return;
        card.classList.remove('pg-hovered');
        card.style.transition = 'transform 0.25s ease, box-shadow 0.2s';
        card.style.transform = 'rotate(' + scatterPos[idx].rot + 'deg) scale(1)';
        card.style.zIndex = idx + 1;
      });

      // ── Drag + click ──
      var startX, startY, startL, startT, didDrag, dragging = false;

      function beginDrag(cx, cy) {
        if (isGrid) return;
        startX = cx; startY = cy;
        startL = parseFloat(card.style.left) || 0;
        startT = parseFloat(card.style.top)  || 0;
        didDrag  = false;
        dragging = true;
        anyDragging = true;
        card.classList.remove('pg-hovered');
        card.classList.add('pg-dragging');
        card.style.transition = 'none';
        card.style.zIndex = 600;
        card.style.transform = 'rotate(' + scatterPos[idx].rot * 0.4 + 'deg) scale(1.06)';
      }

      function duringDrag(cx, cy) {
        if (!dragging) return;
        var dx = cx - startX, dy = cy - startY;
        if (Math.abs(dx) > 4 || Math.abs(dy) > 4) didDrag = true;
        if (!didDrag) return;
        var canvas = document.getElementById('pg-canvas');
        var cW = canvas ? canvas.offsetWidth : 9999;
        var cH = canvas ? canvas.offsetHeight : 9999;
        card.style.left = Math.max(-PG_W * 0.4, Math.min(cW - PG_W * 0.6, startL + dx)) + 'px';
        card.style.top  = Math.max(-PG_H * 0.4, Math.min(cH - PG_H * 0.6, startT + dy)) + 'px';
      }

      function endDrag() {
        if (!dragging) return;
        dragging = false;
        anyDragging = false;
        card.classList.remove('pg-dragging');
        card.style.transition = 'box-shadow 0.2s';
        card.style.zIndex = 80;
        card.style.transform = 'rotate(' + scatterPos[idx].rot * 0.4 + 'deg) scale(1)';
        if (didDrag) {
          scatterPos[idx].left = parseFloat(card.style.left);
          scatterPos[idx].top  = parseFloat(card.style.top);
        } else {
          openLightbox(img.src);
        }
      }

      // Mouse
      card.addEventListener('mousedown', function(e) {
        if (e.button !== 0) return;
        e.preventDefault();
        beginDrag(e.clientX, e.clientY);
        function onMM(e) { duringDrag(e.clientX, e.clientY); }
        function onMU() {
          endDrag();
          document.removeEventListener('mousemove', onMM);
          document.removeEventListener('mouseup', onMU);
        }
        document.addEventListener('mousemove', onMM);
        document.addEventListener('mouseup', onMU);
      });

      // Touch
      card.addEventListener('touchstart', function(e) {
        var t = e.touches[0];
        beginDrag(t.clientX, t.clientY);
      }, { passive: true });
      card.addEventListener('touchmove', function(e) {
        if (!dragging) return;
        e.preventDefault();
        duringDrag(e.touches[0].clientX, e.touches[0].clientY);
      }, { passive: false });
      card.addEventListener('touchend', function() { endDrag(); });

      return card;
    }

    // ── Toggle scatter ↔ grid ──
    function switchView() {
      var canvas = document.getElementById('pg-canvas');
      var label  = document.getElementById('pg-toggle-label');
      var icon   = document.getElementById('pg-toggle-icon');
      if (!canvas) return;

      var btn = document.getElementById('pg-toggle');
      if (isGrid) {
        // → Scatter
        applyCards(scatterPos, true);
        setCanvasHeight(680, true);
        canvas.style.overflow = 'hidden';
        isGrid = false;
        polaroids.forEach(function(c) { c.classList.remove('pg-grid-cursor'); });
        if (label) label.textContent = 'Grid View';
        if (icon)  icon.innerHTML = GRID_ICON;
        if (btn)   btn.setAttribute('aria-pressed', 'false');
      } else {
        // → Grid
        var gPos = computeGrid(polaroids.length, canvas.offsetWidth);
        applyCards(gPos, true);
        setCanvasHeight(gridHeight(polaroids.length, canvas.offsetWidth), true);
        canvas.style.overflow = 'visible';
        isGrid = true;
        polaroids.forEach(function(c) { c.classList.add('pg-grid-cursor'); });
        if (label) label.textContent = 'Scatter View';
        if (icon)  icon.innerHTML = SCATTER_ICON;
        if (btn)   btn.setAttribute('aria-pressed', 'true');
      }
    }

    // ── Boot ──
    function initPlayground(images) {
      var canvas = document.getElementById('pg-canvas');
      var toggle = document.getElementById('pg-toggle');
      if (!canvas || !toggle || canvas.querySelector('.pg-polaroid')) return;

      images.forEach(function(src, i) {
        var card = buildCard(src, i);
        canvas.appendChild(card);
        polaroids.push(card);
      });

      var cW = canvas.offsetWidth;
      scatterPos = computeScatter(images.length, cW, 680);

      // Mobile defaults to grid
      if (window.innerWidth <= 809) {
        var gPos = computeGrid(images.length, cW);
        scatterPos.forEach(function(p, i) { p.left = gPos[i].left; p.top = gPos[i].top; p.rot = 0; });
        applyCards(gPos, false);
        setCanvasHeight(gridHeight(images.length, cW), false);
        canvas.style.overflow = 'visible';
        isGrid = true;
        polaroids.forEach(function(c) { c.classList.add('pg-grid-cursor'); });
        var lbl = document.getElementById('pg-toggle-label');
        var icn = document.getElementById('pg-toggle-icon');
        if (lbl) lbl.textContent = 'Scatter View';
        if (icn) icn.innerHTML = SCATTER_ICON;
      } else {
        applyCards(scatterPos, false);
      }

      toggle.addEventListener('click', switchView);

      // Lightbox close
      var bg    = document.getElementById('pg-lb-bg');
      var close = document.getElementById('pg-lb-close');
      if (bg)    bg.addEventListener('click', closeLightbox);
      if (close) close.addEventListener('click', closeLightbox);
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeLightbox();
      });
    }

    function loadPlayground() {
      fetch('playground-manifest.json')
        .then(function(r) { return r.json(); })
        .then(function(imgs) {
          // Wait until #pg-canvas has a real painted width (avoids all cards
          // collapsing to left:10,top:10 when offsetWidth is 0 on first read)
          var attempts = 0;
          function tryInit() {
            var canvas = document.getElementById('pg-canvas');
            if (canvas && canvas.offsetWidth > 50) {
              initPlayground(imgs);
            } else if (attempts++ < 40) {
              setTimeout(tryInit, 80);
            }
          }
          requestAnimationFrame(tryInit);
        })
        .catch(function() {});
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadPlayground);
    } else {
      loadPlayground();
    }
  })();

  // ── Animation fallback: if Framer entrance animations don't fire, force elements visible ──
  // Targets hero, intro (2nd section), process cards, and AFK section.
  // Only acts on elements still at opacity:0 after 2.5s — won't disturb already-animated content.
  setTimeout(function() {
    function forceVisible(root) {
      if (!root) return;
      root.querySelectorAll('[style*="opacity: 0"], [style*="opacity:0"]').forEach(function(el) {
        el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.visibility = 'visible';
      });
    }
    forceVisible(document.getElementById('hero'));
    forceVisible(document.querySelector('.framer-ts46om'));
    forceVisible(document.getElementById('process'));
    forceVisible(document.getElementById('process-cards'));
  }, 2500);

})();
