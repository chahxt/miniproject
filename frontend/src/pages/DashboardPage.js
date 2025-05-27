// import React, { useState, useEffect, useRef } from 'react';
// import { Line, Pie, Bar } from 'react-chartjs-2';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable'; // Import for PDF table generation

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   ArcElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// // Registering Chart.js components
// ChartJS.register(
//   ArcElement,  // Register arc for pie chart
//   BarElement,  // Register bar for bar chart
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function DashboardPage() {
//   const [seoResults, setSeoResults] = useState(JSON.parse(localStorage.getItem('seoResults')));
//   const [imageResults, setImageResults] = useState(JSON.parse(localStorage.getItem('imageResults')));

//   const pieChartRef = useRef(null);
//   const barChartRef = useRef(null);

//   // Check if results are available in localStorage
//   useEffect(() => {
//     if (!seoResults || !imageResults) {
//       alert('No results found. Please analyze the website first.');
//     }
//   }, [seoResults, imageResults]);

//   // SEO Data for Pie Chart
//   const seoLabels = ['H1', 'H2', 'H3'];
//   const seoData = {
//     labels: seoLabels,
//     datasets: [
//       {
//         label: 'Heading Tags Frequency',
//         data: [seoResults?.h1.length || 0, seoResults?.h2.length || 0, seoResults?.h3.length || 0],
//         backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
//         borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Image Data for Bar Chart
//   const imageLabels = ['Missing Alt Text', 'Wrong Image Format'];
//   const imageData = {
//     labels: imageLabels,
//     datasets: [
//       {
//         label: 'Image Issues',
//         data: [
//           imageResults?.missing_alt.length || 0,
//           imageResults?.wrong_format.length || 0,
//         ],
//         backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
//         borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Handle PDF Generation
//   const generatePDF = () => {
//     const doc = new jsPDF();
//     doc.text('SEO & Image Analysis Report', 20, 20);

//     doc.autoTable({
//       head: [['Metric', 'Value']],
//       body: [
//         ['Title', seoResults?.title],
//         ['Description', seoResults?.description],
//         ['H1 Tags', seoResults?.h1.join(', ')],
//         ['H2 Tags', seoResults?.h2.join(', ')],
//         ['H3 Tags', seoResults?.h3.join(', ')],
//         ['Missing Alt Text', imageResults?.missing_alt.join(', ')],
//         ['Wrong Image Formats', imageResults?.wrong_format.join(', ')],
//       ],
//     });

//     doc.save('SEO_Image_Analysis_Report.pdf');
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold text-center text-purple-700 mb-8">Dashboard</h1>

//       {/* SEO Analysis Section */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//         <h2 className="text-2xl font-semibold mb-4">SEO Analysis</h2>
//         <div className="flex justify-center mb-6">
//           <Pie ref={pieChartRef} data={seoData} options={{ responsive: true }} />
//         </div>
//         <div>
//           <h3 className="text-xl font-semibold">SEO Results</h3>
//           <p><strong>Title:</strong> {seoResults?.title}</p>
//           <p><strong>Description:</strong> {seoResults?.description}</p>
//           <p><strong>H1 Tags:</strong> {seoResults?.h1.join(', ')}</p>
//           <p><strong>H2 Tags:</strong> {seoResults?.h2.join(', ')}</p>
//           <p><strong>H3 Tags:</strong> {seoResults?.h3.join(', ')}</p>
//         </div>
//       </div>

//       {/* Image Analysis Section */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//         <h2 className="text-2xl font-semibold mb-4">Image Analysis</h2>
//         <div className="flex justify-center mb-6">
//           <Bar ref={barChartRef} data={imageData} options={{ responsive: true }} />
//         </div>
//         <div>
//           <h3 className="text-xl font-semibold">Image Analysis Results</h3>
//           <p><strong>Missing Alt Text:</strong> {imageResults?.missing_alt.join(', ')}</p>
//           <p><strong>Wrong Image Formats:</strong> {imageResults?.wrong_format.join(', ')}</p>
//         </div>
//       </div>

//       {/* PDF Generation Button */}
//       <div className="text-center">
//         <button
//           onClick={generatePDF}
//           className="bg-purple-600 text-white p-3 rounded-md hover:bg-purple-700"
//         >
//           Download PDF Report
//         </button>
//       </div>
//     </div>
//   );
// }

// export default DashboardPage;

// import React, { useState, useEffect } from 'react';
// import { Pie, Bar } from 'react-chartjs-2';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import '../Dashboard.css';

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   ArcElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// // Register Chart.js components
// ChartJS.register(
//   ArcElement,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function DashboardPage() {
//   const [seoResults, setSeoResults] = useState(JSON.parse(localStorage.getItem('seoResults')));
//   const [imageResults, setImageResults] = useState(JSON.parse(localStorage.getItem('imageResults')));

//   useEffect(() => {
//     if (!seoResults || !imageResults) {
//       alert('No results found. Please analyze the website first.');
//     }
//   }, [seoResults, imageResults]);

//   // SEO Pie Chart Data
//   const seoLabels = ['H1', 'H2', 'H3'];
//   const seoData = {
//     labels: seoLabels,
//     datasets: [
//       {
//         label: 'Heading Tags Frequency',
//         data: [seoResults?.h1.length || 0, seoResults?.h2.length || 0, seoResults?.h3.length || 0],
//         backgroundColor: ['#4FD1C5', '#9F7AEA', '#F6AD55'],
//         borderColor: ['#319795', '#6B46C1', '#DD6B20'],
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Image Bar Chart Data
//   const imageLabels = ['Missing Alt Text', 'Wrong Image Format'];
//   const imageData = {
//     labels: imageLabels,
//     datasets: [
//       {
//         label: 'Image Issues',
//         data: [
//           imageResults?.missing_alt.length || 0,
//           imageResults?.wrong_format.length || 0,
//         ],
//         backgroundColor: ['#FC8181', '#63B3ED'],
//         borderColor: ['#C53030', '#2B6CB0'],
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Generate PDF Report
//   const generatePDF = () => {
//     const doc = new jsPDF();
//     doc.text('SEO & Image Analysis Report', 20, 20);
//     doc.autoTable({
//       head: [['Metric', 'Value']],
//       body: [
//         ['Title', seoResults?.title],
//         ['Description', seoResults?.description],
//         ['H1 Tags', seoResults?.h1.join(', ')],
//         ['H2 Tags', seoResults?.h2.join(', ')],
//         ['H3 Tags', seoResults?.h3.join(', ')],
//         ['Missing Alt Text', imageResults?.missing_alt.join(', ')],
//         ['Wrong Image Formats', imageResults?.wrong_format.join(', ')],
//       ],
//     });
//     doc.save('SEO_Image_Analysis_Report.pdf');
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold text-center text-purple-700 mb-8">Dashboard</h1>

//       {/* SEO Analysis */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//         <h2 className="text-2xl font-semibold mb-4">SEO Analysis</h2>
//         <div className="flex justify-center mb-6">
//           <div style={{ maxWidth: '300px' }}>
//             <Pie data={seoData} options={{ responsive: true, maintainAspectRatio: false }} />
//           </div>
//         </div>
//         <div>
//           <h3 className="text-xl font-semibold">SEO Results</h3>
//           <p><strong>Title:</strong> {seoResults?.title}</p>
//           <p><strong>Description:</strong> {seoResults?.description}</p>
//           <p><strong>H1 Tags:</strong> {seoResults?.h1.join(', ')}</p>
//           <p><strong>H2 Tags:</strong> {seoResults?.h2.join(', ')}</p>
//           <p><strong>H3 Tags:</strong> {seoResults?.h3.join(', ')}</p>
//         </div>
//       </div>

//       {/* Image Analysis */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//         <h2 className="text-2xl font-semibold mb-4">Image Analysis</h2>
//         <div className="flex justify-center mb-6">
//           <div style={{ maxWidth: '500px' }}>
//             <Bar data={imageData} options={{ responsive: true, maintainAspectRatio: false }} />
//           </div>
//         </div>
//         <div>
//           <h3 className="text-xl font-semibold">Image Analysis Results</h3>
//           <p><strong>Missing Alt Text:</strong> {imageResults?.missing_alt.join(', ')}</p>
//           <p><strong>Wrong Image Formats:</strong> {imageResults?.wrong_format.join(', ')}</p>
//         </div>
//       </div>

//       {/* Download PDF */}
//       <div className="text-center">
//         <button
//           onClick={generatePDF}
//           className="bg-purple-600 text-white p-3 rounded-md hover:bg-purple-700"
//         >
//           Download PDF Report
//         </button>
//       </div>
//     </div>
//   );
// }

// export default DashboardPage;



// import React, { useState, useEffect } from 'react';
// import { Pie, Bar } from 'react-chartjs-2';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import '../DashboardPage.css';

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   ArcElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// // Register Chart.js components
// ChartJS.register(
//   ArcElement,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function DashboardPage() {
//   // Grab results from localStorage (set after analysis)
//   const [seoResults, setSeoResults] = useState(() => JSON.parse(localStorage.getItem('seoResults')));
//   const [imageResults, setImageResults] = useState(() => JSON.parse(localStorage.getItem('imageResults')));

//   useEffect(() => {
//     if (!seoResults || !imageResults) {
//       alert('No results found. Please analyze a website first.');
//     }
//   }, [seoResults, imageResults]);

//   // Stat cards at top (can make dynamic later)
//   const stats = [
//     {
//       label: 'Title Found',
//       value: seoResults?.title ? "✅" : "❌",
//       icon: '📝',
//       color: 'linear-gradient(90deg, #00ffd0 60%, #2c3e50 100%)',
//     },
//     {
//       label: 'Total H1/H2/H3',
//       value:
//         ((seoResults?.h1?.length || 0) +
//          (seoResults?.h2?.length || 0) +
//          (seoResults?.h3?.length || 0)
//         ),
//       icon: '🔤',
//       color: 'linear-gradient(90deg, #36d1c4 60%, #6a1b9a 100%)',
//     },
//     {
//       label: 'Missing Alt Text',
//       value: imageResults?.missing_alt?.length || 0,
//       icon: '🚫',
//       color: 'linear-gradient(90deg, #f857a6 60%, #ff5858 100%)',
//     },
//     {
//       label: 'Wrong Image Format',
//       value: imageResults?.wrong_format?.length || 0,
//       icon: '🖼️',
//       color: 'linear-gradient(90deg, #ffe259 40%, #ffa751 100%)',
//     }
//   ];

//   // Pie for SEO Headings
//   const seoData = {
//     labels: ['H1', 'H2', 'H3'],
//     datasets: [
//       {
//         label: 'Heading Tags Frequency',
//         data: [
//           seoResults?.h1?.length || 0,
//           seoResults?.h2?.length || 0,
//           seoResults?.h3?.length || 0
//         ],
//         backgroundColor: ['#4FD1C5', '#9F7AEA', '#F6AD55'],
//         borderColor: ['#319795', '#6B46C1', '#DD6B20'],
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Bar for image issues
//   const imageData = {
//     labels: ['Missing Alt Text', 'Wrong Image Format'],
//     datasets: [
//       {
//         label: 'Image Issues',
//         data: [
//           imageResults?.missing_alt?.length || 0,
//           imageResults?.wrong_format?.length || 0,
//         ],
//         backgroundColor: ['#FC8181', '#63B3ED'],
//         borderColor: ['#C53030', '#2B6CB0'],
//         borderWidth: 1,
//       },
//     ],
//   };

//   // PDF Export (works!)
//   const generatePDF = () => {
//     const doc = new jsPDF();
//     doc.text('SEO & Image Analysis Report', 20, 18);

//     // Add summary stats
//     doc.autoTable({
//       head: [['Metric', 'Value']],
//       body: [
//         ['Title', seoResults?.title || 'N/A'],
//         ['Description', seoResults?.description || 'N/A'],
//         ['H1 Tags', seoResults?.h1?.join(', ') || 'None'],
//         ['H2 Tags', seoResults?.h2?.join(', ') || 'None'],
//         ['H3 Tags', seoResults?.h3?.join(', ') || 'None'],
//         ['Missing Alt Text', imageResults?.missing_alt?.join(', ') || 'None'],
//         ['Wrong Image Formats', imageResults?.wrong_format?.join(', ') || 'None'],
//       ],
//     });

//     // Show a summary
//     doc.text('--- Summary ---', 20, doc.lastAutoTable.finalY + 10);
//     doc.text(`Total Headings: ${(seoResults?.h1?.length || 0) + (seoResults?.h2?.length || 0) + (seoResults?.h3?.length || 0)}`, 20, doc.lastAutoTable.finalY + 18);

//     doc.save('SEO_Image_Analysis_Report.pdf');
//   };

//   return (
//     <div className="dashboard-page">
//       <h2 className="dashboard-title animate-glow">SEO Dashboard</h2>

//       {/* Stat Cards */}
//       <div className="dashboard-card-row">
//         {stats.map((item, idx) => (
//           <div
//             key={item.label}
//             className="dashboard-stat-card animate-fadein"
//             style={{ background: item.color, animationDelay: `${idx * 0.15 + 0.2}s` }}
//           >
//             <div className="dashboard-stat-icon">{item.icon}</div>
//             <div className="dashboard-stat-value">{item.value}</div>
//             <div className="dashboard-stat-label">{item.label}</div>
//           </div>
//         ))}
//       </div>

//       {/* SEO Analysis Section */}
//       <div className="dashboard-section">
//         <h3 className="dashboard-section-title">SEO Heading Analysis</h3>
//         <div className="dashboard-charts-flex">
//           <div className="dashboard-chart-box">
//             <Pie data={seoData} options={{ responsive: true, maintainAspectRatio: false }} />
//           </div>
//           <div className="dashboard-results">
//             <p><strong>Title:</strong> {seoResults?.title || <span style={{color: 'salmon'}}>Not found</span>}</p>
//             <p><strong>Description:</strong> {seoResults?.description || <span style={{color: 'salmon'}}>Not found</span>}</p>
//             <p><strong>H1 Tags:</strong> {seoResults?.h1?.join(', ') || 'None'}</p>
//             <p><strong>H2 Tags:</strong> {seoResults?.h2?.join(', ') || 'None'}</p>
//             <p><strong>H3 Tags:</strong> {seoResults?.h3?.join(', ') || 'None'}</p>
//           </div>
//         </div>
//       </div>

//       {/* Image Analysis Section */}
//       <div className="dashboard-section">
//         <h3 className="dashboard-section-title">Image Analysis</h3>
//         <div className="dashboard-charts-flex">
//           <div className="dashboard-chart-box" style={{maxWidth: 400}}>
//             <Bar data={imageData} options={{ responsive: true, maintainAspectRatio: false }} />
//           </div>
//           <div className="dashboard-results">
//             <p><strong>Missing Alt Text:</strong> {imageResults?.missing_alt?.join(', ') || 'None'}</p>
//             <p><strong>Wrong Image Formats:</strong> {imageResults?.wrong_format?.join(', ') || 'None'}</p>
//           </div>
//         </div>
//       </div>

//       {/* Download PDF */}
//       <div className="dashboard-footer">
//         <button onClick={generatePDF} className="download-btn">
//           Download PDF Report
//         </button>
//       </div>

//       {/* Extra: News/Info section */}
//       <div className="dashboard-news">
//         <h3 className="dashboard-section-title">📢 Latest SEO News & Tips</h3>
//         <ul>
//           <li>Google updated its search ranking – focus on mobile-first design!</li>
//           <li>Try our <span className="highlight">Image Alt-Tag Generator</span> for accessibility.</li>
//           <li>Visit <a href="https://moz.com/blog" target="_blank" rel="noopener noreferrer">Moz Blog</a> for more SEO tips.</li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default DashboardPage;


import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import '../Dashboard.css';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function DashboardPage() {
  // Grab SEO/Image results from localStorage (set after analysis)
  const [seoResults, setSeoResults] = useState(() => JSON.parse(localStorage.getItem('seoResults')));
  const [imageResults, setImageResults] = useState(() => JSON.parse(localStorage.getItem('imageResults')));
  
  // History of analyzed URLs
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem('userEmail'); // You must store user email on login

  useEffect(() => {
    if (!seoResults || !imageResults) {
      alert('No results found. Please analyze a website first.');
    }
    fetchHistory();
  }, []);

  // Fetch user history from backend
  const fetchHistory = async () => {
    try {
      if (!email) return;
      const response = await axios.post('http://localhost:5000/history', { email });
      setHistory(response.data.history.reverse()); // newest first
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  // Clear history backend call + clear local history state
  const clearHistory = async () => {
    try {
      if (!email) return;
      await axios.post('http://localhost:5000/clear-history', { email });
      setHistory([]);
      alert('History cleared.');
    } catch (error) {
      console.error('Error clearing history:', error);
      alert('Failed to clear history.');
    }
  };

  // Re-analyze a URL from history, update results and refresh history
  const reAnalyze = async (url) => {
    setLoading(true);
    try {
      // Analyze SEO
      const seoResp = await axios.post(
        'http://localhost:5000/analyze-seo',
        { url, email }
      );
      setSeoResults(seoResp.data);
      localStorage.setItem('seoResults', JSON.stringify(seoResp.data));

      // Analyze Images
      const imgResp = await axios.post(
        'http://localhost:5000/analyze-images',
        { url }
      );
      setImageResults(imgResp.data);
      localStorage.setItem('imageResults', JSON.stringify(imgResp.data));

      // Refresh history after adding new analysis
      fetchHistory();
    } catch (error) {
      alert('Error re-analyzing URL.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Stat cards at top
  const stats = [
    {
      label: 'Title Found',
      value: seoResults?.title ? "✅" : "❌",
      icon: '📝',
      color: 'linear-gradient(90deg, #00ffd0 60%, #2c3e50 100%)',
    },
    {
      label: 'Total H1/H2/H3',
      value:
        ((seoResults?.h1?.length || 0) +
         (seoResults?.h2?.length || 0) +
         (seoResults?.h3?.length || 0)
        ),
      icon: '🔤',
      color: 'linear-gradient(90deg, #36d1c4 60%, #6a1b9a 100%)',
    },
    {
      label: 'Missing Alt Text',
      value: imageResults?.missing_alt?.length || 0,
      icon: '🚫',
      color: 'linear-gradient(90deg, #f857a6 60%, #ff5858 100%)',
    },
    {
      label: 'Wrong Image Format',
      value: imageResults?.wrong_format?.length || 0,
      icon: '🖼️',
      color: 'linear-gradient(90deg, #ffe259 40%, #ffa751 100%)',
    }
  ];

  // Pie for SEO Headings
  const seoData = {
    labels: ['H1', 'H2', 'H3'],
    datasets: [
      {
        label: 'Heading Tags Frequency',
        data: [
          seoResults?.h1?.length || 0,
          seoResults?.h2?.length || 0,
          seoResults?.h3?.length || 0
        ],
        backgroundColor: ['#4FD1C5', '#9F7AEA', '#F6AD55'],
        borderColor: ['#319795', '#6B46C1', '#DD6B20'],
        borderWidth: 1,
      },
    ],
  };

  // Bar for image issues
  const imageData = {
    labels: ['Missing Alt Text', 'Wrong Image Format'],
    datasets: [
      {
        label: 'Image Issues',
        data: [
          imageResults?.missing_alt?.length || 0,
          imageResults?.wrong_format?.length || 0,
        ],
        backgroundColor: ['#FC8181', '#63B3ED'],
        borderColor: ['#C53030', '#2B6CB0'],
        borderWidth: 1,
      },
    ],
  };

  // Generate PDF report with SEO, image results + history table
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('SEO & Image Analysis Report', 20, 18);

    // Add summary stats
    doc.autoTable({
      head: [['Metric', 'Value']],
      body: [
        ['Title', seoResults?.title || 'N/A'],
        ['Description', seoResults?.description || 'N/A'],
        ['H1 Tags', seoResults?.h1?.join(', ') || 'None'],
        ['H2 Tags', seoResults?.h2?.join(', ') || 'None'],
        ['H3 Tags', seoResults?.h3?.join(', ') || 'None'],
        ['Missing Alt Text', imageResults?.missing_alt?.join(', ') || 'None'],
        ['Wrong Image Formats', imageResults?.wrong_format?.join(', ') || 'None'],
      ],
    });

    // History table
    doc.text('Analysis History:', 20, doc.lastAutoTable.finalY + 10);
    const historyBody = history.length > 0
      ? history.map(h => [h.url, new Date(h.timestamp).toLocaleString()])
      : [['No history found', '']];
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 15,
      head: [['URL', 'Analyzed At']],
      body: historyBody,
      styles: { fontSize: 8 },
    });

    doc.save('SEO_Image_Analysis_Report.pdf');
  };

  return (
    <div className="dashboard-page">
      <h2 className="dashboard-title animate-glow">SEO Dashboard</h2>

      {/* Stat Cards */}
      <div className="dashboard-card-row">
        {stats.map((item, idx) => (
          <div
            key={item.label}
            className="dashboard-stat-card animate-fadein"
            style={{ background: item.color, animationDelay: `${idx * 0.15 + 0.2}s` }}
          >
            <div className="dashboard-stat-icon">{item.icon}</div>
            <div className="dashboard-stat-value">{item.value}</div>
            <div className="dashboard-stat-label">{item.label}</div>
          </div>
        ))}
      </div>

      {/* SEO Analysis Section */}
      <div className="dashboard-section">
        <h3 className="dashboard-section-title">SEO Heading Analysis</h3>
        <div className="dashboard-charts-flex">
          <div className="dashboard-chart-box">
            <Pie data={seoData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
          <div className="dashboard-results">
            <p><strong>Title:</strong> {seoResults?.title || <span style={{color: 'salmon'}}>Not found</span>}</p>
            <p><strong>Description:</strong> {seoResults?.description || <span style={{color: 'salmon'}}>Not found</span>}</p>
            <p><strong>H1 Tags:</strong> {seoResults?.h1?.join(', ') || 'None'}</p>
            <p><strong>H2 Tags:</strong> {seoResults?.h2?.join(', ') || 'None'}</p>
            <p><strong>H3 Tags:</strong> {seoResults?.h3?.join(', ') || 'None'}</p>
          </div>
        </div>
      </div>

      {/* Image Analysis Section */}
      <div className="dashboard-section">
        <h3 className="dashboard-section-title">Image Analysis</h3>
        <div className="dashboard-charts-flex">
          <div className="dashboard-chart-box" style={{maxWidth: 400}}>
            <Bar data={imageData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
          <div className="dashboard-results">
            <p><strong>Missing Alt Text:</strong> {imageResults?.missing_alt?.join(', ') || 'None'}</p>
            <p><strong>Wrong Image Formats:</strong> {imageResults?.wrong_format?.join(', ') || 'None'}</p>
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="dashboard-section">
        <h3 className="dashboard-section-title">Analysis History</h3>
        {history.length === 0 ? (
          <p>No analysis history found.</p>
        ) : (
          <ul className="history-list">
            {history.map((h, idx) => (
              <li key={idx}>
                <button
                  className="history-link"
                  onClick={() => reAnalyze(h.url)}
                  disabled={loading}
                >
                  {h.url}
                </button>
                <span className="timestamp">{new Date(h.timestamp).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}
        {history.length > 0 && (
          <button className="clear-history-btn" onClick={clearHistory} disabled={loading}>
            Clear History
          </button>
        )}
      </div>

      {/* Download PDF */}
      <div className="dashboard-footer">
        <button onClick={generatePDF} className="download-btn" disabled={loading}>
          Download PDF Report
        </button>
      </div>

      {/* Extra: News/Info section */}
      <div className="dashboard-news">
        <h3 className="dashboard-section-title">📢 Latest SEO News & Tips</h3>
        <ul>
          <li>Google updated its search ranking – focus on mobile-first design!</li>
          <li>Try our <span className="highlight">Image Alt-Tag Generator</span> for accessibility.</li>
          <li>Visit <a href="https://moz.com/blog" target="_blank" rel="noopener noreferrer">Moz Blog</a> for more SEO tips.</li>
        </ul>
      </div>
    </div>
  );
}

export default DashboardPage;
