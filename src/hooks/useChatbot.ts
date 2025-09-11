import { useEffect, useRef, useState } from "react";
import { TinySentimentRNN } from "@/lib/sentimentModel";
import { getCurrentUserProfile } from "@/lib/firebaseUtils";

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface DistressAlert {
  show: boolean;
  name?: string;
  phoneNumber?: string;
  guardianPhone?: string;
}

export const useChatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<DistressAlert>({ show: false });
  const rnnRef = useRef(new TinySentimentRNN());
  const MOTIVATIONAL: string[] = [
    "You matter. One small step today is still progress—I'm proud of you.",
    "Breathe in for 4, hold for 4, out for 6. You’ve got this.",
    "Even the longest night ends at sunrise. Keep going—you're not alone.",
    "Your feelings are valid. Let’s take it one minute at a time.",
    "Courage isn’t never falling—it’s standing back up. You are courageous."
  ];

  const sendToAI = async (prompt: string): Promise<string> => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY || 'sk-mock';
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are a supportive mental wellness assistant. Be empathetic, practical, and brief.' },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: prompt },
          ],
          temperature: 0.7,
        })
      });
      const data = await res.json();
      const reply = data?.choices?.[0]?.message?.content || "I'm here for you. Can you share a bit more?";
      return reply;
    } catch (e) {
      return "I couldn't reach the AI service right now. Let's try again shortly.";
    }
  };

  // If distress is detected, show alert, notify guardian (mock), and return a motivational reply
  const checkDistress = async (text: string): Promise<string | null> => {
    const status = rnnRef.current.evaluate(text);
    if (status === 'distress') {
      const profile = await getCurrentUserProfile();
      setAlert({
        show: true,
        name: profile?.name,
        phoneNumber: profile?.phoneNumber,
        guardianPhone: profile?.guardianPhone,
      });
      if (profile?.guardianPhone) {
        try {
          await fetch('/api/notify-guardian', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              to: profile.guardianPhone,
              name: profile.name,
              message: 'Urgent: Possible distress detected. Please check in immediately.',
            }),
          });
        } catch {}
      }
      const base = MOTIVATIONAL[Math.floor(Math.random() * MOTIVATIONAL.length)];
      const tail = profile?.name ? ` ${profile.name}.` : '';
      return `${base}${tail}`;
    }
    return null;
  };

  const send = async () => {
    if (!input.trim()) return;
    const content = input.trim();
    setLoading(true);
    setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'user', content }]);
    setInput("");
    const crisisReply = await checkDistress(content);
    if (crisisReply) {
      setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'assistant', content: crisisReply }]);
      setLoading(false);
      return;
    }
    const reply = await sendToAI(content);
    setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'assistant', content: reply }]);
    setLoading(false);
  };

  return {
    messages,
    input,
    setInput,
    send,
    loading,
    alert,
    dismissAlert: () => setAlert({ show: false })
  };
};


