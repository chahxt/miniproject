
// // working----------------------------------------------------------
// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';
// // import '../Homepage.css';
// // import { Bar } from 'react-chartjs-2';
// // import {
// //   Chart as ChartJS,
// //   BarElement,
// //   CategoryScale,
// //   LinearScale,
// //   Tooltip,
// //   Legend
// // } from 'chart.js';

// // ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// // function Homepage() {
// //   const [url, setUrl] = useState('');
// //   const [seoResults, setSeoResults] = useState(null);
// //   const [imageResults, setImageResults] = useState(null);
// //   const [seoScore, setSeoScore] = useState(null);
// //   const [keywords, setKeywords] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [urlError, setUrlError] = useState(null);

// //   const navigate = useNavigate();
// //   const token = localStorage.getItem('access_token');

// //   const validateUrl = (url) => {
// //     const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
// //     return urlPattern.test(url);
// //   };

// //   const calculateSeoScore = (results) => {
// //     let score = 0;
// //     if (results.title) score += 20;
// //     if (results.description) score += 20;
// //     if (results.h1?.length) score += 20;
// //     if (results.h2?.length) score += 20;
// //     if (results.h3?.length) score += 20;
// //     return score;
// //   };

// //   const getTopKeywords = (text, count = 5) => {
// //     const stopwords = ['the', 'is', 'and', 'of', 'in', 'to', 'a', 'with', 'for', 'on'];
// //     const words = text.toLowerCase().match(/\b\w+\b/g);
// //     const freq = {};

// //     words?.forEach(word => {
// //       if (!stopwords.includes(word)) {
// //         freq[word] = (freq[word] || 0) + 1;
// //       }
// //     });

// //     return Object.entries(freq)
// //       .sort((a, b) => b[1] - a[1])
// //       .slice(0, count);
// //   };

// //   const handleAnalyzeSeo = async () => {
// //     if (!token) {
// //       alert('You must be logged in to perform this action.');
// //       return;
// //     }

// //     if (!url || !validateUrl(url)) {
// //       setUrlError('Please enter a valid URL.');
// //       return;
// //     } else {
// //       setUrlError(null);
// //     }

// //     setLoading(true);
// //     try {
// //       const response = await axios.post(
// //         'http://localhost:5000/analyze-seo',
// //         { url },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );
// //       setSeoResults(response.data);
// //       setSeoScore(calculateSeoScore(response.data));
// //       setKeywords(getTopKeywords(response.data.description || ''));
// //     } catch (error) {
// //       console.error('Error analyzing SEO:', error);
// //       alert('Something went wrong. Please try again later.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleAnalyzeImages = async () => {
// //     if (!token) {
// //       alert('You must be logged in to perform this action.');
// //       return;
// //     }

// //     if (!url || !validateUrl(url)) {
// //       setUrlError('Please enter a valid URL.');
// //       return;
// //     } else {
// //       setUrlError(null);
// //     }

// //     setLoading(true);
// //     try {
// //       const response = await axios.post(
// //         'http://localhost:5000/analyze-images',
// //         { url },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );
// //       setImageResults(response.data);
// //     } catch (error) {
// //       console.error('Error analyzing images:', error);
// //       alert('Something went wrong. Please try again later.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const goToDashboard = () => {
// //     localStorage.setItem('seoResults', JSON.stringify(seoResults));
// //     localStorage.setItem('imageResults', JSON.stringify(imageResults));
// //     navigate('/dashboard');
// //   };

// //   const handleLogout = () => {
// //     // Clear the token from localStorage
// //     localStorage.removeItem('access_token');
// //     // Redirect to login page
// //     navigate('/login');
// //   };

// //   const headingChartData = {
// //     labels: ['H1', 'H2', 'H3'],
// //     datasets: [
// //       {
// //         label: 'Heading Tags Count',
// //         data: [
// //           seoResults?.h1?.length || 0,
// //           seoResults?.h2?.length || 0,
// //           seoResults?.h3?.length || 0
// //         ],
// //         backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384']
// //       }
// //     ]
// //   };

// //   return (
// //     <div className="homepage-container">
// //       <div className="max-w-3xl mx-auto">
// //         <div className="text-center mb-10">
// //           <h1 className="main-title">SECURE SEO INSIGHTS</h1>
// //           <p className="sub-title">Level up your web insights in style ⚡</p>
// //         </div>

