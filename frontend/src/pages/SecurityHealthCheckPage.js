
// import React, { useState } from 'react';

// const fakeSecurityChecks = [
//   { label: "HTTPS Enabled", value: true, info: "Your site uses HTTPS for secure connections." },
//   { label: "Secure Cookies", value: false, info: "Set the Secure and HttpOnly flags for cookies." },
//   { label: "Clickjacking Protection", value: true, info: "X-Frame-Options or CSP is set." },
//   { label: "Content Security Policy", value: false, info: "Add a strong Content-Security-Policy header." },
//   { label: "No Open Ports", value: true, info: "No vulnerable open ports detected." },
//   { label: "No Sensitive Data in HTML", value: true, info: "No passwords/tokens found in page source." }
// ];

// export default function SecurityCheckPage() {
//   const [url, setUrl] = useState('');
//   const [scanning, setScanning] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState('');

//   // Simulate scan (replace with real API call)
//   const handleScan = async (e) => {
//     e.preventDefault();
//     setError('');
//     setResult(null);
//     if (!/^https?:\/\//.test(url.trim())) {
//       setError("Please enter a valid URL (starting with http:// or https://)");
//       return;
//     }
//     setScanning(true);
//     // Simulate delay
//     setTimeout(() => {
//       setResult(fakeSecurityChecks);
//       setScanning(false);
//     }, 1200);
//   };

//   return (
//     <div className="security-bg">
//       {/* Floating neon shapes - reuse from landing */}
//       <div className="floating-bg-shape bubble-1"></div>
//       <div className="floating-bg-shape bubble-2"></div>
//       <div className="floating-bg-shape bubble-3"></div>
//       <div className="floating-bg-gradient"></div>

//       <div style={{
//         maxWidth: 560,
//         margin: "0 auto",
//         marginTop: 40,
//         background: "rgba(8,20,40,0.80)",
//         border: "2px solid #03fff7",
//         borderRadius: 17,
//         boxShadow: "0 0 24px #03fff77a",
//         padding: 38,
//         position: "relative",
//         zIndex: 2,
//         backdropFilter: "blur(10px)",
//         animation: "fadeInUp 1s"
//       }}>
//         <h1 className="security-title neon-glow" style={{
//           color: "#03fff7",
//           textAlign: "center",
//           fontFamily: "'Orbitron', 'Segoe UI', Arial, sans-serif",
//           fontWeight: 700,
//           marginBottom: 8,
//           fontSize: "2.3rem",
//           letterSpacing: 2,
//           textShadow: "0 0 30px #03fff7, 0 0 7px #fff"
//         }}>
//           Security Health Check
//         </h1>
//         <div style={{textAlign: "center", marginBottom: 28, color: "#eafaff", fontSize: 17}}>
//           Analyze your site's basic security hygiene and fix common vulnerabilities with a click.
//         </div>

//         {/* URL Input Form */}
//         <form onSubmit={handleScan}>
//           <input
//             type="text"
//             placeholder="Enter your website URL (https://...)"
//             value={url}
//             onChange={e => setUrl(e.target.value)}
//             style={{
//               width: "100%",
//               padding: "13px 13px",
//               fontSize: 17,
//               borderRadius: 8,
//               border: "1.7px solid #03fff7cc",
//               background: "#161d2a",
//               color: "#03fff7",
//               marginBottom: 18,
//               outline: "none",
//               boxShadow: "0 0 8px #03fff799"
//             }}
//             disabled={scanning}
//             required
//           />

//           <button
//             type="submit"
//             disabled={scanning || !url}
//             style={{
//               width: "100%",
//               background: "linear-gradient(90deg, #03fff7, #00e5ff 99%)",
//               color: "#0b111c",
//               fontWeight: 700,
//               fontSize: 19,
//               border: "none",
//               borderRadius: 12,
//               boxShadow: "0 0 17px #03fff788",
//               padding: "14px 0",
//               marginBottom: 18,
//               cursor: scanning ? "not-allowed" : "pointer",
//               opacity: scanning ? 0.7 : 1,
//               letterSpacing: 1,
//               transition: "all .19s"
//             }}
//           >
//             {scanning ? "Scanning..." : "Run Security Scan"}
//           </button>
//         </form>
//         {error && (
//           <div style={{
//             color: "#ff3057", background: "#181d2e", borderRadius: 6,
//             padding: 9, marginBottom: 12, fontWeight: 600, fontSize: 16
//           }}>{error}</div>
//         )}

