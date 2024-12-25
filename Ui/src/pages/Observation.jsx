import React, { useState, useEffect, useRef } from 'react';
import DashboardCharts from '../components/DashboardChart.jsx';
import html2canvas from 'html2canvas'; 
import { jsPDF } from 'jspdf'; 

const ObservationPage = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const componentRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/v1/details");
        if (!response.ok) throw new Error("Failed to fetch details.");
        const data = await response.json();
        setFormData(data.data[0]);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleExportPDF = async () => {
    const element = componentRef.current;
    const canvas = await html2canvas(element, {
      scale: 2, 
      logging: false,
      useCORS: true, 
    });

    const imgData = canvas.toDataURL('image/png');
    
    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    const doc = new jsPDF('p', 'mm', 'a4');
    let position = 0;

    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);

    while (imgHeight > pageHeight) {
      position -= pageHeight;
      doc.addPage();
      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    }

    doc.save('dashboard-report.pdf');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      {/* Export PDF Button on the Right */}
      <button
        onClick={handleExportPDF}
        className="flex items-center justify-center space-x-2 p-3 bg-white border border-blue-600 text-blue-600 rounded-lg shadow-md hover:bg-blue-50 absolute top-4 right-4"
      >
        <span className="font-semibold">Export PDF</span>
        {/* Custom arrow icon using CSS */}
        <div className="w-3 h-3 border-t-2 border-r-2 border-blue-600 rotate-45 transform"></div>
      </button>

      <div ref={componentRef}>
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

        {formData ? (
          <DashboardCharts data={formData} />
        ) : (
          <div className="flex items-center justify-center text-gray-500">
            <p>No data available to display.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ObservationPage;
