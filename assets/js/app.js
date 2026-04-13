'use strict';

var NAV = [
  { id: 'introduction', articles: [
    { n: '1.1', id: 'intro' },
    { n: '1.2', id: 'reference' },
    { n: '1.3', id: 'editors' },
    { n: '1.4', id: 'devtools' }
  ] },
  { id: 'basics', articles: [
    { n: '2.1', id: 'hello-world' },
    { n: '2.2', id: 'code-structure' },
    { n: '2.3', id: 'strict-mode' },
    { n: '2.4', id: 'variables' },
    { n: '2.5', id: 'types' },
    { n: '2.6', id: 'interaction' },
    { n: '2.7', id: 'type-casting' },
    { n: '2.8', id: 'operators' },
    { n: '2.9', id: 'comparisons' },
    { n: '2.10', id: 'if-else' },
    { n: '2.11', id: 'logical-operators' },
    { n: '2.12', id: 'nullish-coalescing' },
    { n: '2.13', id: 'loops' },
    { n: '2.14', id: 'switch' },
    { n: '2.15', id: 'functions' },
    { n: '2.16', id: 'function-expressions' },
    { n: '2.17', id: 'arrow-functions' },
    { n: '2.18', id: 'js-specials' }
  ] },
  { id: 'code-quality', articles: [
    { n: '3.1', id: 'debugging' },
    { n: '3.2', id: 'coding-style' },
    { n: '3.3', id: 'comments' },
    { n: '3.4', id: 'ninja-code' },
    { n: '3.5', id: 'testing' },
    { n: '3.6', id: 'polyfills' }
  ] },
  { id: 'objects', articles: [
    { n: '4.1', id: 'objects' },
    { n: '4.2', id: 'object-copy' },
    { n: '4.3', id: 'garbage-collection' },
    { n: '4.4', id: 'this' },
    { n: '4.5', id: 'constructor-new' },
    { n: '4.6', id: 'optional-chaining' },
    { n: '4.7', id: 'symbol' },
    { n: '4.8', id: 'object-toprimitive' }
  ] },
  { id: 'data-types', articles: [
    { n: '5.1', id: 'primitives-methods' },
    { n: '5.2', id: 'number' },
    { n: '5.3', id: 'string' },
    { n: '5.4', id: 'array' },
    { n: '5.5', id: 'array-methods' },
    { n: '5.6', id: 'iterables' },
    { n: '5.7', id: 'map-set' },
    { n: '5.8', id: 'weakmap-weakset' },
    { n: '5.9', id: 'keys-values-entries' },
    { n: '5.10', id: 'destructuring-assignment' },
    { n: '5.11', id: 'date' },
    { n: '5.12', id: 'json' }
  ] },
  { id: 'functions-advanced', articles: [
    { n: '6.1', id: 'recursion' },
    { n: '6.2', id: 'rest-parameters-spread' },
    { n: '6.3', id: 'closure' },
    { n: '6.4', id: 'var' },
    { n: '6.5', id: 'global-object' },
    { n: '6.6', id: 'function-object' },
    { n: '6.7', id: 'new-function' },
    { n: '6.8', id: 'settimeout-setinterval' },
    { n: '6.9', id: 'call-apply-decorators' },
    { n: '6.10', id: 'bind' },
    { n: '6.11', id: 'arrow-functions-revisited' }
  ] },
  { id: 'object-properties', articles: [
    { n: '7.1', id: 'property-descriptors' },
    { n: '7.2', id: 'property-accessors' }
  ] },
  { id: 'prototypes', articles: [
    { n: '8.1', id: 'prototype-inheritance' },
    { n: '8.2', id: 'function-prototype' },
    { n: '8.3', id: 'native-prototypes' },
    { n: '8.4', id: 'prototype-methods' }
  ] },
  { id: 'classes', articles: [
    { n: '9.1', id: 'class' },
    { n: '9.2', id: 'class-inheritance' },
    { n: '9.3', id: 'static-properties-methods' },
    { n: '9.4', id: 'private-protected-properties-methods' },
    { n: '9.5', id: 'extending-built-ins' },
    { n: '9.6', id: 'instanceof' },
    { n: '9.7', id: 'mixins' }
  ] },
  { id: 'error-handling', articles: [
    { n: '10.1', id: 'try-catch' },
    { n: '10.2', id: 'custom-errors' }
  ] },
  { id: 'promises', articles: [
    { n: '11.1', id: 'callbacks' },
    { n: '11.2', id: 'promise-basics' },
    { n: '11.3', id: 'promise-chaining' },
    { n: '11.4', id: 'promise-error-handling' },
    { n: '11.5', id: 'promise-api' },
    { n: '11.6', id: 'promisify' },
    { n: '11.7', id: 'microtasks' },
    { n: '11.8', id: 'async-await' }
  ] },
  { id: 'generators', articles: [
    { n: '12.1', id: 'generators' },
    { n: '12.2', id: 'async-iterators-generators' }
  ] },
  { id: 'modules', articles: [
    { n: '13.1', id: 'modules-intro' },
    { n: '13.2', id: 'import-export' },
    { n: '13.3', id: 'dynamic-imports' }
  ] },
  { id: 'misc', articles: [
    { n: '14.1', id: 'proxy' },
    { n: '14.2', id: 'eval' },
    { n: '14.3', id: 'currying' },
    { n: '14.4', id: 'reference-type' },
    { n: '14.5', id: 'bigint' },
    { n: '14.6', id: 'unicode' },
    { n: '14.7', id: 'weakref' }
  ] }
];

