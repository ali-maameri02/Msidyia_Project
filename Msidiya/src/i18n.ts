import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

// Import MUI Localization
import { enUS, frFR, arSA } from "@mui/material/locale";

// Translation resources
const resources = {
  en: {
    translation: {
      welcome: "Welcome",
      dashboard: "Dashboard",
      tutor_details: "Tutor Details",
      one_to_one: "One-to-One Session",
    },
  },
  fr: {
    translation: {
      welcome: "Bienvenue",
      dashboard: "Tableau de bord",
      tutor_details: "Détails du Tuteur",
      one_to_one: "Session individuelle",
    },
  },
  ar: {
    translation: {
      welcome: "مرحبًا",
      dashboard: "لوحة التحكم",
      tutor_details: "تفاصيل المعلم",
      one_to_one: "جلسة فردية",
    },
  },
};

// Initialize i18n
i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // Default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // React handles escaping
    },
    detection: {
      order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"],
      caches: ["cookie"],
    },
  });

export default i18n;

// MUI Localization Support
export const muiLocales = {
  en: enUS,
  fr: frFR,
  ar: arSA,
};
