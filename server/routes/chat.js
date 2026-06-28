import { Router } from "express";
import { generateResponse, generateResponseStream } from "../services/gemini.js";

const router = Router();
const MAX_MESSAGES = 50;
const MAX_LENGTH = 4000;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_MIME = [
  "image/png", "image/jpeg", "image/webp", "image/gif",
  "application/pdf", "text/plain",
];

function validate(req, res) {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: "Se requiere un array de mensajes" });
    return null;
  }

  if (messages.length > MAX_MESSAGES) {
    res.status(400).json({ error: `Máximo ${MAX_MESSAGES} mensajes por conversación` });
    return null;
  }

  const last = messages[messages.length - 1];

  if (last.file) {
    if (!last.file.mimeType || !last.file.data) {
      res.status(400).json({ error: "Archivo inválido: faltan mimeType o data" });
      return null;
    }
    if (!ALLOWED_MIME.includes(last.file.mimeType)) {
      res.status(400).json({ error: `Tipo de archivo no soportado: ${last.file.mimeType}` });
      return null;
    }
    const size = Math.round((last.file.data.length * 3) / 4);
    if (size > MAX_FILE_SIZE) {
      res.status(400).json({ error: `Archivo demasiado grande (máx ${MAX_FILE_SIZE / 1024 / 1024}MB)` });
      return null;
    }
  }

  if (!last.content?.trim() && !last.file) {
    res.status(400).json({ error: "El mensaje no puede estar vacío" });
    return null;
  }

  if (last.content && last.content.length > MAX_LENGTH) {
    res.status(400).json({ error: `El mensaje excede el límite de ${MAX_LENGTH} caracteres` });
    return null;
  }

  return messages;
}

router.post("/", async (req, res) => {
  try {
    const messages = validate(req, res);
    if (!messages) return;

    const text = await generateResponse(messages);
    res.json({ role: "ai", content: text, time: "IA • Ahora" });
  } catch (error) {
    console.error("Error en chat:", error);
    res.status(500).json({ error: "Error al generar respuesta" });
  }
});

router.post("/stream", async (req, res) => {
  try {
    const messages = validate(req, res);
    if (!messages) return;

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    const stream = generateResponseStream(messages);

    for await (const chunk of stream) {
      res.write(`data: ${JSON.stringify({ content: chunk })}\n\n`);
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (error) {
    console.error("Error en chat stream:", error);
    res.write(`data: ${JSON.stringify({ error: "Error al generar respuesta" })}\n\n`);
    res.end();
  }
});

export default router;
