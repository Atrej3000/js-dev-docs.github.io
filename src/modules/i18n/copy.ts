import type { Locale } from "@/src/types/content";

export type SiteCopy = {
  nav: {
    academy: string;
    lessons: string;
    about: string;
    roadmap: string;
    faq: string;
    donate: string;
    dashboard: string;
    admin: string;
  };
  common: {
    freeAcademy: string;
    fallbackBadge: string;
    fallbackDescription: string;
    progress: string;
    complete: string;
    completed: string;
    save: string;
    saved: string;
    unsave: string;
    recentLessons: string;
    startReading: string;
    browseTracks: string;
    continueLearning: string;
    translationStatus: string;
    sourceLanguage: string;
    localeCoverage: string;
    supportProject: string;
    noItems: string;
    legacyFallback: string;
  };
  home: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    platformTitle: string;
    platformDescription: string;
    statsLessons: string;
    statsTracks: string;
    statsLocales: string;
    tracksTitle: string;
    tracksDescription: string;
    supportTitle: string;
    supportDescription: string;
  };
  docs: {
    catalogTitle: string;
    catalogDescription: string;
    sidebarTitle: string;
    tocTitle: string;
    previousLesson: string;
    nextLesson: string;
    relatedLessons: string;
    trackOverview: string;
    searchPlaceholder: string;
    searchEmpty: string;
    legacyRedirecting: string;
  };
  donate: {
    title: string;
    description: string;
    promise: string;
  };
  about: {
    title: string;
    description: string;
  };
  roadmap: {
    title: string;
    description: string;
  };
  faq: {
    title: string;
    description: string;
  };
  dashboard: {
    title: string;
    description: string;
    savedTitle: string;
    progressTitle: string;
  };
  auth: {
    loginTitle: string;
    loginDescription: string;
    registerTitle: string;
    registerDescription: string;
  };
  admin: {
    title: string;
    description: string;
    lessonsTitle: string;
    localesTitle: string;
    migrationTitle: string;
  };
  footer: {
    note: string;
    source: string;
  };
};

