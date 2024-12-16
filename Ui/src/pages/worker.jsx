import React, { useState } from 'react';
import axios from 'axios';

const WorkerForm = () => {
    const [workerDetails, setWorkerDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        age: '',
        designation: '',
        shift: '',
        contactNumber: '',
        emergencyContact: '',
        address: '',
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Handle input changes
    const handleChange = (e) => {
        setWorkerDetails({
            ...workerDetails,
            [e.target.name]: e.target.value,
        });
    };

    // Submit form data
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post('/api/v1/workers', workerDetails);
    //         if (response.status === 201) {
    //             setSuccessMessage('Worker saved successfully!');
    //             setError('');
    //             // Reset all fields except `contactNumber` if desired
    //             setWorkerDetails({
    //                 firstName: '',
    //                 lastName: '',
    //                 email: '',
    //                 age: '',
    //                 designation: '',
    //                 shift: '',
    //                 contactNumber: workerDetails.contactNumber, // Retain this
    //                 emergencyContact: '',
    //                 address: '',
    //             });
    //         }
    //     } catch (error) {
    //         const errorMessage =
    //             error.response?.data?.message ||
    //             'An error occurred while submitting the form.';
    //         setError(errorMessage);
    //         setSuccessMessage('');
    //     }
    // };

    return (
        <div className="max-w-4xl mx-auto p-6 relative bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Worker Details</h1>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <div>
                    <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={workerDetails.firstName}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Last Name */}
                <div>
                    <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={workerDetails.lastName}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={workerDetails.email}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Age */}
                <div>
                    <label htmlFor="age" className="block text-gray-700 font-medium mb-2">Age:</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={workerDetails.age}
                        onChange={handleChange}
                        required
                        min="18" // Example validation
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Designation */}
                <div>
                    <label htmlFor="designation" className="block text-gray-700 font-medium mb-2">Designation:</label>
                    <input
                        type="text"
                        id="designation"
                        name="designation"
                        value={workerDetails.designation}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Shift */}
                <div>
                    <label htmlFor="shift" className="block text-gray-700 font-medium mb-2">Shift:</label>
                    <input
                        type="text"
                        id="shift"
                        name="shift"
                        value={workerDetails.shift}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Contact Number */}
                <div>
                    <label htmlFor="contactNumber" className="block text-gray-700 font-medium mb-2">Contact Number:</label>
                    <input
                        type="text"
                        id="contactNumber"
                        name="contactNumber"
                        value={workerDetails.contactNumber}
                        onChange={handleChange}
                        required
                        pattern="\d{10}" // Example validation for a 10-digit number
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Emergency Contact */}
                <div>
                    <label htmlFor="emergencyContact" className="block text-gray-700 font-medium mb-2">Emergency Contact:</label>
                    <input
                        type="text"
                        id="emergencyContact"
                        name="emergencyContact"
                        value={workerDetails.emergencyContact}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Address */}
                <div>
                    <label htmlFor="address" className="block text-gray-700 font-medium mb-2">Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={workerDetails.address}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="self-start bg-[#D4B030] text-white py-2 px-6 rounded-lg shadow-md hover:bg-[#B09C1A]"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default WorkerForm;