var SEARCH_IDX = [];
var FLAT_NAV = [];
var I18N_API = null;
var ARTICLE_TITLE_OVERRIDES = {
  'rest-parameters-spread': 'Залишкові параметри та оператор розширення'
};
var FALLBACK_LOCALE = {
  ui: {
    search_placeholder: 'Пошук… (/ або ⌘K)',
    search_hint: 'Почніть вводити для пошуку…',
    search_empty: 'Нічого не знайдено за «{q}»',
    support_btn: 'Підтримати',
    copy: 'Копіювати',
    copied: 'Скопійовано'
  },
  nav: { sections: {}, articles: {} }
};

function dig(obj, path) {
  return path.split('.').reduce(function (acc, part) {
    return acc && acc[part];
  }, obj);
}

function detectLang() {
  var match = location.pathname.match(/^\/([a-z]{2,3}(?:-[A-Z]{2})?)\//);
  if (match) return match[1];
  try {
    var saved = localStorage.getItem('devdocs-lang');
    if (saved) return saved;
  } catch (e) {}
  return 'uk';
}

var FALLBACK_I18N = {
  onReady: function (fn) { fn(FALLBACK_LOCALE); },
  getLang: detectLang,
  getLocale: function () { return FALLBACK_LOCALE; },
  t: function (key) { return dig(FALLBACK_LOCALE, key) || key; }
};

function ensureI18NReady(callback) {
  var attempts = 0;

  function poll() {
    if (window.I18N && typeof window.I18N.onReady === 'function') {
      I18N_API = window.I18N;
      window.I18N.onReady(callback);
      return;
    }

    if (attempts >= 20) {
      I18N_API = FALLBACK_I18N;
      callback(FALLBACK_LOCALE);
      return;
    }

    attempts += 1;
    setTimeout(poll, 50);
  }

  if (window.I18N && typeof window.I18N.onReady === 'function') {
    I18N_API = window.I18N;
    window.I18N.onReady(callback);
    return;
  }

  if (!document.querySelector('script[src="/assets/js/i18n.js"]')) {
    var script = document.createElement('script');
    script.src = '/assets/js/i18n.js';
    script.async = false;
    script.setAttribute('data-devdocs-i18n-loader', 'true');
    document.head.appendChild(script);
  }

  poll();
}

function i18n() {
  return I18N_API || FALLBACK_I18N;
}

function t(key) {
  return i18n().t(key);
}

function locale() {
  return i18n().getLocale();
}

function lang() {
  return i18n().getLang();
}

function secTitle(id) {
  return dig(locale(), 'nav.sections.' + id) || id;
}

function artTitle(id) {
  return ARTICLE_TITLE_OVERRIDES[id] || dig(locale(), 'nav.articles.' + id) || id;
}

function url(secId, artId) {
  return '/' + lang() + '/' + secId + '/' + artId + '.html';
}

function esc(value) {
  return String(value).replace(/[&<>"']/g, function (char) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      '\'': '&#39;'
    }[char];
  });
}

function flatNav() {
  FLAT_NAV = NAV.reduce(function (acc, sec) {
    return acc.concat(sec.articles.map(function (article) {
      return {
        n: article.n,
        id: article.id,
        secId: sec.id,
        sec: secTitle(sec.id),
        title: artTitle(article.id),
        url: url(sec.id, article.id)
      };
    }));
  }, []);

  SEARCH_IDX = FLAT_NAV.map(function (item) {
    item._q = [item.title, item.sec, item.id, item.secId].join(' ').toLowerCase();
    return item;
  });
}

var Store = (function () {
  var KEY = 'devdocs-learning';
  var cache;

  function read() {
    if (cache) return cache;
    cache = { progress: {}, recent: [], searches: [] };
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) cache = JSON.parse(raw);
    } catch (e) {}
    return cache;
  }

  function write() {
    try {
      localStorage.setItem(KEY, JSON.stringify(read()));
    } catch (e) {}
  }

  function touch(article, progress, completed) {
    var data = read();
    var key = article.url;
    var current = data.progress[key] || {};
    var nextProgress = Math.max(current.progress || 0, progress || 0);

    data.progress[key] = {
      secId: article.secId,
      artId: article.id,
      title: article.title,
      sec: article.sec,
      n: article.n,
      url: key,
      progress: nextProgress,
      completed: completed != null ? completed : !!current.completed,
      updatedAt: Date.now()
    };

    if (nextProgress >= 85) data.progress[key].completed = true;

    data.recent = data.recent.filter(function (item) {
      return item.url !== key;
    });
    data.recent.unshift({
      url: key,
      title: article.title,
      sec: article.sec,
      n: article.n,
      progress: data.progress[key].progress
    });
    data.recent = data.recent.slice(0, 6);
    write();
  }

  function markDone(key, active) {
    var data = read();
    if (!data.progress[key]) return;
    data.progress[key].completed = active;
    data.progress[key].progress = active ? 100 : Math.min(data.progress[key].progress || 0, 84);
    data.progress[key].updatedAt = Date.now();
    write();
  }

  function rememberSearch(query) {
    var trimmed = query.trim();
    if (!trimmed) return;
    var data = read();
    data.searches = data.searches.filter(function (value) {
      return value.toLowerCase() !== trimmed.toLowerCase();
    });
    data.searches.unshift(trimmed);
    data.searches = data.searches.slice(0, 5);
    write();
  }

  function resetProgress() {
    var data = read();
    data.progress = {};
    data.recent = [];
    write();
  }

  return {
    read: read,
    touch: touch,
    markDone: markDone,
    search: rememberSearch,
    resetProgress: resetProgress
  };
}());

