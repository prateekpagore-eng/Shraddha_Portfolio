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
    forceVisible(document.querySelector('.framer-lo5toe'));
  }, 2500);

})();
