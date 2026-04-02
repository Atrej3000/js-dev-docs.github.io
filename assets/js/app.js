/**
 * JS Dev Docs — app.js
 * Requires i18n.js to be loaded first.
 * NAV contains only English slugs (used as directory/file names).
 * All display titles come from I18N locale.
 */
'use strict';

/* ── NAV — structural only ─────────────────────────────────────────────── */
var NAV = [
  { id: 'introduction', articles: [
    { n: '1.1',  id: 'intro'                    },
    { n: '1.2',  id: 'reference'            },
    { n: '1.3',  id: 'editors'              },
    { n: '1.4',  id: 'devtools'                  },
  ]},
  { id: 'basics', articles: [
    { n: '2.1',  id: 'hello-world'               },
    { n: '2.2',  id: 'code-structure'            },
    { n: '2.3',  id: 'strict-mode'                },
    { n: '2.4',  id: 'variables'                 },
    { n: '2.5',  id: 'types'                },
    { n: '2.6',  id: 'interaction'               },
    { n: '2.7',  id: 'type-casting'          },
    { n: '2.8',  id: 'operators'                 },
    { n: '2.9',  id: 'comparisons'                },
    { n: '2.10', id: 'if-else'              },
    { n: '2.11', id: 'logical-operators'         },
    { n: '2.12', id: 'nullish-coalescing'        },
    { n: '2.13', id: 'loops'                     },
    { n: '2.14', id: 'switch'                    },
    { n: '2.15', id: 'functions'                 },
    { n: '2.16', id: 'function-expressions'      },
    { n: '2.17', id: 'arrow-functions'           },
    { n: '2.18', id: 'js-specials'               },
  ]},
  { id: 'code-quality', articles: [
    { n: '3.1',  id: 'debugging'                 },
    { n: '3.2',  id: 'coding-style'                },
    { n: '3.3',  id: 'comments'                  },
    { n: '3.4',  id: 'ninja-code'                },
    { n: '3.5',  id: 'testing'             },
    { n: '3.6',  id: 'polyfills'                 },
  ]},
  { id: 'objects', articles: [
    { n: '4.1',  id: 'objects'             },
    { n: '4.2',  id: 'object-copy'               },
    { n: '4.3',  id: 'garbage-collection'        },
    { n: '4.4',  id: 'this'            },
    { n: '4.5',  id: 'constructor-new'           },
    { n: '4.6',  id: 'optional-chaining'         },
    { n: '4.7',  id: 'symbol'                    },
    { n: '4.8',  id: 'object-toprimitive'        },
  ]},
  { id: 'data-types', articles: [
    { n: '5.1',  id: 'primitives-methods'        },
    { n: '5.2',  id: 'number'                   },
    { n: '5.3',  id: 'string'                   },
    { n: '5.4',  id: 'array'                    },
    { n: '5.5',  id: 'array-methods'             },
    { n: '5.6',  id: 'iterables'                 },
    { n: '5.7',  id: 'map-set'                   },
    { n: '5.8',  id: 'weakmap-weakset'           },
    { n: '5.9',  id: 'keys-values-entries'       },
    { n: '5.10', id: 'destructuring-assignment'             },
    { n: '5.11', id: 'date'                      },
    { n: '5.12', id: 'json'                      },
  ]},
  { id: 'functions-advanced', articles: [
    { n: '6.1',  id: 'recursion'                 },
    { n: '6.2',  id: 'closure'                   },
    { n: '6.3',  id: 'var'                       },
    { n: '6.4',  id: 'global-object'             },
    { n: '6.5',  id: 'function-object'           },
    { n: '6.6',  id: 'new-function'              },
    { n: '6.7',  id: 'settimeout-setinterval'    },
    { n: '6.8',  id: 'call-apply-decorators'     },
    { n: '6.9',  id: 'bind'                      },
    { n: '6.10', id: 'arrow-functions-revisited' },
  ]},
  { id: 'object-properties', articles: [
    { n: '7.1',  id: 'property-descriptors'      },
    { n: '7.2',  id: 'property-accessors'        },
  ]},
  { id: 'prototypes', articles: [
    { n: '8.1',  id: 'prototype-inheritance'     },
    { n: '8.2',  id: 'function-prototype'        },
    { n: '8.3',  id: 'native-prototypes'         },
    { n: '8.4',  id: 'prototype-methods'             },
  ]},
  { id: 'classes', articles: [
    { n: '9.1',  id: 'class'                     },
    { n: '9.2',  id: 'class-inheritance'         },
    { n: '9.3',  id: 'static-properties-methods'         },
    { n: '9.4',  id: 'private-protected-properties-methods'         },
    { n: '9.5',  id: 'extending-built-ins'        },
    { n: '9.6',  id: 'instanceof'                },
    { n: '9.7',  id: 'mixins'                    },
  ]},
  { id: 'error-handling', articles: [
    { n: '10.1', id: 'try-catch'                 },
    { n: '10.2', id: 'custom-errors'             },
  ]},
  { id: 'promises', articles: [
    { n: '11.1', id: 'callbacks'                 },
    { n: '11.2', id: 'promise-basics'            },
    { n: '11.3', id: 'promise-chaining'          },
    { n: '11.4', id: 'promise-error-handling'    },
    { n: '11.5', id: 'promise-api'               },
    { n: '11.6', id: 'promisify'           },
    { n: '11.7', id: 'microtasks'                },
    { n: '11.8', id: 'async-await'               },
  ]},
  { id: 'generators', articles: [
    { n: '12.1', id: 'generators'                },
    { n: '12.2', id: 'async-iterators-generators'           },
  ]},
  { id: 'modules', articles: [
    { n: '13.1', id: 'modules-intro'             },
    { n: '13.2', id: 'import-export'             },
    { n: '13.3', id: 'dynamic-imports'           },
  ]},
  { id: 'misc', articles: [
    { n: '14.1', id: 'proxy'             },
    { n: '14.2', id: 'eval'                      },
    { n: '14.3', id: 'currying'                  },
    { n: '14.4', id: 'reference-type'            },
    { n: '14.5', id: 'bigint'                    },
    { n: '14.6', id: 'unicode'           },
    { n: '14.7', id: 'weakref'                   },
  ]},
];

