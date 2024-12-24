import React, { useState } from 'react';
import WorkerForm from './worker.jsx';

const WorkerReport = () => {
    const [workers, setWorkers] = useState([]);

    // Function to add a new worker to the list
    const handleAddWorker = (newWorker) => {
        setWorkers([...workers, newWorker]);
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold text-center mb-6">Dashboard</h1>

            {/* Display WorkerForm to add new workers */}
            <WorkerForm onAddWorker={handleAddWorker} />

            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Worker List</h2>

                {/* Display the list of workers */}
                <table className="min-w-full table-auto border-collapse">
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
                        {workers.map((worker, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{worker.firstName}</td>
                                <td className="border px-4 py-2">{worker.lastName}</td>
                                <td className="border px-4 py-2">{worker.age}</td>
                                <td className="border px-4 py-2">{worker.designation}</td>
                                <td className="border px-4 py-2">{worker.contactNumber}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WorkerReport;
