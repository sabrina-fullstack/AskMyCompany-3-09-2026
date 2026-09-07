import { sql } from "../db";
import { createEmbedding } from "./embeddingService";

function toVectorString(embedding: number[]): string {
  return `[${embedding.join(",")}]`;
}

export async function addDocument(title: string, content: string) {
  const embedding = await createEmbedding(content);
  const vector = toVectorString(embedding);

  const result = await sql`
    INSERT INTO documents (title, content, embedding)
    VALUES (${title}, ${content}, ${vector}::vector)
    RETURNING document_id, title, content
  `;

  return result[0];
}

export async function searchDocuments(
  question: string,
  limit: number = 3,
  threshold: number = 0.7,
) {
  const embedding = await createEmbedding(question);
  const vector = toVectorString(embedding);

  const documents = await sql`
    SELECT
      document_id,
      title,
      content,
      embedding <=> ${vector}::vector AS distance
    FROM documents
    WHERE embedding <=> ${vector}::vector < ${threshold}
    ORDER BY embedding <=> ${vector}::vector
    LIMIT ${limit}
  `;

  return documents;
}
