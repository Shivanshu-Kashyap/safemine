import React, { useState, useEffect } from 'react';
import DashboardCharts from '../components/DashboardChart.jsx';

const ObservationPage = () => {
  const [formData, setFormData] = useState(null); // Use 'formData' as the state variable
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/v1/details"); // Backend API endpoint
        if (!response.ok) throw new Error("Failed to fetch details.");
        const data = await response.json();
        setFormData(data.data[0]); // Assuming only one entry
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
      {formData ? ( // Use 'formData' instead of 'data'
        <DashboardCharts data={formData} />
      ) : (
        <div className="flex items-center justify-center text-gray-500">
          <p>No data available to display.</p>
        </div>
      )}
    </div>
  );
};

export default ObservationPage;
