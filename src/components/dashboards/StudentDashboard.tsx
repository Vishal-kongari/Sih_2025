import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getName, clearAuth } from "@/lib/auth";
import { useNavigate } from "react-router-dom";
import { Brain, Calendar, Star, Target, MessageCircle, BookOpen, Users, Smile, Music, Moon, PlayCircle, Book } from "lucide-react";

export const StudentDashboard = () => {
  const navigate = useNavigate();
  const name = getName();
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
          <Button variant="outline" onClick={() => { clearAuth(); navigate('/'); }}>Sign Out</Button>
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
              <Calendar className="w-5 h-5 text-secondary" /> Upcoming Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border">
                <p className="font-medium">Stress Management Workshop</p>
                <p className="text-xs text-muted-foreground">Tomorrow • 2:00 PM</p>
              </div>
              <div className="p-4 rounded-xl border">
                <p className="font-medium">Mindfulness Group Session</p>
                <p className="text-xs text-muted-foreground">Friday • 4:30 PM</p>
              </div>
            </div>
          </CardContent>
        </Card>
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
    </div>
  );
};


