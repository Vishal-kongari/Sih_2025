import { Button } from "@/components/ui/button";
import { MessageCircle, BookOpen, Calendar, Users, Menu, Heart } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
            <Heart className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-foreground">MindCare</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Button variant="ghost" size="sm" className="text-foreground">
            <MessageCircle className="h-4 w-4" />
            Chat Support
          </Button>
          <Button variant="ghost" size="sm" className="text-foreground">
            <BookOpen className="h-4 w-4" />
            Resources
          </Button>
          <Button variant="ghost" size="sm" className="text-foreground">
            <Calendar className="h-4 w-4" />
            Book Session
          </Button>
          <Button variant="ghost" size="sm" className="text-foreground">
            <Users className="h-4 w-4" />
            Community
          </Button>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <Button variant="outline" size="sm">
            Sign In
          </Button>
          <Button variant="hero" size="sm">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container py-4 space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              <MessageCircle className="h-4 w-4" />
              Chat Support
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <BookOpen className="h-4 w-4" />
              Resources
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Calendar className="h-4 w-4" />
              Book Session
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Users className="h-4 w-4" />
              Community
            </Button>
            <div className="pt-2 space-y-2">
              <Button variant="outline" className="w-full">
                Sign In
              </Button>
              <Button variant="hero" className="w-full">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};