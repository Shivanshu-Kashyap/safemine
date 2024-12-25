import React, { useContext, useEffect, useState } from "react";
import { WorkerContext } from "../context/WorkerContext";

const WorkerReport = () => {
  const { workers, fetchWorkers, loading, error } = useContext(WorkerContext);
  const [cachedWorkers, setCachedWorkers] = useState([]);

  // Load data from localStorage initially
  useEffect(() => {
    const savedWorkers = localStorage.getItem("workers");
    if (savedWorkers) {
      setCachedWorkers(JSON.parse(savedWorkers));
    }
  }, []);

  // Fetch and update workers from the database, then update localStorage
  useEffect(() => {
    const loadWorkers = async () => {
      await fetchWorkers(); // Fetch from the database
    };
    loadWorkers();
  }, [fetchWorkers]);

  useEffect(() => {
    if (workers.length > 0) {
      localStorage.setItem("workers", JSON.stringify(workers)); // Update cache
      setCachedWorkers(workers); // Update UI
    }
  }, [workers]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Worker Report</h1>
      {loading && <p className="text-center">Loading workers...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Worker List</h2>
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">First Name</th>
              <th className="border px-4 py-2">Last Name</th>
              <th className="border px-4 py-2">Age</th>
              <th className="border px-4 py-2">Designation</th>
              <th className="border px-4 py-2">Contact Number</th>
            </tr>
          </thead>
          <tbody>
            {cachedWorkers.length > 0 ? (
              cachedWorkers.map((worker, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{worker.firstName}</td>
                  <td className="border px-4 py-2">{worker.lastName}</td>
                  <td className="border px-4 py-2">{worker.age}</td>
                  <td className="border px-4 py-2">{worker.designation}</td>
                  <td className="border px-4 py-2">{worker.contactNumber}</td>
                </tr>
              ))
            ) : (
              !loading && (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No workers found.
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkerReport;
