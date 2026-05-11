import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FlashDeck from "../components/FlashDeck.jsx";
import { fetchFlashcardDecks } from "../lib/api.js";
import "./Page.css";

export default function FlashcardsPage() {
  const [decks, setDecks] = useState([]);
  const [decksLoading, setDecksLoading] = useState(true);
  const [decksError, setDecksError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setDecksLoading(true);
    fetchFlashcardDecks()
      .then((data) => {
        if (!cancelled) {
          setDecks(Array.isArray(data) ? data : []);
          setDecksError(null);
        }
      })
      .catch((e) => {
        if (!cancelled) setDecksError(e.message ?? String(e));
      })
      .finally(() => {
        if (!cancelled) setDecksLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="page">
      <Link className="page-back" to="/">
        ← Back to CertPrep
      </Link>
      <section className="page-hero page-hero--dramatic">
        <p className="page-eyebrow page-eyebrow--row">
          <span className="ai-chip">Memorization</span>
          <span className="page-eyebrow-rest">Linux+ · CertPrep</span>
        </p>
        <h1 className="page-title page-title--gradient">Linux+ Flashcards</h1>
        <div className="tagline-stack">
          <p className="tagline-line">
            Drill key Linux+ concepts with bundled decks covering commands, FHS, permissions, systemd, networking, packages, storage, security, scripting, containers, troubleshooting, and kernel.
          </p>
          <p className="tagline-line tagline-line--accent">
            Flip the card, then step through with Previous / Next for lightning recall.
          </p>
        </div>
        <p className="hero-sparkle">
          Build muscle memory one concept at a time.
        </p>
      </section>

      <div className="panel flashcards-panel">
        <div className="panel-heading-row">
          <h2 className="panel-title" style={{ margin: 0 }}>
            Linux+ flashcards
          </h2>
          <span className="pill">Memorization</span>
        </div>
        <p className="panel-sub">
          Bundled Linux+ library served by the API (commands, FHS, permissions, systemd, networking, packages, storage,
          security, scripting, containers, troubleshooting, kernel). Flip the card, then step through with Previous / Next.
        </p>
        {decksLoading && <p className="empty-state">Loading flashcards…</p>}
        {decksError && <p className="error">{decksError}</p>}
        {!decksLoading && !decksError && decks.length === 0 && <p className="empty-state">No flashcard decks yet.</p>}
        {!decksLoading && !decksError && decks.length > 0 && (
          <div className="flashcards-grid">
            {decks.map((deck) => (
              <FlashDeck key={deck.id} deck={deck} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}