import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { translations } from "../locales/translations";

export const useTranslate = () => {
  const { language } = useContext(LanguageContext);

  return (key: string): string => {
    const parts = key.split(".");
    let obj: any = translations[language];

    for (const p of parts) {
      obj = obj?.[p];
      if (!obj) return key; // fallback key if missing
    }
    return obj;
  };
};
