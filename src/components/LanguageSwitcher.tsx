import React from 'react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
] as const;

export const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useLanguage();

    const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                    <Globe className="h-4 w-4" />
                    <span className="text-sm font-medium">{currentLanguage.flag}</span>
                    <span className="hidden sm:inline text-sm">{currentLanguage.name}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => setLanguage(lang.code as any)}
                        className="flex items-center justify-between cursor-pointer"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-lg">{lang.flag}</span>
                            <span className="text-sm font-medium">{lang.name}</span>
                        </div>
                        {language === lang.code && (
                            <Check className="h-4 w-4 text-blue-600" />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
