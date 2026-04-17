import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Headphones } from "lucide-react";
import { getWhatsAppLink } from "@/data/products";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const CHAT_API =
  "https://wfthvovlhphnrodrqxqt.supabase.co/functions/v1/chat-sarilemon";
const WELCOME_MESSAGE =
  "Halo! Saya asisten virtual SariLemon. Ada yang bisa saya bantu seputar produk sari lemon murni kami?";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const FloatingContact = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
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
        body: JSON.stringify({ message: text, history: messages }),
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

  const handleMainToggle = () => {
    if (chatOpen) {
      setChatOpen(false);
    } else {
      setMenuOpen((prev) => !prev);
    }
  };

  const handleAIAssistant = () => {
    setMenuOpen(false);
    setChatOpen(true);
  };

  return (
    <>
      {/* Chatbot Window */}
      {chatOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[340px] sm:w-[380px] max-h-[500px] bg-card rounded-2xl overflow-hidden flex flex-col border border-border transition-all duration-300"
          style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.18)" }}
        >
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
              onClick={() => setChatOpen(false)}
              className="text-primary-foreground/80 hover:text-primary-foreground"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

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

      {/* Speed Dial Items */}
      <div
        className={`fixed bottom-[5.5rem] right-6 z-50 flex flex-col items-end gap-3 transition-all duration-300 ${
          menuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {/* AI Assistant */}
        <div className="flex items-center gap-3">
          <span className="bg-white text-gray-700 text-sm font-medium px-3 py-1.5 rounded-full shadow-md select-none">
            AI Assistant
          </span>
          <button
            onClick={handleAIAssistant}
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            style={{ background: "linear-gradient(135deg, hsl(95,50%,48%) 0%, hsl(95,55%,30%) 100%)" }}
            aria-label="AI Assistant"
          >
            <Bot className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* WhatsApp */}
        <div className="flex items-center gap-3">
          <span className="bg-white text-gray-700 text-sm font-medium px-3 py-1.5 rounded-full shadow-md select-none">
            WhatsApp
          </span>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            aria-label="Chat via WhatsApp"
          >
            <WhatsAppIcon />
          </a>
        </div>
      </div>

      {/* Main FAB Toggle */}
      <button
        onClick={handleMainToggle}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full text-white shadow-lg hover:scale-105 transition-transform"
        style={{
          background: "linear-gradient(135deg, hsl(95,50%,50%) 0%, hsl(95,55%,30%) 100%)",
          boxShadow: "0 4px 20px rgba(60, 110, 40, 0.45)",
        }}
        aria-label="Hubungi Kami"
      >
        {menuOpen || chatOpen ? (
          <>
            <X className="w-5 h-5" />
            <span className="font-semibold text-sm">Tutup</span>
          </>
        ) : (
          <>
            <Headphones className="w-5 h-5" />
            <span className="font-semibold text-sm">Hubungi Kami</span>
          </>
        )}
      </button>
    </>
  );
};

export default FloatingContact;
