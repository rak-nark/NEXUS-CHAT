import { useState } from "react";

const API_URL = "http://localhost:3001/api/chat";

const welcomeMessage = {
  id: 1,
  role: "ai",
  content:
    "¡Hola! Soy Nexus Chat, tu asistente de inteligencia artificial. ¿En qué puedo ayudarte hoy? Podemos trabajar juntos en redacción, análisis de datos, programación o simplemente explorar conceptos complejos de forma sencilla.",
  time: "IA • Ahora",
};

export function useChat() {
  const [messages, setMessages] = useState([welcomeMessage]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text, file) => {
    const userMsg = { id: Date.now(), role: "user", content: text, time: "Tú • Ahora" };
    if (file) userMsg.file = { name: file.name, mimeType: file.mimeType, data: file.data };

    const updated = [...messages, userMsg];
    setMessages(updated);
    setLoading(true);

    const aiId = Date.now() + 1;
    setMessages((prev) => [...prev, { id: aiId, role: "ai", content: "", time: "IA • Ahora" }]);

    try {
      const res = await fetch(`${API_URL}/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });

      if (!res.ok) throw new Error("Error al conectar con la IA");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);
          if (!data) continue;

          try {
            const parsed = JSON.parse(data);
            if (parsed.done) break;
            if (parsed.error) throw new Error(parsed.error);
            if (parsed.content) {
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === aiId ? { ...msg, content: msg.content + parsed.content } : msg
                )
              );
            }
          } catch {}
        }
      }
    } catch (err) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiId ? { ...msg, content: `Error: ${err.message}` } : msg
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([welcomeMessage]);
  };

  return { messages, loading, sendMessage, clearMessages };
}
