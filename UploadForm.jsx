import { useState } from "react";

function UploadForm() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateSummary = async () => {
    if (!text.trim()) {
      setError("Enter some text before generating a summary.");
      setSummary("");
      return;
    }

    setError("");
    setSummary("");
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/summarize/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, language: "English" }),
      });

      if (!response.ok) {
        throw new Error(`Summary request failed (${response.status}).`);
      }

      const data = await response.json();
      setSummary(data.summary);
    } catch {
      setError("Unable to generate a summary. Check that the backend is running and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <label htmlFor="source-text">Paste your text</label>
      <textarea
        id="source-text"
        rows="12"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste text here"
      />

      <button onClick={generateSummary} disabled={isLoading}>
        {isLoading ? "Generating..." : "Generate Summary"}
      </button>

      {error && <p role="alert">{error}</p>}
      {summary && (
        <div className="summary-box" aria-live="polite">
          <h2>Your summary</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default UploadForm;