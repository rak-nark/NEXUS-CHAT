import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

function toParts(msg) {
  const parts = [];
  if (msg.content?.trim()) parts.push({ text: msg.content });
  if (msg.file) parts.push({ inlineData: { mimeType: msg.file.mimeType, data: msg.file.data } });
  return parts;
}

export async function generateResponse(messages) {
  const contents = messages.map((msg) => ({
    role: msg.role === "user" ? "user" : "model",
    parts: toParts(msg),
  }));

  const response = await ai.models.generateContent({ model: MODEL, contents });
  return response.text;
}

export async function* generateResponseStream(messages) {
  const contents = messages.map((msg) => ({
    role: msg.role === "user" ? "user" : "model",
    parts: toParts(msg),
  }));

  const stream = await ai.models.generateContentStream({ model: MODEL, contents });

  for await (const chunk of stream) {
    if (chunk.text) yield chunk.text;
  }
}
