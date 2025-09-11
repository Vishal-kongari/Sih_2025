import { Button } from "@/components/ui/button";
import { MessageCircle, BookOpen, Calendar, Users, Menu, Heart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

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
          <Button asChild variant="ghost" size="sm" className="text-foreground">
            <Link to="#chat">
            <MessageCircle className="h-4 w-4" />
            Chat Support
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="text-foreground">
            <Link to="#resources">
            <BookOpen className="h-4 w-4" />
            Resources
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="text-foreground">
            <Link to="#book">
            <Calendar className="h-4 w-4" />
            Book Session
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="text-foreground">
            <Link to="#community">
            <Users className="h-4 w-4" />
            Community
            </Link>
          </Button>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <Button asChild variant="outline" size="sm">
            <Link to="/login">Log In</Link>
          </Button>
          <Button asChild size="sm" className="bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-large">
            <Link to="/signup">Get Started</Link>
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
              <Button asChild variant="outline" className="w-full">
                <Link to="/login">Log In</Link>
              </Button>
              <Button asChild className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-large">
                <Link to="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};