import { useState } from "react";
import "./AskDocuments.css";

export default function AskDocuments() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAsk() {
    if (!question.trim()) return;

    setLoading(true);
    setError("");
    setAnswer("");
    setSources([]);

    try {
      const response = await fetch("http://localhost:3000/api/rag/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setAnswer(data.answer);
      setSources(data.sources);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Is the server running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="ask-container">
      <h1 className="ask-title">Ask My Company</h1>
      <p className="ask-subtitle">
        Ask about refunds, shipping, warranty, support hours and payments.
      </p>

      <textarea
        className="ask-input"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question about the company..."
      />

      <div>
        <button className="ask-button" onClick={handleAsk} disabled={loading}>
          {loading ? "Thinking..." : "Ask"}
        </button>
      </div>

      {error && <p className="ask-error">{error}</p>}

      {answer && (
        <div className="ask-result">
          <h3>Answer</h3>
          <p>{answer}</p>

          <div className="ask-sources">
            <h4>Sources</h4>
            <ul>
              {sources.map((source, index) => (
                <li key={index}>{source}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
