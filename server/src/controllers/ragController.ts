import { Request, Response } from "express";
import { askDocuments } from "../services/ragService";
import { searchDocuments, addDocument } from "../services/documentService";

export async function createDocument(req: Request, res: Response) {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  try {
    const document = await addDocument(title, content);
    res.status(201).json(document);
  } catch (error) {
    console.error("Error in createDocument:", error);
    res
      .status(500)
      .json({ error: "Something went wrong while creating the document." });
  }
}
export async function ask(req: Request, res: Response) {
  const { question } = req.body;

  if (!question || typeof question !== "string") {
    return res.status(400).json({
      error: "The 'question' field is required and must be a string.",
    });
  }

  try {
    const result = await askDocuments(question);
    res.json(result);
  } catch (error) {
    console.error("Error in askDocuments:", error);
    res
      .status(500)
      .json({ error: "Something went wrong while processing your question." });
  }
}

export async function search(req: Request, res: Response) {
  const { question, limit, threshold } = req.body;

  if (!question || typeof question !== "string") {
    return res.status(400).json({
      error: "The 'question' field is required and must be a string.",
    });
  }

  try {
    const results = await searchDocuments(
      question,
      limit ?? 3,
      threshold ?? 0.7,
    );
    res.json(results);
  } catch (error) {
    console.error("Error in searchDocuments:", error);
    res
      .status(500)
      .json({ error: "Something went wrong while searching documents." });
  }
}
export async function searchOne(req: Request, res: Response) {
  const { question } = req.body;

  if (!question || typeof question !== "string") {
    return res.status(400).json({
      error: "The 'question' field is required and must be a string.",
    });
  }

  try {
    const results = await searchDocuments(question, 1);
    const [top] = results;

    if (!top) {
      return res.status(404).json({ error: "No matching document found." });
    }

    res.json({ title: top.title, distance: top.distance });
  } catch (error) {
    console.error("Error in searchOne:", error);
    res
      .status(500)
      .json({ error: "Something went wrong while searching documents." });
  }
}
