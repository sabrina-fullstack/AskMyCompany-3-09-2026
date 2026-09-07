import { GoogleGenAI } from "@google/genai";
import { searchDocuments } from "./documentService";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const GENERATIVE_MODEL = process.env.GENERATIVE_MODEL as string;

export async function askDocuments(question: string) {
  const topK: number = 3;
  const documents = await searchDocuments(question, topK);

  const context = documents
    .map(
      (doc: any, index: number) => `
Document ${index + 1}

Title:
${doc.title}

Content:
${doc.content}
`,
    )
    .join("\n");

  const response = await ai.models.generateContent({
    model: GENERATIVE_MODEL,
    contents: `
Question:

${question}

Context:

${context}
    `,
    config: {
      systemInstruction: `
You answer questions using only
the supplied context.

If the answer is not present
in the context, say:

"I don't know based on the provided documents."

Do not invent information.
      `,
    },
  });

  return {
    answer: response.text,
    sources: documents.map((doc: any) => doc.title),
  };
}
