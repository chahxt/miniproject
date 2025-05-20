

// import React, { useState } from 'react';
// import axios from 'axios';

// function Homepage() {
//   const [url, setUrl] = useState('');
//   const [seoResults, setSeoResults] = useState(null);
//   const [imageResults, setImageResults] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleAnalyzeSeo = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post('http://localhost:5000/analyze-seo', { url });
//       setSeoResults(response.data);
//     } catch (error) {
//       console.error('Error analyzing SEO:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAnalyzeImages = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post('http://localhost:5000/analyze-images', { url });
//       setImageResults(response.data);
//     } catch (error) {
//       console.error('Error analyzing images:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-screen-lg mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">SEO & Image Analyzer</h1>
//       <input
//         type="text"
//         value={url}
//         onChange={(e) => setUrl(e.target.value)}
//         className="border p-2 w-full mb-4"
//         placeholder="Enter URL"
//       />
//       <button onClick={handleAnalyzeSeo} className="bg-blue-500 text-white p-2 mb-2 mr-2">Analyze SEO</button>
//       <button onClick={handleAnalyzeImages} className="bg-green-500 text-white p-2 mb-2">Analyze Images</button>

//       {loading && <p>Loading...</p>}

//       {seoResults && (
//         <div>
//           <h2 className="text-xl font-semibold mt-4">SEO Results</h2>
//           <p><strong>Title:</strong> {seoResults.title}</p>
//           <p><strong>Description:</strong> {seoResults.description}</p>
//           <p><strong>H1 Tags:</strong> {seoResults.h1.join(', ')}</p>
//           <p><strong>H2 Tags:</strong> {seoResults.h2.join(', ')}</p>
//           <p><strong>H3 Tags:</strong> {seoResults.h3.join(', ')}</p>
//         </div>
//       )}

//       {imageResults && (
//         <div>
//           <h2 className="text-xl font-semibold mt-4">Image Analysis</h2>
//           <p><strong>Missing alt text:</strong> {imageResults.missing_alt.join(', ')}</p>
//           <p><strong>Wrong image formats:</strong> {imageResults.wrong_format.join(', ')}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Homepage;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Homepage.css'; // Go up one level to access the CSS file in 'frontend/src'


function Homepage() {
  const [url, setUrl] = useState('');
  const [seoResults, setSeoResults] = useState(null);
  const [imageResults, setImageResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleAnalyzeSeo = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/analyze-seo', { url });
      setSeoResults(response.data);
    } catch (error) {
      console.error('Error analyzing SEO:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeImages = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/analyze-images', { url });
      setImageResults(response.data);
    } catch (error) {
      console.error('Error analyzing images:', error);
    } finally {
      setLoading(false);
    }
  };

  const goToDashboard = () => {
    localStorage.setItem('seoResults', JSON.stringify(seoResults));
    localStorage.setItem('imageResults', JSON.stringify(imageResults));
    navigate('/dashboard');
  };

  return (
    <div className="homepage-container">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="main-title">SEO & Image Analyzer</h1>
          <p className="sub-title">Level up your web insights in style ⚡</p>
        </div>

        <div className="form-container">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="url-input"
            placeholder="🔗 Enter your website URL"
          />
          <div className="button-container">
            <button onClick={handleAnalyzeSeo} className="analyze-btn">Analyze SEO</button>
            <button onClick={handleAnalyzeImages} className="analyze-btn">Analyze Images</button>
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
              <p><strong>Title:</strong> {seoResults.title}</p>
              <p><strong>Description:</strong> {seoResults.description}</p>
              <p><strong>H1 Tags:</strong> {seoResults.h1.join(', ')}</p>
              <p><strong>H2 Tags:</strong> {seoResults.h2.join(', ')}</p>
              <p><strong>H3 Tags:</strong> {seoResults.h3.join(', ')}</p>
            </div>
          )}

          {imageResults && (
            <div className="result-container">
              <h2 className="result-title">🖼️ Image Analysis</h2>
              <p><strong>Missing alt text:</strong> {imageResults.missing_alt.join(', ')}</p>
              <p><strong>Wrong image formats:</strong> {imageResults.wrong_format.join(', ')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
