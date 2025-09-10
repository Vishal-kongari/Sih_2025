import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building2, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Calendar,
  BarChart3,
  MapPin,
  Heart,
  Bell,
  Download,
  UserPlus,
  Clock,
  Activity,
  Shield,
  FileBarChart
} from "lucide-react";
import { User } from "../auth/SignIn";

interface OnCampusCounselorDashboardProps {
  user: User;
  onSignOut: () => void;
}

export const OnCampusCounselorDashboard = ({ user, onSignOut }: OnCampusCounselorDashboardProps) => {
  const campusStats = {
    totalStudents: 1247,
    activeUsers: 456,
    weeklyGrowth: 12,
    crisisAlerts: 3,
    avgWellnessScore: 72
  };

  const departmentData = [
    { name: "Engineering", students: 234, wellness: 68, alerts: 2 },
    { name: "Business", students: 189, wellness: 76, alerts: 0 },
    { name: "Liberal Arts", students: 156, wellness: 79, alerts: 1 },
    { name: "Sciences", students: 198, wellness: 71, alerts: 0 },
    { name: "Medicine", students: 167, wellness: 65, alerts: 1 },
  ];

  const recentActivities = [
    { type: "crisis", title: "Crisis intervention completed", student: "Anonymous", time: "30 min ago", severity: "high" },
    { type: "session", title: "Group therapy session", counselor: "Dr. Smith", time: "2 hours ago", severity: "medium" },
    { type: "alert", title: "New student registration", department: "Engineering", time: "3 hours ago", severity: "low" },
    { type: "report", title: "Weekly wellness report generated", time: "1 day ago", severity: "low" },
  ];

  const upcomingEvents = [
    { title: "Mental Health Week", date: "Next Monday", type: "Campus Event", attendees: 200 },
    { title: "Stress Management Workshop", date: "Wednesday", type: "Workshop", attendees: 45 },
    { title: "Counselor Training", date: "Friday", type: "Professional Development", attendees: 12 },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'low': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-soft via-background to-secondary-soft">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b shadow-soft sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-secondary rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">{user.name}</h1>
                <p className="text-sm text-muted-foreground">Campus Mental Health Coordinator</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="relative">
                <Bell className="w-4 h-4" />
                {campusStats.crisisAlerts > 0 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full"></div>
                )}
              </Button>
              <Button onClick={onSignOut} variant="outline">Sign Out</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Campus Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-accent to-accent/80 text-white border-0 shadow-large">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-accent-foreground/80 text-sm">Total Students</p>
                  <p className="text-3xl font-bold">{campusStats.totalStudents.toLocaleString()}</p>
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
                  <p className="text-primary-foreground/80 text-sm">Active Users</p>
                  <p className="text-3xl font-bold">{campusStats.activeUsers}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary to-secondary/80 text-white border-0 shadow-large">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-secondary-foreground/80 text-sm">Weekly Growth</p>
                  <p className="text-3xl font-bold">+{campusStats.weeklyGrowth}%</p>
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
                  <p className="text-success-foreground/80 text-sm">Avg Wellness</p>
                  <p className="text-3xl font-bold">{campusStats.avgWellnessScore}%</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-destructive to-destructive/80 text-white border-0 shadow-large">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-destructive-foreground/80 text-sm">Crisis Alerts</p>
                  <p className="text-3xl font-bold">{campusStats.crisisAlerts}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Campus Overview</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Recent Campus Activity */}
                <Card className="shadow-medium border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-primary" />
                      Recent Campus Activity
                    </CardTitle>
                    <CardDescription>Latest events and alerts across campus</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                              <Shield className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <p className="font-medium">{activity.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {activity.student && `Student: ${activity.student}`}
                                {activity.counselor && `Counselor: ${activity.counselor}`}
                                {activity.department && `Department: ${activity.department}`}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className={getSeverityColor(activity.severity)}>
                                  {activity.severity} priority
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Campus Wellness Metrics */}
                <Card className="shadow-medium border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-secondary" />
                      Campus Wellness Metrics
                    </CardTitle>
                    <CardDescription>Overall mental health indicators across campus</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Student Engagement</span>
                          <span className="text-sm text-muted-foreground">87%</span>
                        </div>
                        <Progress value={87} className="h-3" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Resource Utilization</span>
                          <span className="text-sm text-muted-foreground">73%</span>
                        </div>
                        <Progress value={73} className="h-3" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Crisis Response Time</span>
                          <span className="text-sm text-muted-foreground">95%</span>
                        </div>
                        <Progress value={95} className="h-3" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Counselor Availability</span>
                          <span className="text-sm text-muted-foreground">68%</span>
                        </div>
                        <Progress value={68} className="h-3" />
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
                    <CardTitle>Campus Management</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" variant="soft">
                      <FileBarChart className="w-4 h-4 mr-2" />
                      Generate Report
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Add Counselor
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Event
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export Data
                    </Button>
                  </CardContent>
                </Card>

                {/* Upcoming Campus Events */}
                <Card className="shadow-medium border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Upcoming Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingEvents.map((event, index) => (
                      <div key={index} className="p-3 border border-border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">{event.title}</p>
                            <p className="text-sm text-muted-foreground">{event.type}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Clock className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{event.date}</span>
                            </div>
                          </div>
                          <Badge variant="outline">{event.attendees} attendees</Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="departments" className="space-y-6">
            <Card className="shadow-medium border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-accent" />
                  Department Breakdown
                </CardTitle>
                <CardDescription>Mental health metrics by academic department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {departmentData.map((dept, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-accent to-secondary rounded-lg flex items-center justify-center text-white text-sm font-medium">
                            {dept.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{dept.name}</p>
                            <p className="text-sm text-muted-foreground">{dept.students} students</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          {dept.alerts > 0 && (
                            <Badge variant="destructive">{dept.alerts} alerts</Badge>
                          )}
                          <span className="text-sm font-medium">{dept.wellness}%</span>
                        </div>
                      </div>
                      <Progress value={dept.wellness} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center p-6 bg-gradient-to-br from-primary-soft to-primary/10">
                <h3 className="text-2xl font-bold text-primary">2,456</h3>
                <p className="text-sm text-muted-foreground">Total Sessions This Month</p>
              </Card>
              <Card className="text-center p-6 bg-gradient-to-br from-secondary-soft to-secondary/10">
                <h3 className="text-2xl font-bold text-secondary">89%</h3>
                <p className="text-sm text-muted-foreground">Student Satisfaction</p>
              </Card>
              <Card className="text-center p-6 bg-gradient-to-br from-accent-soft to-accent/10">
                <h3 className="text-2xl font-bold text-accent">4.2</h3>
                <p className="text-sm text-muted-foreground">Avg Sessions per Student</p>
              </Card>
              <Card className="text-center p-6 bg-gradient-to-br from-success-soft to-success/10">
                <h3 className="text-2xl font-bold text-success">94%</h3>
                <p className="text-sm text-muted-foreground">Crisis Resolution Rate</p>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <Card className="shadow-medium border-0">
              <CardHeader>
                <CardTitle>Campus Resources Management</CardTitle>
                <CardDescription>Manage counselors, facilities, and support services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="p-4 border border-border rounded-lg">
                    <h4 className="font-medium mb-2">Active Counselors</h4>
                    <p className="text-2xl font-bold text-primary">18</p>
                    <p className="text-sm text-muted-foreground">12 full-time, 6 part-time</p>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <h4 className="font-medium mb-2">Counseling Rooms</h4>
                    <p className="text-2xl font-bold text-secondary">8</p>
                    <p className="text-sm text-muted-foreground">6 available, 2 in use</p>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <h4 className="font-medium mb-2">Support Groups</h4>
                    <p className="text-2xl font-bold text-accent">12</p>
                    <p className="text-sm text-muted-foreground">Active weekly sessions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};