var Theme = (function () {
  var KEY = 'devdocs-theme';
  var media = typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-color-scheme: dark)')
    : null;

  function moonIcon() {
    return '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" fill="none"/>';
  }

  function sunIcon() {
    return '<circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="2"/>';
  }

  function savedTheme() {
    try {
      var theme = localStorage.getItem(KEY);
      if (theme === 'light' || theme === 'dark') return theme;
    } catch (e) {}
    return null;
  }

  function setSavedTheme(theme) {
    try {
      if (theme) localStorage.setItem(KEY, theme);
      else localStorage.removeItem(KEY);
    } catch (e) {}
  }

  function systemTheme() {
    return media && media.matches ? 'dark' : 'light';
  }

  function updateButton(theme) {
    var button = document.getElementById('theme-btn');
    var icon = document.getElementById('theme-icon');
    if (!button || !icon) return;

    var nextLabel = theme === 'dark'
      ? 'Перемкнути на світлу тему'
      : 'Перемкнути на темну тему';

    icon.innerHTML = theme === 'dark' ? sunIcon() : moonIcon();
    button.setAttribute('aria-label', nextLabel);
    button.setAttribute('title', nextLabel);
    button.setAttribute('aria-pressed', String(theme === 'dark'));
  }

  function apply(theme, source) {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.themeSource = source;
    document.documentElement.style.colorScheme = theme;
    updateButton(theme);
  }

  function init() {
    var explicit = savedTheme();
    apply(explicit || systemTheme(), explicit ? 'user' : 'system');

    var button = document.getElementById('theme-btn');
    if (button) {
      button.addEventListener('click', function () {
        var current = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
        var next = current === 'dark' ? 'light' : 'dark';
        setSavedTheme(next);
        apply(next, 'user');
      });
    }

    if (!media) return;

    function onChange() {
      if (savedTheme()) return;
      apply(systemTheme(), 'system');
    }

    if (typeof media.addEventListener === 'function') media.addEventListener('change', onChange);
    else if (typeof media.addListener === 'function') media.addListener(onChange);
  }

  return { init: init };
}());

function supportButtonMarkup() {
  return '<a href="/' + lang() + '/#support" class="btn-support">'
    + '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 14.25C8 14.25 1.5 10 1.5 5.5a3.5 3.5 0 0 1 6.5-1.8A3.5 3.5 0 0 1 14.5 5.5C14.5 10 8 14.25 8 14.25z"/></svg>'
    + '<span>' + esc(t('ui.support_btn') || 'Підтримати') + '</span>'
    + '</a>';
}

function repairSharedChrome() {
  document.querySelectorAll('.logo-mark').forEach(function (node) {
    node.textContent = 'JS';
  });

  var sidebarToggle = document.getElementById('sidebar-toggle');
  if (sidebarToggle) sidebarToggle.setAttribute('aria-label', 'Навігаційне меню');

  var headerSearch = document.getElementById('header-search');
  if (headerSearch) {
    headerSearch.setAttribute('placeholder', t('ui.search_placeholder') || 'Пошук… (/ або ⌘K)');
    headerSearch.setAttribute('aria-label', 'Пошук');
  }

  var headerSearchTrigger = document.getElementById('header-search-trigger');
  if (headerSearchTrigger) {
    var triggerLabel = t('ui.search_trigger') || 'Пошук';
    headerSearchTrigger.setAttribute('aria-label', triggerLabel);
    var triggerText = headerSearchTrigger.querySelector('span');
    if (triggerText) triggerText.textContent = triggerLabel;
  }

  var overlay = document.getElementById('search-overlay');
  if (overlay) overlay.setAttribute('aria-label', 'Пошук');

  var searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.setAttribute('placeholder', 'Що шукаємо?');
    searchInput.setAttribute('aria-label', 'Пошук');
  }

  var sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.setAttribute('aria-label', 'Навігація');

  var actions = document.querySelector('.hdr-actions');
  if (actions && !actions.querySelector('.btn-support')) {
    var themeButton = actions.querySelector('#theme-btn');
    if (themeButton) themeButton.insertAdjacentHTML('afterend', supportButtonMarkup());
    else actions.insertAdjacentHTML('beforeend', supportButtonMarkup());
  }

  document.querySelectorAll('.btn-support').forEach(function (button) {
    button.setAttribute('href', '/' + lang() + '/#support');
    var label = button.querySelector('span');
    if (label) label.textContent = t('ui.support_btn') || 'Підтримати';
  });

  document.querySelectorAll('.btn-support-lg').forEach(function (button) {
    button.setAttribute('href', '/' + lang() + '/#support');
    button.textContent = 'Підтримати JS Dev Docs';
  });

  var homeLink = document.querySelector('.breadcrumbs a[href="/uk/"], .breadcrumbs a[href="/' + lang() + '/"]');
  if (homeLink) homeLink.textContent = 'Головна';

  document.querySelectorAll('.doc-toc').forEach(function (toc) {
    toc.setAttribute('aria-label', 'Зміст статті');
  });
}