/* ── Helpers ───────────────────────────────────────────────────────────── */
function secTitle(id) {
  var n = I18N.getLocale().nav;
  return (n && n.sections && n.sections[id]) || id;
}
function artTitle(id) {
  var n = I18N.getLocale().nav;
  return (n && n.articles && n.articles[id]) || id;
}
function t(key) { return I18N.t(key); }
function url(secId, artId) {
  return '/' + I18N.getLang() + '/' + secId + '/' + artId + '.html';
}

/* ── Search index (built after locale ready) ───────────────────────────── */
var SEARCH_IDX = [];
function buildSearchIdx() {
  SEARCH_IDX = NAV.reduce(function (acc, sec) {
    return acc.concat(sec.articles.map(function (art) {
      var st = secTitle(sec.id), at = artTitle(art.id);
      return {
        n: art.n, id: art.id, secId: sec.id,
        title: at, sec: st,
        url: url(sec.id, art.id),
        _q: (at + ' ' + st).toLowerCase(),
      };
    }));
  }, []);
}

/* ── Theme ─────────────────────────────────────────────────────────────── */
var Theme = (function () {
  var KEY = 'devdocs-theme';
  function apply(theme) {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem(KEY, theme); } catch (e) {}
    var icon = document.getElementById('theme-icon');
    if (!icon) return;
    icon.innerHTML = theme === 'dark'
      ? '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" fill="none"/>'
      : '<circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="2"/>';
  }
  function init() {
    var saved; try { saved = localStorage.getItem(KEY); } catch (e) {}
    apply(saved || 'dark');
    var btn = document.getElementById('theme-btn');
    if (btn) btn.addEventListener('click', function () {
      apply(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
    });
  }
  return { init: init };
}());

