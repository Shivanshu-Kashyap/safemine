import React, {useState}from 'react';
import { Link } from 'react-router-dom';
import WorkerForm from '../pages/worker.jsx';
import DetailForm from '../pages/Detail.jsx';
const FillForm = () => {
    const [selectedForm, setSelectedForm] = useState(null);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-1/4 bg-gray-100 p-6 shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Forms</h2>
                <ul className="space-y-2">
                    <li>
                        <button
                            onClick={() => setSelectedForm('detail')}
                            className="block w-full text-left px-4 py-2 bg-gray-100 text-gray-500 rounded-lg hover:bg-blue-100 hover:text-blue-500"
                        >
                            Detailed Form
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setSelectedForm('worker')}
                            className="block w-full text-left px-4 py-2 bg-gray-100 text-gray-500 rounded-lg hover:bg-blue-100 hover:text-blue-500"
                        >
                            Worker Details
                        </button>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="w-3/4 p-6">
                {selectedForm === 'detail' && <div><DetailForm/></div>}
                {selectedForm === 'worker' && <WorkerForm />}
            </div>
        </div>
    );
};

export default FillForm;