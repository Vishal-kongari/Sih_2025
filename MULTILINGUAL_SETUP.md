# Multilingual Setup Documentation

## Overview
This website now supports multiple languages: English, Hindi (हिन्दी), Telugu (తెలుగు), and Tamil (தமிழ்).

## Features Implemented

### 1. Language Context & Provider
- **File**: `src/contexts/LanguageContext.tsx`
- **Features**:
  - React Context for global language state management
  - Language persistence in localStorage
  - Automatic HTML lang attribute updates
  - Translation function `t(key)` for accessing translations

### 2. Translation Files
- **Location**: `src/locales/`
- **Files**:
  - `en.json` - English translations
  - `hi.json` - Hindi translations
  - `te.json` - Telugu translations
  - `ta.json` - Tamil translations

### 3. Language Switcher Component
- **File**: `src/components/LanguageSwitcher.tsx`
- **Features**:
  - Dropdown menu with flag icons
  - Language selection with visual feedback
  - Responsive design for mobile and desktop

### 4. Updated Components
All major components have been updated to use translations:
- **Header**: Navigation links, buttons, and branding
- **Hero**: Main content, CTAs, and trust indicators
- **FeatureCards**: Feature descriptions and actions
- **Footer**: All footer content and links

### 5. Font Support
- **Google Fonts**: Added Noto Sans fonts for Devanagari, Telugu, and Tamil
- **CSS**: Language-specific font families and text rendering optimizations

## Usage

### Adding New Translations
1. Add new keys to all language files in `src/locales/`
2. Use the `t()` function in components: `{t('your.key')}`

### Language Codes
- `en` - English
- `hi` - Hindi (हिन्दी)
- `te` - Telugu (తెలుగు)
- `ta` - Tamil (தமிழ்)

### Example Usage in Components
```tsx
import { useLanguage } from '@/contexts/LanguageContext';

const MyComponent = () => {
  const { t, language, setLanguage } = useLanguage();
  
  return (
    <div>
      <h1>{t('myComponent.title')}</h1>
      <p>{t('myComponent.description')}</p>
    </div>
  );
};
```

## Technical Details

### Language Detection
- Automatically detects saved language from localStorage on app load
- Falls back to English if no saved language or invalid language

### Font Loading
- Fonts are loaded from Google Fonts CDN
- Language-specific fonts are applied via CSS `[lang="xx"]` selectors
- Optimized text rendering for better readability

### Performance
- Translation files are loaded dynamically using `require()`
- Language changes are instant without page reload
- Minimal bundle size impact

## Browser Support
- All modern browsers support the implemented features
- Fallback fonts ensure text displays correctly even if specific language fonts fail to load

## Future Enhancements
- Add more languages by creating new translation files
- Implement RTL (Right-to-Left) support for Arabic/Hebrew
- Add language-specific date/time formatting
- Implement pluralization rules for different languages