var Sidebar = (function () {
  function render(container, active) {
    container.innerHTML = NAV.map(function (sec) {
      var isActiveSection = active && active.secId === sec.id;
      var items = sec.articles.map(function (article) {
        var isActive = isActiveSection && active.artId === article.id;
        return '<a class="nav-link' + (isActive ? ' is-active' : '') + '" href="' + url(sec.id, article.id) + '"' + (isActive ? ' aria-current="page"' : '') + '>'
          + '<span class="nav-n">' + esc(article.n) + '</span>'
          + esc(artTitle(article.id))
          + '</a>';
      }).join('');

      return '<div class="nav-section' + (isActiveSection ? '' : ' is-collapsed') + '">'
        + '<button class="nav-sec-btn" aria-expanded="' + String(isActiveSection) + '">'
        + '<span>' + esc(secTitle(sec.id)) + '</span>'
        + '<svg class="chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 6l4 4 4-4"/></svg>'
        + '</button>'
        + '<div class="nav-items">' + items + '</div>'
        + '</div>';
    }).join('');

    container.querySelectorAll('.nav-sec-btn').forEach(function (button) {
      button.addEventListener('click', function () {
        var section = button.closest('.nav-section');
        var collapsed = section.classList.toggle('is-collapsed');
        button.setAttribute('aria-expanded', String(!collapsed));
      });
    });
  }

  function mobile(sidebar) {
    var toggle = document.getElementById('sidebar-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', function () {
      var open = sidebar.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    sidebar.addEventListener('click', function (event) {
      if (window.innerWidth > 768 || !event.target.closest('.nav-link')) return;
      sidebar.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });

    document.addEventListener('click', function (event) {
      if (sidebar.contains(event.target) || toggle.contains(event.target)) return;
      sidebar.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  }

  return {
    render: render,
    mobile: mobile
  };
}());

var Search = (function () {
  var overlay;
  var panel;
  var input;
  var results;
  var headerSearch;

  function score(item, query) {
    var lower = query.toLowerCase();
    var title = item.title.toLowerCase();
    var section = item.sec.toLowerCase();
    var rank = 0;

    if (title === lower) rank += 120;
    if (title.indexOf(lower) === 0) rank += 80;
    if (title.indexOf(' ' + lower) !== -1) rank += 40;
    if (title.indexOf(lower) !== -1) rank += 25;
    if (section.indexOf(lower) !== -1) rank += 15;
    if (item._q.indexOf(lower) !== -1) rank += 5;

    return rank - (parseFloat(item.n) || 0);
  }

  function highlight(text, query) {
    if (!query) return esc(text);
    return esc(text).replace(
      new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'),
      '<mark class="sr-mark">$1</mark>'
    );
  }

  function renderRecentSearches() {
    var history = Store.read().searches;
    if (!history.length) return '';
    return '<div class="search-meta"><span>Останні пошуки</span><div class="search-history">'
      + history.map(function (value) {
        return '<button class="search-chip" type="button" data-chip="' + esc(value) + '">' + esc(value) + '</button>';
      }).join('')
      + '</div></div>';
  }

  function wireResults() {
    results.querySelectorAll('[data-chip]').forEach(function (button) {
      button.addEventListener('click', function () {
        var value = button.getAttribute('data-chip');
        input.value = value;
        render(value);
        input.focus();
      });
    });

    results.querySelectorAll('[data-search]').forEach(function (link) {
      link.addEventListener('click', function () {
        Store.search(input.value);
      });
    });
  }

  function render(query) {
    var trimmed = query.trim();
    var hint = t('ui.search_hint') || 'Почніть вводити для пошуку…';
    var empty = (t('ui.search_empty') || 'Нічого не знайдено за «{q}»').replace('{q}', trimmed);

    if (!trimmed) {
      results.innerHTML = renderRecentSearches() + '<p class="search-hint">' + esc(hint) + '</p>';
      wireResults();
      return;
    }

    var hits = SEARCH_IDX.map(function (item) {
      return { item: item, score: score(item, trimmed) };
    }).filter(function (entry) {
      return entry.score > 0;
    }).sort(function (a, b) {
      return b.score - a.score;
    }).slice(0, 18);

    if (!hits.length) {
      results.innerHTML = '<p class="search-hint">' + esc(empty) + '</p>';
      return;
    }

    results.innerHTML = '<div class="search-meta"><span>Знайдено ' + hits.length + '</span><span>Сортування за релевантністю</span></div>'
      + hits.map(function (entry) {
        return '<a class="search-result" href="' + entry.item.url + '" data-search="1">'
          + '<span class="sr-num">' + esc(entry.item.n) + '</span>'
          + '<span><div class="sr-title">' + highlight(entry.item.title, trimmed) + '</div>'
          + '<div class="sr-sec">' + highlight(entry.item.sec, trimmed) + '</div></span>'
          + '</a>';
      }).join('');

    wireResults();
  }

  function open(initialQuery) {
    if (!overlay || !input) return;
    overlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    if (typeof initialQuery === 'string') input.value = initialQuery;
    render(input.value || '');
    input.focus();
    input.select();
  }

  function close() {
    if (!overlay || !input) return;
    overlay.classList.remove('is-active');
    document.body.style.overflow = '';
    input.value = '';
    render('');
    if (headerSearch) headerSearch.value = '';
  }

  function init() {
    overlay = document.getElementById('search-overlay');
    panel = document.getElementById('search-panel');
    input = document.getElementById('search-input');
    headerSearch = document.getElementById('header-search');
    var headerSearchTrigger = document.getElementById('header-search-trigger');
    if (!overlay || !panel || !input) return;

    results = panel.querySelector('.search-results');
    if (!results) {
      results = document.createElement('div');
      results.className = 'search-results';
      panel.appendChild(results);
    }

    render('');

    overlay.addEventListener('click', function (event) {
      if (event.target === overlay) close();
    });

    input.addEventListener('input', function (event) {
      render(event.target.value);
    });

    input.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') Store.search(input.value);
    });

    document.addEventListener('keydown', function (event) {
      var tag = document.activeElement && document.activeElement.tagName;
      if ((event.key === '/' || (event.metaKey && event.key.toLowerCase() === 'k')) && tag !== 'INPUT' && tag !== 'TEXTAREA') {
        event.preventDefault();
        open('');
      }
      if (event.key === 'Escape') close();
    });

    if (headerSearch) {
      headerSearch.addEventListener('focus', function () {
        open(headerSearch.value);
      });
      headerSearch.addEventListener('input', function () {
        open(headerSearch.value);
      });
      headerSearch.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === 'ArrowDown') {
          event.preventDefault();
          open(headerSearch.value);
        }
      });
    }

    if (headerSearchTrigger) {
      headerSearchTrigger.addEventListener('click', function () {
        open('');
      });
    }
  }

  return { init: init };
}());

