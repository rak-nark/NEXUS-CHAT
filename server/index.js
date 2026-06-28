import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import chatRouter from "./routes/chat.js";

const app = express();
const PORT = process.env.PORT || 3001;

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { error: "Demasiadas solicitudes. Intenta de nuevo en un minuto." },
});

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use("/api/chat", limiter);
app.use("/api/chat", chatRouter);

app.listen(PORT, () => {
  console.log(`Nexus Chat API running on http://localhost:${PORT}`);
});
