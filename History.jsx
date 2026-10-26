import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function History() {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    axios.get(`${API_URL}/history/`)
      .then((response) => {
        if (!cancelled) {
          setHistory(response.data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("Could not load summary history. Check that the backend is running and try again.");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="page-container">
      <h1>Summary History</h1>
      {isLoading && <p>Loading summaries...</p>}
      {error && <p role="alert">{error}</p>}
      {!isLoading && !error && history.length === 0 && (
        <p>No summaries yet. Generate one to see it here.</p>
      )}
      {history.map((item) => (
        <article key={item.id} className="history-card">
          <h2>Summary #{item.id}</h2>
          <p><strong>Original:</strong> {item.original_text}</p>
          <p><strong>Summary:</strong> {item.summarized_text}</p>
        </article>
      ))}
    </main>
  );
}

export default History;