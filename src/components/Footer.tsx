import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg">
                <Heart className="h-7 w-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold">{t('app.name')}</span>
                <p className="text-sm text-gray-300">{t('app.tagline')}</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('footer.quickLinks.title')}</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t('footer.quickLinks.chat')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t('footer.quickLinks.book')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t('footer.quickLinks.resources')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t('footer.quickLinks.community')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t('footer.quickLinks.emergency')}</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('footer.support.title')}</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t('footer.support.help')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t('footer.support.privacy')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t('footer.support.terms')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t('footer.support.cookies')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t('footer.support.accessibility')}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('footer.contact.title')}</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">{t('footer.contact.email')}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">{t('footer.contact.phone')}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-purple-400" />
                <span className="text-gray-300">{t('footer.contact.location')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            {t('footer.copyright')}
            <span className="ml-2">{t('footer.madeWith')}</span>
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">{t('footer.bottomLinks.privacy')}</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">{t('footer.bottomLinks.terms')}</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">{t('footer.bottomLinks.contact')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};