//         {result && (
//           <div style={{marginTop: 12, animation: "fadeInUp 0.7s"}}>
//             {result.map((item, i) => (
//               <div key={i} style={{
//                 background: item.value ? "rgba(16,41,31,0.85)" : "rgba(39,8,12,0.8)",
//                 color: item.value ? "#03fff7" : "#ff3057",
//                 border: `1.7px solid ${item.value ? "#07fbc0" : "#ff3057aa"}`,
//                 borderRadius: 13,
//                 padding: "16px 17px",
//                 marginBottom: 18,
//                 fontSize: 17,
//                 boxShadow: item.value ? "0 0 10px #0eedd6aa" : "0 0 11px #ff305755",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 16,
//                 transition: "box-shadow .17s"
//               }}>
//                 <span style={{
//                   fontSize: 27,
//                   fontWeight: 900,
//                   textShadow: item.value ? "0 0 10px #03fff7cc" : "0 0 8px #ff3057cc"
//                 }}>
//                   {item.value ? "✔️" : "⚠️"}
//                 </span>
//                 <span>
//                   <b>{item.label}</b>
//                   <div style={{
//                     fontWeight: 400,
//                     fontSize: 15,
//                     color: item.value ? "#c7fff9" : "#ffcbd8",
//                     marginTop: 2,
//                     textShadow: "none"
//                   }}>{item.info}</div>
//                 </span>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Typing Animation for Fun */}
//         <div className="typing" style={{
//           color: "#03fff7",
//           fontSize: 19,
//           fontFamily: "'Orbitron', Arial, sans-serif",
//           marginTop: 32,
//           textAlign: "center",
//           letterSpacing: 1,
//           textShadow: "0 0 15px #03fff7"
//         }}>
//           {scanning
//             ? <span>Checking... <span className="typing-cursor">|</span></span>
//             : <span>Stay safe. Stay optimized. 🚀 <span className="typing-cursor">|</span></span>
//           }
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import axios from 'axios';

