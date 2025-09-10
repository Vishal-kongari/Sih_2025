import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Calendar, 
  Trophy, 
  Target, 
  BookOpen, 
  Users, 
  MessageCircle, 
  Clock,
  TrendingUp,
  Star,
  Award,
  Activity
} from "lucide-react";
import { User } from "../auth/SignIn";

interface StudentDashboardProps {
  user: User;
  onSignOut: () => void;
}

export const StudentDashboard = ({ user, onSignOut }: StudentDashboardProps) => {
  const wellnessScore = 78;
  const weeklyGoalProgress = 65;
  const currentStreak = 7;

  const recentActivities = [
    { type: "session", title: "Stress Management Workshop", date: "Today", points: 15 },
    { type: "journal", title: "Daily Reflection", date: "Yesterday", points: 10 },
    { type: "meditation", title: "Mindfulness Session", date: "2 days ago", points: 12 },
  ];

  const upcomingSessions = [
    { title: "Dr. Sarah Johnson", type: "Individual Counseling", date: "Tomorrow", time: "2:00 PM" },
    { title: "Anxiety Support Group", type: "Group Session", date: "Friday", time: "4:30 PM" },
  ];

  const achievements = [
    { name: "7-Day Streak", icon: "🔥", description: "Consistent daily check-ins" },
    { name: "Wellness Explorer", icon: "🌟", description: "Completed 5 wellness activities" },
    { name: "Community Helper", icon: "🤝", description: "Helped 3 peers in forums" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-soft via-background to-secondary-soft">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b shadow-soft sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Welcome back, {user.name}!</h1>
                <p className="text-sm text-muted-foreground">Student Dashboard</p>
              </div>
            </div>
            <Button onClick={onSignOut} variant="outline">Sign Out</Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-white border-0 shadow-large">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-foreground/80 text-sm">Wellness Score</p>
                  <p className="text-3xl font-bold">{wellnessScore}%</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary to-secondary/80 text-white border-0 shadow-large">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-secondary-foreground/80 text-sm">Current Streak</p>
                  <p className="text-3xl font-bold">{currentStreak} days</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Trophy className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent to-accent/80 text-white border-0 shadow-large">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-accent-foreground/80 text-sm">Total Points</p>
                  <p className="text-3xl font-bold">1,247</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-success to-success/80 text-white border-0 shadow-large">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-success-foreground/80 text-sm">Sessions This Month</p>
                  <p className="text-3xl font-bold">6</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weekly Progress */}
            <Card className="shadow-medium border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Weekly Wellness Goals
                </CardTitle>
                <CardDescription>Track your progress towards this week's wellness objectives</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Complete 5 mindfulness sessions</span>
                    <span className="text-sm text-muted-foreground">3/5</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Daily check-ins</span>
                    <span className="text-sm text-muted-foreground">7/7</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Engage in peer support</span>
                    <span className="text-sm text-muted-foreground">2/3</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="shadow-medium border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-secondary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">{activity.date}</p>
                        </div>
                      </div>
                      <Badge variant="secondary">+{activity.points} pts</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Analytics */}
            <Card className="shadow-medium border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  Performance Insights
                </CardTitle>
                <CardDescription>Your wellness journey over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-primary-soft to-primary/10 rounded-lg">
                    <p className="text-2xl font-bold text-primary">85%</p>
                    <p className="text-sm text-muted-foreground">Mood Improvement</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-secondary-soft to-secondary/10 rounded-lg">
                    <p className="text-2xl font-bold text-secondary">92%</p>
                    <p className="text-sm text-muted-foreground">Session Attendance</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-accent-soft to-accent/10 rounded-lg">
                    <p className="text-2xl font-bold text-accent">78%</p>
                    <p className="text-sm text-muted-foreground">Goal Achievement</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-success-soft to-success/10 rounded-lg">
                    <p className="text-2xl font-bold text-success">4.8</p>
                    <p className="text-sm text-muted-foreground">Wellness Rating</p>
                  </div>
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
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Start AI Chat Support
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Counseling Session
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Join Peer Support
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Sessions */}
            <Card className="shadow-medium border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Upcoming Sessions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingSessions.map((session, index) => (
                  <div key={index} className="p-3 border border-border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{session.title}</p>
                        <p className="text-sm text-muted-foreground">{session.type}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{session.date} at {session.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="shadow-medium border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-warning" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-warning-soft to-accent-soft rounded-lg">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <p className="font-medium">{achievement.name}</p>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};