import { Request, Response } from "express";
import { askDocuments } from "../services/ragService";

export async function ask(req: Request, res: Response) {
  const { question } = req.body;

  if (!question || typeof question !== "string") {
    return res.status(400).json({ error: "The 'question' field is required and must be a string." });
  }

  try {
    const result = await askDocuments(question);
    res.json(result);
  } catch (error) {
    console.error("Error in askDocuments:", error);
    res.status(500).json({ error: "Something went wrong while processing your question." });
  }
}