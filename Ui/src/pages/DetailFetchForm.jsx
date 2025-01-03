import React, { useState, useEffect } from "react";

const StyledDetailFetchForm = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

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

  const handleInputChange = (category, subcategory, value) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subcategory]: category === 'employees' ? value : (parseInt(value) || 0),
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
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
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-8">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto p-8 bg-[#FFF8E7] rounded-lg shadow-lg">
 
      <h2 className="text-3xl font-bold text-[#4A4A4A] items-center justify-center mb-6">Edit Details</h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-[#4A4A4A]">Date</h3>
          <input
            type="date"
            value={formData.date.split("T")[0]}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-[#4A4A4A]">Rounds</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.keys(formData.rounds).map((key) => (
              <div key={key}>
                <label className="block text-[#4A4A4A] font-medium mb-1 capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.rounds[key]}
                  onChange={(e) => handleInputChange("rounds", key, e.target.value)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-[#4A4A4A]">Tasks</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.keys(formData.tasks).map((key) => (
              <div key={key}>
                <label className="block text-[#4A4A4A] font-medium mb-1 capitalize">
                  {key}
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.tasks[key]}
                  onChange={(e) => handleInputChange("tasks", key, e.target.value)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-[#4A4A4A]">Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(formData.actions).map((key) => (
              <div key={key}>
                <label className="block text-[#4A4A4A] font-medium mb-1 capitalize">
                  {key}
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.actions[key]}
                  onChange={(e) => handleInputChange("actions", key, e.target.value)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-[#4A4A4A]">Employees</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.keys(formData.employees).map((key) => (
              <div key={key}>
                <label className="block text-[#4A4A4A] font-medium mb-1 capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </label>
                <input
                  type="text"
                  value={formData.employees[key]}
                  onChange={(e) => handleInputChange("employees", key, e.target.value)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 px-6 bg-[#D2B48C] text-white font-semibold rounded-lg hover:bg-[#C19A6B] transition-colors disabled:opacity-50"
        >
          {submitting ? "Updating..." : "Update Details"}
        </button>
      </form>
    </div>
  );
};

export default StyledDetailFetchForm;

