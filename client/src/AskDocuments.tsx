import { useState } from "react";
import "./AskDocuments.css";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

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
      const response = await fetch(`${API_URL}/api/rag/ask`, {
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
    <div className="ask-page">
      <div className="ask-card">
        <div className="chalk-board">
          <span className="chalk-pin" aria-hidden="true"></span>
          <h1 className="ask-title">Ask My School</h1>
          <p className="ask-subtitle">
            Ask about enrollment, tuition, attendance, homework and school
            policies.
          </p>
        </div>

        <div className="ask-body">
          <textarea
            className="ask-input"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question about the school..."
          />

          <div>
            <button
              className="ask-button"
              onClick={handleAsk}
              disabled={loading}
            >
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
      </div>
    </div>
  );
}
