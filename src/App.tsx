import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { RoleRouter } from "@/components/RoleRouter";
import Tracker from "./pages/Tracker";
import { InspirationalVerses } from "./components/insepri";
import BrowseResources from './components/dashboards/BrowseResources';

const queryClient = new QueryClient();
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<RoleRouter />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/browse-resources" element={<BrowseResources />} />
          <Route path="/ins" element={<InspirationalVerses />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
