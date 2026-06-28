import { useState, useEffect, useCallback } from "react";

const commands = [
  { id: "clear", label: "Nuevo Chat", icon: "add_comment", shortcut: "Ctrl+K" },
  { id: "model-flash", label: "Modelo: Gemini 2.5 Flash", icon: "bolt", shortcut: "" },
  { id: "model-pro", label: "Modelo: Gemini 2.5 Pro", icon: "auto_awesome", shortcut: "" },
];

const CommandPalette = ({ onClose, onCommand }) => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);

  const filtered = query
    ? commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()))
    : commands;

  const handleKey = useCallback(
    (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && filtered[selected]) {
        e.preventDefault();
        onCommand(filtered[selected].id);
        onClose();
      } else if (e.key === "Escape") {
        onClose();
      }
    },
    [filtered, selected, onCommand, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-xl bg-surface-container-high border border-outline-variant rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 border-b border-outline-variant">
          <span className="material-symbols-outlined text-outline">search</span>
          <input
            className="flex-1 bg-transparent border-none focus:ring-0 text-on-surface py-4 text-base placeholder:text-outline"
            placeholder="Buscar comandos..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(0);
            }}
            autoFocus
          />
        </div>
        <div className="py-2 max-h-64 overflow-y-auto">
          {filtered.map((cmd, i) => (
            <button
              key={cmd.id}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                i === selected ? "bg-surface-variant text-on-surface" : "text-on-surface-variant"
              }`}
              onClick={() => {
                onCommand(cmd.id);
                onClose();
              }}
              onMouseEnter={() => setSelected(i)}
            >
              <span className="material-symbols-outlined text-[20px]">{cmd.icon}</span>
              <span className="flex-1 text-label-md">{cmd.label}</span>
              {cmd.shortcut && (
                <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-outline/20 text-outline">{cmd.shortcut}</kbd>
              )}
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-outline py-8 text-sm">Sin resultados</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
