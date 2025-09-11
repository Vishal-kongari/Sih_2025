import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "This platform helped me manage exam stress. The AI tips and quick sessions made a real difference.",
    name: "Ananya, 3rd Year",
  },
  {
    quote:
      "I felt heard without judgment. The community is safe and supportive.",
    name: "Rahul, Freshman",
  },
  {
    quote:
      "Booking an on-campus session anonymously was so easy. Highly recommend!",
    name: "Meera, Graduate",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-3">Loved by Students</h2>
          <p className="text-muted-foreground">Real stories from real students</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Card key={i} className="border-0 bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i2) => (
                    <Star key={i2} className="h-4 w-4 text-warning" />
                  ))}
                </div>
                <p className="text-foreground leading-relaxed mb-4">“{t.quote}”</p>
                <p className="text-sm text-muted-foreground">{t.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};


