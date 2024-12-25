import React, { useState } from 'react';

const DetailForm = () => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    rounds: {
      completed: 0,
      overdue: 0,
      skipped: 0,
      inProgress: 0,
      cancelled: 0
    },
    tasks: {
      completed: 0,
      incomplete: 0,
      skipped: 0
    },
    actions: {
      pending: 0,
      completed: 0
    },
    employees: {
      total: 0,
      present: 0,
      absent: 0,
      lateArrival: 0,
      onLeave: 0
    }
  });

  const handleInputChange = (category, subcategory, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subcategory]: parseInt(value) || 0
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/v1/details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
  
      alert("Data submitted successfully!");
      setFormData({
        date: new Date().toISOString().split('T')[0],
        rounds: { completed: 0, overdue: 0, skipped: 0, inProgress: 0, cancelled: 0 },
        tasks: { completed: 0, incomplete: 0, skipped: 0 },
        actions: { pending: 0, completed: 0 },
        employees: { total: 0, present: 0, absent: 0, lateArrival: 0, onLeave: 0 },
      });
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Error submitting data");
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Daily Statistics Form</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Rounds Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Rounds</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.keys(formData.rounds).map((key) => (
              <div key={key}>
                <label className="block text-gray-700 text-sm font-bold mb-2 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.rounds[key]}
                  onChange={(e) => handleInputChange('rounds', key, e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Tasks Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Tasks</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.keys(formData.tasks).map((key) => (
              <div key={key}>
                <label className="block text-gray-700 text-sm font-bold mb-2 capitalize">
                  {key}
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.tasks[key]}
                  onChange={(e) => handleInputChange('tasks', key, e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Actions Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(formData.actions).map((key) => (
              <div key={key}>
                <label className="block text-gray-700 text-sm font-bold mb-2 capitalize">
                  {key}
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.actions[key]}
                  onChange={(e) => handleInputChange('actions', key, e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Employees Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Employees</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.keys(formData.employees).map((key) => (
              <div key={key}>
                <label className="block text-gray-700 text-sm font-bold mb-2 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.employees[key]}
                  onChange={(e) => handleInputChange('employees', key, e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DetailForm;