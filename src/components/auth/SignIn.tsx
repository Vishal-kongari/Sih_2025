import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Heart, Building2, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface User {
  id: string;
  email: string;
  role: 'student' | 'counselor' | 'on-campus-counselor';
  name: string;
}

interface SignInProps {
  onSignIn: (user: User) => void;
}

export const SignIn = ({ onSignIn }: SignInProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSignIn = async (role: 'student' | 'counselor' | 'on-campus-counselor') => {
    if (!email || !password) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and password.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate authentication - In real app, this would be Supabase auth
    setTimeout(() => {
      const mockUser: User = {
        id: `${role}-${Date.now()}`,
        email,
        role,
        name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      };
      
      onSignIn(mockUser);
      toast({
        title: "Welcome!",
        description: `Successfully signed in as ${role.replace('-', ' ')}.`,
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-soft via-secondary-soft to-accent-soft p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl mb-4 shadow-large">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            MindCare
          </h1>
          <p className="text-muted-foreground mt-2">Sign in to your mental health support platform</p>
        </div>

        <Card className="shadow-large border-0">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Choose your role and sign in to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="student" className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Student
                </TabsTrigger>
                <TabsTrigger value="counselor" className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Counselor
                </TabsTrigger>
                <TabsTrigger value="on-campus" className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  On-Campus
                </TabsTrigger>
              </TabsList>

              <div className="space-y-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-11 w-11"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              <TabsContent value="student" className="mt-0">
                <Button
                  onClick={() => handleSignIn('student')}
                  className="w-full h-12"
                  variant="hero"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In as Student"}
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Access your wellness dashboard, book counseling sessions, and connect with support resources.
                </p>
              </TabsContent>

              <TabsContent value="counselor" className="mt-0">
                <Button
                  onClick={() => handleSignIn('counselor')}
                  className="w-full h-12"
                  variant="gradient"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In as Counselor"}
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Manage your appointments, track student progress, and access professional resources.
                </p>
              </TabsContent>

              <TabsContent value="on-campus" className="mt-0">
                <Button
                  onClick={() => handleSignIn('on-campus-counselor')}
                  className="w-full h-12"
                  variant="accent"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In as On-Campus Counselor"}
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Access campus-specific tools, manage institutional resources, and track campus wellness metrics.
                </p>
              </TabsContent>
            </Tabs>

            <div className="text-center mt-6 pt-6 border-t">
              <p className="text-sm text-muted-foreground">
                Need help? Contact support at{" "}
                <span className="text-primary font-medium">support@mindcare.edu</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};