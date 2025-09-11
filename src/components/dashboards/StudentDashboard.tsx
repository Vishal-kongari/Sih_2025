import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getName, clearAuth } from "@/lib/auth";
import { signOutUser } from "@/services/auth";
import { useNavigate } from "react-router-dom";
import { Brain, Calendar, Star, Target, MessageCircle, BookOpen, Users, Smile, Music, Moon, PlayCircle, Book, Clock, User } from "lucide-react";
import { useEffect, useState } from "react";
import { listCounselors, createBooking, listenBookingsForStudent, getUserProfileById, type CounselorProfile, type Booking } from "@/services/bookings";
import ChatBot from "@/components/ChatBot";

export const StudentDashboard = () => {
  const navigate = useNavigate();
  const name = getName();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [counselorNames, setCounselorNames] = useState<Record<string, string>>({});

  useEffect(() => {
    let unsub: any;
    (async () => {
      unsub = await listenBookingsForStudent((list) => {
        setBookings(list);
        // Load counselor names on demand
        list.forEach(async (b) => {
          if (!counselorNames[b.counselorId]) {
            const profile = await getUserProfileById(b.counselorId);
            setCounselorNames((prev) => ({ ...prev, [b.counselorId]: profile?.name || 'Counselor' }));
          }
        });
      });
    })();
    return () => { if (unsub) unsub(); };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-soft via-background to-secondary-soft">
      <header className="bg-white/80 backdrop-blur border-b">
        <div className="container h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">Welcome, {name}</h1>
              <p className="text-xs text-muted-foreground">Student Dashboard</p>
            </div>
          </div>
          <Button variant="outline" onClick={async () => { await signOutUser(); clearAuth(); navigate('/'); }}>Sign Out</Button>
        </div>
      </header>
      <main className="container py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 border-0 shadow-large bg-card/70 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" /> Weekly Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-primary-soft">
                <p className="text-sm text-muted-foreground">Mindfulness Sessions</p>
                <p className="text-2xl font-bold text-primary">3/5</p>
              </div>
              <div className="p-4 rounded-xl bg-secondary-soft">
                <p className="text-sm text-muted-foreground">Daily Check-ins</p>
                <p className="text-2xl font-bold text-secondary">5/7</p>
              </div>
              <div className="p-4 rounded-xl bg-accent-soft">
                <p className="text-sm text-muted-foreground">Peer Support</p>
                <p className="text-2xl font-bold text-accent">1/3</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-large bg-card/70 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-warning" /> Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-4xl font-bold text-success mb-1">82</p>
              <p className="text-xs text-muted-foreground">Wellness Score</p>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-3 border-0 shadow-large bg-card/70 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-accent" /> Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button variant="soft" className="h-14 justify-start">
                <MessageCircle className="w-4 h-4 mr-2" /> Start AI Chat
              </Button>
              <Button variant="outline" className="h-14 justify-start">
                <Calendar className="w-4 h-4 mr-2" /> Book Session
              </Button>
              <Button variant="outline" className="h-14 justify-start">
                <BookOpen className="w-4 h-4 mr-2" /> Browse Resources
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-3 border-0 shadow-large bg-card/70 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-secondary" /> My Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {bookings.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No sessions booked yet</p>
                  <p className="text-xs">Book a session below to get started</p>
                </div>
              ) : (
                bookings.map((booking) => (
                  <div key={booking.id} className={`p-4 rounded-xl border ${
                    booking.status === 'accepted' ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' :
                    booking.status === 'rejected' ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800' :
                    'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">
                          Session with {counselorNames[booking.counselorId] || 'Counselor'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Status: <span className={`font-medium ${
                            booking.status === 'accepted' ? 'text-green-600' :
                            booking.status === 'rejected' ? 'text-red-600' :
                            'text-yellow-600'
                          }`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </p>
                        {booking.scheduledTime && (
                          <p className="text-xs text-muted-foreground mt-1">
                            <Clock className="w-3 h-3 inline mr-1" />
                            Scheduled: {new Date(booking.scheduledTime).toLocaleString()}
                          </p>
                        )}
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'accepted' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                        booking.status === 'rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' :
                        'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                      }`}>
                        {booking.status === 'accepted' ? '✓ Confirmed' :
                         booking.status === 'rejected' ? '✗ Declined' :
                         '⏳ Pending'}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
        <LiveSessionsSection />
        <Card className="md:col-span-2 border-0 shadow-large bg-card/70 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smile className="w-5 h-5 text-accent" /> Mood Check-in
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Button variant="soft"><Smile className="w-4 h-4 mr-2" /> Good</Button>
              <Button variant="outline">Okay</Button>
              <Button variant="outline">Stressed</Button>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-large bg-card/70 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Music className="w-5 h-5 text-secondary" /> Personalized Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="p-3 rounded-lg bg-secondary-soft">Try a 5‑minute breathing exercise between classes.</div>
            <div className="p-3 rounded-lg bg-primary-soft">Listen to your focus playlist for 20 minutes.</div>
            <div className="p-3 rounded-lg bg-accent-soft">Write 3 lines of gratitude before bed.</div>
          </CardContent>
        </Card>

        {/* Mindful Media: short videos */}
        <Card className="md:col-span-2 border-0 shadow-large bg-card/70 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-primary" /> Mindful Media
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="aspect-video rounded-xl overflow-hidden border">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/1vx8iUvfyCY"
                  title="Guided Meditation for Beginners"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="aspect-video rounded-xl overflow-hidden border">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/inpok4MKVLM"
                  title="5-Minute Mindfulness Meditation"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="aspect-video rounded-xl overflow-hidden border">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/ZXsQAXx_ao0"
                  title="Motivational: Just Do It (Parody with a powerful message)"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="aspect-video rounded-xl overflow-hidden border">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/UNQhuFL6CWg"
                  title="Study Motivation — The Mindset for Success"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a className="p-3 rounded-xl border hover:bg-muted/40 transition" href="https://www.youtube.com/watch?v=mgmVOuLgFB0" target="_blank" rel="noreferrer">How to Believe in Yourself – Jim Cathcart (TEDx)</a>
              <a className="p-3 rounded-xl border hover:bg-muted/40 transition" href="https://www.youtube.com/watch?v=2Lz0VOltZKA" target="_blank" rel="noreferrer">Grit: The Power of Passion and Perseverance – Angela Duckworth</a>
              <a className="p-3 rounded-xl border hover:bg-muted/40 transition" href="https://www.youtube.com/watch?v=H14bBuluwB8" target="_blank" rel="noreferrer">The Puzzle of Motivation – Dan Pink</a>
              <a className="p-3 rounded-xl border hover:bg-muted/40 transition" href="https://www.youtube.com/watch?v=5MgBikgcWnY" target="_blank" rel="noreferrer">The First 20 Hours — How to Learn Anything – Josh Kaufman</a>
            </div>
          </CardContent>
        </Card>

        {/* Inspirational Verses */}
        <Card className="border-0 shadow-large bg-card/70 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="w-5 h-5 text-accent" /> Inspirational Verses
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-4 rounded-xl bg-accent-soft">
              <p className="text-sm font-medium">Bhagavad Gītā 2.47</p>
              <p className="text-sm text-muted-foreground mt-1">Karmany evādhikāras te mā phaleṣu kadācana. Mā karma-phala-hetur bhūr mā te saṅgo 'stv akarmaṇi.</p>
              <p className="text-xs mt-2">Focus on your actions, not on the results—let this reduce stress from outcomes.</p>
            </div>
            <div className="p-4 rounded-xl bg-secondary-soft">
              <p className="text-sm font-medium">Bhagavad Gītā 6.26</p>
              <p className="text-sm text-muted-foreground mt-1">Yato yato niścarati manaś cañcalam asthiram, tatas tato niyamyaitad ātmany eva vaśaṁ nayet.</p>
              <p className="text-xs mt-2">When the mind wanders, gently bring it back—useful for mindful study breaks.</p>
            </div>
            <div className="p-4 rounded-xl bg-primary-soft">
              <p className="text-sm font-medium">Bhagavad Gītā 12.15</p>
              <p className="text-sm text-muted-foreground mt-1">Yasmān nodvijate loko lokān nodvijate ca yaḥ...</p>
              <p className="text-xs mt-2">Cultivate calm and compassion—create a supportive peer environment.</p>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-2 border-0 shadow-large bg-card/70 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" /> Announcements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 rounded-lg bg-primary-soft">Campus Mental Health Week starts Monday.</div>
            <div className="p-3 rounded-lg bg-secondary-soft">Join the peer-support circle this Friday.</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-large bg-card/70 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-success" /> Habits Tracker
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">10-min Meditation</span>
              <span className="text-xs text-muted-foreground">5/7</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Daily Journal</span>
              <span className="text-xs text-muted-foreground">3/7</span>
            </div>
          </CardContent>
        </Card>
      </main>
      <ChatBot />
    </div>
  );
};

const LiveSessionsSection = () => {
  const [counselors, setCounselors] = useState<CounselorProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState<string | null>(null);
  const [showCounselors, setShowCounselors] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  const loadCounselors = async () => {
    setLoading(true);
    try {
      const list = await listCounselors();
      setCounselors(list);
      setShowCounselors(true);
    } catch (error) {
      console.error('Failed to load counselors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (counselorId: string, counselorName: string) => {
    setBookingLoading(counselorId);
    try {
      await createBooking(counselorId);
      setBookingSuccess(counselorName);
      setTimeout(() => setBookingSuccess(null), 3000);
    } catch (error) {
      console.error('Failed to book session:', error);
    } finally {
      setBookingLoading(null);
    }
  };

  return (
    <Card className="md:col-span-3 border-0 shadow-large bg-card/70 backdrop-blur">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" /> Live Sessions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!showCounselors ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Book a Live Session</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Connect with our professional counselors for personalized support
            </p>
            <Button 
              onClick={loadCounselors} 
              disabled={loading}
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
            >
              {loading ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Loading Counselors...
                </>
              ) : (
                <>
                  <User className="w-4 h-4 mr-2" />
                  View Available Counselors
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Available Counselors</h4>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowCounselors(false)}
              >
                Hide
              </Button>
            </div>
            
            {counselors.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                No counselors available right now. Please try again later.
              </div>
            ) : (
              <div className="space-y-3">
                {counselors.map((counselor) => (
                  <div key={counselor.id} className="p-4 rounded-xl border bg-card/50 hover:bg-card/70 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium">{counselor.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {counselor.role === 'counselor' ? 'Professional Counselor' : 'On-Campus Counselor'}
                              {counselor.specialization && ` • ${counselor.specialization}`}
                            </p>
                          </div>
                        </div>
                        {counselor.availability && (
                          <p className="text-xs text-muted-foreground ml-13">
                            Available: {counselor.availability}
                          </p>
                        )}
                      </div>
                      <Button 
                        onClick={() => handleBooking(counselor.id, counselor.name)}
                        disabled={bookingLoading === counselor.id}
                        className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                      >
                        {bookingLoading === counselor.id ? (
                          <>
                            <Clock className="w-4 h-4 mr-2 animate-spin" />
                            Booking...
                          </>
                        ) : (
                          'Book Session'
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {bookingSuccess && (
              <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                <p className="text-sm text-green-700 dark:text-green-300">
                  ✓ Booking request sent to {bookingSuccess}! You'll be notified when they accept.
                </p>
              </div>
            )}
            
            <p className="text-xs text-muted-foreground text-center">
              You will be notified once the counselor accepts and schedules a time.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};