// //         <div className="form-container">
// //           <input
// //             type="text"
// //             value={url}
// //             onChange={(e) => setUrl(e.target.value)}
// //             className="url-input"
// //             placeholder="🔗 Enter your website URL"
// //           />
// //           {urlError && <p className="error-text">{urlError}</p>}

// //           <div className="button-container">
// //             <button onClick={handleAnalyzeSeo} className="analyze-btn" disabled={loading}>
// //               Analyze SEO
// //             </button>
// //             <button onClick={handleAnalyzeImages} className="analyze-btn" disabled={loading}>
// //               Analyze Images
// //             </button>
// //           </div>

// //           {loading && <p className="loading-text">🔍 Analyzing, please wait...</p>}

// //           {(seoResults || imageResults) && (
// //             <button onClick={goToDashboard} className="dashboard-btn">
// //               🚀 Go to Dashboard
// //             </button>
// //           )}

// //           {seoResults && (
// //             <div className="result-container">
// //               <h2 className="result-title">📈 SEO Results</h2>
// //               <p><strong>Title:</strong> {seoResults.title}</p>
// //               <p><strong>Description:</strong> {seoResults.description}</p>
// //               <p><strong>H1 Tags:</strong> {seoResults.h1.join(', ')}</p>
// //               <p><strong>H2 Tags:</strong> {seoResults.h2.join(', ')}</p>
// //               <p><strong>H3 Tags:</strong> {seoResults.h3.join(', ')}</p>

// //               <p className="seo-score">🎯 SEO Score: {seoScore}/100</p>

// //               <h4>🧠 Top Keywords</h4>
// //               <ul>
// //                 {keywords.map(([word, freq], idx) => (
// //                   <li key={idx}>{word} — {freq} times</li>
// //                 ))}
// //               </ul>

// //               <h4>📊 Headings Chart</h4>
// //               <Bar data={headingChartData} />
// //             </div>
// //           )}

// //           {imageResults && (
// //             <div className="result-container">
// //               <h2 className="result-title">🖼️ Image Analysis</h2>
// //               <p><strong>Missing alt text:</strong> {imageResults.missing_alt.join(', ')}</p>
// //               <p><strong>Wrong image formats:</strong> {imageResults.wrong_format.join(', ')}</p>
// //             </div>
// //           )}
// //         </div>

// //         {/* Add logout button */}
// //         <div className="logout-container">
// //           <button onClick={handleLogout} className="logout-btn">
// //             🚪 Logout
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Homepage;


// //======================================





// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import '../Homepage.css';
// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend
// } from 'chart.js';
// import SeoFixAssistant from '../components/SeoFixAssistant'; // ✅ NEW IMPORT

// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// function Homepage() {
//   const [url, setUrl] = useState('');
//   const [seoResults, setSeoResults] = useState(null);
//   const [imageResults, setImageResults] = useState(null);
//   const [seoScore, setSeoScore] = useState(null);
//   const [keywords, setKeywords] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [urlError, setUrlError] = useState(null);

//   const navigate = useNavigate();
//   const token = localStorage.getItem('access_token');

//   const validateUrl = (url) => {
//     const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
//     return urlPattern.test(url);
//   };

//   const calculateSeoScore = (results) => {
//     let score = 0;
//     if (results.title) score += 20;
//     if (results.description) score += 20;
//     if (results.h1?.length) score += 20;
//     if (results.h2?.length) score += 20;
//     if (results.h3?.length) score += 20;
//     return score;
//   };

//   const getTopKeywords = (text, count = 5) => {
//     const stopwords = ['the', 'is', 'and', 'of', 'in', 'to', 'a', 'with', 'for', 'on'];
//     const words = text.toLowerCase().match(/\b\w+\b/g);
//     const freq = {};

//     words?.forEach(word => {
//       if (!stopwords.includes(word)) {
//         freq[word] = (freq[word] || 0) + 1;
//       }
//     });

//     return Object.entries(freq)
//       .sort((a, b) => b[1] - a[1])
//       .slice(0, count);
//   };

//   const handleAnalyzeSeo = async () => {
//     if (!token) {
//       alert('You must be logged in to perform this action.');
//       return;
//     }