var Homepage = (function () {
  var catalogFrame = 0;
  var flushCatalog = function () {};
  var SECTION_BLURBS = {
    introduction: 'Орієнтація, інструменти та стартова карта курсу.',
    basics: 'Синтаксис, оператори, цикли й перші функції.',
    'code-quality': 'Стиль, коментарі, налагодження і тестування.',
    objects: 'Як влаштовані об’єкти, this і конструктори.',
    'data-types': 'Масиви, рядки, Map, Set, JSON і дати.',
    'functions-advanced': 'Замикання, рекурсія, bind і декоратори.',
    'object-properties': 'Дескриптори, гетери та сетери.',
    prototypes: 'Прототипне наслідування без магії.',
    classes: 'Класи, успадкування, mixins і private поля.',
    'error-handling': 'try...catch, Error і власні винятки.',
    promises: 'Promise API, ланцюжки, async/await.',
    generators: 'Ітерація, генератори й асинхронні ітератори.',
    modules: 'ES-модулі, import/export і dynamic import.',
    misc: 'Proxy, eval, currying, bigint та інші теми.'
  };

  function sectionBlurb(id) {
    return SECTION_BLURBS[id] || 'Розділ курсу JavaScript.';
  }

  function wireHero() {
    var heroStart = document.getElementById('hero-start-link');
    if (heroStart && FLAT_NAV[0]) heroStart.href = FLAT_NAV[0].url;
  }

  function scheduleCatalogFrame(callback) {
    if (typeof window.requestAnimationFrame === 'function') {
      return window.requestAnimationFrame(callback);
    }
    return window.setTimeout(callback, 16);
  }

  function cancelCatalogFrame() {
    if (!catalogFrame) return;

    if (typeof window.cancelAnimationFrame === 'function') {
      window.cancelAnimationFrame(catalogFrame);
    } else {
      clearTimeout(catalogFrame);
    }

    catalogFrame = 0;
  }

  function catalogSectionMarkup(sec, index, forceVisible) {
    var blurb = sectionBlurb(sec.id);
    return '<section class="catalog-section reveal-on-scroll' + (forceVisible ? ' is-visible' : '') + '" aria-labelledby="sec-' + sec.id + '">'
      + '<div class="catalog-section-meta">'
      + '<p class="catalog-section-index">' + esc(String(index + 1).padStart(2, '0')) + '</p>'
      + '<div><h3 class="catalog-section-title" id="sec-' + sec.id + '">' + esc(secTitle(sec.id)) + '</h3>'
      + '<p class="catalog-section-desc">' + esc(blurb) + '</p></div>'
      + '<p class="catalog-section-count">' + sec.articles.length + ' матеріалів</p>'
      + '</div>'
      + '<div class="catalog-links">'
      + sec.articles.map(function (article) {
        var title = artTitle(article.id);
        var query = [title, secTitle(sec.id), blurb, article.id, sec.id].join(' ').toLowerCase();
        return '<a class="catalog-link" href="' + url(sec.id, article.id) + '" data-q="' + esc(query) + '">'
          + '<span class="catalog-link-n">' + esc(article.n) + '</span>'
          + '<span class="catalog-link-title">' + esc(title) + '</span>'
          + '<span class="catalog-link-arrow" aria-hidden="true">→</span>'
          + '</a>';
      }).join('')
      + '</div>'
      + '</section>';
  }

  function renderCatalogBatch(container, start, count, forceVisible) {
    var end = Math.min(start + count, NAV.length);
    if (start >= end) return end;

    container.insertAdjacentHTML('beforeend', NAV.slice(start, end).map(function (sec, offset) {
      return catalogSectionMarkup(sec, start + offset, forceVisible);
    }).join(''));

    return end;
  }

  function catalog(container) {
    var initialCount = 4;
    var batchCount = 3;
    var rendered = 0;

    cancelCatalogFrame();
    container.innerHTML = '';
    rendered = renderCatalogBatch(container, 0, initialCount, false);

    flushCatalog = function () {
      cancelCatalogFrame();
      rendered = renderCatalogBatch(container, rendered, NAV.length, true);
    };

    function scheduleNextBatch() {
      if (rendered >= NAV.length) {
        catalogFrame = 0;
        return;
      }

      catalogFrame = scheduleCatalogFrame(function () {
        catalogFrame = 0;
        rendered = renderCatalogBatch(container, rendered, batchCount, true);
        scheduleNextBatch();
      });
    }

    scheduleNextBatch();
  }
  function dashboard() {
    var host = document.getElementById('learning-dashboard');
    if (!host) return;

    var data = Store.read();
    var completed = Object.keys(data.progress).filter(function (key) {
      return data.progress[key] && data.progress[key].completed;
    }).length;
    var first = FLAT_NAV[0];
    var sections = NAV.map(function (sec) {
      var total = sec.articles.length;
      var read = sec.articles.filter(function (article) {
        var item = data.progress[url(sec.id, article.id)];
        return item && item.completed;
      }).length;
      return {
        title: secTitle(sec.id),
        read: read,
        total: total,
        ratio: total ? Math.round((read / total) * 100) : 0
      };
    }).sort(function (a, b) {
      return b.ratio - a.ratio;
    }).slice(0, 4);

    host.innerHTML = '<div class="learning-shell">'
      + '<section class="learning-overview"><p class="learning-label">Ваш прогрес</p><div class="learning-total"><strong>' + completed + '</strong><span>/ ' + FLAT_NAV.length + ' статей позначено</span></div><p class="learning-copy">Локальний прогрес, останні відкриті теми й повернення до навчання без реєстрації.</p></section>'
      + '<section class="learning-column"><h3>Продовжити</h3>'
      + (data.recent.length
        ? '<div class="learning-list">' + data.recent.slice(0, 3).map(function (item) {
          return '<a class="learning-link" href="' + item.url + '"><span><strong>' + esc(item.title) + '</strong><small>' + esc(item.n + ' · ' + item.sec) + '</small></span><small>' + (item.progress || 0) + '%</small></a>';
        }).join('') + '</div>'
        : '<p class="learning-empty">Почніть із <a href="' + first.url + '">' + esc(first.title) + '</a>, і тут одразу з’являться теми для продовження.</p>')
      + '</section>'
      + '<section class="learning-column"><h3>Маршрут старту</h3><a class="learning-start-link" href="' + first.url + '"><span><strong>' + esc(first.title) + '</strong><small>' + esc(first.sec) + '</small></span><small>Почніть тут</small></a><div class="learning-progress-list">'
      + sections.map(function (section) {
        return '<div class="learning-progress-row"><div class="learning-progress-top"><span>' + esc(section.title) + '</span><span>' + section.read + '/' + section.total + '</span></div><div class="prog-bar"><div class="prog-fill" style="width:' + section.ratio + '%"></div></div></div>';
      }).join('')
      + '</div></section>'
      + '</div>';

    var overview = host.querySelector('.learning-overview');
    if (overview) {
      overview.insertAdjacentHTML('beforeend', '<div class="learning-actions"><button class="learning-reset" id="learning-reset-progress" type="button">Скинути прогрес</button><span class="learning-reset-note">Лише для цього браузера</span></div>');
    }

    var resetButton = host.querySelector('#learning-reset-progress');
    if (resetButton) {
      resetButton.addEventListener('click', function () {
        var confirmed = window.confirm('Скинути весь локальний прогрес читання на цьому пристрої?');
        if (!confirmed) return;
        Store.resetProgress();
        dashboard();
      });
    }
  }

  function filter() {
    var input = document.getElementById('catalog-search');
    var empty = document.getElementById('catalog-empty');
    if (!input) return;

    input.addEventListener('input', function () {
      flushCatalog();
      var query = input.value.toLowerCase().trim();
      var visible = 0;

      document.querySelectorAll('.catalog-link').forEach(function (link) {
        var match = !query || link.dataset.q.indexOf(query) !== -1;
        link.classList.toggle('is-hidden', !match);
        if (match) visible += 1;
      });

      document.querySelectorAll('.catalog-section').forEach(function (card) {
        card.style.display = card.querySelectorAll('.catalog-link:not(.is-hidden)').length ? '' : 'none';
      });

      if (empty) empty.hidden = !query || visible > 0;
    });
  }

  function reveal() {
    var items = document.querySelectorAll('.reveal-on-scroll');
    if (!items.length) return;

    if (typeof IntersectionObserver !== 'function') {
      items.forEach(function (item) { item.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  function init() {
    wireHero();
    dashboard();
    filter();
    reveal();
  }

  return {
    catalog: catalog,
    init: init
  };
}());

var Article = (function () {
  var currentArticle;
  var markButton;

  function normalizeMeta(meta) {
    var next = meta ? { secId: meta.secId, artId: meta.artId } : null;
    if (!next) return null;

    if (typeof next.secId === 'number' || /^\d+$/.test(String(next.secId))) {
      var section = NAV[Number(next.secId) - 1];
      if (section) {
        next.secId = section.id;
        if (typeof next.artId === 'number' || /^\d+$/.test(String(next.artId))) {
          var article = section.articles[Number(next.artId) - 1];
          if (article) next.artId = article.id;
        }
      }
    }

    return {
      secId: String(next.secId),
      artId: String(next.artId)
    };
  }

  function fromPath() {
    var match = location.pathname.match(/^\/[^/]+\/([^/]+)\/([^/.]+)\.html$/);
    return match ? { secId: match[1], artId: match[2] } : null;
  }

  function meta() {
    if (typeof ARTICLE_META !== 'undefined' && ARTICLE_META && ARTICLE_META.secId != null && ARTICLE_META.artId != null) {
      var explicit = normalizeMeta(ARTICLE_META);
      if (findArticle(explicit)) return explicit;
    }
    return normalizeMeta(fromPath());
  }

  function findArticle(target) {
    if (!target) return null;
    return FLAT_NAV.find(function (item) {
      return item.secId === target.secId && item.id === target.artId;
    }) || null;
  }

  function ensureToc() {
    var prose = document.querySelector('.prose');
    var layout = document.querySelector('.doc-layout');
    var main = document.querySelector('.doc-main');
    if (!prose || !main) return null;

    var headings = prose.querySelectorAll('h2[id], h3[id]');
    if (!headings.length) return null;

    var toc = document.querySelector('.doc-toc');
    if (!toc) {
      toc = document.createElement('aside');
      toc.className = 'doc-toc';
      (layout || main).appendChild(toc);
    }

    toc.setAttribute('aria-label', 'Зміст статті');

    var label = toc.querySelector('.toc-label');
    if (!label) {
      label = document.createElement('p');
      label.className = 'toc-label';
      toc.appendChild(label);
    }
    label.textContent = 'Зміст';

    var list = toc.querySelector('.toc-list');
    if (!list) {
      list = document.createElement('ul');
      list.className = 'toc-list';
      toc.appendChild(list);
    }
    list.className = 'toc-list';
    list.innerHTML = Array.prototype.map.call(headings, function (heading) {
      return '<li class="toc-item"><a href="#' + heading.id + '" class="toc-link ' + heading.tagName.toLowerCase() + '">' + esc(heading.textContent.trim()) + '</a></li>';
    }).join('');

    var progress = toc.querySelector('.toc-progress');
    if (!progress) {
      progress = document.createElement('div');
      progress.className = 'toc-progress';
      progress.innerHTML = '<div class="toc-prog-meta"><span>Прогрес</span><span id="progress-pct">0%</span></div><div class="prog-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"><div class="prog-fill" id="progress-fill"></div></div>';
      toc.appendChild(progress);
    }

    var progressLabel = progress.querySelector('.toc-prog-meta span');
    if (progressLabel) progressLabel.textContent = 'Прогрес';

    var bar = progress.querySelector('.prog-bar');
    if (bar) {
      bar.setAttribute('role', 'progressbar');
      bar.setAttribute('aria-valuemin', '0');
      bar.setAttribute('aria-valuemax', '100');
      bar.setAttribute('aria-valuenow', bar.getAttribute('aria-valuenow') || '0');
    }

    var fill = progress.querySelector('.prog-fill');
    if (fill && !fill.id) fill.id = 'progress-fill';

    var pct = progress.querySelector('#progress-pct');
    if (!pct) {
      pct = document.createElement('span');
      pct.id = 'progress-pct';
      pct.textContent = '0%';
      var metaRow = progress.querySelector('.toc-prog-meta');
      if (metaRow) metaRow.appendChild(pct);
    }

    var donate = toc.querySelector('.toc-donate');
    if (!donate) {
      donate = document.createElement('div');
      donate.className = 'toc-donate';
      donate.innerHTML = '<p>Знайшли потрібне? <strong>Підтримайте проєкт</strong></p><a href="/' + lang() + '/#support" class="btn-donate-sm">Підтримати</a>';
      toc.appendChild(donate);
    } else {
      var link = donate.querySelector('a');
      if (link) link.setAttribute('href', '/' + lang() + '/#support');
    }

    return toc;
  }

  function tocSpy() {
    ensureToc();

    var headings = document.querySelectorAll('.prose h2[id], .prose h3[id]');
    var links = document.querySelectorAll('.toc-link');
    if (!headings.length || !links.length || typeof IntersectionObserver !== 'function') return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          link.classList.remove('is-active');
        });
        var active = document.querySelector('.toc-link[href="#' + entry.target.id + '"]');
        if (active) active.classList.add('is-active');
      });
    }, { rootMargin: '-64px 0px -60% 0px' });

    headings.forEach(function (heading) {
      observer.observe(heading);
    });
  }

  function readingProgress() {
    var articleInner = document.querySelector('.article-inner');
    var prose = document.querySelector('.prose');
    var header = document.querySelector('.site-header');
    if (!articleInner || !prose) return 0;

    var headerHeight = header ? header.offsetHeight : 0;
    var lineOffset = Math.max(56, Math.min(220, (window.innerHeight - headerHeight) * 0.38));
    var line = window.pageYOffset + headerHeight + lineOffset;
    var start = articleInner.getBoundingClientRect().top + window.pageYOffset;
    var end = prose.getBoundingClientRect().bottom + window.pageYOffset;
    var range = Math.max(end - start, 1);

    return Math.max(0, Math.min(100, Math.round(((line - start) / range) * 100)));
  }

  function syncProgress(percent, persist) {
    var fill = document.getElementById('progress-fill');
    var pct = document.getElementById('progress-pct');
    var bar = fill && fill.parentElement;

    if (currentArticle && persist !== false) {
      Store.touch(currentArticle, percent, percent >= 85);
    }

    var state = currentArticle ? (Store.read().progress[currentArticle.url] || {}) : {};
    var display = state.progress != null ? state.progress : percent;
    var completed = !!state.completed;

    if (fill) fill.style.width = display + '%';
    if (pct) pct.textContent = display + '%';
    if (bar) bar.setAttribute('aria-valuenow', String(display));

    if (markButton) {
      markButton.classList.toggle('is-active', completed);
      markButton.textContent = completed ? 'Прочитано' : 'Позначити як прочитане';
      markButton.setAttribute('aria-pressed', String(completed));
    }
  }

  function progress() {
    var ticking = false;

    function update() {
      ticking = false;
      syncProgress(readingProgress(), true);
    }

    function requestUpdate() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    requestUpdate();
  }

  function actions() {
    var badges = document.querySelector('.article-badges');
    if (!badges || !currentArticle) return;

    var wrap = badges.nextElementSibling && badges.nextElementSibling.classList.contains('article-actions')
      ? badges.nextElementSibling
      : null;

    if (!wrap) {
      wrap = document.createElement('div');
      wrap.className = 'article-actions';
      badges.parentNode.insertBefore(wrap, badges.nextSibling);
    }

    markButton = document.createElement('button');
    markButton.type = 'button';
    markButton.className = 'btn-article-action';
    wrap.innerHTML = '';
    wrap.appendChild(markButton);
    syncProgress(readingProgress(), false);

    markButton.addEventListener('click', function () {
      var state = Store.read().progress[currentArticle.url];
      Store.markDone(currentArticle.url, !(state && state.completed));
      syncProgress(readingProgress(), false);
    });
  }

  function related() {
    if (!currentArticle) return;

    var host = document.querySelector('.article-inner');
    if (!host) return;

    var old = host.querySelector('.related-articles');
    if (old) old.remove();

    var items = FLAT_NAV.filter(function (item) {
      return item.secId === currentArticle.secId && item.id !== currentArticle.id;
    }).slice(0, 3);
    if (!items.length) return;

    host.insertAdjacentHTML('beforeend', '<section class="related-articles" aria-label="Схожі статті"><h2 class="related-heading">Далі в цьому розділі</h2><div class="related-list">'
      + items.map(function (item) {
        return '<a href="' + item.url + '" class="related-link"><span class="related-meta">' + esc(item.n) + '</span><span><strong>' + esc(item.title) + '</strong><div class="related-meta">' + esc(item.sec) + '</div></span></a>';
      }).join('')
      + '</div></section>');
  }

  function nav() {
    if (!currentArticle) return;

    var host = document.querySelector('.article-inner');
    if (!host) return;

    var old = host.querySelector('.art-nav');
    if (old) old.remove();

    var index = FLAT_NAV.findIndex(function (item) {
      return item.url === currentArticle.url;
    });
    var prev = FLAT_NAV[index - 1];
    var next = FLAT_NAV[index + 1];

    host.insertAdjacentHTML('beforeend', '<nav class="art-nav" aria-label="Між статтями">'
      + (prev
        ? '<a href="' + prev.url + '" class="art-nav-a"><span class="art-nav-dir">Попередня</span><span class="art-nav-title">' + esc(prev.title) + '</span></a>'
        : '<a href="/' + lang() + '/" class="art-nav-a"><span class="art-nav-dir">До каталогу</span><span class="art-nav-title">Усі розділи</span></a>')
      + (next
        ? '<a href="' + next.url + '" class="art-nav-a is-next"><span class="art-nav-dir">Наступна</span><span class="art-nav-title">' + esc(next.title) + '</span></a>'
        : '<a href="/' + lang() + '/" class="art-nav-a is-next"><span class="art-nav-dir">Повернутися</span><span class="art-nav-title">Огляд усіх статей</span></a>')
      + '</nav>');
  }

  function init() {
    currentArticle = findArticle(meta());
    if (!currentArticle) return;

    Store.touch(currentArticle, 0, false);
    actions();
    tocSpy();
    progress();
    related();
    nav();
  }

  return {
    meta: meta,
    init: init
  };
}());

