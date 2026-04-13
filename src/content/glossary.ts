import type { Locale } from "@/src/types/content";

export const glossary = {
  variable: {
    uk: "змінна",
    en: "variable",
  },
  function: {
    uk: "функція",
    en: "function",
  },
  object: {
    uk: "об'єкт",
    en: "object",
  },
  array: {
    uk: "масив",
    en: "array",
  },
  string: {
    uk: "рядок",
    en: "string",
  },
  number: {
    uk: "число",
    en: "number",
  },
  boolean: {
    uk: "булеве значення",
    en: "boolean",
  },
  loop: {
    uk: "цикл",
    en: "loop",
  },
  condition: {
    uk: "умова",
    en: "condition",
  },
  scope: {
    uk: "область видимості",
    en: "scope",
  },
  closure: {
    uk: "замикання",
    en: "closure",
  },
  promise: {
    uk: "проміс",
    en: "promise",
  },
  asynchronous: {
    uk: "асинхронний",
    en: "asynchronous",
  },
  callback: {
    uk: "зворотний виклик",
    en: "callback",
  },
  parameter: {
    uk: "параметр",
    en: "parameter",
  },
  argument: {
    uk: "аргумент",
    en: "argument",
  },
  method: {
    uk: "метод",
    en: "method",
  },
  property: {
    uk: "властивість",
    en: "property",
  },
  statement: {
    uk: "інструкція",
    en: "statement",
  },
  module: {
    uk: "модуль",
    en: "module",
  },
  prototype: {
    uk: "прототип",
    en: "prototype",
  },
} as const;

export type GlossaryTerm = keyof typeof glossary;

export function getTerm(term: GlossaryTerm, locale: Locale): string {
  return glossary[term][locale];
}
