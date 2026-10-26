import { useState } from "react";
import {
  FaCompressAlt,
  FaCopy,
  FaTrash
} from "react-icons/fa";
import { summarizeText } from "../Services/api";
import GlassHeadlineHero from "../components/ui/glass-headline-hero";

const LENGTH_LABELS = {
  short: "Short — 1 key sentence",
  medium: "Medium — up to 3 key sentences",
  long: "Long — up to 5 key sentences",
};

function Summarize() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [summaryOptions, setSummaryOptions] = useState(null);
  const [length, setLength] = useState("medium");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const trimmedText = text.trim();
  const wordCount = trimmedText ? trimmedText.split(/\s+/).length : 0;
  const characterCount = text.length;

  const handleSummary = async (event) => {
    event.preventDefault();
    if (!text.trim()) {
      setError("Paste some text before generating a summary.");
      setSummary("");
      return;
    }

    setError("");
    setSummary("");
    setSummaryOptions(null);
    setIsLoading(true);

    try {
      const result = await summarizeText(text, length);
      setSummary(result.summary);
      setSummaryOptions({ length });
    } catch (requestError) {
      setError(
        requestError.response?.data?.detail ||
          "Could not generate a summary. Check that the backend is running and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const copyText = async () => {
    await navigator.clipboard.writeText(summary);
  };

  const clearText = () => {
    setText("");
    setSummary("");
    setSummaryOptions(null);
    setError("");
  };

  return (
    <main className="summarize-page">
      <header className="page-heading">
        <GlassHeadlineHero
          eyebrow="A quieter way to read"
          title="Find the point. Skip the noise."
          description="A concise recap of the ideas that matter most."
          primaryAction={{ label: "Start now", href: "#source-text" }}
          secondaryAction={{ label: "See how it works", href: "#capabilities-heading" }}
          height="360px"
          className="heading-hero"
        />
      </header>

      <form
        className="summarize-form"
        onSubmit={handleSummary}
        dir="ltr"
      >
        <label htmlFor="source-text">Text to summarize</label>
        <textarea
          id="source-text"
          dir="auto"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Paste your text here..."
          rows={9}
        />
        <div className="text-meta" aria-live="polite">
          <span>
            {wordCount.toLocaleString()} {wordCount === 1 ? "word" : "words"}
            {" · "}
            {characterCount.toLocaleString()} {characterCount === 1 ? "character" : "characters"}
          </span>
          <span>Summary keeps the key points, not every sentence.</span>
        </div>

        <div className="summary-options">
          <div className="summary-option">
            <label htmlFor="summary-length">Summary length</label>
            <select
              id="summary-length"
              value={length}
              onChange={(event) => setLength(event.target.value)}
            >
              <option value="short">{LENGTH_LABELS.short}</option>
              <option value="medium">{LENGTH_LABELS.medium}</option>
              <option value="long">{LENGTH_LABELS.long}</option>
            </select>
          </div>
        </div>
        <div className="actions">
          <button type="submit" disabled={isLoading}>
            <FaCompressAlt aria-hidden="true" />
            {isLoading ? "Summarizing..." : "Summarize"}
          </button>
          <button type="button" onClick={copyText} disabled={!summary}>
            <FaCopy aria-hidden="true" />
            Copy
          </button>
          <button type="button" onClick={clearText}>
            <FaTrash aria-hidden="true" />
            Clear
          </button>
        </div>

        {error && <p className="form-error" role="alert">{error}</p>}
      </form>

      {summary && (
        <section className="result" aria-live="polite">
          <h2>Your summary</h2>
          <p dir="auto">{summary}</p>
          {summaryOptions && (
            <dl className="summary-result-options">
              <div>
                <dt>Length</dt>
                <dd>{LENGTH_LABELS[summaryOptions.length]}</dd>
              </div>
            </dl>
          )}
        </section>
      )}

      <section className="info-section" aria-labelledby="capabilities-heading">
        <p className="eyebrow">A QUICKER WAY TO READ</p>
        <h2 id="capabilities-heading">What you can do</h2>
        <div className="info-grid">
          <article className="info-card">
            <h3>Get to the main points</h3>
            <p>Condense pasted text into a shorter version that is easier to scan.</p>
          </article>
          <article className="info-card">
            <h3>Choose your level of detail</h3>
            <p>Choose a short, medium, or long summary to fit the time you have.</p>
          </article>
          <article className="info-card">
            <h3>Copy and reuse</h3>
            <p>Copy your result for notes, study, or your own working documents.</p>
          </article>
        </div>
      </section>

      <section className="info-section" aria-labelledby="how-to-heading">
        <p className="eyebrow">THREE SIMPLE STEPS</p>
        <h2 id="how-to-heading">How to use the summarizer</h2>
        <ol className="steps-list">
          <li><strong>Paste your text.</strong> Add the passage you want to shorten.</li>
          <li><strong>Choose a length.</strong> Select short, medium, or long.</li>
          <li><strong>Generate your summary.</strong> Review the result, copy it, or clear the form to start again.</li>
        </ol>
      </section>

      <section className="info-section" aria-labelledby="audience-heading">
        <p className="eyebrow">MADE FOR EVERYDAY READING</p>
        <h2 id="audience-heading">Who can use it?</h2>
        <p className="info-intro">
          Anyone who wants a quicker way to review text can use the summarizer.
          It can be helpful for students reviewing study material, professionals
          scanning notes or reports, and readers who want a shorter version of a passage.
        </p>
      </section>

      <section className="info-section" aria-labelledby="length-guide-heading">
        <p className="eyebrow">PICK THE DETAIL YOU NEED</p>
        <h2 id="length-guide-heading">Summarize your content in these ways</h2>
        <div className="info-grid length-grid">
          <article className="info-card">
            <h3>Short</h3>
            <p>One sentence for a very quick overview.</p>
          </article>
          <article className="info-card">
            <h3>Medium</h3>
            <p>Up to three sentences for a compact recap.</p>
          </article>
          <article className="info-card">
            <h3>Long</h3>
            <p>Up to five sentences for a little more context.</p>
          </article>
          <article className="info-card">
          </article>
        </div>
        <p className="options-note">
          The summary picks the most relevant sentences across your text,
          rather than repeating only its opening lines.
        </p>
      </section>
    </main>
  );
}

export default Summarize;