import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getName, clearAuth } from "@/lib/auth";
import { signOutUser } from "@/services/auth";
import { useNavigate } from "react-router-dom";
import { Brain, Calendar, Star, Target, MessageCircle, BookOpen, Users, Smile, Music, Moon, PlayCircle, Book, Clock, User } from "lucide-react";
import { FaBrain, FaHeart, FaLeaf, FaFire, FaRocket, FaGem, FaSun, FaMoon, FaStar, FaTrophy, FaGamepad, FaBook, FaUsers, FaComments, FaCalendarAlt, FaChartLine, FaBullseye, FaLightbulb, FaMagic, FaRainbow, FaPalette, FaInfinity } from "react-icons/fa";
import { GiMeditation, GiFlowerPot, GiButterfly, GiTreeBranch, GiWaterDrop, GiSunrise, GiSunset, GiCrystalBall, GiMagicSwirl, GiStarFormation, GiHeartWings, GiPeaceDove, GiLotus, GiYinYang } from "react-icons/gi";
import { MdSelfImprovement, MdPsychology, MdNature, MdSpa, MdHealing, MdFavorite, MdEmojiNature, MdAutoAwesome, MdTrendingUp, MdInsights, MdExplore, MdCelebration, MdLocalFlorist, MdWbSunny, MdNightlight } from "react-icons/md";
import { useEffect, useState } from "react";
import { listCounselors, createBooking, listenBookingsForStudent, getUserProfileById, type CounselorProfile, type Booking } from "@/services/bookings";
import PopupChat from "@/components/PopupChat";
import { testBookingFlow } from "@/lib/bookingTest";
import { checkFirebaseConfig, getFirebaseConfigStatus } from "@/lib/firebaseConfigCheck";

