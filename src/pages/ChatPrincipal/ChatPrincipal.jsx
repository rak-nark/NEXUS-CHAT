import { useState, useEffect } from "react";
import { useChat } from "../../hooks/useChat";
import ConversationList from "./components/ConversationList";
import ChatInput from "./components/ChatInput";
import CommandPalette from "../../components/CommandPalette";

const ChatPrincipal = () => {
  const { messages, loading, sendMessage, clearMessages } = useChat();
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    const onNewChat = () => clearMessages();
    document.addEventListener("keydown", onKey);
    window.addEventListener("nexus:newchat", onNewChat);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("nexus:newchat", onNewChat);
    };
  }, [clearMessages]);

  const handleSend = (text) => {
    if (text.trim()) sendMessage(text);
  };

  const handleSuggestion = (text) => {
    sendMessage(text);
  };

  const handleCommand = (id) => {
    if (id === "clear") clearMessages();
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      <ConversationList messages={messages} loading={loading} onSuggestion={handleSuggestion} />
      <ChatInput onSend={handleSend} loading={loading} />
      {paletteOpen && (
        <CommandPalette onClose={() => setPaletteOpen(false)} onCommand={handleCommand} />
      )}
    </div>
  );
};

export default ChatPrincipal;
