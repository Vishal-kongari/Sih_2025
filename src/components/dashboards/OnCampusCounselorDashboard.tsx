import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getName, clearAuth } from "@/lib/auth";
import { signOutUser } from "@/services/auth";
import { useNavigate } from "react-router-dom";
import { Building2, Activity, AlertTriangle, Users, MapPin, Calendar } from "lucide-react";

export const OnCampusCounselorDashboard = () => {
  const navigate = useNavigate();
  const name = getName();
  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-soft via-background to-secondary-soft">
      <header className="bg-white/80 backdrop-blur border-b">
        <div className="container h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-secondary rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">{name}</h1>
              <p className="text-xs text-muted-foreground">On-Campus Counselor</p>
            </div>
          </div>
          <Button variant="outline" onClick={async () => { await signOutUser(); clearAuth(); navigate('/'); }}>Sign Out</Button>
        </div>
      </header>
      <main className="container py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-large bg-card/70 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" /> Campus Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">1,247</p>
            <p className="text-xs text-muted-foreground">Total students</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-large bg-card/70 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-secondary" /> Weekly Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-secondary">+12%</p>
            <p className="text-xs text-muted-foreground">Engagement</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-large bg-card/70 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" /> Crisis Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-destructive">3</p>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
        <Card className="md:col-span-2 border-0 shadow-large bg-card/70 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-secondary" /> Departments
            </CardTitle>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border">Engineering • Wellness 68% • Alerts 2</div>
            <div className="p-4 rounded-xl border">Business • Wellness 76% • Alerts 0</div>
            <div className="p-4 rounded-xl border">Liberal Arts • Wellness 79% • Alerts 1</div>
            <div className="p-4 rounded-xl border">Sciences • Wellness 71% • Alerts 0</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-large bg-card/70 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" /> Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 rounded-lg border">Mental Health Week • Next Monday</div>
            <div className="p-3 rounded-lg border">Stress Workshop • Wednesday</div>
            <div className="p-3 rounded-lg border">Counselor Training • Friday</div>
          </CardContent>
        </Card>
        <Card className="md:col-span-3 border-0 shadow-large bg-card/70 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-success" /> Campus KPIs
            </CardTitle>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-success-soft">Avg Wellness • 72%</div>
            <div className="p-4 rounded-xl bg-primary-soft">Active Users • 456</div>
            <div className="p-4 rounded-xl bg-warning-soft">Response SLA • 95%</div>
            <div className="p-4 rounded-xl bg-accent-soft">Crisis Resolved • 94%</div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};