export const StudentDashboard = () => {
  const navigate = useNavigate();
  const name = getName();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [counselorNames, setCounselorNames] = useState<Record<string, string>>({});
  const [isChatOpen, setIsChatOpen] = useState(false);
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-40 right-1/3 w-14 h-14 bg-gradient-to-r from-green-300 to-emerald-300 rounded-full opacity-20 animate-bounce"></div>
      </div>

      <header className="bg-white/95 backdrop-blur-md border-b border-gradient-to-r from-purple-200/50 to-blue-200/50 shadow-lg relative z-10">
        <div className="container h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl transform hover:scale-105 transition-transform duration-300">
              <FaBrain className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Welcome back, {name}</h1>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <GiMeditation className="w-4 h-4 text-purple-500" />
                Student Dashboard
                {(() => {
                  const configStatus = getFirebaseConfigStatus();
                  return configStatus.isValid ? (
                    <span className="ml-2 inline-flex items-center gap-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Firebase OK
                    </span>
                  ) : (
                    <span className="ml-2 inline-flex items-center gap-1 text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      Config Issue
                    </span>
                  );
                })()}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={async () => { await signOutUser(); clearAuth(); navigate('/'); }}
            className="border-gray-300 hover:border-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            Sign Out
          </Button>
        </div>
      </header>
      <main className="container py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-2 border-0 shadow-2xl bg-white/90 backdrop-blur-sm rounded-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 via-pink-100/20 to-blue-100/30"></div>
          <CardHeader className="pb-6 relative z-10">
            <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                <FaBullseye className="w-6 h-6 text-white" />
              </div>
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Weekly Goals</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 border-2 border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-300/20 to-cyan-300/20 rounded-full -translate-y-8 translate-x-8"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <GiMeditation className="w-5 h-5 text-blue-600" />
                    <p className="text-sm text-blue-600 font-semibold">Mindfulness Sessions</p>
                  </div>
                  <p className="text-3xl font-bold text-blue-700 mb-2">3/5</p>
                  <div className="w-full bg-blue-200 rounded-full h-3 shadow-inner">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full shadow-lg" style={{ width: '60%' }}></div>
                  </div>
                  <p className="text-xs text-blue-600 mt-2 font-medium">60% Complete</p>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 border-2 border-green-200/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-green-300/20 to-emerald-300/20 rounded-full -translate-y-8 translate-x-8"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <FaHeart className="w-5 h-5 text-green-600" />
                    <p className="text-sm text-green-600 font-semibold">Daily Check-ins</p>
                  </div>
                  <p className="text-3xl font-bold text-green-700 mb-2">5/7</p>
                  <div className="w-full bg-green-200 rounded-full h-3 shadow-inner">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full shadow-lg" style={{ width: '71%' }}></div>
                  </div>
                  <p className="text-xs text-green-600 mt-2 font-medium">71% Complete</p>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 border-2 border-purple-200/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full -translate-y-8 translate-x-8"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <FaUsers className="w-5 h-5 text-purple-600" />
                    <p className="text-sm text-purple-600 font-semibold">Peer Support</p>
                  </div>
                  <p className="text-3xl font-bold text-purple-700 mb-2">1/3</p>
                  <div className="w-full bg-purple-200 rounded-full h-3 shadow-inner">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full shadow-lg" style={{ width: '33%' }}></div>
                  </div>
                  <p className="text-xs text-purple-600 mt-2 font-medium">33% Complete</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm rounded-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/30 via-orange-100/20 to-red-100/30"></div>
          <CardHeader className="pb-6 relative z-10">
            <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                <FaTrophy className="w-6 h-6 text-white" />
              </div>
              <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="50%" stopColor="#059669" />
                      <stop offset="100%" stopColor="#047857" />
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                  <circle cx="50" cy="50" r="40" stroke="url(#progressGradient)" strokeWidth="8" fill="none"
                    strokeDasharray="251.2" strokeDashoffset="45.2" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">82</p>
                    <p className="text-xs text-gray-500 font-medium">/100</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600 font-semibold flex items-center justify-center gap-2">
                  <GiStarFormation className="w-4 h-4 text-yellow-500" />
                  Wellness Score
                </p>
                <div className="flex items-center justify-center gap-1">
                  <FaStar className="w-3 h-3 text-yellow-400" />
                  <FaStar className="w-3 h-3 text-yellow-400" />
                  <FaStar className="w-3 h-3 text-yellow-400" />
                  <FaStar className="w-3 h-3 text-yellow-400" />
                  <FaStar className="w-3 h-3 text-gray-300" />
                </div>
                <p className="text-xs text-green-600 font-medium">Excellent Progress!</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-3 border-0 shadow-2xl bg-white/90 backdrop-blur-sm rounded-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 via-pink-100/20 to-blue-100/30"></div>
          <CardHeader className="pb-6 relative z-10">
            <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                <FaRocket className="w-6 h-6 text-white" />
              </div>
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Button
                onClick={() => setIsChatOpen(true)}
                className="h-20 justify-start bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 hover:from-blue-600 hover:via-cyan-600 hover:to-blue-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <FaComments className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg">Start AI Chat</div>
                    <div className="text-sm opacity-90">Get instant support</div>
                  </div>
                </div>
              </Button>
              <Button variant="outline" className="h-20 justify-start border-2 border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 hover:border-green-500 hover:bg-gradient-to-r hover:from-green-100 hover:to-emerald-100 hover:text-green-700 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <FaCalendarAlt className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg">Book Session</div>
                    <div className="text-sm text-gray-600">Schedule with counselor</div>
                  </div>
                </div>
              </Button>
              <Button variant="outline" className="h-20 justify-start border-2 border-purple-300 bg-gradient-to-r from-purple-50 to-pink-50 hover:border-purple-500 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 hover:text-purple-700 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <FaBook className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg">Browse Resources</div>
                    <div className="text-sm text-gray-600">Self-help materials</div>
                  </div>
                </div>
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
                  <div key={booking.id} className={`p-4 rounded-xl border ${booking.status === 'accepted' ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' :
                    booking.status === 'completed' ? 'bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800' :
                      booking.status === 'rejected' ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800' :
                        'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800'
                    }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium">
                          Session with {counselorNames[booking.counselorId] || 'Counselor'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Status: <span className={`font-medium ${booking.status === 'accepted' ? 'text-green-600' :
                            booking.status === 'completed' ? 'text-purple-600' :
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
                        {booking.completedAt && (
                          <p className="text-xs text-muted-foreground mt-1">
                            <Star className="w-3 h-3 inline mr-1" />
                            Completed: {new Date(booking.completedAt).toLocaleString()}
                          </p>
                        )}
                        {booking.notes && (
                          <p className="text-xs text-muted-foreground mt-1 italic">
                            Notes: {booking.notes}
                          </p>
                        )}
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${booking.status === 'accepted' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                        booking.status === 'completed' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' :
                          booking.status === 'rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' :
                            'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                        }`}>
                        {booking.status === 'accepted' ? '✓ Confirmed' :
                          booking.status === 'completed' ? '🏆 Completed' :
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
      <PopupChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

const LiveSessionsSection = () => {
  const [counselors, setCounselors] = useState<CounselorProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState<string | null>(null);
  const [showCounselors, setShowCounselors] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<string | null>(null);

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
      console.log('Starting booking process for counselor:', counselorName, 'ID:', counselorId);
      const bookingId = await createBooking(counselorId);
      console.log('Booking created successfully with ID:', bookingId);
      setBookingSuccess(counselorName);
      setTimeout(() => setBookingSuccess(null), 3000);
    } catch (error) {
      console.error('Failed to book session:', error);
      // You could add a toast notification here to show the error to the user
      alert(`Failed to book session: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setBookingLoading(null);
    }
  };

  const handleTestBooking = async () => {
    try {
      console.log('Testing booking flow...');

      // First check Firebase configuration
      const configCheck = checkFirebaseConfig();
      if (!configCheck.isValid) {
        setTestResult(`❌ Firebase config issue: ${configCheck.message}`);
        return;
      }

      const result = await testBookingFlow();
      if (result.success) {
        setTestResult(`✅ Test successful! Booking created with ID: ${result.bookingId}`);
      } else {
        setTestResult(`❌ Test failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Test booking error:', error);
      setTestResult(`❌ Test error: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
              <div className="flex gap-2">

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCounselors(false)}
                >
                  Hide
                </Button>
              </div>
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

            {testResult && (
              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  {testResult}
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setTestResult(null)}
                  className="mt-2"
                >
                  Clear
                </Button>
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


