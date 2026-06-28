import MessageBubble from "./MessageBubble";

const suggestions = [
  { icon: "mail", title: "Ayúdame a escribir un correo", desc: "Formal o informal, tú decides el tono." },
  { icon: "science", title: "Explícame la computación cuántica", desc: "Conceptos complejos para principiantes." },
  { icon: "code", title: "Revisa mi código de Python", desc: "Optimización y corrección de bugs." },
  { icon: "auto_awesome", title: "Dame ideas de contenido", desc: "Para redes sociales o blogs personales." },
];

const ConversationList = ({ messages, loading, onSuggestion }) => {
  const hasInteracted = messages.some((m) => m.role === "user");

  return (
    <section className="flex-1 overflow-y-auto chat-scrollbar pt-24 pb-32 px-6 flex flex-col items-center">
      <div className="w-full max-w-[800px] space-y-8">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            role={msg.role}
            content={msg.content}
            time={msg.time}
          />
        ))}
        {loading && (
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-surface-container-highest text-primary border border-outline-variant">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
            </div>
            <div className="flex items-center gap-1.5 p-4 rounded-xl bg-[#334155]">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" style={{ animationDelay: "0.2s" }} />
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" style={{ animationDelay: "0.4s" }} />
            </div>
          </div>
        )}

        {!hasInteracted && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
            {suggestions.map((s, i) => (
              <button key={i} className="p-4 bg-surface-container border border-outline-variant rounded-xl text-left hover:border-primary transition-all group" onClick={() => onSuggestion?.(s.title)}>
                <span className="material-symbols-outlined text-primary mb-2">{s.icon}</span>
                <p className="text-label-md font-medium text-on-surface">{s.title}</p>
                <p className="text-[10px] text-outline mt-1">{s.desc}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ConversationList;
