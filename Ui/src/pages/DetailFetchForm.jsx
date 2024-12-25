import React, { useState, useEffect } from "react";

const StyledDetailFetchForm = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch data from the backend
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

  const handleInputChange = (category, subcategory, value) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subcategory]: parseInt(value) || 0,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/v1/details/${formData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to update data.");
      alert("Data updated successfully!");
    } catch (err) {
      console.error(err.message);
      alert("Failed to update data.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Edit Details</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-full">
            <label className="block text-gray-700 font-medium mb-2">Date</label>
            <input
              type="date"
              value={formData.date.split("T")[0]}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Rounds</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.keys(formData.rounds).map((key) => (
              <div key={key}>
                <label className="block text-gray-600 font-medium mb-1 capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.rounds[key]}
                  onChange={(e) => handleInputChange("rounds", key, e.target.value)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Tasks</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.keys(formData.tasks).map((key) => (
              <div key={key}>
                <label className="block text-gray-600 font-medium mb-1 capitalize">
                  {key}
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.tasks[key]}
                  onChange={(e) => handleInputChange("tasks", key, e.target.value)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(formData.actions).map((key) => (
              <div key={key}>
                <label className="block text-gray-600 font-medium mb-1 capitalize">
                  {key}
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.actions[key]}
                  onChange={(e) => handleInputChange("actions", key, e.target.value)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Employees</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.keys(formData.employees).map((key) => (
              <div key={key} className="bg-gray-50 p-4 rounded-lg shadow">
                <p className="text-sm text-gray-600 capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </p>
                <p className="text-xl font-bold text-gray-800">
                  {formData.employees[key]}
                </p>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
        >
          Update Details
        </button>
      </form>
    </div>
  );
};

export default StyledDetailFetchForm;