//     if (!url || !validateUrl(url)) {
//       setUrlError('Please enter a valid URL.');
//       return;
//     } else {
//       setUrlError(null);
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post(
//         'http://localhost:5000/analyze-seo',
//         { url },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setSeoResults(response.data);
//       setSeoScore(calculateSeoScore(response.data));
//       setKeywords(getTopKeywords(response.data.description || ''));
//     } catch (error) {
//       console.error('Error analyzing SEO:', error);
//       alert('Something went wrong. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAnalyzeImages = async () => {
//     if (!token) {
//       alert('You must be logged in to perform this action.');
//       return;
//     }

//     if (!url || !validateUrl(url)) {
//       setUrlError('Please enter a valid URL.');
//       return;
//     } else {
//       setUrlError(null);
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post(
//         'http://localhost:5000/analyze-images',
//         { url },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setImageResults(response.data);
//     } catch (error) {
//       console.error('Error analyzing images:', error);
//       alert('Something went wrong. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const goToDashboard = () => {
//     localStorage.setItem('seoResults', JSON.stringify(seoResults));
//     localStorage.setItem('imageResults', JSON.stringify(imageResults));
//     navigate('/dashboard');
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('access_token');
//     navigate('/login');
//   };

//   const headingChartData = {
//     labels: ['H1', 'H2', 'H3'],
//     datasets: [
//       {
//         label: 'Heading Tags Count',
//         data: [
//           seoResults?.h1?.length || 0,
//           seoResults?.h2?.length || 0,
//           seoResults?.h3?.length || 0
//         ],
//         backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384']
//       }
//     ]
//   };

//   return (
//     <div className="homepage-container">
//       <div className="max-w-3xl mx-auto">
//         <div className="text-center mb-10">
//           <h1 className="main-title">SECURE SEO INSIGHTS</h1>
//           <p className="sub-title">Level up your web insights in style ⚡</p>
//         </div>

//         <div className="form-container">
//           <input
//             type="text"
//             value={url}
//             onChange={(e) => setUrl(e.target.value)}
//             className="url-input"
//             placeholder="🔗 Enter your website URL"
//           />
//           {urlError && <p className="error-text">{urlError}</p>}

//           <div className="button-container">
//             <button onClick={handleAnalyzeSeo} className="analyze-btn" disabled={loading}>
//               Analyze SEO
//             </button>
//             <button onClick={handleAnalyzeImages} className="analyze-btn" disabled={loading}>
//               Analyze Images
//             </button>
//           </div>

//           {loading && <p className="loading-text">🔍 Analyzing, please wait...</p>}

//           {(seoResults || imageResults) && (
//             <button onClick={goToDashboard} className="dashboard-btn">
//               🚀 Go to Dashboard
//             </button>
//           )}

//           {seoResults && (
//             <div className="result-container">
//               <h2 className="result-title">📈 SEO Results</h2>
//               <p><strong>Title:</strong> {seoResults.title}</p>
//               <p><strong>Description:</strong> {seoResults.description}</p>
//               <p><strong>H1 Tags:</strong> {seoResults.h1.join(', ')}</p>
//               <p><strong>H2 Tags:</strong> {seoResults.h2.join(', ')}</p>
//               <p><strong>H3 Tags:</strong> {seoResults.h3.join(', ')}</p>

//               <p className="seo-score">🎯 SEO Score: {seoScore}/100</p>

//               <h4>🧠 Top Keywords</h4>
//               <ul>
//                 {keywords.map(([word, freq], idx) => (
//                   <li key={idx}>{word} — {freq} times</li>
//                 ))}
//               </ul>

//               <h4>📊 Headings Chart</h4>
//               <Bar data={headingChartData} />
//             </div>
//           )}

//           {imageResults && (
//             <div className="result-container">
//               <h2 className="result-title">🖼️ Image Analysis</h2>
//               <p><strong>Missing alt text:</strong> {imageResults.missing_alt.join(', ')}</p>
//               <p><strong>Wrong image formats:</strong> {imageResults.wrong_format.join(', ')}</p>
//             </div>
//           )}
//         </div>

//         {/* ✅ SEO Fix Assistant (from separate component) */}
//         <SeoFixAssistant />

//         <div className="logout-container">
//           <button onClick={handleLogout} className="logout-btn">
//             🚪 Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Homepage;

// src/pages/AnalyzeWebsite.js (was Homepage.js)
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import '../Homepage.css';
// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend
// } from 'chart.js';
// import SeoFixAssistant from '../components/SeoFixAssistant'; // Optional

// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// function AnalyzeWebsite() {
//   const [url, setUrl] = useState('');
//   const [seoResults, setSeoResults] = useState(null);
//   const [imageResults, setImageResults] = useState(null);
//   const [seoScore, setSeoScore] = useState(null);
//   const [keywords, setKeywords] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [urlError, setUrlError] = useState(null);

//   const navigate = useNavigate();
//   const token = localStorage.getItem('access_token');

//   const validateUrl = (url) => {
//     const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
//     return urlPattern.test(url);
//   };

//   const calculateSeoScore = (results) => {
//     let score = 0;
//     if (results.title) score += 20;
//     if (results.description) score += 20;
//     if (results.h1?.length) score += 20;
//     if (results.h2?.length) score += 20;
//     if (results.h3?.length) score += 20;
//     return score;
//   };

//   const getTopKeywords = (text, count = 5) => {
//     const stopwords = ['the', 'is', 'and', 'of', 'in', 'to', 'a', 'with', 'for', 'on'];
//     const words = text.toLowerCase().match(/\b\w+\b/g);
//     const freq = {};

//     words?.forEach(word => {
//       if (!stopwords.includes(word)) {
//         freq[word] = (freq[word] || 0) + 1;
//       }
//     });

//     return Object.entries(freq)
//       .sort((a, b) => b[1] - a[1])
//       .slice(0, count);
//   };

//   const handleAnalyzeSeo = async () => {
//     if (!token) {
//       alert('You must be logged in to perform this action.');
//       return;
//     }

//     if (!url || !validateUrl(url)) {
//       setUrlError('Please enter a valid URL.');
//       return;
//     } else {
//       setUrlError(null);
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post(
//         'http://localhost:5000/analyze-seo',
//         { url },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setSeoResults(response.data);
//       setSeoScore(calculateSeoScore(response.data));
//       setKeywords(getTopKeywords(response.data.description || ''));
//     } catch (error) {
//       console.error('Error analyzing SEO:', error);
//       alert('Something went wrong. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAnalyzeImages = async () => {
//     if (!token) {
//       alert('You must be logged in to perform this action.');
//       return;
//     }

//     if (!url || !validateUrl(url)) {
//       setUrlError('Please enter a valid URL.');
//       return;
//     } else {
//       setUrlError(null);
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post(
//         'http://localhost:5000/analyze-images',
//         { url },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setImageResults(response.data);
//     } catch (error) {
//       console.error('Error analyzing images:', error);
//       alert('Something went wrong. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const goToDashboard = () => {
//     localStorage.setItem('seoResults', JSON.stringify(seoResults));
//     localStorage.setItem('imageResults', JSON.stringify(imageResults));
//     navigate('/app/dashboard');
//   };

//   const headingChartData = {
//     labels: ['H1', 'H2', 'H3'],
//     datasets: [
//       {
//         label: 'Heading Tags Count',
//         data: [
//           seoResults?.h1?.length || 0,
//           seoResults?.h2?.length || 0,
//           seoResults?.h3?.length || 0
//         ],
//         backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384']
//       }
//     ]
//   };

//   return (
//     <div className="homepage-content">
//       <div className="max-w-3xl mx-auto">
//         <div className="text-center mb-10">
//           <h1 className="main-title">Analyze Your Website SEO</h1>
//           <p className="sub-title">Level up your web insights in style ⚡</p>
//         </div>

//         <div className="form-container">
//           <input
//             type="text"
//             value={url}
//             onChange={(e) => setUrl(e.target.value)}
//             className="url-input"
//             placeholder="🔗 Enter your website URL"
//           />
//           {urlError && <p className="error-text">{urlError}</p>}

//           <div className="button-container">
//             <button onClick={handleAnalyzeSeo} className="analyze-btn" disabled={loading}>
//               Analyze SEO
//             </button>
//             <button onClick={handleAnalyzeImages} className="analyze-btn" disabled={loading}>
//               Analyze Images
//             </button>
//           </div>

//           {loading && <p className="loading-text">🔍 Analyzing, please wait...</p>}

//           {(seoResults || imageResults) && (
//             <button onClick={goToDashboard} className="dashboard-btn">
//               🚀 Go to Dashboard
//             </button>
//           )}

//           {seoResults && (
//             <div className="result-container">
//               <h2 className="result-title">📈 SEO Results</h2>
//               <p><strong>Title:</strong> {seoResults.title}</p>
//               <p><strong>Description:</strong> {seoResults.description}</p>
//               <p><strong>H1 Tags:</strong> {seoResults.h1.join(', ')}</p>
//               <p><strong>H2 Tags:</strong> {seoResults.h2.join(', ')}</p>
//               <p><strong>H3 Tags:</strong> {seoResults.h3.join(', ')}</p>

//               <p className="seo-score">🎯 SEO Score: {seoScore}/100</p>

//               <h4>🧠 Top Keywords</h4>
//               <ul>
//                 {keywords.map(([word, freq], idx) => (
//                   <li key={idx}>{word} — {freq} times</li>
//                 ))}
//               </ul>

//               <h4>📊 Headings Chart</h4>
//               <Bar data={headingChartData} />
//             </div>
//           )}

//           {imageResults && (
//             <div className="result-container">
//               <h2 className="result-title">🖼️ Image Analysis</h2>
//               <p><strong>Missing alt text:</strong> {imageResults.missing_alt.join(', ')}</p>
//               <p><strong>Wrong image formats:</strong> {imageResults.wrong_format.join(', ')}</p>
//             </div>
//           )}
//         </div>

//         {/* SEO Fix Assistant (optional) */}
//         <SeoFixAssistant />

//       </div>
//     </div>
//   );
// }

// export default AnalyzeWebsite;


// src/pages/Homepage.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import '../Homepage.css';
// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend
// } from 'chart.js';
// import SeoFixAssistant from '../components/SeoFixAssistant';

// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// // Improved, realistic SEO scoring function
// function calculateSeoScore(results) {
//   let score = 0;
//   const maxScore = 100;

//   // Title
//   if (results.title && results.title.length > 0) score += 20;

//   // Description
//   if (results.description && results.description.length > 0) score += 12;
//   if (results.description && results.description.length >= 50) score += 8;

//   // Headings (reward for any heading)
//   const headingCount =
//     (results.h1?.length || 0) +
//     (results.h2?.length || 0) +
//     (results.h3?.length || 0);

//   if (headingCount > 0) score += 14;
//   if ((results.h1?.length || 0) > 0) score += 6;
//   if ((results.h2?.length || 0) > 0) score += 4;

//   // Images with alt text
//   if (typeof results.image_count === "number" && typeof results.missing_alt_count === "number") {
//     if (results.image_count > 0) {
//       if (results.missing_alt_count === 0) score += 7;
//       else if (results.missing_alt_count / results.image_count < 0.25) score += 4;
//     }
//   }

//   // Internal links (if present)
//   if (typeof results.internal_link_count === "number" && results.internal_link_count >= 1) score += 8;

//   // Canonical link
//   if (results.has_canonical) score += 5;

//   // Responsive meta tag
//   if (results.has_viewport_meta) score += 5;

//   // External CSS
//   if (typeof results.external_css_count === "number" && results.external_css_count > 0) score += 4;

//   // Favicon
//   if (results.has_favicon) score += 2;

//   // Never let it go negative, and cap at 100
//   score = Math.max(0, Math.min(maxScore, score));
//   return score;
// }

// function Homepage() {
//   const [url, setUrl] = useState('');
//   const [seoResults, setSeoResults] = useState(null);
//   const [imageResults, setImageResults] = useState(null);
//   const [seoScore, setSeoScore] = useState(null);
//   const [keywords, setKeywords] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [urlError, setUrlError] = useState(null);

//   const navigate = useNavigate();
//   const token = localStorage.getItem('access_token');

//   const validateUrl = (url) => {
//     const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
//     return urlPattern.test(url);
//   };

//   // Top Keywords
//   const getTopKeywords = (text, count = 5) => {
//     const stopwords = ['the', 'is', 'and', 'of', 'in', 'to', 'a', 'with', 'for', 'on'];
//     const words = text.toLowerCase().match(/\b\w+\b/g);
//     const freq = {};

//     words?.forEach(word => {
//       if (!stopwords.includes(word)) {
//         freq[word] = (freq[word] || 0) + 1;
//       }
//     });

//     return Object.entries(freq)
//       .sort((a, b) => b[1] - a[1])
//       .slice(0, count);
//   };

//   // SEO Analyze
//   const handleAnalyzeSeo = async () => {
//     if (!token) {
//       alert('You must be logged in to perform this action.');
//       return;
//     }

//     if (!url || !validateUrl(url)) {
//       setUrlError('Please enter a valid URL.');
//       return;
//     } else {
//       setUrlError(null);
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post(
//         'http://localhost:5000/analyze-seo',
//         { url },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setSeoResults(response.data);
//       setSeoScore(calculateSeoScore(response.data));
//       setKeywords(getTopKeywords(response.data.description || ''));
//     } catch (error) {
//       console.error('Error analyzing SEO:', error);
//       alert('Something went wrong. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Images Analyze
//   const handleAnalyzeImages = async () => {
//     if (!token) {
//       alert('You must be logged in to perform this action.');
//       return;
//     }

//     if (!url || !validateUrl(url)) {
//       setUrlError('Please enter a valid URL.');
//       return;
//     } else {
//       setUrlError(null);
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post(
//         'http://localhost:5000/analyze-images',
//         { url },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setImageResults(response.data);
//     } catch (error) {
//       console.error('Error analyzing images:', error);
//       alert('Something went wrong. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Go to Dashboard
//   const goToDashboard = () => {
//     localStorage.setItem('seoResults', JSON.stringify(seoResults));
//     localStorage.setItem('imageResults', JSON.stringify(imageResults));
//     navigate('/app/dashboard');
//   };

//   // Chart Data
//   const headingChartData = {
//     labels: ['H1', 'H2', 'H3'],
//     datasets: [
//       {
//         label: 'Heading Tags Count',
//         data: [
//           seoResults?.h1?.length || 0,
//           seoResults?.h2?.length || 0,
//           seoResults?.h3?.length || 0
//         ],
//         backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384']
//       }
//     ]
//   };

//   return (
//     <div className="homepage-content">
//       <div className="max-w-3xl mx-auto">
//         <div className="text-center mb-10">
//           <h1 className="main-title">Analyze Your Website SEO</h1>
//           <p className="sub-title">Level up your web insights in style ⚡</p>
//         </div>

//         <div className="form-container">
//           <input
//             type="text"
//             value={url}
//             onChange={(e) => {
//               setUrl(e.target.value);
//               setSeoResults(null);
//               setImageResults(null);
//               setSeoScore(null);
//               setKeywords([]);
//               setUrlError(null);
//             }}
//             className="url-input"
//             placeholder="🔗 Enter your website URL"
//           />
//           {urlError && <p className="error-text">{urlError}</p>}

//           <div className="button-container">
//             <button onClick={handleAnalyzeSeo} className="analyze-btn" disabled={loading}>
//               Analyze SEO
//             </button>
//             <button onClick={handleAnalyzeImages} className="analyze-btn" disabled={loading}>
//               Analyze Images
//             </button>
//           </div>

//           {loading && <p className="loading-text">🔍 Analyzing, please wait...</p>}

//           {(seoResults || imageResults) && (
//             <button onClick={goToDashboard} className="dashboard-btn">
//               🚀 Go to Dashboard
//             </button>
//           )}

//           {seoResults && (
//             <div className="result-container">
//               <h2 className="result-title">📈 SEO Results</h2>
//               <p><strong>Title:</strong> {seoResults.title || <span style={{color:'#ff7675'}}>No title found</span>}</p>
//               <p><strong>Description:</strong> {seoResults.description || <span style={{color:'#ff7675'}}>No description found</span>}</p>
//               <p>
//                 <strong>H1 Tags:</strong> {
//                   seoResults.h1 && seoResults.h1.length > 0
//                   ? seoResults.h1.join(', ')
//                   : <span style={{color:'#fdcb6e'}}>No H1 tags found</span>
//                 }
//               </p>
//               <p>
//                 <strong>H2 Tags:</strong> {
//                   seoResults.h2 && seoResults.h2.length > 0
//                   ? seoResults.h2.join(', ')
//                   : <span style={{color:'#fdcb6e'}}>No H2 tags found</span>
//                 }
//               </p>
//               <p>
//                 <strong>H3 Tags:</strong> {
//                   seoResults.h3 && seoResults.h3.length > 0
//                   ? seoResults.h3.join(', ')
//                   : <span style={{color:'#fdcb6e'}}>No H3 tags found</span>
//                 }
//               </p>
//               <p className="seo-score">
//                 🎯 SEO Score: {seoScore}/100
//                 {seoScore === 0 && (
//                   <span style={{color:'#ff7675', marginLeft: '12px'}}>No SEO data found – please check the website URL or try again!</span>
//                 )}
//               </p>
//               <h4>🧠 Top Keywords</h4>
//               <ul>
//                 {keywords.length > 0 ? keywords.map(([word, freq], idx) => (
//                   <li key={idx}>{word} — {freq} times</li>
//                 )) : <li style={{color:'#b2bec3'}}>No keywords found</li>}
//               </ul>
//               <h4>📊 Headings Chart</h4>
//               {
//                 ( (seoResults.h1?.length || 0) === 0 &&
//                   (seoResults.h2?.length || 0) === 0 &&
//                   (seoResults.h3?.length || 0) === 0
//                 ) ? (
//                   <p style={{color:'#b2bec3'}}>No heading tags found to display in chart.</p>
//                 ) : (
//                   <Bar data={headingChartData} />
//                 )
//               }
//             </div>
//           )}

//           {imageResults && (
//             <div className="result-container">
//               <h2 className="result-title">🖼️ Image Analysis</h2>
//               <p>
//                 <strong>Missing alt text:</strong>{" "}
//                 {imageResults.missing_alt && imageResults.missing_alt.length > 0
//                   ? imageResults.missing_alt.join(', ')
//                   : <span style={{color:'#00b894'}}>All images have alt text</span>}
//               </p>
//               <p>
//                 <strong>Wrong image formats:</strong>{" "}
//                 {imageResults.wrong_format && imageResults.wrong_format.length > 0
//                   ? imageResults.wrong_format.join(', ')
//                   : <span style={{color:'#00b894'}}>No format issues found</span>}
//               </p>
//             </div>
//           )}
//         </div>

//         <SeoFixAssistant />

//       </div>
//     </div>
//   );
// }

// export default Homepage;



// src/pages/Homepage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Homepage.css';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import SeoFixAssistant from '../components/SeoFixAssistant';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Improved, realistic SEO scoring function
function calculateSeoScore(results) {
  let score = 0;
  const maxScore = 100;

  // Title
  if (results.title && results.title.length > 0) score += 20;

  // Description
  if (results.description && results.description.length > 0) score += 12;
  if (results.description && results.description.length >= 50) score += 8;

  // Headings (reward for any heading)
  const headingCount =
    (results.h1?.length || 0) +
    (results.h2?.length || 0) +
    (results.h3?.length || 0);

  if (headingCount > 0) score += 14;
  if ((results.h1?.length || 0) > 0) score += 6;
  if ((results.h2?.length || 0) > 0) score += 4;

  // Images with alt text
  if (typeof results.image_count === "number" && typeof results.missing_alt_count === "number") {
    if (results.image_count > 0) {
      if (results.missing_alt_count === 0) score += 7;
      else if (results.missing_alt_count / results.image_count < 0.25) score += 4;
    }
  }

  // Internal links (if present)
  if (typeof results.internal_link_count === "number" && results.internal_link_count >= 1) score += 8;

  // Canonical link
  if (results.has_canonical) score += 5;

  // Responsive meta tag
  if (results.has_viewport_meta) score += 5;

  // External CSS
  if (typeof results.external_css_count === "number" && results.external_css_count > 0) score += 4;

  // Favicon
  if (results.has_favicon) score += 2;

  // Never let it go negative, and cap at 100
  score = Math.max(0, Math.min(maxScore, score));
  return score;
}

function Homepage() {
  const [url, setUrl] = useState('');
  const [seoResults, setSeoResults] = useState(null);
  const [imageResults, setImageResults] = useState(null);
  const [seoScore, setSeoScore] = useState(null);
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [urlError, setUrlError] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');

  const validateUrl = (url) => {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
  };

  // Top Keywords
  const getTopKeywords = (text, count = 5) => {
    const stopwords = ['the', 'is', 'and', 'of', 'in', 'to', 'a', 'with', 'for', 'on'];
    const words = text.toLowerCase().match(/\b\w+\b/g);
    const freq = {};

    words?.forEach(word => {
      if (!stopwords.includes(word)) {
        freq[word] = (freq[word] || 0) + 1;
      }
    });

    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, count);
  };

  // SEO Analyze
  const handleAnalyzeSeo = async () => {
    if (!token) {
      alert('You must be logged in to perform this action.');
      return;
    }

    if (!url || !validateUrl(url)) {
      setUrlError('Please enter a valid URL.');
      return;
    } else {
      setUrlError(null);
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:5000/analyze-seo',
        { url },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSeoResults(response.data);
      setSeoScore(calculateSeoScore(response.data));
      setKeywords(getTopKeywords(response.data.description || ''));
    } catch (error) {
      console.error('Error analyzing SEO:', error);
      alert('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Images Analyze
  const handleAnalyzeImages = async () => {
    if (!token) {
      alert('You must be logged in to perform this action.');
      return;
    }

    if (!url || !validateUrl(url)) {
      setUrlError('Please enter a valid URL.');
      return;
    } else {
      setUrlError(null);
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:5000/analyze-images',
        { url },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setImageResults(response.data);
    } catch (error) {
      console.error('Error analyzing images:', error);
      alert('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Go to Dashboard
  const goToDashboard = () => {
    localStorage.setItem('seoResults', JSON.stringify(seoResults));
    localStorage.setItem('imageResults', JSON.stringify(imageResults));
    navigate('/app/dashboard');
  };

  // Chart Data
  const headingChartData = {
    labels: ['H1', 'H2', 'H3'],
    datasets: [
      {
        label: 'Heading Tags Count',
        data: [
          seoResults?.h1?.length || 0,
          seoResults?.h2?.length || 0,
          seoResults?.h3?.length || 0
        ],
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384']
      }
    ]
  };

  return (
    <div className="homepage-content">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="main-title">Analyze Your Website SEO</h1>
          <p className="sub-title">Level up your web insights in style ⚡</p>
        </div>

        <div className="form-container">
          <input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setSeoResults(null);
              setImageResults(null);
              setSeoScore(null);
              setKeywords([]);
              setUrlError(null);
            }}
            className="url-input"
            placeholder="🔗 Enter your website URL"
          />
          {urlError && <p className="error-text">{urlError}</p>}

          <div className="button-container">
            <button onClick={handleAnalyzeSeo} className="analyze-btn" disabled={loading}>
              Analyze SEO
            </button>
            <button onClick={handleAnalyzeImages} className="analyze-btn" disabled={loading}>
              Analyze Images
            </button>
          </div>

          {loading && <p className="loading-text">🔍 Analyzing, please wait...</p>}

          {(seoResults || imageResults) && (
            <button onClick={goToDashboard} className="dashboard-btn">
              🚀 Go to Dashboard
            </button>
          )}

          {seoResults && (
            <div className="result-container">
              <h2 className="result-title">📈 SEO Results</h2>
              <p><strong>Title:</strong> {seoResults.title || <span style={{color:'#ff7675'}}>No title found</span>}</p>
              <p><strong>Description:</strong> {seoResults.description || <span style={{color:'#ff7675'}}>No description found</span>}</p>
              <p>
                <strong>H1 Tags:</strong> {
                  seoResults.h1 && seoResults.h1.length > 0
                  ? seoResults.h1.join(', ')
                  : <span style={{color:'#fdcb6e'}}>No H1 tags found</span>
                }
              </p>
              <p>
                <strong>H2 Tags:</strong> {
                  seoResults.h2 && seoResults.h2.length > 0
                  ? seoResults.h2.join(', ')
                  : <span style={{color:'#fdcb6e'}}>No H2 tags found</span>
                }
              </p>
              <p>
                <strong>H3 Tags:</strong> {
                  seoResults.h3 && seoResults.h3.length > 0
                  ? seoResults.h3.join(', ')
                  : <span style={{color:'#fdcb6e'}}>No H3 tags found</span>
                }
              </p>
              <p className="seo-score">
                🎯 SEO Score: {seoScore}/100
                {seoScore === 0 && (
                  <span style={{color:'#ff7675', marginLeft: '12px'}}>No SEO data found – please check the website URL or try again!</span>
                )}
              </p>
              <h4>🧠 Top Keywords</h4>
              <ul>
                {keywords.length > 0 ? keywords.map(([word, freq], idx) => (
                  <li key={idx}>{word} — {freq} times</li>
                )) : <li style={{color:'#b2bec3'}}>No keywords found</li>}
              </ul>
              <h4>📊 Headings Chart</h4>
              {
                ( (seoResults.h1?.length || 0) === 0 &&
                  (seoResults.h2?.length || 0) === 0 &&
                  (seoResults.h3?.length || 0) === 0
                ) ? (
                  <p style={{color:'#b2bec3'}}>No heading tags found to display in chart.</p>
                ) : (
                  <Bar data={headingChartData} />
                )
              }
            </div>
          )}

          {imageResults && (
            <div className="result-container">
              <h2 className="result-title">🖼️ Image Analysis</h2>
              <p>
                <strong>Missing alt text:</strong>{" "}
                {imageResults.missing_alt && imageResults.missing_alt.length > 0
                  ? imageResults.missing_alt.join(', ')
                  : <span style={{color:'#00b894'}}>All images have alt text</span>}
              </p>
              <p>
                <strong>Wrong image formats:</strong>{" "}
                {imageResults.wrong_format && imageResults.wrong_format.length > 0
                  ? imageResults.wrong_format.join(', ')
                  : <span style={{color:'#00b894'}}>No format issues found</span>}
              </p>
            </div>
          )}
        </div>

        <SeoFixAssistant />

      </div>
    </div>
  );
}

export default Homepage;
