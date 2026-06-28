import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1 hover:text-primary text-outline transition-colors"
      title="Copiar mensaje"
    >
      <span className="material-symbols-outlined text-[18px]">
        {copied ? "check" : "content_copy"}
      </span>
    </button>
  );
};

const LikeButton = () => {
  const [liked, setLiked] = useState(null);

  return (
    <>
      <button
        onClick={() => setLiked(liked === "up" ? null : "up")}
        className={`p-1 transition-colors ${liked === "up" ? "text-primary" : "text-outline hover:text-primary"}`}
        title="Me gusta"
      >
        <span className="material-symbols-outlined text-[18px]">thumb_up</span>
      </button>
      <button
        onClick={() => setLiked(liked === "down" ? null : "down")}
        className={`p-1 transition-colors ${liked === "down" ? "text-error" : "text-outline hover:text-error"}`}
        title="No me gusta"
      >
        <span className="material-symbols-outlined text-[18px]">thumb_down</span>
      </button>
    </>
  );
};

const MessageBubble = ({ role, content, time }) => {
  const isUser = role === "user";

  return (
    <div className={`flex items-start gap-4 ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
          isUser
            ? "bg-primary-container text-on-primary-container"
            : "bg-surface-container-highest text-primary border border-outline-variant"
        }`}
      >
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
          {isUser ? "person" : "smart_toy"}
        </span>
      </div>
      <div className={`flex-1 ${isUser ? "flex flex-col items-end" : ""}`}>
        <div
          className={`${isUser ? "bubble-user" : "bubble-ai"} p-4 rounded-xl text-base leading-relaxed ${
            isUser ? "shadow-lg" : "shadow-sm"
          }`}
        >
          {isUser ? (
            content
          ) : (
            <div className="markdown-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                {content || "▊"}
              </ReactMarkdown>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 mt-1.5">
          {time && <span className="text-[10px] text-outline">{time}</span>}
          {!isUser && (
            <div className="flex items-center gap-0.5 ml-1">
              <CopyButton text={content} />
              <LikeButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
