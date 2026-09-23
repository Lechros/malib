const errorLanguages = {
  en: 'en',
  ko: 'ko',
} as const;

export type ErrorLanguage = keyof typeof errorLanguages;
