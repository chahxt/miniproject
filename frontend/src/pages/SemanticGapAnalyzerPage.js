// import React, { useState } from 'react';
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

// const COLORS = ['#27ae60', '#f64e60']; // green for covered, red for missing

// const SemanticGapAnalyzerPage = () => {
//   const [keyword, setKeyword] = useState('');
//   const [content, setContent] = useState('');
//   const [url, setUrl] = useState('');
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   // Placeholder analyze function
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setResult(null);

//     // Simulate backend result (replace with real API call)
//     setTimeout(() => {
//       setResult({
//         coverage_score: 68,
//         gaps: ['Smart Contracts', 'Traceability', 'Distributed Ledger', 'Cold Chain', 'Transparency'],
//         user_entities_topics: ['Blockchain', 'Supply Chain', 'Automation'],
//         all_entities_topics: ['Blockchain', 'Supply Chain', 'Smart Contracts', 'Traceability', 'Distributed Ledger', 'Transparency', 'Cold Chain'],
//       });
//       setLoading(false);
//     }, 1000);
//   };

//   const handleExportPDF = () => {
//     alert("PDF Export will be available soon!");
//   };

//   // Style helpers
//   const bgCard = { background: "#191C24", color: "#fafcff", boxShadow: "0 6px 32px #00000022", border: "1px solid #23252b", borderRadius: 14 };
//   const chipStyle = { background: '#2c2e35', color: '#f64e60', padding: '8px 14px', borderRadius: 18, fontWeight: 500, fontSize: 16, border: '1px solid #3a3a40' };

//   const renderScoreBar = (score) => (
//     <div style={{ margin: "18px 0" }}>
//       <div style={{ fontWeight: 'bold', color: "#62c6ff" }}>Coverage Score:</div>
//       <div style={{
//         background: '#23252b',
//         borderRadius: 8,
//         height: 28,
//         width: '100%',
//         overflow: 'hidden',
//         marginTop: 6,
//         border: "1px solid #2c2e35"
//       }}>
//         <div style={{
//           width: `${score}%`,
//           height: '100%',
//           background: score > 80 ? "#27ae60" : (score > 50 ? "#faad14" : "#f64e60"),
//           transition: 'width 1s',
//           color: '#fff',
//           display: 'flex',
//           alignItems: 'center',
//           paddingLeft: 14,
//           fontWeight: 'bold',
//           fontSize: 17
//         }}>
//           {score}%
//         </div>
//       </div>
//     </div>
//   );

//   const renderPieChart = (score) => (
//     <div style={{ width: '220px', height: '220px', margin: '0 auto' }}>
//       <ResponsiveContainer width="100%" height="100%">
//         <PieChart>
//           <Pie
//             data={[
//               { name: 'Covered', value: score },
//               { name: 'Missing', value: 100 - score }
//             ]}
//             dataKey="value"
//             innerRadius={60}
//             outerRadius={100}
//             paddingAngle={4}
//             startAngle={90}
//             endAngle={-270}
//           >
//             <Cell key="covered" fill={COLORS[0]} />
//             <Cell key="missing" fill={COLORS[1]} />
//           </Pie>
//           <Tooltip
//             contentStyle={{ background: "#23252b", color: "#fafcff", border: "none" }}
//             itemStyle={{ color: "#fafcff" }}
//           />
//         </PieChart>
//       </ResponsiveContainer>
//       <div style={{ textAlign: 'center', fontWeight: 'bold', color: "#7b5cff" }}>{score}% Covered</div>
//     </div>
//   );

