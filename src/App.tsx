import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { SignIn, User } from "./components/auth/SignIn";
import { StudentDashboard } from "./components/dashboards/StudentDashboard";
import { CounselorDashboard } from "./components/dashboards/CounselorDashboard";
import { OnCampusCounselorDashboard } from "./components/dashboards/OnCampusCounselorDashboard";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleSignIn = (userData: User) => {
    setUser(userData);
  };

  const handleSignOut = () => {
    setUser(null);
  };

  // If user is not authenticated, show sign-in page
  if (!user) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <SignIn onSignIn={handleSignIn} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  // If user is authenticated, show appropriate dashboard
  const renderDashboard = () => {
    switch (user.role) {
      case 'student':
        return <StudentDashboard user={user} onSignOut={handleSignOut} />;
      case 'counselor':
        return <CounselorDashboard user={user} onSignOut={handleSignOut} />;
      case 'on-campus-counselor':
        return <OnCampusCounselorDashboard user={user} onSignOut={handleSignOut} />;
      default:
        return <StudentDashboard user={user} onSignOut={handleSignOut} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={renderDashboard()} />
            <Route path="/landing" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
