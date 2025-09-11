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
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    // Load conversation from localStorage on initialization
    const saved = localStorage.getItem('chatbot-conversation');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<DistressAlert>({ show: false });
  const rnnRef = useRef(new TinySentimentRNN());

  // Save conversation to localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem('chatbot-conversation', JSON.stringify(messages));
  }, [messages]);
  const MOTIVATIONAL: string[] = [
    "You matter. One small step today is still progress—I'm proud of you.",
    "Breathe in for 4, hold for 4, out for 6. You’ve got this.",
    "Even the longest night ends at sunrise. Keep going—you're not alone.",
    "Your feelings are valid. Let’s take it one minute at a time.",
    "Courage isn’t never falling—it’s standing back up. You are courageous."
  ];

  const sendToAI = async (prompt: string): Promise<string> => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY || 'sk-mock';
    
    // Enhanced system prompt for conversational AI
    const systemPrompt = `You are a compassionate mental wellness assistant having a real-time conversation. You should:

1. **Maintain conversation context** - Reference previous messages naturally
2. **Be conversational** - Respond like a real person, not a robot
3. **Ask follow-up questions** - Keep the conversation flowing
4. **Show empathy** - Acknowledge their feelings and experiences
5. **Provide practical help** - Offer specific, actionable advice
6. **Be encouraging** - Support them through their journey

Remember: This is an ongoing conversation. Reference what they've shared before, ask about their progress, and build on previous topics naturally.`;

    // Build conversation history for context
    const conversationHistory = messages.slice(-10); // Keep last 10 messages for context
    
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
            { role: 'system', content: systemPrompt },
            ...conversationHistory.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: prompt },
          ],
          temperature: 0.8,
          max_tokens: 400,
          presence_penalty: 0.1,
          frequency_penalty: 0.1,
        })
      });
      const data = await res.json();
      const reply = data?.choices?.[0]?.message?.content || getFallbackResponse(prompt);
      return reply;
    } catch (e) {
      return getFallbackResponse(prompt);
    }
  };

  const getFallbackResponse = (prompt: string): string => {
    // Context-aware fallback responses based on conversation history
    const lastMessage = messages[messages.length - 1];
    const isFirstMessage = messages.length <= 1;
    
    if (isFirstMessage) {
      return "Hi there! I'm your wellness assistant. I'm here to listen and support you. What's on your mind today?";
    }
    
    // Check if user is continuing a conversation
    if (lastMessage?.role === 'assistant') {
      const followUpResponses = [
        "I'm still here with you. How are you feeling about what we discussed?",
        "That's really helpful to know. Can you tell me more about that?",
        "I appreciate you sharing that with me. What would you like to explore next?",
        "I'm listening. What else is on your mind?",
        "Thank you for continuing to share. How can I best support you right now?"
      ];
      return followUpResponses[Math.floor(Math.random() * followUpResponses.length)];
    }
    
    // General fallback responses
    const fallbackResponses = [
      "I'm here to listen and support you. Can you tell me more about what's on your mind?",
      "It sounds like you're going through a tough time. I want you to know that your feelings are valid and important.",
      "I'm really glad you reached out. Sometimes just talking about what we're experiencing can help. What would you like to share?",
      "I can hear that you're struggling right now. You're not alone in this, and I'm here to help however I can.",
      "Thank you for trusting me with what you're going through. Let's work through this together, one step at a time."
    ];
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  };

  // Enhanced distress detection with emergency contact system
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
      
      // Simulate emergency contact notifications
      if (profile?.guardianPhone) {
        await triggerEmergencyContact(profile);
      }
      
      // Return immediate supportive response
      return getDistressResponse(profile?.name);
    }
    return null;
  };

  const triggerEmergencyContact = async (profile: { name?: string; phoneNumber?: string; guardianPhone?: string }) => {
    try {
      // Priority: Guardian first, then counselor, then emergency services
      const contacts = [
        { type: 'guardian', phone: profile.guardianPhone, name: 'Guardian' },
        { type: 'counselor', phone: profile.phoneNumber, name: 'Counselor' }
      ].filter(contact => contact.phone);

      // Make actual phone calls
      for (const contact of contacts) {
        await makeEmergencyCall(contact.phone!, contact.name, profile.name || 'Student');
      }

      // Send SMS notifications
      for (const contact of contacts) {
        await sendEmergencySMS(contact.phone!, contact.name, profile.name || 'Student');
      }
      
      // Send email notifications
      await sendEmergencyEmail(profile);
      
      // Log emergency action
      console.log(`🚨 EMERGENCY ALERT: Contacted ${contacts.length} emergency contacts for ${profile.name}`);
      
    } catch (error) {
      console.error('Emergency contact failed:', error);
    }
  };

  const makeEmergencyCall = async (phoneNumber: string, contactType: string, studentName: string) => {
    try {
      // Twilio Voice API integration
      const response = await fetch('/api/emergency-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: phoneNumber,
          studentName,
          contactType,
          message: `URGENT: ${studentName} may be in distress and needs immediate attention. This is an automated emergency alert from the mental health platform.`
        }),
      });

      if (response.ok) {
        console.log(`📞 Emergency call initiated to ${contactType}: ${phoneNumber}`);
        return true;
      } else {
        console.error(`Failed to call ${contactType}: ${phoneNumber}`);
        return false;
      }
    } catch (error) {
      console.error(`Error calling ${contactType}:`, error);
      return false;
    }
  };

  const sendEmergencySMS = async (phoneNumber: string, contactType: string, studentName: string) => {
    try {
      const response = await fetch('/api/emergency-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: phoneNumber,
          message: `🚨 URGENT ALERT: ${studentName} may be in distress and needs immediate attention. Please check in immediately. This is an automated emergency alert from the mental health platform.`
        }),
      });

      if (response.ok) {
        console.log(`📱 Emergency SMS sent to ${contactType}: ${phoneNumber}`);
        return true;
      } else {
        console.error(`Failed to send SMS to ${contactType}: ${phoneNumber}`);
        return false;
      }
    } catch (error) {
      console.error(`Error sending SMS to ${contactType}:`, error);
      return false;
    }
  };

  const sendEmergencyEmail = async (profile: { name?: string; phoneNumber?: string; guardianPhone?: string }) => {
    try {
      const response = await fetch('/api/emergency-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: profile.name,
          studentPhone: profile.phoneNumber,
          guardianPhone: profile.guardianPhone,
          timestamp: new Date().toISOString(),
          subject: `URGENT: Mental Health Alert - ${profile.name}`,
          message: `
URGENT MENTAL HEALTH ALERT

Student: ${profile.name}
Time: ${new Date().toLocaleString()}
Student Phone: ${profile.phoneNumber || 'Not available'}
Guardian Phone: ${profile.guardianPhone || 'Not available'}

The system has detected concerning language that may indicate distress or crisis. Immediate attention is required.

Please contact the student immediately and ensure their safety.

This is an automated alert from the mental health platform.
          `
        }),
      });

      if (response.ok) {
        console.log(`📧 Emergency email sent for ${profile.name}`);
        return true;
      } else {
        console.error(`Failed to send emergency email for ${profile.name}`);
        return false;
      }
    } catch (error) {
      console.error('Error sending emergency email:', error);
      return false;
    }
  };

  const getDistressResponse = (name?: string): string => {
    const distressResponses = [
      `I'm really concerned about what you're sharing, ${name ? name + ',' : ''} and I want you to know that help is available right now. Your life has value, and there are people who care deeply about you.`,
      `${name ? name + ',' : ''} I can hear how much pain you're in right now. Please know that these feelings, while overwhelming, are temporary. You don't have to face this alone.`,
      `I'm reaching out to your support network right now because I care about your safety, ${name ? name : ''}. In the meantime, please know that you matter and this pain won't last forever.`,
      `${name ? name + ',' : ''} what you're experiencing sounds incredibly difficult. I want you to know that your life is precious and there are people who want to help you through this.`,
      `I'm taking immediate action to ensure you get the support you need, ${name ? name : ''}. Please hold on - help is coming, and you are not alone in this.`
    ];
    return distressResponses[Math.floor(Math.random() * distressResponses.length)];
  };

  const send = async () => {
    if (!input.trim()) return;
    const content = input.trim();
    setLoading(true);
    
    // Add user message immediately
    const userMessage = { id: crypto.randomUUID(), role: 'user' as const, content };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    // Check for distress first
    const crisisReply = await checkDistress(content);
    if (crisisReply) {
      const assistantMessage = { id: crypto.randomUUID(), role: 'assistant' as const, content: crisisReply };
      setMessages(prev => [...prev, assistantMessage]);
      setLoading(false);
      return;
    }
    
    // Get AI response
    try {
      const reply = await sendToAI(content);
      const assistantMessage = { id: crypto.randomUUID(), role: 'assistant' as const, content: reply };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = { id: crypto.randomUUID(), role: 'assistant' as const, content: "I'm having trouble responding right now. Can you try again?" };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const clearConversation = () => {
    setMessages([]);
    localStorage.removeItem('chatbot-conversation');
  };

  return {
    messages,
    input,
    setInput,
    send,
    loading,
    alert,
    dismissAlert: () => setAlert({ show: false }),
    clearConversation
  };
};


