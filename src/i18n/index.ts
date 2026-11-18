import { getLocales } from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import type { Lang } from '../domain/event';
import en from './en';
import it from './it';

export const pickLang = (code?: string | null): Lang => (code === 'en' ? 'en' : 'it'); // fallback italiano

// eslint-disable-next-line import/no-named-as-default-member
void i18n.use(initReactI18next).init({
  resources: { it: { translation: it }, en: { translation: en } },
  lng: pickLang(getLocales()[0]?.languageCode),
  fallbackLng: 'it',
  interpolation: { escapeValue: false },
});

export default i18n;