export default function SecurityCheckPage() {
  const [url, setUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // Real API call
  const handleScan = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (!/^https?:\/\//.test(url.trim())) {
      setError("Please enter a valid URL (starting with http:// or https://)");
      return;
    }

    setScanning(true);
    try {
      // Yehi line actual backend ko hit karegi (proxy line hai toh direct likh do)
      const res = await axios.post('/api/security-check', { url });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    }
    setScanning(false);
  };

  return (
    <div className="security-bg">
      {/* Floating neon shapes - reuse from landing */}
      <div className="floating-bg-shape bubble-1"></div>
      <div className="floating-bg-shape bubble-2"></div>
      <div className="floating-bg-shape bubble-3"></div>
      <div className="floating-bg-gradient"></div>

      <div style={{
        maxWidth: 560,
        margin: "0 auto",
        marginTop: 40,
        background: "rgba(8,20,40,0.80)",
        border: "2px solid #03fff7",
        borderRadius: 17,
        boxShadow: "0 0 24px #03fff77a",
        padding: 38,
        position: "relative",
        zIndex: 2,
        backdropFilter: "blur(10px)",
        animation: "fadeInUp 1s"
      }}>
        <h1 className="security-title neon-glow" style={{
          color: "#03fff7",
          textAlign: "center",
          fontFamily: "'Orbitron', 'Segoe UI', Arial, sans-serif",
          fontWeight: 700,
          marginBottom: 8,
          fontSize: "2.3rem",
          letterSpacing: 2,
          textShadow: "0 0 30px #03fff7, 0 0 7px #fff"
        }}>
          Security Health Check
        </h1>
        <div style={{textAlign: "center", marginBottom: 28, color: "#eafaff", fontSize: 17}}>
          Analyze your site's basic security hygiene and fix common vulnerabilities with a click.
        </div>

        {/* URL Input Form */}
        <form onSubmit={handleScan}>
          <input
            type="text"
            placeholder="Enter your website URL (https://...)"
            value={url}
            onChange={e => setUrl(e.target.value)}
            style={{
              width: "100%",
              padding: "13px 13px",
              fontSize: 17,
              borderRadius: 8,
              border: "1.7px solid #03fff7cc",
              background: "#161d2a",
              color: "#03fff7",
              marginBottom: 18,
              outline: "none",
              boxShadow: "0 0 8px #03fff799"
            }}
            disabled={scanning}
            required
          />

          <button
            type="submit"
            disabled={scanning || !url}
            style={{
              width: "100%",
              background: "linear-gradient(90deg, #03fff7, #00e5ff 99%)",
              color: "#0b111c",
              fontWeight: 700,
              fontSize: 19,
              border: "none",
              borderRadius: 12,
              boxShadow: "0 0 17px #03fff788",
              padding: "14px 0",
              marginBottom: 18,
              cursor: scanning ? "not-allowed" : "pointer",
              opacity: scanning ? 0.7 : 1,
              letterSpacing: 1,
              transition: "all .19s"
            }}
          >
            {scanning ? "Scanning..." : "Run Security Scan"}
          </button>
        </form>
        {error && (
          <div style={{
            color: "#ff3057", background: "#181d2e", borderRadius: 6,
            padding: 9, marginBottom: 12, fontWeight: 600, fontSize: 16
          }}>{error}</div>
        )}

        {result && (
          <div style={{marginTop: 12, animation: "fadeInUp 0.7s"}}>
            <h3 style={{color: "#03fff7", marginBottom: 15}}>Site Security Report</h3>
            <div style={{ color: "#faad14", fontSize: 18, marginBottom: 7 }}>
              Score: <b>{result.score} / 100</b>
            </div>
            <ul style={{paddingLeft: 0, listStyle: "none"}}>
              {result.checks.map((item, i) => (
                <li key={i} style={{
                  background: item.ok ? "rgba(16,41,31,0.85)" : "rgba(39,8,12,0.8)",
                  color: item.ok ? "#03fff7" : "#ff3057",
                  border: `1.7px solid ${item.ok ? "#07fbc0" : "#ff3057aa"}`,
                  borderRadius: 13,
                  padding: "12px 14px",
                  marginBottom: 10,
                  fontSize: 16,
                  boxShadow: item.ok ? "0 0 10px #0eedd6aa" : "0 0 11px #ff305755",
                  display: "flex",
                  alignItems: "center",
                  gap: 16
                }}>
                  <span style={{
                    fontSize: 22,
                    fontWeight: 900,
                    textShadow: item.ok ? "0 0 10px #03fff7cc" : "0 0 8px #ff3057cc"
                  }}>
                    {item.ok ? "✔️" : "⚠️"}
                  </span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
            {result.tips && result.tips.length > 0 && (
              <div style={{
                background: "#161d2a",
                color: "#faad14",
                borderRadius: 8,
                padding: 13,
                marginTop: 10,
                marginBottom: 6,
                fontWeight: 600,
                fontSize: 16
              }}>
                <div style={{marginBottom: 4}}>Security Tips:</div>
                <ul style={{margin: 0, paddingLeft: 20}}>
                  {result.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Typing Animation for Fun */}
        <div className="typing" style={{
          color: "#03fff7",
          fontSize: 19,
          fontFamily: "'Orbitron', Arial, sans-serif",
          marginTop: 32,
          textAlign: "center",
          letterSpacing: 1,
          textShadow: "0 0 15px #03fff7"
        }}>
          {scanning
            ? <span>Checking... <span className="typing-cursor">|</span></span>
            : <span>Stay safe. Stay optimized. 🚀 <span className="typing-cursor">|</span></span>
          }
        </div>
      </div>
    </div>
  );
}
