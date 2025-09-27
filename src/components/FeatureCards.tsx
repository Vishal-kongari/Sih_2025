import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  MessageCircle,
  Calendar,
  BookOpen,
  Users,
  Shield,
  Brain,
  Video,
  Trophy
} from "lucide-react";
import {
  FaRobot,
  FaCalendarAlt,
  FaBookOpen,
  FaUsers,
  FaShieldAlt,
  FaVideo,
  FaTrophy,
  FaBrain,
  FaHeart,
  FaLightbulb,
  FaGamepad,
  FaOm
} from "react-icons/fa";
import {
  MdPsychology,
  MdSupportAgent,
  MdHealthAndSafety,
  MdEmojiEvents
} from "react-icons/md";
import {
  BiSupport,
  BiBookContent,
  BiGroup,
  BiShield,
  BiVideoRecording,
  BiTrophy,
  BiBrain,
  BiHeart
} from "react-icons/bi";

const features = [
  {
    icon: FaRobot,
    titleKey: "features.aiChat.title",
    descriptionKey: "features.aiChat.description",
    actionKey: "features.aiChat.action",
    color: "primary",
    gradient: "from-blue-500 via-purple-500 to-pink-500"
  },
  {
    icon: FaCalendarAlt,
    titleKey: "features.booking.title",
    descriptionKey: "features.booking.description",
    actionKey: "features.booking.action",
    color: "secondary",
    gradient: "from-green-500 via-teal-500 to-cyan-500"
  },
  {
    icon: BiBookContent,
    titleKey: "features.resources.title",
    descriptionKey: "features.resources.description",
    actionKey: "features.resources.action",
    color: "accent",
    gradient: "from-purple-500 via-violet-500 to-indigo-500"
  },
  {
    icon: BiGroup,
    titleKey: "features.community.title",
    descriptionKey: "features.community.description",
    actionKey: "features.community.action",
    color: "success",
    gradient: "from-emerald-500 via-green-500 to-lime-500"
  },
  {
    icon: BiShield,
    titleKey: "features.crisis.title",
    descriptionKey: "features.crisis.description",
    actionKey: "features.crisis.action",
    color: "warning",
    gradient: "from-orange-500 via-red-500 to-pink-500"
  },
  {
    icon: BiVideoRecording,
    titleKey: "features.live.title",
    descriptionKey: "features.live.description",
    actionKey: "features.live.action",
    color: "primary",
    gradient: "from-blue-600 via-indigo-600 to-purple-600"
  },
  {
    icon: MdEmojiEvents,
    titleKey: "features.gamification.title",
    descriptionKey: "features.gamification.description",
    actionKey: "features.gamification.action",
    color: "secondary",
    gradient: "from-yellow-500 via-orange-500 to-red-500"
  },
  {
    icon: FaOm,
    titleKey: "features.tools.title",
    descriptionKey: "features.tools.description",
    actionKey: "features.tools.action",
    color: "accent",
    gradient: "from-teal-500 via-cyan-500 to-blue-500"
  }
];

export const FeatureCards = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 w-80 h-80 bg-gradient-to-tr from-pink-400/10 to-orange-400/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-6 shadow-lg">
            <FaHeart className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6 leading-tight">
            {t('features.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t('features.subtitle')}
          </p>
          <div className="flex justify-center mt-8">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colorClasses = {
              primary: "from-blue-500 to-blue-600",
              secondary: "from-green-500 to-green-600",
              accent: "from-purple-500 to-purple-600",
              success: "from-emerald-500 to-emerald-600",
              warning: "from-orange-500 to-orange-600"
            };
            const bgClasses = {
              primary: "from-blue-50 to-blue-100",
              secondary: "from-green-50 to-green-100",
              accent: "from-purple-50 to-purple-100",
              success: "from-emerald-50 to-emerald-100",
              warning: "from-orange-50 to-orange-100"
            };

            return (
              <div key={index} className="group">
                <Card className="h-full border-0 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-3 overflow-hidden relative">
                  {/* Animated gradient border */}
                  <div className={`h-1 bg-gradient-to-r ${feature.gradient} opacity-80 group-hover:opacity-100 transition-opacity duration-300`} />

                  {/* Floating particles effect */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300 animate-pulse" />
                  <div className="absolute top-8 right-8 w-1 h-1 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse delay-150" />

                  <CardHeader className="pb-6 pt-8">
                    <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${bgClasses[feature.color as keyof typeof bgClasses]} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl relative overflow-hidden`}>
                      {/* Icon background glow */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl`} />
                      <Icon className={`h-10 w-10 text-gray-700 group-hover:text-white transition-colors duration-500 relative z-10`} style={{
                        filter: `drop-shadow(0 4px 8px rgba(0,0,0,0.1))`
                      }} />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-300">
                      {t(feature.titleKey)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 pb-8">
                    <CardDescription className="text-gray-600 mb-6 leading-relaxed text-base group-hover:text-gray-700 transition-colors duration-300">
                      {t(feature.descriptionKey)}
                    </CardDescription>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`w-full border-2 hover:bg-gradient-to-r ${feature.gradient} hover:border-transparent hover:text-white transition-all duration-500 font-semibold group-hover:shadow-lg relative overflow-hidden`}
                    >
                      <span className="relative z-10">{t(feature.actionKey)}</span>
                      <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    </Button>
                  </CardContent>

                  {/* Subtle hover glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-700 rounded-3xl pointer-events-none`} />
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};