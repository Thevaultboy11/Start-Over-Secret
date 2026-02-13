import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { translations } from "../locales/translations";

const resolveTranslation = (source: any, key: string): string | undefined => {
  const parts = key.split(".");
  let obj: any = source;

  for (const p of parts) {
    obj = obj?.[p];
    if (!obj) return undefined;
  }

  return obj;
};

export const useTranslate = () => {
  const { language } = useContext(LanguageContext);

  return (key: string): string => {
    const localized = resolveTranslation((translations as any)[language], key);
    if (localized) return localized;

    const englishFallback = resolveTranslation(translations.en, key);
    return englishFallback ?? key;
  };
};