function copyButtons() {
  var copyLabel = t('ui.copy') || 'Копіювати';
  var copiedLabel = t('ui.copied') || 'Скопійовано';
  var idle = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="5" y="5" width="9" height="9" rx="2"/><path d="M3 11H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v1"/></svg> ' + copyLabel;
  var done = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="13.5 4 6 11.5 2.5 8"/></svg> ' + copiedLabel;

  document.querySelectorAll('.btn-copy').forEach(function (button) {
    button.innerHTML = idle;
    button.addEventListener('click', function () {
      var pre = button.closest('.code-block') && button.closest('.code-block').querySelector('pre');
      navigator.clipboard.writeText(pre ? pre.innerText : '').then(function () {
        button.innerHTML = done;
        button.classList.add('is-copied');
        setTimeout(function () {
          button.innerHTML = idle;
          button.classList.remove('is-copied');
        }, 2200);
      }).catch(function () {});
    });
  });
}

function boot() {
  repairSharedChrome();
  Theme.init();
  flatNav();
  Search.init();
  copyButtons();

  var catalog = document.getElementById('catalog');
  if (catalog) {
    Homepage.catalog(catalog);
    Homepage.init();
  }

  var articleMeta = Article.meta();
  if (articleMeta) {
    var sidebar = document.getElementById('sidebar');
    if (sidebar) {
      Sidebar.render(sidebar, articleMeta);
      Sidebar.mobile(sidebar);
    }
    Article.init();
  }
}

ensureI18NReady(boot);
