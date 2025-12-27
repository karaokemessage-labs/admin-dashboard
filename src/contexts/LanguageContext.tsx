import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import translations from '../utils/translations';

export type Language = 'en' | 'vi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Lấy ngôn ngữ từ localStorage hoặc mặc định là 'en'
  const [language, setLanguageState] = useState<Language>(() => {
    // Kiểm tra xem có phải môi trường browser không
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedLanguage = localStorage.getItem('language') as Language;
      const supportedLanguages: Language[] = ['en', 'vi'];
      return savedLanguage && supportedLanguages.includes(savedLanguage)
        ? savedLanguage 
        : 'en'; // Mặc định là tiếng Anh
    }
    return 'en'; // Mặc định là tiếng Anh
  });

  // Lưu ngôn ngữ vào localStorage khi thay đổi
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('language', language);
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  // Lấy translation từ translations object
  const getTranslation = (key: string): string => {
    try {
      const keys = key.split('.');
      let value: any = translations[language];
      
      for (const k of keys) {
        value = value?.[k];
      }
      
      return value || key;
    } catch (error) {
      console.error('Translation error:', error);
      return key;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: getTranslation }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};






