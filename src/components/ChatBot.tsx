import { useChatbot } from "@/hooks/useChatbot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageCircle, AlertTriangle } from "lucide-react";

const ChatBot = () => {
  const { messages, input, setInput, send, loading, alert, dismissAlert } = useChatbot();
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {alert.show && (
        <div className="mb-3 rounded-xl border bg-destructive/10 text-destructive p-3 flex items-start gap-2 max-w-xs">
          <AlertTriangle className="w-4 h-4 mt-0.5" />
          <div className="text-xs">
            <p className="font-semibold">Alert: Possible distress detected.</p>
            {alert.phoneNumber && (<p>Your Contact: {alert.phoneNumber}</p>)}
            {alert.guardianPhone && (<p>Guardian Contact: {alert.guardianPhone}</p>)}
            <Button size="sm" variant="outline" className="mt-2 h-7" onClick={dismissAlert}>Dismiss</Button>
          </div>
        </div>
      )}
      <Card className="w-80 h-96 border-0 shadow-large bg-background/80 backdrop-blur rounded-2xl flex flex-col">
        <div className="px-4 py-3 border-b flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center">
            <MessageCircle className="w-4 h-4" />
          </div>
          <p className="text-sm font-medium">Wellness Assistant</p>
        </div>
        <div className="flex-1 overflow-auto p-3 space-y-2">
          {messages.map(m => (
            <div key={m.id} className={`${m.role === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block px-3 py-2 rounded-xl text-sm ${m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-left">
              <div className="inline-block px-3 py-2 rounded-xl text-sm bg-muted animate-pulse">Typing…</div>
            </div>
          )}
        </div>
        <div className="p-3 border-t flex items-center gap-2">
          <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything…" className="h-10" onKeyDown={(e) => { if (e.key === 'Enter') send(); }} />
          <Button className="h-10" onClick={send} disabled={loading}>Send</Button>
        </div>
      </Card>
    </div>
  );
};

export default ChatBot;


