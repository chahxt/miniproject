import React, { useState } from 'react';
import axios from 'axios';

const featureIcons = {
  "Featured Snippet": "🔹",
  "People Also Ask": "❓",
  "Knowledge Panel": "ℹ️",
  "Video Carousel": "🎬",
  "Shopping Results": "🛒",
  "Image Pack": "🖼️",
  "Top Stories": "📰",
  "Ads": "💸"
};

const SerpFeatureAssessmentPage = () => {
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setResult(null);
    setError('');
    setLoading(true);
    try {
    //   const res = await axios.post('/api/serp-features', { keyword });
      const res = await axios.post('http://localhost:5000/api/serp-features', { keyword });

      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 32, background: "#13151A", minHeight: "100vh" }}>
      <h2 style={{ color: "#7b5cff", fontWeight: 700, marginBottom: 24 }}>
        SERP Feature Opportunity & Risk Assessment
      </h2>
      <form onSubmit={handleSubmit} style={{
        background: "#191C24", color: "#fafcff", border: "1px solid #23252b", borderRadius: 14, padding: 28, marginBottom: 32
      }}>
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontWeight: 'bold', color: "#fafcff" }}>Target Keyword:</label>
          <input
            style={{ width: '100%', padding: 8, marginTop: 5, background: "#181B22", color: "#fafcff", border: "1px solid #23252b", borderRadius: 6 }}
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            required
            placeholder="e.g. buy running shoes online"
          />
        </div>
        <button
          type="submit"
          style={{
            background: 'linear-gradient(90deg, #7b5cff, #27ae60)',
            color: '#fff',
            padding: '12px 32px',
            border: 'none',
            borderRadius: 8,
            fontWeight: 'bold',
            fontSize: 16,
            marginTop: 10,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            transition: 'opacity 0.2s'
          }}
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Analyze SERP Features'}
        </button>
      </form>
      {error && (
        <div style={{ color: '#f64e60', background: "#23252b", padding: 12, borderRadius: 7, marginBottom: 22 }}>
          {error}
        </div>
      )}
      {result && (
        <div style={{
          background: "#191C24", color: "#fafcff", border: "1px solid #23252b", borderRadius: 14, padding: 28
        }}>
          <h4 style={{ color: "#62c6ff", marginBottom: 16 }}>SERP Features Detected:</h4>
          <ul style={{ paddingLeft: 0, margin: 0, listStyle: 'none' }}>
            {result.features.map((feat, i) => (
              <li key={feat.feature} style={{
                marginBottom: 11, display: 'flex', alignItems: 'center'
              }}>
                <span style={{ fontSize: 24, marginRight: 10 }}>{featureIcons[feat.feature] || "🔸"}</span>
                <span style={{ fontWeight: 600 }}>{feat.feature}</span>
                <span style={{
                  marginLeft: "auto", color: feat.present ? "#27ae60" : "#f64e60", fontWeight: "bold"
                }}>
                  {feat.present ? "Present" : "Not Present"}
                </span>
              </li>
            ))}
          </ul>
          <h4 style={{ color: "#faad14", margin: "24px 0 8px" }}>Tips & Opportunities:</h4>
          <ul>
            {result.tips.length === 0
              ? <li style={{ color: "#27ae60" }}>No special actions needed. Your query is not dominated by complex SERP features!</li>
              : result.tips.map((tip, i) => (
                <li key={i} style={{ marginBottom: 8 }}>{tip}</li>
              ))
            }
          </ul>
        </div>
      )}
    </div>
  );
};

export default SerpFeatureAssessmentPage;
