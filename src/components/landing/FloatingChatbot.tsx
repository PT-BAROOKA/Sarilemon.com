import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, MessageCircle } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const CHAT_API =
  "https://wfthvovlhphnrodrqxqt.supabase.co/functions/v1/chat-sarilemon";
const WELCOME_MESSAGE =
  "Halo! Saya asisten virtual SariLemon. Ada yang bisa saya bantu seputar produk sari lemon murni kami?";

const FloatingChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(CHAT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages,
        }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Maaf, terjadi gangguan. Silakan hubungi WhatsApp kami di 0856-4748-6700.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[340px] sm:w-[380px] max-h-[500px] bg-card rounded-2xl overflow-hidden flex flex-col border border-border"
          style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.18)" }}
        >
          {/* Header - hijau tua (primary) */}
          <div className="bg-primary px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary-foreground" />
              <div>
                <p className="font-display text-sm font-semibold text-primary-foreground">
                  SariLemon AI
                </p>
                <p className="text-[10px] text-primary-foreground/70">
                  Asisten Virtual
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-primary-foreground/80 hover:text-primary-foreground"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-3 bg-background"
            style={{ maxHeight: "340px" }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-card text-card-foreground border border-border rounded-bl-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-card text-card-foreground border border-border px-3 py-2 rounded-xl rounded-bl-sm text-sm">
                  <span className="animate-pulse">Mengetik...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-3 flex items-center gap-2 bg-card">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ketik pesan..."
              disabled={loading}
              className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Send className="w-4 h-4 text-primary-foreground" />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button - posisi di kiri WhatsApp */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-24 z-50 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="Chat Bot"
      >
        {open ? (
          <X className="w-7 h-7 text-primary-foreground" />
        ) : (
          <MessageCircle className="w-7 h-7 text-primary-foreground" />
        )}
      </button>
    </>
  );
};

export default FloatingChatbot;
