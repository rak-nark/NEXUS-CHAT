import { useState, useRef, useEffect } from "react";

const ChatInput = ({ onSend, loading }) => {
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);
  const [recording, setRecording] = useState(false);
  const textareaRef = useRef(null);
  const fileRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = ta.scrollHeight + "px";
    if (ta.scrollHeight > 200) {
      ta.style.overflowY = "scroll";
      ta.style.height = "200px";
    } else {
      ta.style.overflowY = "hidden";
    }
  }, [value]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!value.trim() && !file) return;
    onSend(value.trim(), file || undefined);
    setValue("");
    setFile(null);
  };

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;

    const allowed = ["image/png", "image/jpeg", "image/webp", "image/gif", "application/pdf", "text/plain"];
    if (!allowed.includes(f.type)) {
      alert("Formato no soportado. Usa: PNG, JPEG, WebP, GIF, PDF o TXT.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(",")[1];
      setFile({ name: f.name, mimeType: f.type, data: base64 });
    };
    reader.readAsDataURL(f);
    e.target.value = "";
  };

  const toggleMic = () => {
    if (recording) {
      recognitionRef.current?.stop();
      setRecording(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("La grabación de voz no está disponible en este navegador. Usa Chrome o Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "es-ES";
    recognition.interimResults = true;
    recognitionRef.current = recognition;

    recognition.onresult = (e) => {
      setValue(e.results[0][0].transcript);
    };

    recognition.onerror = () => setRecording(false);
    recognition.onend = () => setRecording(false);

    recognition.start();
    setRecording(true);
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-center pointer-events-none">
      <form onSubmit={handleSubmit} className="w-full max-w-[800px] glass-effect border border-outline-variant rounded-2xl p-2 shadow-2xl pointer-events-auto cyan-glow transition-all">
        {file && (
          <div className="flex items-center gap-2 px-4 pt-2 pb-1">
            <span className="material-symbols-outlined text-[18px] text-primary">description</span>
            <span className="text-xs text-on-surface-variant truncate flex-1">{file.name}</span>
            <button type="button" className="text-outline hover:text-error transition-colors" onClick={() => setFile(null)}>
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        )}
        <div className="flex items-end gap-2 px-2">
          <button type="button" className="p-2.5 text-on-surface-variant hover:text-primary transition-colors rounded-lg" onClick={() => fileRef.current?.click()}>
            <span className="material-symbols-outlined">attach_file</span>
          </button>
          <input ref={fileRef} type="file" className="hidden" onChange={handleFile} accept="image/png,image/jpeg,image/webp,image/gif,application/pdf,text/plain" />
          <textarea
            ref={textareaRef}
            className="flex-1 bg-transparent border-none focus:ring-0 text-on-surface py-3 chat-scrollbar resize-none text-base placeholder:text-outline disabled:opacity-50"
            placeholder={loading ? "La IA está pensando..." : "Escribe un mensaje..."}
            rows={1}
            value={value}
            disabled={loading}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !loading) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <div className="flex items-center gap-1 pb-1.5">
            <button
              type="button"
              className={`p-2.5 rounded-lg transition-colors ${recording ? "text-error animate-pulse" : "text-on-surface-variant hover:text-primary"}`}
              onClick={toggleMic}
              title={recording ? "Detener grabación" : "Grabar voz"}
            >
              <span className="material-symbols-outlined">{recording ? "stop_circle" : "mic"}</span>
            </button>
            <button type="submit" disabled={loading || (!value.trim() && !file)} className="bg-primary-container text-on-primary-container p-2.5 rounded-xl hover:brightness-110 transition-all shadow-lg active:scale-95 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
              <span className="material-symbols-outlined">{loading ? "hourglass_top" : "send"}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
