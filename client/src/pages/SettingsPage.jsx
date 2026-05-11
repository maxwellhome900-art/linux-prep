import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import "./Page.css";

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem("geminiApiKey") || "";
    setApiKey(savedKey);
  }, []);

  const handleSave = () => {
    localStorage.setItem("geminiApiKey", apiKey.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleClear = () => {
    setApiKey("");
    localStorage.removeItem("geminiApiKey");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Layout>
      <div className="page">
        <section className="page-hero">
          <p className="page-eyebrow">Settings</p>
          <h1 className="page-title">Personal API Key</h1>
          <p className="page-lead">
            Configure your personal Google Gemini API key to generate summaries and quizzes.
            Each student can use their own key for private usage.
          </p>
        </section>

        <div className="settings-container">
          <div className="settings-section">
            <h3>Google Gemini API Key</h3>
            <p>
              Enter your Google AI API key to enable AI-powered summary and quiz generation.
              Get your key from{" "}
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google AI Studio
              </a>
              .
            </p>

            <div className="api-key-input-group">
              <div className="input-wrapper">
                <input
                  type={showKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your Gemini API key..."
                  className="api-key-input"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="toggle-visibility-btn"
                  title={showKey ? "Hide API key" : "Show API key"}
                >
                  {showKey ? "🙈" : "👁️"}
                </button>
              </div>

              <div className="button-group">
                <button
                  onClick={handleSave}
                  className="save-btn"
                  disabled={!apiKey.trim()}
                >
                  Save Key
                </button>
                <button
                  onClick={handleClear}
                  className="clear-btn"
                  disabled={!apiKey}
                >
                  Clear Key
                </button>
              </div>
            </div>

            {saved && (
              <div className="success-message">
                Settings saved successfully!
              </div>
            )}

            <div className="settings-info">
              <h4>Security Note</h4>
              <p>
                Your API key is stored locally in your browser and is only sent to the server
                when making AI requests. It is never stored on the server or shared with other users.
              </p>

              <h4>Usage</h4>
              <ul>
                <li>Summary & Quiz: Generates summaries and 10-question quizzes from your notes</li>
                <li>Each request consumes tokens from your Google AI quota</li>
                <li>Keep your key secure and don't share it with others</li>
              </ul>
            </div>
          </div>
        </div>

        <style jsx>{`
          .settings-container {
            max-width: 800px;
            margin: 0 auto;
          }

          .settings-section {
            background: white;
            border-radius: 8px;
            padding: 2rem;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .settings-section h3 {
            margin-top: 0;
            color: #2c3e50;
            font-size: 1.5rem;
          }

          .settings-section p {
            color: #666;
            line-height: 1.6;
            margin-bottom: 1.5rem;
          }

          .settings-section a {
            color: #3498db;
            text-decoration: none;
          }

          .settings-section a:hover {
            text-decoration: underline;
          }

          .api-key-input-group {
            margin: 2rem 0;
          }

          .input-wrapper {
            display: flex;
            margin-bottom: 1rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            overflow: hidden;
          }

          .api-key-input {
            flex: 1;
            padding: 0.75rem;
            border: none;
            font-family: monospace;
            font-size: 0.9rem;
          }

          .api-key-input:focus {
            outline: none;
            box-shadow: 0 0 0 2px #3498db;
          }

          .toggle-visibility-btn {
            padding: 0.75rem 1rem;
            background: #f8f9fa;
            border: none;
            border-left: 1px solid #ddd;
            cursor: pointer;
            font-size: 1rem;
          }

          .toggle-visibility-btn:hover {
            background: #e9ecef;
          }

          .button-group {
            display: flex;
            gap: 0.5rem;
          }

          .save-btn,
          .clear-btn {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 500;
            transition: background-color 0.2s;
          }

          .save-btn {
            background: #27ae60;
            color: white;
          }

          .save-btn:hover:not(:disabled) {
            background: #229954;
          }

          .save-btn:disabled {
            background: #bdc3c7;
            cursor: not-allowed;
          }

          .clear-btn {
            background: #e74c3c;
            color: white;
          }

          .clear-btn:hover:not(:disabled) {
            background: #c0392b;
          }

          .clear-btn:disabled {
            background: #bdc3c7;
            cursor: not-allowed;
          }

          .success-message {
            margin-top: 1rem;
            padding: 0.75rem;
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
            border-radius: 4px;
            text-align: center;
          }

          .settings-info {
            margin-top: 2rem;
            padding-top: 2rem;
            border-top: 1px solid #eee;
          }

          .settings-info h4 {
            margin-top: 1.5rem;
            margin-bottom: 0.5rem;
            color: #2c3e50;
          }

          .settings-info ul {
            margin: 0.5rem 0;
            padding-left: 1.5rem;
          }

          .settings-info li {
            margin-bottom: 0.25rem;
            color: #666;
          }
        `}</style>
      </div>
    </Layout>
  );
}