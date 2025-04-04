import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Define translations
const resources = {
  en: {
    translation: {
      // Common translations
      welcome: "Welcome",
      login: "Login",
      signup: "Sign Up",
      dashboard: "Dashboard",
      logout: "Logout",
      cart: "Cart",
      Home: "Home",
      about: "About",
      contact: "Contact",
      Tutors: "Tutors",
      "Group Classes": "Group Classes",
      Courses: "Courses",
      "How Its Works?": "How It Works?",
      // HeroTexts
      "BEST E-learning Platform": "BEST E-learning Platform",
      "Find Your Group Class Or Tutor And Start Learning Now!":
        "Find Your Group Class Or Tutor And Start Learning Now!",
      "Find out more": "Find out more",
      "Play Demo": "Play Demo",
    },
  },
  fr: {
    translation: {
      // Common translations
      welcome: "Bienvenue",
      login: "Connexion",
      signup: "Inscription",
      dashboard: "Tableau de bord",
      logout: "Déconnexion",
      cart: "Panier",
      Home: "Accueil",
      about: "À propos",
      contact: "Contact",
      Tutors: "Tuteurs",
      "Group Classes": "Cours en groupe",
      Courses: "Cours",
      "How Its Works?": "Comment ça marche?",
      // HeroTexts
      "BEST E-learning Platform": "MEILLEURE PLATEFORME D'APPRENTISSAGE EN LIGNE",
      "Find Your Group Class Or Tutor And Start Learning Now!":
        "Trouvez votre cours en groupe ou votre tuteur et commencez à apprendre dès maintenant !",
      "Find out more": "En savoir plus",
      "Play Demo": "Lire la démo",
    },
  },
  ar: {
    translation: {
      // Common translations
      welcome: "مرحبا",
      login: "تسجيل الدخول",
      signup: "اشتراك",
      dashboard: "لوحة القيادة",
      logout: "تسجيل الخروج",
      cart: "السلة",
      Home: "الرئيسية",
      about: "عن",
      contact: "اتصل",
      Tutors: "المعلمون",
      "Group Classes": "الصفوف الجماعية",
      Courses: "الدورات",
      "How Its Works?": "كيف يعمل؟",
      // HeroTexts
      "BEST E-learning Platform": "أفضل منصة تعليم إلكتروني",
      "Find Your Group Class Or Tutor And Start Learning Now!":
        "ابحث عن فصلك الجماعي أو معلمك وابدأ التعلم الآن!",
      "Find out more": "اكتشف المزيد",
      "Play Demo": "تشغيل العرض التجريبي",
    },
  },
};

// Initialize i18next
i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || "en", // Retrieve saved language or default to 'en'
  fallbackLng: "en", // Fallback language
  interpolation: {
    escapeValue: false, // React already escapes values, so no need to double-escape
  },
});

// Save the current language to localStorage when it changes
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("language", lng); // Save the selected language
});

export default i18n;