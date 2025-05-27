// src/components/SeoFixAssistant.jsx
import React, { useState } from 'react';

function SeoFixAssistant() {
  const [htmlInput, setHtmlInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/fix-seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html: htmlInput }),
      });

      if (!response.ok) {
        throw new Error('Failed to get suggestions');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="seo-fix-assistant" style={{ marginTop: '3rem' }}>
      <h2>Smart SEO Fix Assistant (Paste HTML)</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="12"
          cols="80"
          placeholder="Paste your HTML code here..."
          value={htmlInput}
          onChange={(e) => setHtmlInput(e.target.value)}
          style={{ width: '100%', fontFamily: 'monospace', fontSize: '0.9rem' }}
        />
        <br />
        <button type="submit" disabled={loading} style={{ marginTop: '1rem' }}>
          {loading ? 'Checking...' : 'Get SEO Suggestions'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {result && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Suggestions:</h3>
          {(result?.suggestions?.length ?? 0) === 0 ? (
            <p>No SEO issues found! 🎉</p>
          ) : (
            <ul>
              {(result?.suggestions || []).map((sugg, idx) => (
                <li key={idx}>{sugg}</li>
              ))}
            </ul>
          )}

          <h4>Summary:</h4>
          <p>H1 tags: {result?.h1_count ?? 0}</p>
          <p>H2 tags: {result?.h2_count ?? 0}</p>
          <p>H3 tags: {result?.h3_count ?? 0}</p>
          <p>Images: {result?.image_count ?? 0}</p>
          <p>Images missing alt text: {result?.missing_alt_count ?? 0}</p>
        </div>
      )}
    </div>
  );
}

export default SeoFixAssistant;
