import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Smile, Meh, Frown, Flame, Award, Target } from "lucide-react";

const Tracker = () => {
  const [mood, setMood] = useState<"good" | "ok" | "low" | null>(null);
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-orange-50">
      <main className="container py-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-0 shadow-large bg-card/70 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" /> Daily Wellness Tracker
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-3">How are you feeling today?</p>
              <div className="flex gap-3">
                <Button variant={mood === 'good' ? 'soft' : 'outline'} onClick={() => setMood('good')} className="gap-2"><Smile className="w-4 h-4 text-success" /> Good</Button>
                <Button variant={mood === 'ok' ? 'soft' : 'outline'} onClick={() => setMood('ok')} className="gap-2"><Meh className="w-4 h-4 text-warning" /> Okay</Button>
                <Button variant={mood === 'low' ? 'soft' : 'outline'} onClick={() => setMood('low')} className="gap-2"><Frown className="w-4 h-4 text-destructive" /> Low</Button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm mb-2">Focus Minutes</p>
                <Progress value={62} className="h-3" />
              </div>
              <div>
                <p className="text-sm mb-2">Sleep Quality</p>
                <Progress value={74} className="h-3" />
              </div>
              <div>
                <p className="text-sm mb-2">Movement / Steps</p>
                <Progress value={40} className="h-3" />
              </div>
              <div>
                <p className="text-sm mb-2">Social Connection</p>
                <Progress value={55} className="h-3" />
              </div>
            </div>

            <div className="rounded-xl p-4 bg-gradient-to-r from-teal-500 to-sky-400 text-white shadow-large">
              <p className="italic">“Small daily improvements lead to lasting change.”</p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-0 shadow-large bg-card/70 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Flame className="w-5 h-5 text-orange-500" /> Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-orange-500">7</p>
              <p className="text-xs text-muted-foreground">Days in a row</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-large bg-card/70 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Award className="w-5 h-5 text-yellow-500" /> Badges</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-yellow-100 text-yellow-700 text-center">Focus 5x</div>
              <div className="p-3 rounded-xl bg-sky-100 text-sky-700 text-center">Journal 3x</div>
              <div className="p-3 rounded-xl bg-teal-100 text-teal-700 text-center">Breathe 10x</div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Tracker;


