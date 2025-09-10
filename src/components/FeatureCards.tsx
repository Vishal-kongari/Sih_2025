import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

const features = [
  {
    icon: MessageCircle,
    title: "AI Chat Support",
    description: "Get instant, personalized coping strategies for anxiety, stress, and burnout with our AI-powered mental health assistant.",
    color: "primary",
    action: "Start Chatting"
  },
  {
    icon: Calendar,
    title: "Confidential Booking",
    description: "Book anonymous sessions with on-campus counsellors or verified helplines through our secure platform.",
    color: "secondary",
    action: "Book Session"
  },
  {
    icon: BookOpen,
    title: "Resource Library",
    description: "Access curated videos, articles, and guides on academic stress, mindfulness, and mental wellness.",
    color: "accent",
    action: "Explore Resources"
  },
  {
    icon: Users,
    title: "Peer Community",
    description: "Connect with fellow students in a safe, moderated environment with trained volunteer support.",
    color: "success",
    action: "Join Community"
  },
  {
    icon: Shield,
    title: "Crisis Detection",
    description: "Our advanced system identifies crisis situations and immediately connects you with professional help.",
    color: "warning",
    action: "Learn More"
  },
  {
    icon: Video,
    title: "Live Sessions",
    description: "Attend weekend webinars and live sessions with licensed psychologists and wellness experts.",
    color: "primary",
    action: "View Schedule"
  },
  {
    icon: Trophy,
    title: "Wellness Gamification",
    description: "Earn points and badges for self-care activities, journaling, and helping peers in the community.",
    color: "secondary",
    action: "Start Journey"
  },
  {
    icon: Brain,
    title: "Stress Relief Tools",
    description: "Personalized recommendations for hobbies, relaxation techniques, and activities based on your needs.",
    color: "accent",
    action: "Get Recommendations"
  }
];

export const FeatureCards = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Comprehensive Mental Health Support
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to maintain and improve your mental wellbeing during your academic journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="group hover:shadow-medium transition-all duration-300 border-0 bg-card/50 backdrop-blur">
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-lg bg-${feature.color}-soft flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-6 w-6 text-${feature.color}`} />
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-muted-foreground mb-4 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                  <Button 
                    variant="soft" 
                    size="sm" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                  >
                    {feature.action}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};