//   return (
//     <div style={{ maxWidth: 700, margin: '0 auto', padding: 32, background: "#13151A", minHeight: "100vh" }}>
//       <h2 style={{ color: "#7b5cff", fontWeight: 700, marginBottom: 24, letterSpacing: 1 }}>
//         Content Semantic Gap Analyzer
//       </h2>
//       <form onSubmit={handleSubmit} style={{ marginBottom: 32, ...bgCard, padding: 28 }}>
//         <div style={{ marginBottom: 12 }}>
//           <label style={{ fontWeight: 'bold', color: "#fafcff" }}>Target Keyword:</label>
//           <input
//             style={{ width: '100%', padding: 8, marginTop: 5, background: "#181B22", color: "#fafcff", border: "1px solid #23252b", borderRadius: 6 }}
//             value={keyword}
//             onChange={e => setKeyword(e.target.value)}
//             required
//           />
//         </div>
//         <div style={{ marginBottom: 12 }}>
//           <label style={{ fontWeight: 'bold', color: "#fafcff" }}>Your Content (paste or leave blank to use URL):</label>
//           <textarea
//             style={{ width: '100%', padding: 8, marginTop: 5, background: "#181B22", color: "#fafcff", border: "1px solid #23252b", borderRadius: 6 }}
//             value={content}
//             onChange={e => setContent(e.target.value)}
//             rows={6}
//           />
//         </div>
//         <div style={{ marginBottom: 16 }}>
//           <label style={{ fontWeight: 'bold', color: "#fafcff" }}>OR Enter URL to Analyze:</label>
//           <input
//             style={{ width: '100%', padding: 8, marginTop: 5, background: "#181B22", color: "#fafcff", border: "1px solid #23252b", borderRadius: 6 }}
//             value={url}
//             onChange={e => setUrl(e.target.value)}
//           />
//         </div>
//         <button
//           type="submit"
//           style={{
//             background: 'linear-gradient(90deg, #7b5cff, #27ae60)',
//             color: '#fff',
//             padding: '12px 32px',
//             border: 'none',
//             borderRadius: 8,
//             fontWeight: 'bold',
//             fontSize: 16,
//             marginTop: 10,
//             boxShadow: '0 2px 14px #1c1c28',
//             cursor: loading ? 'not-allowed' : 'pointer',
//             opacity: loading ? 0.7 : 1,
//             transition: 'opacity 0.2s'
//           }}
//           disabled={loading}
//         >
//           {loading ? 'Analyzing...' : 'Analyze Semantic Gap'}
//         </button>
//       </form>

//       {error && (
//         <div style={{ color: '#f64e60', background: "#23252b", padding: 12, borderRadius: 7, marginBottom: 22 }}>
//           {error}
//         </div>
//       )}

//       {result && (
//         <div style={{ ...bgCard, marginTop: 32, padding: 28 }}>
//           {/* Coverage Score Progress Bar */}
//           {renderScoreBar(result.coverage_score)}

//           {/* Pie Chart */}
//           {renderPieChart(result.coverage_score)}

//           {/* Gaps as Chips */}
//           <div style={{ margin: "24px 0" }}>
//             <div style={{ fontWeight: 'bold', color: "#faad14" }}>Missing Topics / Entities:</div>
//             <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
//               {result.gaps.length === 0
//                 ? <span style={{ color: '#27ae60' }}>None! Your content is comprehensive 🎉</span>
//                 : result.gaps.map((gap, i) => (
//                   <span key={i} style={chipStyle}>{gap}</span>
//                 ))
//               }
//             </div>
//           </div>

//           {/* Download PDF/Report */}
//           <button
//             onClick={handleExportPDF}
//             style={{
//               background: 'linear-gradient(90deg, #27ae60, #7b5cff)',
//               color: '#fff',
//               border: 'none',
//               borderRadius: 8,
//               padding: '12px 28px',
//               fontWeight: 'bold',
//               fontSize: 15,
//               marginTop: 16,
//               cursor: 'pointer',
//               boxShadow: '0 2px 14px #18181e'
//             }}
//           >
//             Download Report (PDF)
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SemanticGapAnalyzerPage;


import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';

const COLORS = ['#27ae60', '#f64e60']; // green for covered, red for missing

