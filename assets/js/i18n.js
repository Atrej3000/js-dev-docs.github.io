/**
 * JS Dev Docs — i18n.js
 * Must load synchronously BEFORE app.js.
 * Public API: window.I18N.{ onReady, getLang, getLocale, t, REGISTRY }
 */
;(function (global) {
  'use strict';

  /* ── Language registry ─────────────────────────────────────────────────── */
  var REGISTRY = {
    /* Tier 1 — Global reach */
    'uk':    { name: 'Українська',       dir: 'ltr', flag: '🇺🇦', tier: 1, available: true  },
    'en':    { name: 'English',          dir: 'ltr', flag: '🇬🇧', tier: 1, available: false },
    'es':    { name: 'Español',          dir: 'ltr', flag: '🇪🇸', tier: 1, available: false },
    'pt':    { name: 'Português (BR)',   dir: 'ltr', flag: '🇧🇷', tier: 1, available: false },
    'fr':    { name: 'Français',         dir: 'ltr', flag: '🇫🇷', tier: 1, available: false },
    'de':    { name: 'Deutsch',          dir: 'ltr', flag: '🇩🇪', tier: 1, available: false },
    'it':    { name: 'Italiano',         dir: 'ltr', flag: '🇮🇹', tier: 1, available: false },
    'ru':    { name: 'Русский',          dir: 'ltr', flag: '🇷🇺', tier: 1, available: false },
    'pl':    { name: 'Polski',           dir: 'ltr', flag: '🇵🇱', tier: 1, available: false },
    'tr':    { name: 'Türkçe',           dir: 'ltr', flag: '🇹🇷', tier: 1, available: false },
    /* Tier 2 — High-growth */
    'zh':    { name: '中文（简体）',        dir: 'ltr', flag: '🇨🇳', tier: 2, available: false },
    'zh-TW': { name: '中文（繁體）',        dir: 'ltr', flag: '🇹🇼', tier: 2, available: false },
    'hi':    { name: 'हिन्दी',             dir: 'ltr', flag: '🇮🇳', tier: 2, available: false },
    'bn':    { name: 'বাংলা',             dir: 'ltr', flag: '🇧🇩', tier: 2, available: false },
    'id':    { name: 'Bahasa Indonesia', dir: 'ltr', flag: '🇮🇩', tier: 2, available: false },
    'vi':    { name: 'Tiếng Việt',       dir: 'ltr', flag: '🇻🇳', tier: 2, available: false },
    'th':    { name: 'ภาษาไทย',           dir: 'ltr', flag: '🇹🇭', tier: 2, available: false },
    'tl':    { name: 'Filipino',         dir: 'ltr', flag: '🇵🇭', tier: 2, available: false },
    'ms':    { name: 'Bahasa Melayu',    dir: 'ltr', flag: '🇲🇾', tier: 2, available: false },
    /* Tier 3 — Tech hubs */
    'ar':    { name: 'العربية',           dir: 'rtl', flag: '🇸🇦', tier: 3, available: false },
    'fa':    { name: 'فارسی',            dir: 'rtl', flag: '🇮🇷', tier: 3, available: false },
    'he':    { name: 'עברית',            dir: 'rtl', flag: '🇮🇱', tier: 3, available: false },
    'ko':    { name: '한국어',             dir: 'ltr', flag: '🇰🇷', tier: 3, available: false },
    'ja':    { name: '日本語',             dir: 'ltr', flag: '🇯🇵', tier: 3, available: false },
    /* Tier 4 — Europe */
    'nl':    { name: 'Nederlands',       dir: 'ltr', flag: '🇳🇱', tier: 4, available: false },
    'sv':    { name: 'Svenska',          dir: 'ltr', flag: '🇸🇪', tier: 4, available: false },
    'da':    { name: 'Dansk',            dir: 'ltr', flag: '🇩🇰', tier: 4, available: false },
    'no':    { name: 'Norsk',            dir: 'ltr', flag: '🇳🇴', tier: 4, available: false },
    'fi':    { name: 'Suomi',            dir: 'ltr', flag: '🇫🇮', tier: 4, available: false },
    'cs':    { name: 'Čeština',          dir: 'ltr', flag: '🇨🇿', tier: 4, available: false },
    'sk':    { name: 'Slovenčina',       dir: 'ltr', flag: '🇸🇰', tier: 4, available: false },
    'hu':    { name: 'Magyar',           dir: 'ltr', flag: '🇭🇺', tier: 4, available: false },
    'ro':    { name: 'Română',           dir: 'ltr', flag: '🇷🇴', tier: 4, available: false },
    'bg':    { name: 'Български',        dir: 'ltr', flag: '🇧🇬', tier: 4, available: false },
    'el':    { name: 'Ελληνικά',         dir: 'ltr', flag: '🇬🇷', tier: 4, available: false },
    'sr':    { name: 'Српски',           dir: 'ltr', flag: '🇷🇸', tier: 4, available: false },
    'hr':    { name: 'Hrvatski',         dir: 'ltr', flag: '🇭🇷', tier: 4, available: false },
    'lt':    { name: 'Lietuvių',         dir: 'ltr', flag: '🇱🇹', tier: 4, available: false },
    'lv':    { name: 'Latviešu',         dir: 'ltr', flag: '🇱🇻', tier: 4, available: false },
    'et':    { name: 'Eesti',            dir: 'ltr', flag: '🇪🇪', tier: 4, available: false },
    /* Tier 5 — Africa */
    'sw':    { name: 'Kiswahili',        dir: 'ltr', flag: '🇰🇪', tier: 5, available: false },
    'ha':    { name: 'Hausa',            dir: 'ltr', flag: '🇳🇬', tier: 5, available: false },
    'am':    { name: 'አማርኛ',             dir: 'ltr', flag: '🇪🇹', tier: 5, available: false },
    'yo':    { name: 'Yorùbá',           dir: 'ltr', flag: '🇳🇬', tier: 5, available: false },
    'zu':    { name: 'isiZulu',          dir: 'ltr', flag: '🇿🇦', tier: 5, available: false },
    /* Tier 6 — India */
    'ta':    { name: 'தமிழ்',             dir: 'ltr', flag: '🇮🇳', tier: 6, available: false },
    'te':    { name: 'తెలుగు',            dir: 'ltr', flag: '🇮🇳', tier: 6, available: false },
    'mr':    { name: 'मराठी',             dir: 'ltr', flag: '🇮🇳', tier: 6, available: false },
    'ur':    { name: 'اردو',             dir: 'rtl', flag: '🇵🇰', tier: 6, available: false },
    'gu':    { name: 'ગુજરાતી',           dir: 'ltr', flag: '🇮🇳', tier: 6, available: false },
    'kn':    { name: 'ಕನ್ನಡ',             dir: 'ltr', flag: '🇮🇳', tier: 6, available: false },
    'ml':    { name: 'മലയാളം',            dir: 'ltr', flag: '🇮🇳', tier: 6, available: false },
    'pa':    { name: 'ਪੰਜਾਬੀ',            dir: 'ltr', flag: '🇮🇳', tier: 6, available: false },
  };

  var TIER_LABELS = { 1:'Global', 2:'Asia & Americas', 3:'Tech hubs', 4:'Europe', 5:'Africa', 6:'India' };

  /* ── Ukrainian locale (embedded — zero latency) ───────────────────────── */
  var UK_LOCALE = {
    meta: { lang: 'uk', dir: 'ltr', flag: '🇺🇦', name: 'Українська' },
    ui: {
      search_placeholder:  'Пошук… (/ або ⌘K)',
      search_hint:         'Почніть вводити для пошуку…',
      search_empty:        'Нічого не знайдено за «{q}»',
      support_btn:         'Підтримати',
      theme_label:         'Змінити тему',
      hero_badge:          '🇺🇦 Безкоштовно · Українською',
      hero_title_1:        'JavaScript',
      hero_title_2:        'Повний довідник',
      hero_desc:           '14 розділів мови JavaScript — від синтаксису до генераторів і модулів. Без реклами, без пейволів.',
      filter_placeholder:  'Фільтрувати: promise, closure, class…',
      stat_articles:       'статей',
      stat_sections:       'розділів',
      support_eyebrow:     'Підтримати проект',
      support_heading:     'Зроблено з ❤️ для україномовних розробників',
      support_desc:        'Некомерційний волонтерський проект. Підтримай кавою або через Монобанк — кожна гривня йде на хостинг та нові статті.',
      footer_credit:       'Матеріали адаптовані з javascript.info (CC BY-NC-SA 4.0).',
      footer_made:         'Зроблено в Україні 🇺🇦',
      footer_about:        'Про проект',
      footer_contribute:   'Долучитись',
      copy:                'Копіювати',
      copied:              'Скопійовано',
      lang_title:          'Оберіть мову',
      coming_soon:         'soon',
    },
    nav: {
      sections: {
        'introduction':       'Вступ',
        'basics':             'Основи JavaScript',
        'code-quality':       'Якість коду',
        'objects':            "Об'єкти: основи",
        'data-types':         'Типи даних',
        'functions-advanced': 'Розширена робота з функціями',
        'object-properties':  "Властивості об'єктів",
        'prototypes':         'Прототипи, наслідування',
        'classes':            'Класи',
        'error-handling':     'Обробка помилок',
        'promises':           'Проміси, async/await',
        'generators':         'Генератори, ітерація',
        'modules':            'Модулі',
        'misc':               'Різне',
      },
      articles: {
        'intro':                    'Вступ до JavaScript',
        'specifications':           'Довідники і специфікації',
        'code-editors':             'Редактори коду',
        'devtools':                 'Інструменти розробника',
        'hello-world':              'Привіт, світ!',
        'code-structure':           'Структура коду',
        'use-strict':               'Суворий режим "use strict"',
        'variables':                'Змінні',
        'data-types':               'Типи даних',
        'interaction':              'Взаємодія: alert, prompt, confirm',
        'type-conversions':         'Перетворення типів',
        'operators':                'Базові оператори, математика',
        'comparison':               'Оператори порівняння',
        'conditionals':             'Умовне розгалуження: if, ?',
        'logical-operators':        'Логічні оператори',
        'nullish-coalescing':       "Оператор об'єднання з null ??",
        'loops':                    'Цикли while і for',
        'switch':                   'Конструкція switch',
        'functions':                'Функції',
        'function-expressions':     'Функціональні вирази',
        'arrow-functions':          'Стрілкові функції: основи',
        'js-specials':              'Особливості JavaScript',
        'debugging':                'Налагодження в браузері',
        'code-style':               'Стандарт оформлення коду',
        'comments':                 'Коментарі',
        'ninja-code':               'Ніндзя-код',
        'testing-mocha':            'Автоматичне тестування (Mocha)',
        'polyfills':                'Поліфіли та транспілери',
        'object-basics':            "Об'єкти",
        'object-copy':              "Копіювання об'єктів та посилання",
        'garbage-collection':       'Збирання сміття',
        'object-methods':           "Методи об'єкта, this",
        'constructor-new':          'Конструктор, оператор new',
        'optional-chaining':        'Опціональний ланцюжок ?.',
        'symbol':                   'Тип даних Symbol',
        'object-toprimitive':       "Перетворення об'єктів в примітиви",
        'primitives-methods':       'Методи примітивів',
        'numbers':                  'Числа',
        'strings':                  'Рядки',
        'arrays':                   'Масиви',
        'array-methods':            'Методи масивів',
        'iterables':                "Ітеровані об'єкти",
        'map-set':                  'Map та Set',
        'weakmap-weakset':          'WeakMap і WeakSet',
        'keys-values-entries':      'Object.keys, values, entries',
        'destructuring':            'Деструктуризоване присвоєння',
        'date':                     'Дата і час',
        'json':                     'Методи JSON: toJSON',
        'recursion':                'Рекурсія та стек',
        'closure':                  'Замикання',
        'var':                      'Застарілі змінні: var',
        'global-object':            "Глобальний об'єкт",
        'function-object':          "Об'єкт функції, NFE",
        'new-function':             'Синтаксис "new Function"',
        'settimeout-setinterval':   'Планування: setTimeout та setInterval',
        'call-apply-decorators':    'Декоратори та переадресація: call/apply',
        'bind':                     "Прив'язка контексту до функції",
        'arrow-functions-revisited':'Повторення: стрілкові функції',
        'property-descriptors':     'Прапори та дескриптори властивостей',
        'property-accessors':       'Гетери і сетери властивостей',
        'prototype-inheritance':    'Успадкування через прототипи',
        'function-prototype':       'F.prototype',
        'native-prototypes':        'Вбудовані прототипи',
        'proto-methods':            'Методи прототипів, без __proto__',
        'class':                    'Базовий синтаксис класу',
        'class-inheritance':        'Наслідування класу',
        'static-properties':        'Статичні властивості та методи',
        'private-protected':        'Приватні та захищені властивості та методи',
        'extending-built-in':       'Розширення вбудованих класів',
        'instanceof':               'Перевірка класу: instanceof',
        'mixins':                   'Міксини',
        'try-catch':                'Робота з помилками: try...catch',
        'custom-errors':            'Нестандартні помилки, розширення Error',
        'callbacks':                'Функції зворотного виклику',
        'promise-basics':           'Promise',
        'promise-chaining':         'Ланцюжок промісів',
        'promise-error-handling':   'Promise: обробка помилок',
        'promise-api':              'Promise API',
        'promisification':          'Промісифікація',
        'microtasks':               'Мікрозавдання',
        'async-await':              'Async/await',
        'generators':               'Генератори',
        'async-iterators':          'Асинхронні ітератори та генератори',
        'modules-intro':            'Вступ до модулів',
        'export-import':            'Експорт та імпорт',
        'dynamic-imports':          'Динамічні імпорти',
        'proxy-reflect':            'Proxy та Reflect',
        'eval':                     'Eval: виконання рядка коду',
        'currying':                 'Каррінг',
        'reference-type':           'Посилальний тип',
        'bigint':                   'BigInt',
        'unicode-strings':          'Юнікод: внутрішня будова рядків',
        'weakref':                  'WeakRef та FinalizationRegistry',
      }
    }
  };

  /* ── Detection ─────────────────────────────────────────────────────────── */
  function detectLang() {
    var m = location.pathname.match(/^\/([a-z]{2,3}(?:-[A-Z]{2})?)\//);
    if (m && REGISTRY[m[1]]) { _save(m[1]); return m[1]; }
    try {
      var s = localStorage.getItem('devdocs-lang');
      if (s && REGISTRY[s]) return s;
    } catch (e) {}
    var preferred = navigator.languages || [navigator.language || 'uk'];
    for (var i = 0; i < preferred.length; i++) {
      var norm = preferred[i].replace('_', '-');
      if (REGISTRY[norm]) return norm;
      var base = norm.split('-')[0].toLowerCase();
      if (REGISTRY[base]) return base;
    }
    return 'uk';
  }
  function _save(lang) { try { localStorage.setItem('devdocs-lang', lang); } catch (e) {} }

  /* ── Locale loading ─────────────────────────────────────────────────────── */
  var _cache  = { uk: UK_LOCALE };
  var _lang   = 'uk';
  var _locale = UK_LOCALE;
  var _ready  = false;
  var _queue  = [];

  function loadLocale(lang, cb) {
    if (_cache[lang]) { cb(null, _cache[lang]); return; }
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/i18n/' + lang + '.json');
    xhr.onload = function () {
      if (xhr.status === 200) {
        try { _cache[lang] = JSON.parse(xhr.responseText); cb(null, _cache[lang]); }
        catch (e) { cb(e); }
      } else { cb(new Error('HTTP ' + xhr.status)); }
    };
    xhr.onerror = function () { cb(new Error('Network')); };
    xhr.send();
  }

  /* ── Apply locale ───────────────────────────────────────────────────────── */
  function applyLocale(loc) {
    _locale = loc;
    var root = document.documentElement;
    root.setAttribute('lang', loc.meta.lang || 'uk');
    root.setAttribute('dir',  loc.meta.dir  || 'ltr');
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var v = _dig(loc, el.getAttribute('data-i18n'));
      if (v) el.textContent = v;
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      var v = _dig(loc, el.getAttribute('data-i18n-ph'));
      if (v) el.placeholder = v;
    });
  }
  function _dig(obj, path) {
    return path.split('.').reduce(function (o, k) { return o && o[k]; }, obj) || null;
  }

  /* ── Hreflang ───────────────────────────────────────────────────────────── */
  function injectHreflang() {
    var head = document.head;
    head.querySelectorAll('link[hreflang]').forEach(function (l) { head.removeChild(l); });
    var base = location.pathname.replace(/^\/[a-z]{2,3}(?:-[A-Z]{2})?\//, '/');
    Object.keys(REGISTRY).forEach(function (code) {
      if (!REGISTRY[code].available) return;
      var l = document.createElement('link');
      l.rel = 'alternate'; l.hreflang = code;
      l.href = location.origin + '/' + code + base;
      head.appendChild(l);
    });
    var xd = document.createElement('link');
    xd.rel = 'alternate'; xd.hreflang = 'x-default';
    xd.href = location.origin + '/uk' + base;
    head.appendChild(xd);
  }

  /* ── Switcher UI ────────────────────────────────────────────────────────── */
  function renderSwitcher() {
    var actions = document.querySelector('.hdr-actions');
    if (!actions) return;

    var btn = document.createElement('button');
    btn.className = 'btn-icon btn-lang';
    btn.setAttribute('aria-label', 'Language');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>';

    var panel = document.createElement('div');
    panel.className = 'lang-panel';
    panel.setAttribute('role', 'dialog');
    panel.hidden = true;

    var tiers = {};
    Object.keys(REGISTRY).forEach(function (c) {
      var t = REGISTRY[c].tier;
      if (!tiers[t]) tiers[t] = [];
      tiers[t].push(c);
    });
    var html = '<div class="lang-panel-inner"><p class="lang-panel-head">' + (_dig(_locale, 'ui.lang_title') || 'Select language') + '</p>';
    Object.keys(tiers).sort().forEach(function (tier) {
      html += '<div class="lang-tier"><span class="lang-tier-label">Tier ' + tier + ' — ' + TIER_LABELS[tier] + '</span><div class="lang-grid">';
      tiers[tier].forEach(function (code) {
        var info = REGISTRY[code];
        html += '<button class="lang-item'
          + (code === _lang     ? ' is-current'     : '')
          + (!info.available    ? ' is-unavailable'  : '')
          + '" data-lang="' + code + '" data-available="' + info.available + '">'
          + '<span class="lang-flag">' + info.flag + '</span>'
          + '<span class="lang-name">' + info.name + '</span>'
          + (!info.available ? '<span class="lang-soon">' + (_dig(_locale, 'ui.coming_soon') || 'soon') + '</span>' : '')
          + '</button>';
      });
      html += '</div></div>';
    });
    html += '</div>';
    panel.innerHTML = html;

    var support = actions.querySelector('.btn-support');
    actions.insertBefore(btn, support || null);
    document.body.appendChild(panel);

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      panel.hidden = !panel.hidden;
      btn.setAttribute('aria-expanded', String(!panel.hidden));
    });
    document.addEventListener('click', function (e) {
      if (!panel.contains(e.target) && e.target !== btn) { panel.hidden = true; btn.setAttribute('aria-expanded', 'false'); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { panel.hidden = true; btn.setAttribute('aria-expanded', 'false'); }
    });
    panel.addEventListener('click', function (e) {
      var item = e.target.closest('[data-lang]');
      if (!item || item.dataset.available !== 'true') return;
      _save(item.dataset.lang);
      location.href = '/' + item.dataset.lang + '/';
    });
  }

  /* ── Ready queue ────────────────────────────────────────────────────────── */
  function onReady(fn) { if (_ready) { fn(_locale); return; } _queue.push(fn); }
  function _fire() {
    _ready = true;
    _queue.forEach(function (fn) { fn(_locale); });
    _queue = [];
    try { document.dispatchEvent(new CustomEvent('i18n:ready', { detail: _locale })); } catch (e) {}
  }

  /* ── Init ───────────────────────────────────────────────────────────────── */
  _lang = detectLang();

  function _init() {
    if (_lang === 'uk') {
      applyLocale(UK_LOCALE);
      injectHreflang();
      renderSwitcher();
      _fire();
    } else {
      loadLocale(_lang, function (err, loc) {
        applyLocale(err ? UK_LOCALE : loc);
        injectHreflang();
        renderSwitcher();
        _fire();
      });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', _init);
  else _init();

  /* ── Public API ─────────────────────────────────────────────────────────── */
  global.I18N = {
    onReady:   onReady,
    getLang:   function () { return _lang; },
    getLocale: function () { return _locale; },
    t:         function (key) { return _dig(_locale, key) || key; },
    REGISTRY:  REGISTRY,
  };

}(window));
