import { Button } from "@/components/ui/button";
import { MessageCircle, BookOpen, Calendar, Users, Menu, Heart, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg">
            <Heart className="h-7 w-7 text-white" />
          </div>
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{t('app.name')}</span>
            <p className="text-xs text-gray-500 -mt-1">{t('app.tagline')}</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          <Button asChild variant="ghost" size="sm" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">
            <Link to="/login">
              <MessageCircle className="h-4 w-4 mr-2" />
              {t('header.chat')}
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">
            <Link to="/browse-resources">
              <BookOpen className="h-4 w-4 mr-2" />
              {t('header.resources')}
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">
            <Link to="/login">
              <Calendar className="h-4 w-4 mr-2" />
              {t('header.book')}
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">
            <Link to="/login">
              <Users className="h-4 w-4 mr-2" />
              {t('header.community')}
            </Link>
          </Button>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <LanguageSwitcher />
          <Button asChild variant="outline" size="sm" className="border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-colors">
            <Link to="/login">{t('header.login')}</Link>
          </Button>
          <Button asChild size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all">
            <Link to="/signup">{t('header.signup')}</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden h-12 w-12"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md">
          <div className="container py-6 space-y-3">
            <Button asChild variant="ghost" className="w-full justify-start h-12 text-gray-700 hover:text-blue-600 hover:bg-blue-50">
              <Link to="/login">
                <MessageCircle className="h-5 w-5 mr-3" />
                {t('header.chat')}
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start h-12 text-gray-700 hover:text-blue-600 hover:bg-blue-50">
              <Link to="/browse-resources">
                <BookOpen className="h-5 w-5 mr-3" />
                {t('header.resources')}
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start h-12 text-gray-700 hover:text-blue-600 hover:bg-blue-50">
              <Link to="/login">
                <Calendar className="h-5 w-5 mr-3" />
                {t('header.book')}
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start h-12 text-gray-700 hover:text-blue-600 hover:bg-blue-50">
              <Link to="/login">
                <Users className="h-5 w-5 mr-3" />
                {t('header.community')}
              </Link>
            </Button>
            <div className="pt-4 space-y-3 border-t border-gray-200">
              <div className="flex justify-center mb-4">
                <LanguageSwitcher />
              </div>
              <Button asChild variant="outline" className="w-full h-12 border-gray-300 hover:border-blue-500 hover:bg-blue-50">
                <Link to="/login">{t('header.login')}</Link>
              </Button>
              <Button asChild className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
                <Link to="/signup">{t('header.signup')}</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};