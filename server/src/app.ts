import "dotenv/config";
import express from "express";
import ragRoutes from "./routes/ragRoutes"; // 👈 nouvel import

const app = express();

app.use(express.json());

app.use("/api/rag", ragRoutes); // 👈 branchement des routes

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