const SemanticGapAnalyzerPage = () => {
  const [keyword, setKeyword] = useState('');
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Placeholder analyze function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    // Simulate backend result (replace with real API call)
    setTimeout(() => {
      setResult({
        coverage_score: 68,
        gaps: ['Smart Contracts', 'Traceability', 'Distributed Ledger', 'Cold Chain', 'Transparency'],
        user_entities_topics: ['Blockchain', 'Supply Chain', 'Automation'],
        all_entities_topics: ['Blockchain', 'Supply Chain', 'Smart Contracts', 'Traceability', 'Distributed Ledger', 'Transparency', 'Cold Chain'],
      });
      setLoading(false);
    }, 1000);
  };

  // PDF Export function using jsPDF
  const handleExportPDF = () => {
    if (!result) return;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Semantic Gap Analysis Report", 15, 15);

    doc.setFontSize(14);
    doc.text(`Coverage Score: ${result.coverage_score}%`, 15, 30);

    doc.setFontSize(12);
    doc.text("Missing Topics/Entities:", 15, 45);
    if (result.gaps.length === 0) {
      doc.text("None! Your content is comprehensive 🎉", 15, 55);
    } else {
      result.gaps.forEach((gap, i) => {
        doc.text(`- ${gap}`, 15, 55 + i * 8);
      });
    }

    // Optionally add user's covered topics
    const coveredStartY = 65 + Math.max(1, result.gaps.length) * 8;
    doc.text("Covered Topics/Entities:", 15, coveredStartY);
    if (result.user_entities_topics && result.user_entities_topics.length > 0) {
      result.user_entities_topics.forEach((topic, j) => {
        doc.text(`- ${topic}`, 15, coveredStartY + 10 + j * 8);
      });
    }

    doc.save("semantic-gap-report.pdf");
  };

  // Style helpers
  const bgCard = { background: "#191C24", color: "#fafcff", boxShadow: "0 6px 32px #00000022", border: "1px solid #23252b", borderRadius: 14 };
  const chipStyle = { background: '#2c2e35', color: '#f64e60', padding: '8px 14px', borderRadius: 18, fontWeight: 500, fontSize: 16, border: '1px solid #3a3a40' };

  const renderScoreBar = (score) => (
    <div style={{ margin: "18px 0" }}>
      <div style={{ fontWeight: 'bold', color: "#62c6ff" }}>Coverage Score:</div>
      <div style={{
        background: '#23252b',
        borderRadius: 8,
        height: 28,
        width: '100%',
        overflow: 'hidden',
        marginTop: 6,
        border: "1px solid #2c2e35"
      }}>
        <div style={{
          width: `${score}%`,
          height: '100%',
          background: score > 80 ? "#27ae60" : (score > 50 ? "#faad14" : "#f64e60"),
          transition: 'width 1s',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 14,
          fontWeight: 'bold',
          fontSize: 17
        }}>
          {score}%
        </div>
      </div>
    </div>
  );

  const renderPieChart = (score) => (
    <div style={{ width: '220px', height: '220px', margin: '0 auto' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={[
              { name: 'Covered', value: score },
              { name: 'Missing', value: 100 - score }
            ]}
            dataKey="value"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={4}
            startAngle={90}
            endAngle={-270}
          >
            <Cell key="covered" fill={COLORS[0]} />
            <Cell key="missing" fill={COLORS[1]} />
          </Pie>
          <Tooltip
            contentStyle={{ background: "#23252b", color: "#fafcff", border: "none" }}
            itemStyle={{ color: "#fafcff" }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div style={{ textAlign: 'center', fontWeight: 'bold', color: "#7b5cff" }}>{score}% Covered</div>
    </div>
  );

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 32, background: "#13151A", minHeight: "100vh" }}>
      <h2 style={{ color: "#7b5cff", fontWeight: 700, marginBottom: 24, letterSpacing: 1 }}>
        Content Semantic Gap Analyzer
      </h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 32, ...bgCard, padding: 28 }}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontWeight: 'bold', color: "#fafcff" }}>Target Keyword:</label>
          <input
            style={{ width: '100%', padding: 8, marginTop: 5, background: "#181B22", color: "#fafcff", border: "1px solid #23252b", borderRadius: 6 }}
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontWeight: 'bold', color: "#fafcff" }}>Your Content (paste or leave blank to use URL):</label>
          <textarea
            style={{ width: '100%', padding: 8, marginTop: 5, background: "#181B22", color: "#fafcff", border: "1px solid #23252b", borderRadius: 6 }}
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={6}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 'bold', color: "#fafcff" }}>OR Enter URL to Analyze:</label>
          <input
            style={{ width: '100%', padding: 8, marginTop: 5, background: "#181B22", color: "#fafcff", border: "1px solid #23252b", borderRadius: 6 }}
            value={url}
            onChange={e => setUrl(e.target.value)}
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
            boxShadow: '0 2px 14px #1c1c28',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            transition: 'opacity 0.2s'
          }}
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Analyze Semantic Gap'}
        </button>
      </form>

      {error && (
        <div style={{ color: '#f64e60', background: "#23252b", padding: 12, borderRadius: 7, marginBottom: 22 }}>
          {error}
        </div>
      )}

      {result && (
        <div style={{ ...bgCard, marginTop: 32, padding: 28 }}>
          {/* Coverage Score Progress Bar */}
          {renderScoreBar(result.coverage_score)}

          {/* Pie Chart */}
          {renderPieChart(result.coverage_score)}

          {/* Gaps as Chips */}
          <div style={{ margin: "24px 0" }}>
            <div style={{ fontWeight: 'bold', color: "#faad14" }}>Missing Topics / Entities:</div>
            <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {result.gaps.length === 0
                ? <span style={{ color: '#27ae60' }}>None! Your content is comprehensive 🎉</span>
                : result.gaps.map((gap, i) => (
                  <span key={i} style={chipStyle}>{gap}</span>
                ))
              }
            </div>
          </div>

          {/* Download PDF/Report */}
          <button
            onClick={handleExportPDF}
            style={{
              background: 'linear-gradient(90deg, #27ae60, #7b5cff)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '12px 28px',
              fontWeight: 'bold',
              fontSize: 15,
              marginTop: 16,
              cursor: 'pointer',
              boxShadow: '0 2px 14px #18181e'
            }}
          >
            Download Report (PDF)
          </button>
        </div>
      )}
    </div>
  );
};

export default SemanticGapAnalyzerPage;
