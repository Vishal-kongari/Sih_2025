import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2, AlertTriangle, Phone, Mail, CheckCircle } from "lucide-react";

interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

interface PopupChatProps {
    isOpen: boolean;
    onClose: () => void;
}

interface UserProfile {
    name: string;
    phoneNumber?: string;
    guardianName: string;
    guardianPhone: string;
    guardianEmail?: string;
}

interface AlertNotificationProps {
    isVisible: boolean;
    onClose: () => void;
    studentName: string;
    guardianName: string;
    guardianPhone: string;
    message: string;
}

// Emergency Call function
const makeEmergencyCall = async (phoneNumber: string, contactType: string, studentName: string) => {
    try {
        console.log(`📞 EMERGENCY CALL SIMULATION:`);
        console.log(`   To: ${phoneNumber}`);
        console.log(`   Contact Type: ${contactType}`);
        console.log(`   Student: ${studentName}`);
        console.log(`   Message: "URGENT: ${studentName} may be in distress and needs immediate attention."`);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        return {
            success: true,
            callSid: `CA${Math.random().toString(36).substr(2, 32)}`,
            status: 'initiated',
            message: `Emergency call initiated to ${contactType}`
        };
    } catch (error) {
        console.error('Emergency call failed:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
};

// Emergency Email function
const sendEmergencyEmail = async (profile: UserProfile) => {
    try {
        console.log(`📧 EMERGENCY EMAIL SIMULATION:`);
        console.log(`   To: emergency@mentalhealthplatform.com`);
        console.log(`   Subject: URGENT: Mental Health Alert - ${profile.name}`);
        console.log(`   Student: ${profile.name}`);
        console.log(`   Student Phone: ${profile.phoneNumber || 'Not available'}`);
        console.log(`   Guardian Phone: ${profile.guardianPhone || 'Not available'}`);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        return {
            success: true,
            messageId: `msg_${Math.random().toString(36).substr(2, 32)}`,
            status: 'sent',
            message: 'Emergency email sent to support team'
        };
    } catch (error) {
        console.error('Emergency email failed:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
};

// Alert Notification Component
const AlertNotification = ({
    isVisible,
    onClose,
    studentName,
    guardianName,
    guardianPhone,
    message
}: AlertNotificationProps) => {
    const [callStatus, setCallStatus] = useState<'pending' | 'success' | 'error'>('pending');
    const [emailStatus, setEmailStatus] = useState<'pending' | 'success' | 'error'>('pending');

    useEffect(() => {
        if (isVisible) {
            // Reset statuses when alert becomes visible
            setCallStatus('pending');
            setEmailStatus('pending');

            // Simulate making emergency call
            const callTimer = setTimeout(() => {
                makeEmergencyCall(guardianPhone, 'Guardian', studentName)
                    .then(result => {
                        setCallStatus(result.success ? 'success' : 'error');
                    });
            }, 1500);

            // Simulate sending emergency email
            const emailTimer = setTimeout(() => {
                sendEmergencyEmail({
                    name: studentName,
                    guardianName,
                    guardianPhone,
                    phoneNumber: '123-456-7890'
                }).then(result => {
                    setEmailStatus(result.success ? 'success' : 'error');
                });
            }, 2500);

            return () => {
                clearTimeout(callTimer);
                clearTimeout(emailTimer);
            };
        }
    }, [isVisible, guardianPhone, studentName, guardianName]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4 p-6 bg-white rounded-xl shadow-2xl">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-full">
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-gray-900">Emergency Alert Sent</h3>
                            <p className="text-sm text-gray-600">We detected concerning content in the chat</p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="h-8 w-8 p-0 rounded-full"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <p className="text-sm font-medium text-red-800 mb-1">Concerning message:</p>
                    <p className="text-sm text-red-700 italic">"{message}"</p>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-gray-600" />
                            <div>
                                <p className="text-sm font-medium">Calling {guardianName}</p>
                                <p className="text-xs text-gray-500">{guardianPhone}</p>
                            </div>
                        </div>
                        <div>
                            {callStatus === 'pending' && (
                                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                            )}
                            {callStatus === 'success' && (
                                <CheckCircle className="w-6 h-6 text-green-500" />
                            )}
                            {callStatus === 'error' && (
                                <span className="text-xs text-red-500">Failed</span>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-gray-600" />
                            <div>
                                <p className="text-sm font-medium">Emailing Support Team</p>
                                <p className="text-xs text-gray-500">Emergency alert initiated</p>
                            </div>
                        </div>
                        <div>
                            {emailStatus === 'pending' && (
                                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                            )}
                            {emailStatus === 'success' && (
                                <CheckCircle className="w-6 h-6 text-green-500" />
                            )}
                            {emailStatus === 'error' && (
                                <span className="text-xs text-red-500">Failed</span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                        This alert was triggered by our system detecting potentially concerning content.
                        If this was a false positive, please ignore this notification.
                    </p>
                </div>
            </Card>
        </div>
    );
};

const PopupChat = ({ isOpen, onClose }: PopupChatProps) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [showProfileSetup, setShowProfileSetup] = useState(false);
    const [lastAlertTime, setLastAlertTime] = useState<number>(0);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Load conversation and profile from localStorage on mount
    useEffect(() => {
        console.log('PopupChat mounted, loading data...');

        const saved = localStorage.getItem('gemini-chat-conversation');
        if (saved) {
            try {
                const parsedMessages = JSON.parse(saved).map((msg: any) => ({
                    ...msg,
                    timestamp: new Date(msg.timestamp)
                }));
                setMessages(parsedMessages);
                console.log('Loaded conversation history:', parsedMessages.length, 'messages');
            } catch (error) {
                console.error('Error loading chat history:', error);
            }
        }

        const savedProfile = localStorage.getItem('gemini-chat-profile');
        if (savedProfile) {
            try {
                const profile = JSON.parse(savedProfile);
                setUserProfile(profile);
                console.log('Loaded user profile:', profile);
                setShowProfileSetup(false);
            } catch (error) {
                console.error('Error loading user profile:', error);
                setShowProfileSetup(true);
            }
        } else {
            console.log('No profile found, showing setup');
            setShowProfileSetup(true);
        }
    }, []);

    // Save conversation to localStorage whenever messages change
    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem('gemini-chat-conversation', JSON.stringify(messages));
        }
    }, [messages]);

    // Save profile to localStorage when it changes
    useEffect(() => {
        if (userProfile) {
            localStorage.setItem('gemini-chat-profile', JSON.stringify(userProfile));
            console.log('Saved user profile:', userProfile);
        }
    }, [userProfile]);

    // Depression detection function
    const detectDepressionSignals = (text: string): boolean => {
        const concerningPhrases = [
            'i want to die', 'i want to kill myself', 'end it all', 'no reason to live',
            'suicide', 'want to disappear', 'better off without me', 'hate myself',
            'can\'t go on', 'tired of living', 'give up', 'self harm', 'hurt myself',
            'never be happy', 'nothing matters', 'hopeless', 'helpless', 'worthless'
        ];

        const lowercaseText = text.toLowerCase();
        const detected = concerningPhrases.some(phrase => lowercaseText.includes(phrase));

        if (detected) {
            console.log('🚨 Depression signal detected:', text);
        }

        return detected;
    };

    // Trigger emergency alert
    const triggerEmergencyAlert = async (message: string) => {
        // Prevent too frequent alerts (at least 30 minutes between alerts)
        const now = Date.now();
        if (now - lastAlertTime < 30 * 60 * 1000) {
            console.log('Alert skipped: too soon since last alert');
            return;
        }

        if (!userProfile) {
            console.error('Cannot trigger alert: no user profile');
            return;
        }

        setLastAlertTime(now);
        setAlertMessage(message);
        setShowAlert(true);

        console.log('🚨 DEPRESSION ALERT TRIGGERED');
        console.log(`Message: ${message}`);
        console.log(`User: ${userProfile.name}`);

        // Call guardian
        if (userProfile.guardianPhone) {
            await makeEmergencyCall(
                userProfile.guardianPhone,
                'Guardian',
                userProfile.name
            );
        }

        // Send email alert
        await sendEmergencyEmail(userProfile);
    };

    // Smart AI Response Generator (Mock)
    const generateAIResponse = async (userMessage: string): Promise<string> => {
        console.log('🤖 Generating AI response for:', userMessage);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

        const lowercaseMessage = userMessage.toLowerCase();

        // Mental health related responses
        if (lowercaseMessage.includes('stress') || lowercaseMessage.includes('anxious') || lowercaseMessage.includes('anxiety')) {
            const responses = [
                "I understand that stress and anxiety can be overwhelming. Remember to take deep breaths and focus on one thing at a time. Would you like to talk more about what's causing these feelings?",
                "Stress is a natural response, but it's important to manage it. Try some deep breathing exercises or take a short walk. You're not alone in this - I'm here to listen.",
                "Anxiety can feel overwhelming, but there are ways to cope. Have you tried mindfulness exercises or talking to someone you trust about how you're feeling?"
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }

        if (lowercaseMessage.includes('sad') || lowercaseMessage.includes('depress') || lowercaseMessage.includes('down')) {
            const responses = [
                "I'm really sorry you're feeling this way. Your feelings are valid and important. Sometimes just expressing how we feel can help lighten the load.",
                "It sounds like you're going through a tough time. Remember that it's okay to not be okay. Would it help to talk about what's been weighing on you?",
                "I hear that you're feeling down. These feelings can be really challenging. You're showing strength by reaching out, and that's something to be proud of."
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }

        if (lowercaseMessage.includes('angry') || lowercaseMessage.includes('frustrat') || lowercaseMessage.includes('mad')) {
            const responses = [
                "Anger is a natural emotion, and it's okay to feel this way. Sometimes taking a moment to pause and breathe can help. Would you like to explore what's triggering these feelings?",
                "I understand you're feeling frustrated. It might help to step away for a moment and do something calming. Remember, your feelings are valid.",
                "Anger can be overwhelming. Try some physical activity or deep breathing to help release that energy. I'm here to listen if you want to talk it through."
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }

        if (lowercaseMessage.includes('lonely') || lowercaseMessage.includes('alone') || lowercaseMessage.includes('isolat')) {
            const responses = [
                "Feeling lonely can be really difficult. Remember that you matter and there are people who care about you. Would you like to talk about what's making you feel this way?",
                "Loneliness can be challenging, but you're not alone in feeling this way. Reaching out is a brave first step. I'm here to listen whenever you need.",
                "I hear that you're feeling lonely. Sometimes connecting with others, even in small ways, can help. You're important and your feelings matter."
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }

        if (lowercaseMessage.includes('sleep') || lowercaseMessage.includes('tired') || lowercaseMessage.includes('exhaust')) {
            const responses = [
                "Sleep issues can really affect our wellbeing. Establishing a relaxing bedtime routine might help. Have you tried limiting screen time before bed?",
                "Feeling tired can make everything seem more difficult. Remember to be gentle with yourself and prioritize rest. Your body is telling you it needs care.",
                "Sleep is so important for mental health. Try creating a calm environment before bed - maybe some gentle music or reading. How have you been sleeping lately?"
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }

        // General supportive responses
        const generalResponses = [
            "Thank you for sharing that with me. I'm here to listen and support you. How are you feeling about this?",
            "I appreciate you opening up. Your feelings are completely valid. Would you like to explore this more together?",
            "I'm really glad you reached out. Sometimes just talking about what we're going through can make a difference. How can I best support you right now?",
            "I hear what you're saying, and I want you to know that you're not alone in this. Your wellbeing matters to me.",
            "Thank you for trusting me with this. It takes courage to share what you're experiencing. Let's work through this together.",
            "I understand this might be difficult to talk about. Take your time - I'm here to listen whenever you're ready.",
            "Your feelings are important, and I'm here to support you. What's been on your mind lately?",
            "I can hear that you're going through something challenging. Remember to be kind to yourself during this time.",
            "It sounds like you're dealing with a lot right now. I'm here to help you navigate these feelings.",
            "Thank you for being open with me. Your perspective is valuable, and I'm here to support you."
        ];

        // For casual/non-mental health questions
        if (lowercaseMessage.includes('hello') || lowercaseMessage.includes('hi') || lowercaseMessage.includes('hey')) {
            return "Hello! I'm here to listen and support you. How are you feeling today?";
        }

        if (lowercaseMessage.includes('how are you')) {
            return "I'm here and ready to listen to whatever you'd like to share. How are you really doing today?";
        }

        if (lowercaseMessage.includes('thank')) {
            return "You're very welcome. I'm glad I can be here for you. Remember, it's okay to reach out whenever you need support.";
        }

        // Default mental health focused response
        return generalResponses[Math.floor(Math.random() * generalResponses.length)];
    };

    const handleSend = async () => {
        console.log('🎯 handleSend triggered');

        if (!input.trim()) {
            console.log('Input empty, returning');
            return;
        }

        if (loading) {
            console.log('Already loading, returning');
            return;
        }

        const content = input.trim();
        console.log('📝 Processing message:', content);
        setLoading(true);

        // Check for concerning content
        if (detectDepressionSignals(content) && userProfile) {
            console.log('🚨 Triggering emergency alert');
            triggerEmergencyAlert(content);
        }

        // Add user message immediately
        const userMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: 'user',
            content,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]);
        setInput("");

        try {
            console.log('🔄 Generating AI response...');
            const reply = await generateAIResponse(content);

            const assistantMessage: ChatMessage = {
                id: crypto.randomUUID(),
                role: 'assistant',
                content: reply,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, assistantMessage]);
            console.log('✅ Message processed successfully');
        } catch (error) {
            console.error('❌ Chat error:', error);
            const errorMessage: ChatMessage = {
                id: crypto.randomUUID(),
                role: 'assistant',
                content: "I'm having trouble responding right now. Please try again in a moment.",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
            console.log('🏁 Request completed');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const clearConversation = () => {
        console.log('🗑️ Clearing conversation');
        setMessages([]);
        localStorage.removeItem('gemini-chat-conversation');
    };

    const handleProfileSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('📋 Profile form submitted');

        const formData = new FormData(e.target as HTMLFormElement);

        const profile: UserProfile = {
            name: formData.get('name') as string,
            phoneNumber: formData.get('phoneNumber') as string || undefined,
            guardianName: formData.get('guardianName') as string,
            guardianPhone: formData.get('guardianPhone') as string,
            guardianEmail: formData.get('guardianEmail') as string || undefined
        };

        console.log('💾 Setting user profile:', profile);
        setUserProfile(profile);
        setShowProfileSetup(false);
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed bottom-4 right-4 z-50">
                <Card className={`border-0 shadow-2xl bg-white/95 backdrop-blur-sm rounded-3xl flex flex-col transition-all duration-300 ${isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'
                    }`}>
                    {/* Header */}
                    <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-3xl">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                                <Bot className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-semibold text-sm">AI Wellness Assistant</p>
                                <p className="text-xs opacity-90">Here to support you</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {messages.length > 0 && (
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={clearConversation}
                                    className="h-8 w-8 p-0 text-white hover:bg-white/20"
                                    title="Clear conversation"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            )}
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setIsMinimized(!isMinimized)}
                                className="h-8 w-8 p-0 text-white hover:bg-white/20"
                                title={isMinimized ? "Maximize" : "Minimize"}
                            >
                                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                            </Button>
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={onClose}
                                className="h-8 w-8 p-0 text-white hover:bg-white/20"
                                title="Close chat"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {!isMinimized && (
                        <>
                            {showProfileSetup ? (
                                // Profile Setup Form
                                <div className="p-4 space-y-4 overflow-auto">
                                    <div className="flex items-center gap-2 text-amber-600 mb-2">
                                        <AlertTriangle className="w-5 h-5" />
                                        <h3 className="font-semibold">Emergency Contact Setup</h3>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-4">
                                        For your safety, we need to set up emergency contacts.
                                        This information will only be used if concerning content is detected.
                                    </p>

                                    <form onSubmit={handleProfileSubmit} className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-700 mb-1 block">Your Name</label>
                                            <Input
                                                name="name"
                                                required
                                                className="w-full"
                                                placeholder="Enter your full name"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium text-gray-700 mb-1 block">Your Phone (optional)</label>
                                            <Input
                                                name="phoneNumber"
                                                type="tel"
                                                className="w-full"
                                                placeholder="Your phone number"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium text-gray-700 mb-1 block">Guardian's Name</label>
                                            <Input
                                                name="guardianName"
                                                required
                                                className="w-full"
                                                placeholder="Guardian's full name"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium text-gray-700 mb-1 block">Guardian's Phone *</label>
                                            <Input
                                                name="guardianPhone"
                                                type="tel"
                                                required
                                                className="w-full"
                                                placeholder="Guardian's phone number"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium text-gray-700 mb-1 block">Guardian's Email (optional)</label>
                                            <Input
                                                name="guardianEmail"
                                                type="email"
                                                className="w-full"
                                                placeholder="Guardian's email address"
                                            />
                                        </div>

                                        <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
                                            Save and Continue
                                        </Button>
                                    </form>
                                </div>
                            ) : (
                                <>
                                    {/* Messages */}
                                    <div className="flex-1 overflow-auto p-4 space-y-4">
                                        {messages.length === 0 ? (
                                            <div className="text-center py-8 text-gray-500">
                                                <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                                <p className="text-sm font-medium">Start a conversation</p>
                                                <p className="text-xs">I'm here to listen and support you</p>
                                            </div>
                                        ) : (
                                            <>
                                                {messages.map((message) => (
                                                    <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                        <div className={`max-w-[80%] flex gap-2 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === 'user'
                                                                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                                                                : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600'
                                                                }`}>
                                                                {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                                            </div>
                                                            <div className={`px-4 py-2 rounded-2xl ${message.role === 'user'
                                                                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                                                                : 'bg-gray-100 text-gray-800'
                                                                }`}>
                                                                <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                                                                <div className={`text-xs mt-1 opacity-70 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                                                                    }`}>
                                                                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                {loading && (
                                                    <div className="flex justify-start">
                                                        <div className="flex gap-2">
                                                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 flex items-center justify-center flex-shrink-0">
                                                                <Bot className="w-4 h-4" />
                                                            </div>
                                                            <div className="px-4 py-2 rounded-2xl bg-gray-100 text-gray-800">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="flex space-x-1">
                                                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                                                    </div>
                                                                    <span className="text-xs text-gray-500">AI is thinking...</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                        <div ref={messagesEndRef} />
                                    </div>

                                    {/* Input */}
                                    <div className="p-4 border-t border-gray-200">
                                        <div className="flex items-center gap-3">
                                            <Input
                                                value={input}
                                                onChange={(e) => setInput(e.target.value)}
                                                placeholder="Type your message..."
                                                className="flex-1 h-11 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors"
                                                onKeyDown={handleKeyPress}
                                                disabled={loading}
                                            />
                                            <Button
                                                onClick={handleSend}
                                                disabled={loading || !input.trim()}
                                                className="h-11 px-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl"
                                            >
                                                <Send className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </Card>
            </div>

            <AlertNotification
                isVisible={showAlert}
                onClose={() => setShowAlert(false)}
                studentName={userProfile?.name || "Student"}
                guardianName={userProfile?.guardianName || "Guardian"}
                guardianPhone={userProfile?.guardianPhone || ""}
                message={alertMessage}
            />
        </>
    );
};

export default PopupChat;