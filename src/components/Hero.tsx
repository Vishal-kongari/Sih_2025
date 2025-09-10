import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users, Clock } from "lucide-react";
import heroImage from "@/assets/hero-mental-health.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Students in a peaceful campus setting"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-2xl">
          <div className="mb-6">
            <span className="inline-flex items-center rounded-full bg-primary-soft px-3 py-1 text-sm font-medium text-primary">
              <Shield className="h-4 w-4 mr-2" />
              Completely Confidential & Secure
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl mb-6">
            Your Mental Health
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {" "}Matters
            </span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Access stigma-free mental health support designed specifically for students. 
            Get AI-guided assistance, book confidential sessions, and connect with a supportive community.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button variant="hero" size="lg" className="group">
              Start Chat Support
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg">
              Explore Resources
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-soft rounded-full mb-3 mx-auto">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground">100% Anonymous</p>
              <p className="text-xs text-muted-foreground">Complete privacy</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-secondary-soft rounded-full mb-3 mx-auto">
                <Clock className="h-6 w-6 text-secondary" />
              </div>
              <p className="text-sm font-medium text-foreground">24/7 Support</p>
              <p className="text-xs text-muted-foreground">Always available</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-accent-soft rounded-full mb-3 mx-auto">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <p className="text-sm font-medium text-foreground">Peer Community</p>
              <p className="text-xs text-muted-foreground">Connect safely</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};