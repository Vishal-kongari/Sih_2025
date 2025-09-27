import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Import translation files
import enTranslations from '../locales/en.json';
import hiTranslations from '../locales/hi.json';
import teTranslations from '../locales/te.json';
import taTranslations from '../locales/ta.json';

export type Language = 'en' | 'hi' | 'te' | 'ta';

// Translation data mapping
const translations = {
    en: enTranslations,
    hi: hiTranslations,
    te: teTranslations,
    ta: taTranslations,
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('en');

    // Load language from localStorage on mount
    useEffect(() => {
        const savedLanguage = localStorage.getItem('language') as Language;
        if (savedLanguage && ['en', 'hi', 'te', 'ta'].includes(savedLanguage)) {
            setLanguage(savedLanguage);
        }
    }, []);

    // Save language to localStorage when it changes
    useEffect(() => {
        localStorage.setItem('language', language);
        // Update HTML lang attribute
        document.documentElement.lang = language;
    }, [language]);

    // Translation function
    const t = (key: string): string => {
        const translationData = translations[language];
        const keys = key.split('.');
        let result: any = translationData;

        for (const k of keys) {
            if (result && typeof result === 'object' && k in result) {
                result = result[k];
            } else {
                return key; // Return the key if translation not found
            }
        }

        return typeof result === 'string' ? result : key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
