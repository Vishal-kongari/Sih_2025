import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Calendar, 
  Clock, 
  MessageSquare, 
  TrendingUp, 
  Bell,
  UserCheck,
  AlertCircle,
  Heart,
  ChevronRight,
  FileText,
  Video
} from "lucide-react";
import { User } from "../auth/SignIn";

interface CounselorDashboardProps {
  user: User;
  onSignOut: () => void;
}

export const CounselorDashboard = ({ user, onSignOut }: CounselorDashboardProps) => {
  const todaysAppointments = [
    { id: 1, student: "Emma Thompson", time: "10:00 AM", type: "Individual", status: "upcoming", priority: "high" },
    { id: 2, student: "James Wilson", time: "11:30 AM", type: "Follow-up", status: "upcoming", priority: "medium" },
    { id: 3, student: "Sarah Davis", time: "2:00 PM", type: "Initial", status: "upcoming", priority: "low" },
    { id: 4, student: "Michael Brown", time: "3:30 PM", type: "Group Prep", status: "upcoming", priority: "medium" },
  ];

  const recentMessages = [
    { student: "Anonymous User", message: "Thank you for yesterday's session...", time: "2 min ago", unread: true },
    { student: "Lisa Chen", message: "I'd like to reschedule my appointment...", time: "15 min ago", unread: true },
    { student: "David Kim", message: "The breathing exercises helped a lot!", time: "1 hour ago", unread: false },
  ];

  const studentProgress = [
    { name: "Emma T.", sessions: 8, improvement: 85, lastSeen: "2 days ago", status: "excellent" },
    { name: "James W.", sessions: 12, improvement: 72, lastSeen: "1 week ago", status: "good" },
    { name: "Sarah D.", sessions: 3, improvement: 45, lastSeen: "yesterday", status: "fair" },
    { name: "Michael B.", sessions: 6, improvement: 68, lastSeen: "3 days ago", status: "good" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-success text-success-foreground';
      case 'good': return 'bg-primary text-primary-foreground';
      case 'fair': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'low': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-soft via-background to-primary-soft">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b shadow-soft sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Dr. {user.name}</h1>
                <p className="text-sm text-muted-foreground">Licensed Counselor Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="relative">
                <Bell className="w-4 h-4" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full"></div>
              </Button>
              <Button onClick={onSignOut} variant="outline">Sign Out</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-secondary to-secondary/80 text-white border-0 shadow-large">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-secondary-foreground/80 text-sm">Active Students</p>
                  <p className="text-3xl font-bold">24</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary to-primary/80 text-white border-0 shadow-large">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-foreground/80 text-sm">Today's Sessions</p>
                  <p className="text-3xl font-bold">4</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent to-accent/80 text-white border-0 shadow-large">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-accent-foreground/80 text-sm">Avg Improvement</p>
                  <p className="text-3xl font-bold">78%</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-success to-success/80 text-white border-0 shadow-large">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-success-foreground/80 text-sm">Unread Messages</p>
                  <p className="text-3xl font-bold">7</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Schedule */}
            <Card className="shadow-medium border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Today's Schedule
                </CardTitle>
                <CardDescription>Your appointments for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaysAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                          <UserCheck className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">{appointment.student}</p>
                          <p className="text-sm text-muted-foreground">{appointment.type} Session</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className={getPriorityColor(appointment.priority)}>
                              {appointment.priority} priority
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{appointment.time}</p>
                        <Button variant="ghost" size="sm" className="mt-1">
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Student Progress Overview */}
            <Card className="shadow-medium border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-secondary" />
                  Student Progress Overview
                </CardTitle>
                <CardDescription>Track improvement across your active caseload</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {studentProgress.map((student, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white text-sm font-medium">
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-xs text-muted-foreground">{student.sessions} sessions • Last seen {student.lastSeen}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={getStatusColor(student.status)}>
                            {student.status}
                          </Badge>
                          <span className="text-sm font-medium">{student.improvement}%</span>
                        </div>
                      </div>
                      <Progress value={student.improvement} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="shadow-medium border-0">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="soft">
                  <Video className="w-4 h-4 mr-2" />
                  Start Video Session
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Create Session Notes
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Appointment
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Recent Messages */}
            <Card className="shadow-medium border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  Recent Messages
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentMessages.map((message, index) => (
                  <div key={index} className="p-3 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-medium text-sm">{message.student}</p>
                      <div className="flex items-center gap-2">
                        {message.unread && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                        <span className="text-xs text-muted-foreground">{message.time}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{message.message}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Crisis Alerts */}
            <Card className="shadow-medium border-0 border-l-4 border-l-destructive">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="w-5 h-5" />
                  Crisis Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
                    <p className="text-sm font-medium text-destructive">High Priority Alert</p>
                    <p className="text-xs text-muted-foreground mt-1">Anonymous user flagged for immediate attention</p>
                    <Button size="sm" variant="destructive" className="mt-2">
                      Review Case
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">No other active alerts</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};