/* ── Sidebar ────────────────────────────────────────────────────────────── */
var Sidebar = (function () {
  function render(container, active) {
    container.innerHTML = NAV.map(function (sec) {
      var isActiveSec = active && active.secId === sec.id;
      var items = sec.articles.map(function (art) {
        var isActive = isActiveSec && active.artId === art.id;
        return '<a class="nav-link' + (isActive ? ' is-active' : '') + '" href="' + url(sec.id, art.id) + '">'
          + '<span class="nav-n">' + art.n + '</span>' + artTitle(art.id) + '</a>';
      }).join('');
      return '<div class="nav-section' + (isActiveSec ? '' : ' is-collapsed') + '">'
        + '<button class="nav-sec-btn" aria-expanded="' + isActiveSec + '">'
        + '<span>' + secTitle(sec.id) + '</span>'
        + '<svg class="chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6l4 4 4-4"/></svg>'
        + '</button><div class="nav-items">' + items + '</div></div>';
    }).join('');

    container.querySelectorAll('.nav-sec-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var sec = btn.closest('.nav-section');
        var collapsed = sec.classList.toggle('is-collapsed');
        btn.setAttribute('aria-expanded', String(!collapsed));
      });
    });
  }

  function initMobile(sidebar) {
    var toggle = document.getElementById('sidebar-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', function () {
      var open = sidebar.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', function (e) {
      if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
        sidebar.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
  return { render: render, initMobile: initMobile };
}());

/* ── Article page ───────────────────────────────────────────────────────── */
var ArticlePage = (function () {
  function initTOC() {
    var headings = document.querySelectorAll('.prose h2[id], .prose h3[id]');
    var links    = document.querySelectorAll('.toc-link');
    if (!headings.length || !links.length) return;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (l) { l.classList.remove('is-active'); });
        var active = document.querySelector('.toc-link[href="#' + e.target.id + '"]');
        if (active) active.classList.add('is-active');
      });
    }, { rootMargin: '-56px 0px -62% 0px' });
    headings.forEach(function (h) { obs.observe(h); });
  }

  function initProgress() {
    var fill = document.getElementById('progress-fill');
    var pct  = document.getElementById('progress-pct');
    if (!fill) return;
    window.addEventListener('scroll', function () {
      var d = document.documentElement;
      var p = d.scrollHeight - d.clientHeight > 0
        ? Math.round(d.scrollTop / (d.scrollHeight - d.clientHeight) * 100) : 0;
      fill.style.width = p + '%';
      fill.setAttribute('aria-valuenow', p);
      if (pct) pct.textContent = p + '%';
    }, { passive: true });
  }
  return { initTOC: initTOC, initProgress: initProgress };
}());

/* ── Copy buttons ───────────────────────────────────────────────────────── */
function initCopyButtons() {
  var labelCopy   = t('ui.copy')   || 'Copy';
  var labelCopied = t('ui.copied') || 'Copied';
  var IC = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="5" width="9" height="9" rx="2"/><path d="M3 11H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v1"/></svg> ' + labelCopy;
  var IO = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="13.5 4 6 11.5 2.5 8"/></svg> ' + labelCopied;
  document.querySelectorAll('.btn-copy').forEach(function (btn) {
    btn.innerHTML = IC;
    btn.addEventListener('click', function () {
      var pre = btn.closest('.code-block') && btn.closest('.code-block').querySelector('pre');
      navigator.clipboard.writeText(pre ? pre.innerText : '').then(function () {
        btn.innerHTML = IO; btn.classList.add('is-copied');
        setTimeout(function () { btn.innerHTML = IC; btn.classList.remove('is-copied'); }, 2200);
      }).catch(function () {});
    });
  });
}

