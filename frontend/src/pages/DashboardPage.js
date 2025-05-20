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

import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
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

// Register Chart.js components
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
  const [seoResults, setSeoResults] = useState(JSON.parse(localStorage.getItem('seoResults')));
  const [imageResults, setImageResults] = useState(JSON.parse(localStorage.getItem('imageResults')));

  useEffect(() => {
    if (!seoResults || !imageResults) {
      alert('No results found. Please analyze the website first.');
    }
  }, [seoResults, imageResults]);

  // SEO Pie Chart Data
  const seoLabels = ['H1', 'H2', 'H3'];
  const seoData = {
    labels: seoLabels,
    datasets: [
      {
        label: 'Heading Tags Frequency',
        data: [seoResults?.h1.length || 0, seoResults?.h2.length || 0, seoResults?.h3.length || 0],
        backgroundColor: ['#4FD1C5', '#9F7AEA', '#F6AD55'],
        borderColor: ['#319795', '#6B46C1', '#DD6B20'],
        borderWidth: 1,
      },
    ],
  };

  // Image Bar Chart Data
  const imageLabels = ['Missing Alt Text', 'Wrong Image Format'];
  const imageData = {
    labels: imageLabels,
    datasets: [
      {
        label: 'Image Issues',
        data: [
          imageResults?.missing_alt.length || 0,
          imageResults?.wrong_format.length || 0,
        ],
        backgroundColor: ['#FC8181', '#63B3ED'],
        borderColor: ['#C53030', '#2B6CB0'],
        borderWidth: 1,
      },
    ],
  };

  // Generate PDF Report
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('SEO & Image Analysis Report', 20, 20);
    doc.autoTable({
      head: [['Metric', 'Value']],
      body: [
        ['Title', seoResults?.title],
        ['Description', seoResults?.description],
        ['H1 Tags', seoResults?.h1.join(', ')],
        ['H2 Tags', seoResults?.h2.join(', ')],
        ['H3 Tags', seoResults?.h3.join(', ')],
        ['Missing Alt Text', imageResults?.missing_alt.join(', ')],
        ['Wrong Image Formats', imageResults?.wrong_format.join(', ')],
      ],
    });
    doc.save('SEO_Image_Analysis_Report.pdf');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-purple-700 mb-8">Dashboard</h1>

      {/* SEO Analysis */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">SEO Analysis</h2>
        <div className="flex justify-center mb-6">
          <div style={{ maxWidth: '300px' }}>
            <Pie data={seoData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold">SEO Results</h3>
          <p><strong>Title:</strong> {seoResults?.title}</p>
          <p><strong>Description:</strong> {seoResults?.description}</p>
          <p><strong>H1 Tags:</strong> {seoResults?.h1.join(', ')}</p>
          <p><strong>H2 Tags:</strong> {seoResults?.h2.join(', ')}</p>
          <p><strong>H3 Tags:</strong> {seoResults?.h3.join(', ')}</p>
        </div>
      </div>

      {/* Image Analysis */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Image Analysis</h2>
        <div className="flex justify-center mb-6">
          <div style={{ maxWidth: '500px' }}>
            <Bar data={imageData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Image Analysis Results</h3>
          <p><strong>Missing Alt Text:</strong> {imageResults?.missing_alt.join(', ')}</p>
          <p><strong>Wrong Image Formats:</strong> {imageResults?.wrong_format.join(', ')}</p>
        </div>
      </div>

      {/* Download PDF */}
      <div className="text-center">
        <button
          onClick={generatePDF}
          className="bg-purple-600 text-white p-3 rounded-md hover:bg-purple-700"
        >
          Download PDF Report
        </button>
      </div>
    </div>
  );
}

export default DashboardPage;
