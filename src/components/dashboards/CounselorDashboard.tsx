import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getName, clearAuth } from "@/lib/auth";
import { signOutUser } from "@/services/auth";
import { useNavigate } from "react-router-dom";
import { Users, Calendar, MessageSquare, Heart, TrendingUp, CheckCircle2, AlertTriangle, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { acceptBooking, getUserProfileById, listenBookingsForCounselor, rejectBooking, type Booking } from "@/services/bookings";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const CounselorDashboard = () => {
  const navigate = useNavigate();
  const name = getName();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [studentNames, setStudentNames] = useState<Record<string, string>>({});
  const [loadingActionId, setLoadingActionId] = useState<string | null>(null);
  const [showTimeInput, setShowTimeInput] = useState<string | null>(null);
  const [timeSlot, setTimeSlot] = useState("");

  useEffect(() => {
    let unsub: any;
    (async () => {
      unsub = await listenBookingsForCounselor((list) => {
        setBookings(list);
        // Load student names on demand
        list.forEach(async (b) => {
          if (!studentNames[b.userId]) {
            const profile = await getUserProfileById(b.userId);
            setStudentNames((prev) => ({ ...prev, [b.userId]: profile?.name || 'Student' }));
          }
        });
      });
    })();
    return () => { if (unsub) unsub(); };
  }, []);

  const handleAcceptWithTime = async (bookingId: string) => {
    if (!timeSlot.trim()) return;
    setLoadingActionId(bookingId);
    try {
      await acceptBooking(bookingId, timeSlot);
      setShowTimeInput(null);
      setTimeSlot("");
    } catch (error) {
      console.error('Failed to accept booking:', error);
    } finally {
      setLoadingActionId(null);
    }
  };

  const handleQuickAccept = async (bookingId: string) => {
    setLoadingActionId(bookingId);
    try {
      const defaultTime = new Date();
      defaultTime.setHours(defaultTime.getHours() + 24); // Next day
      await acceptBooking(bookingId, defaultTime.toISOString());
    } catch (error) {
      console.error('Failed to accept booking:', error);
    } finally {
      setLoadingActionId(null);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-soft via-background to-primary-soft">
      <header className="bg-white/80 backdrop-blur border-b">
        <div className="container h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">Dr. {name}</h1>
              <p className="text-xs text-muted-foreground">Counselor Dashboard</p>
            </div>
          </div>
          <Button variant="outline" onClick={async () => { await signOutUser(); clearAuth(); navigate('/'); }}>Sign Out</Button>
        </div>
      </header>
      <main className="container py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 border-0 shadow-large bg-card/70 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" /> Booking Requests
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {bookings.length === 0 && (
              <div className="p-4 rounded-xl border text-sm text-muted-foreground">No new booking requests.</div>
            )}
            {bookings.map((b) => (
              <div key={b.id} className="p-4 rounded-xl border bg-card/60">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{studentNames[b.userId] || 'Student'}</p>
                    <p className="text-xs text-muted-foreground">
                      Status: {b.status}{b.scheduledTime ? ` • Scheduled: ${b.scheduledTime}` : ''}
                    </p>
                  </div>
                  {b.isEmergency && (
                    <span className="inline-flex items-center gap-1 text-red-600 text-xs">
                      <AlertTriangle className="w-4 h-4" /> Emergency
                    </span>
                  )}
                </div>
                <div className="mt-3 space-y-3">
                  {b.status === 'pending' && (
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        disabled={loadingActionId === b.id}
                        onClick={() => setShowTimeInput(showTimeInput === b.id ? null : b.id)}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                      >
                        <Clock className="w-4 h-4 mr-1" />
                        Set Time & Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={loadingActionId === b.id}
                        onClick={() => handleQuickAccept(b.id)}
                      >
                        Quick Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={loadingActionId === b.id}
                        onClick={async () => { setLoadingActionId(b.id); try { await rejectBooking(b.id); } finally { setLoadingActionId(null); } }}
                        className="text-red-600 hover:text-red-700"
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                  
                  {showTimeInput === b.id && (
                    <div className="p-3 bg-muted/50 rounded-lg space-y-2">
                      <Label htmlFor={`time-${b.id}`} className="text-sm font-medium">Schedule Time</Label>
                      <div className="flex gap-2">
                        <Input
                          id={`time-${b.id}`}
                          type="datetime-local"
                          value={timeSlot}
                          onChange={(e) => setTimeSlot(e.target.value)}
                          className="flex-1"
                          min={new Date().toISOString().slice(0, 16)}
                        />
                        <Button
                          size="sm"
                          onClick={() => handleAcceptWithTime(b.id)}
                          disabled={!timeSlot.trim() || loadingActionId === b.id}
                          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                        >
                          {loadingActionId === b.id ? 'Scheduling...' : 'Confirm'}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setShowTimeInput(null);
                            setTimeSlot("");
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="border-0 shadow-large bg-card/70 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-secondary" /> Active Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-secondary">24</p>
            <p className="text-xs text-muted-foreground">Assigned this month</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-large bg-card/70 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" /> KPIs
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Avg Improvement</p>
              <p className="text-2xl font-bold text-success">78%</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Response Time</p>
              <p className="text-2xl font-bold text-primary">95%</p>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-3 border-0 shadow-large bg-card/70 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-accent" /> Recent Messages
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-4 rounded-xl border">Anonymous: "Thank you for yesterday's session..." • 2m ago</div>
            <div className="p-4 rounded-xl border">Lisa Chen: "I'd like to reschedule..." • 15m ago</div>
            <div className="p-4 rounded-xl border">David Kim: "The breathing exercises helped a lot!" • 1h ago</div>
          </CardContent>
        </Card>
        <Card className="md:col-span-3 border-0 shadow-large bg-card/70 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-secondary" /> Caseload Snapshot
            </CardTitle>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-primary-soft">Excellent • 8</div>
            <div className="p-4 rounded-xl bg-secondary-soft">Good • 12</div>
            <div className="p-4 rounded-xl bg-accent-soft">Fair • 3</div>
            <div className="p-4 rounded-xl bg-warning-soft">New • 1</div>
          </CardContent>
        </Card>
        <Card className="md:col-span-3 border-0 shadow-large bg-card/70 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" /> Today’s Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border">Review Emma’s progress</div>
            <div className="p-4 rounded-xl border">Prepare group session agenda</div>
            <div className="p-4 rounded-xl border">Respond to 2 unread messages</div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};