export const siteCopy: Record<Locale, SiteCopy> = {
  uk: {
    nav: {
      academy: "Академія",
      lessons: "Уроки",
      about: "Про проєкт",
      roadmap: "Дорожня карта",
      faq: "FAQ",
      donate: "Підтримати",
      dashboard: "Кабінет",
      admin: "Адмін",
    },
    common: {
      freeAcademy: "Безкоштовна академія JavaScript українською",
      fallbackBadge: "Показано український оригінал",
      fallbackDescription:
        "Для цієї сторінки ще немає перекладу. Маршрут ідентичності уроку збережено, а вміст безпечно підвантажено з українського джерела.",
      progress: "Прогрес",
      complete: "Позначити як завершений",
      completed: "Завершено",
      save: "Зберегти урок",
      saved: "Збережено",
      unsave: "Прибрати із збережених",
      recentLessons: "Останні уроки",
      startReading: "Почати читати",
      browseTracks: "Перейти до каталогу",
      continueLearning: "Продовжити навчання",
      translationStatus: "Статус перекладу",
      sourceLanguage: "Мова-джерело",
      localeCoverage: "Покриття локалей",
      supportProject: "Підтримати проєкт",
      noItems: "Ще немає даних. Відкрийте кілька уроків, і тут з’явиться прогрес.",
      legacyFallback: "Переглянути збережену legacy-версію",
    },
    home: {
      eyebrow: "Міграція без втрати контенту",
      title: "Нова платформа JS Dev Docs росте навколо збережених уроків, а не замість них.",
      description:
        "Канонічні docs-маршрути, локалізація, пошук, прогрес і донати вже закладені в архітектуру, а весь український навчальний корпус збережено як перевірене джерело.",
      primaryCta: "Відкрити уроки",
      secondaryCta: "Підтримати JS Dev Docs",
      platformTitle: "Що вже працює в новій платформі",
      platformDescription:
        "Міграція піднімає на typed content layer ті речі, які вже були цінними в legacy-сайті: порядок уроків, читальну навігацію, донати й локальний прогрес.",
      statsLessons: "уроків збережено",
      statsTracks: "треків мігровано",
      statsLocales: "локалі готові",
      tracksTitle: "Треки та уроки",
      tracksDescription:
        "Кожен урок має стабільну канонічну ідентичність, але legacy-шляхи залишаються redirect-аліасами.",
      supportTitle: "Проєкт залишається безкоштовним",
      supportDescription:
        "Підтримка покриває хостинг, редактуру, нові переклади та майбутні функції, не створюючи paywall або підписок.",
    },
    docs: {
      catalogTitle: "Каталог уроків",
      catalogDescription:
        "Пошук працює поверх фактично змінованого корпусу контенту, а не над демо-даними.",
      sidebarTitle: "Треки курсу",
      tocTitle: "Зміст",
      previousLesson: "Попередній урок",
      nextLesson: "Наступний урок",
      relatedLessons: "Далі в цьому треку",
      trackOverview: "Огляд треку",
      searchPlaceholder: "Шукати за назвою, треком або slug…",
      searchEmpty: "Нічого не знайдено. Спробуйте інший slug, назву уроку або трек.",
      legacyRedirecting: "Перенаправляємо зі збереженого legacy-маршруту…",
    },
    donate: {
      title: "Підтримайте JS Dev Docs",
      description:
        "Платформа залишається повністю відкритою для читання. Донати допомагають з хостингом, редактурою, новими уроками та майбутніми перекладами.",
      promise: "Жодних paywall, підписок або закритих уроків.",
    },
    about: {
      title: "Про проєкт",
      description:
        "JS Dev Docs виріс із цінного статичного курсу в платформу, де контент зберігається у файлах, а додаткові можливості нашаровуються без руйнування джерела.",
    },
    roadmap: {
      title: "Дорожня карта",
      description:
        "Після стабілізації docs-шару пріоритетами стануть переклади, безпечні квізи, підтримка прихильників та інструменти для контриб’юторів.",
    },
    faq: {
      title: "Поширені запитання",
      description:
        "Відповіді про міграцію, донати, локальний прогрес, доступність контенту та майбутні розширення платформи.",
    },
    dashboard: {
      title: "Ваш навчальний ритм",
      description:
        "Локальний прогрес живе у браузері: останні уроки, збережені матеріали та позначені як завершені теми.",
      savedTitle: "Збережені уроки",
      progressTitle: "Прогрес читання",
    },
    auth: {
      loginTitle: "Вхід з’явиться пізніше",
      loginDescription:
        "Поточний реліз не вимагає акаунта. Ця сторінка фіксує майбутню точку розширення для синхронізації прогресу між пристроями.",
      registerTitle: "Реєстрація ще не обов’язкова",
      registerDescription:
        "Платформа готова до майбутніх акаунтів, але зараз читання, пошук і прогрес доступні анонімно.",
    },
    admin: {
      title: "Огляд операцій",
      description:
        "Read-only видимість над міграцією, покриттям локалей, інвентарем уроків і статусом redirect-ів.",
      lessonsTitle: "Інвентар уроків",
      localesTitle: "Покриття локалей",
      migrationTitle: "Статус міграції",
    },
    footer: {
      note: "Збережений український корпус лишається джерелом правди, а новий застосунок обгортає його typed navigation та locale-aware UX.",
      source: "Legacy-версія доступна окремо для перевірки маршрутизації та контенту.",
    },
  },
  en: {
    nav: {
      academy: "Academy",
      lessons: "Lessons",
      about: "About",
      roadmap: "Roadmap",
      faq: "FAQ",
      donate: "Donate",
      dashboard: "Dashboard",
      admin: "Admin",
    },
    common: {
      freeAcademy: "A free JavaScript academy built around preserved Ukrainian lessons",
      fallbackBadge: "Showing the Ukrainian source lesson",
      fallbackDescription:
        "This route is translation-ready, but the lesson body currently falls back to the verified Ukrainian source file.",
      progress: "Progress",
      complete: "Mark as completed",
      completed: "Completed",
      save: "Save lesson",
      saved: "Saved",
      unsave: "Remove saved lesson",
      recentLessons: "Recent lessons",
      startReading: "Start reading",
      browseTracks: "Browse tracks",
      continueLearning: "Continue learning",
      translationStatus: "Translation status",
      sourceLanguage: "Source language",
      localeCoverage: "Locale coverage",
      supportProject: "Support the project",
      noItems: "No learning data yet. Open a few lessons and the platform will start tracking your local progress.",
      legacyFallback: "Open the preserved legacy page",
    },
    home: {
      eyebrow: "Content-safe migration",
      title: "The new JS Dev Docs platform grows around the preserved lesson corpus instead of replacing it.",
      description:
        "Canonical docs routes, locale-aware rendering, search, donations, and local progress now live on top of a file-based content layer that keeps the original Ukrainian lessons intact.",
      primaryCta: "Open lessons",
      secondaryCta: "Support JS Dev Docs",
      platformTitle: "What already exists in the new platform",
      platformDescription:
        "The refactor lifts valuable legacy behavior into typed modules rather than flattening it into placeholders.",
      statsLessons: "lessons preserved",
      statsTracks: "tracks migrated",
      statsLocales: "locales ready",
      tracksTitle: "Tracks and lessons",
      tracksDescription:
        "Every lesson has a stable canonical identity while legacy paths continue to work as redirect aliases.",
      supportTitle: "The academy stays free",
      supportDescription:
        "Support helps fund hosting, editorial work, translations, and future extensions without introducing subscriptions or paywalls.",
    },
    docs: {
      catalogTitle: "Lesson catalog",
      catalogDescription:
        "Search indexes only real migrated lessons from the preserved corpus.",
      sidebarTitle: "Course tracks",
      tocTitle: "On this page",
      previousLesson: "Previous lesson",
      nextLesson: "Next lesson",
      relatedLessons: "More in this track",
      trackOverview: "Track overview",
      searchPlaceholder: "Search by title, track, or slug…",
      searchEmpty: "No lessons matched that query. Try another title, slug, or track.",
      legacyRedirecting: "Redirecting from a preserved legacy route…",
    },
    donate: {
      title: "Support JS Dev Docs",
      description:
        "The platform remains fully open to readers. Donations help fund hosting, editorial work, new lessons, and future translations.",
      promise: "No paywalls, subscriptions, or gated lessons.",
    },
    about: {
      title: "About the project",
      description:
        "JS Dev Docs is evolving from a valuable static educational site into a multilingual platform with a strong file-based content core.",
    },
    roadmap: {
      title: "Roadmap",
      description:
        "After stabilizing the docs platform, the next steps include translations, safe quizzes, supporter features, and contributor workflows.",
    },
    faq: {
      title: "Frequently asked questions",
      description:
        "Answers about the migration, donations, local progress, content preservation, and future platform extensions.",
    },
    dashboard: {
      title: "Your learning rhythm",
      description:
        "Local progress lives in the browser for now: recent lessons, saved material, and completed topics.",
      savedTitle: "Saved lessons",
      progressTitle: "Reading progress",
    },
    auth: {
      loginTitle: "Login is a future extension point",
      loginDescription:
        "This release does not require an account. The route exists so future sync and supporter features can plug in cleanly.",
      registerTitle: "Registration is not required yet",
      registerDescription:
        "The platform is ready for optional accounts later, while reading and progress remain anonymous today.",
    },
    admin: {
      title: "Operations overview",
      description:
        "Read-only visibility into migration state, locale coverage, lesson inventory, and route preservation.",
      lessonsTitle: "Lesson inventory",
      localesTitle: "Locale coverage",
      migrationTitle: "Migration status",
    },
    footer: {
      note: "The preserved Ukrainian lesson corpus remains the source of truth while the new application adds typed navigation and locale-aware UX.",
      source: "A separate legacy runtime remains available for content verification.",
    },
  },
};

export function getSiteCopy(locale: Locale): SiteCopy {
  return siteCopy[locale];
}
