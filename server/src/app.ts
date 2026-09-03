import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import ragRoutes from "./routes/ragRoutes";

const app = express();

// Autorise uniquement les origines connues
const allowedOrigins = [
  "http://localhost:5173", // dev local
  process.env.FRONTEND_URL ?? "", // URL de production (ajoutée plus tard)
].filter(Boolean);

app.use(cors({ origin: allowedOrigins }));

app.use(express.json());

// Maximum 20 requêtes par IP toutes les 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: "Too many requests. Please try again later." },
});

app.use("/api/rag", limiter, ragRoutes);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