/* ── Search ─────────────────────────────────────────────────────────────── */
var Search = (function () {
  var overlay, panel, input;

  function render(q) {
    var hint   = t('ui.search_hint') || 'Start typing…';
    var noRes  = (t('ui.search_empty') || 'Nothing found for «{q}»').replace('{q}', q);
    if (!q.trim()) { panel.innerHTML = '<p class="search-hint">' + hint + '</p>'; return; }
    var hits = SEARCH_IDX.filter(function (a) { return a._q.includes(q.toLowerCase()); }).slice(0, 18);
    if (!hits.length) { panel.innerHTML = '<p class="search-hint">' + noRes + '</p>'; return; }
    panel.innerHTML = hits.map(function (h) {
      return '<a class="search-result" href="' + h.url + '">'
        + '<span class="sr-num">' + h.n + '</span>'
        + '<span><div class="sr-title">' + h.title + '</div>'
        + '<div class="sr-sec">' + h.sec + '</div></span></a>';
    }).join('');
  }

  function open()  { overlay.classList.add('is-active');    if (input) input.focus(); document.body.style.overflow = 'hidden'; }
  function close() { overlay.classList.remove('is-active'); document.body.style.overflow = ''; if (input) { input.value = ''; render(''); } }

  function init() {
    overlay = document.getElementById('search-overlay');
    panel   = document.getElementById('search-panel');
    input   = document.getElementById('search-input');
    if (!overlay) return;
    render('');
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    if (input) input.addEventListener('input', function (e) { render(e.target.value); });
    document.addEventListener('keydown', function (e) {
      var tag = document.activeElement && document.activeElement.tagName;
      if ((e.key === '/' || (e.metaKey && e.key === 'k')) && tag !== 'INPUT' && tag !== 'TEXTAREA') {
        e.preventDefault(); open();
      }
      if (e.key === 'Escape') close();
    });
    var hdr = document.getElementById('header-search');
    if (hdr) {
      hdr.addEventListener('focus', open);
      hdr.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === 'ArrowDown') { e.preventDefault(); open(); }
      });
    }
  }
  return { init: init };
}());

/* ── Homepage ───────────────────────────────────────────────────────────── */
var Homepage = (function () {
  function render(container) {
    var total = NAV.reduce(function (s, sec) { return s + sec.articles.length; }, 0);
    var sa = document.getElementById('stat-articles');
    var ss = document.getElementById('stat-sections');
    if (sa) sa.textContent = total + '+';
    if (ss) ss.textContent = NAV.length;

    container.innerHTML = NAV.map(function (sec) {
      var links = sec.articles.map(function (art) {
        var st = secTitle(sec.id), at = artTitle(art.id);
        return '<a class="art-link" href="' + url(sec.id, art.id)
          + '" data-q="' + (at + ' ' + st).toLowerCase() + '">'
          + '<span class="al-n">' + art.n + '</span>'
          + '<span class="al-title">' + at + '</span>'
          + '<span class="al-arrow" aria-hidden="true">→</span></a>';
      }).join('');
      return '<section class="sec-card" aria-labelledby="sec-' + sec.id + '">'
        + '<div class="sec-card-head">'
        + '<h2 class="sec-card-title" id="sec-' + sec.id + '">' + secTitle(sec.id) + '</h2>'
        + '<span class="sec-count">' + sec.articles.length + '</span>'
        + '</div><div class="sec-links">' + links + '</div></section>';
    }).join('');
  }

  function initFilter() {
    var inp = document.getElementById('catalog-search');
    if (!inp) return;
    inp.addEventListener('input', function () {
      var q = inp.value.toLowerCase().trim();
      document.querySelectorAll('.art-link').forEach(function (a) {
        a.classList.toggle('is-hidden', q.length > 0 && !a.dataset.q.includes(q));
      });
      document.querySelectorAll('.sec-card').forEach(function (c) {
        c.style.display = c.querySelectorAll('.art-link:not(.is-hidden)').length ? '' : 'none';
      });
    });
  }
  return { render: render, initFilter: initFilter };
}());

/* ── Boot ───────────────────────────────────────────────────────────────── */
I18N.onReady(function () {
  Theme.init();
  buildSearchIdx();
  Search.init();
  initCopyButtons();

  var catalog = document.getElementById('catalog');
  if (catalog) { Homepage.render(catalog); Homepage.initFilter(); }

  if (typeof ARTICLE_META !== 'undefined') { // eslint-disable-line no-undef
    var sb = document.getElementById('sidebar');
    if (sb) { Sidebar.render(sb, ARTICLE_META); Sidebar.initMobile(sb); } // eslint-disable-line no-undef
    ArticlePage.initTOC();
    ArticlePage.initProgress();
  }
});
