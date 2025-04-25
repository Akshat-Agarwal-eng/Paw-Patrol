import React from 'react';

const NGORegisterSection = ({ registerNGO }) => {
    return (
        <section id="ngo-register" className="container mx-auto p-4 mt-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6 md:p-8 bg-amber-50 border-b border-amber-100">
                    <h2 className="text-3xl font-bold mb-2 text-amber-800">NGO Registration</h2>
                    <p className="text-gray-600">Join our network to help rescue injured animals in your area</p>
                </div>
                <div className="p-6 md:p-8">
                    <form id="ngoRegistrationForm" className="space-y-6">
                        <div className="bg-amber-50 p-4 rounded-lg mb-6">
                            <h3 className="font-semibold text-amber-800 mb-2"><i className="bi bi-info-circle-fill mr-2"></i>Why Register?</h3>
                            <p className="text-gray-700">By registering your NGO, you'll receive real-time alerts about injured animals in your area, allowing for quicker response times and better outcomes for animals in need.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="ngoName" className="block text-gray-700 font-medium">NGO Name</label>
                                <input type="text" id="ngoName" placeholder="Enter NGO name" className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-amber-200 focus:border-amber-500 outline-none" required />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="ngoEmail" className="block text-gray-700 font-medium">Email Address</label>
                                <input type="email" id="ngoEmail" placeholder="Enter email address" className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-amber-200 focus:border-amber-500 outline-none" required />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="ngoPassword" className="block text-gray-700 font-medium">Password</label>
                                <input type="password" id="ngoPassword" placeholder="Create a password" className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-amber-200 focus:border-amber-500 outline-none" required />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="ngoPhone" className="block text-gray-700 font-medium">Contact Number</label>
                                <input type="tel" id="ngoPhone" placeholder="Enter contact number" className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-amber-200 focus:border-amber-500 outline-none" required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="ngoAddress" className="block text-gray-700 font-medium">Address</label>
                            <textarea id="ngoAddress" placeholder="Enter full address" className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-amber-200 focus:border-amber-500 outline-none" required></textarea>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="ngoCity" className="block text-gray-700 font-medium">City</label>
                                <input type="text" id="ngoCity" placeholder="Enter city" className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-amber-200 focus:border-amber-500 outline-none" required />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="ngoState" className="block text-gray-700 font-medium">State</label>
                                <input type="text" id="ngoState" placeholder="Enter state" className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-amber-200 focus:border-amber-500 outline-none" required />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="ngoZip" className="block text-gray-700 font-medium">ZIP Code</label>
                                <input type="text" id="ngoZip" placeholder="Enter ZIP code" className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-amber-200 focus:border-amber-500 outline-none" required />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="ngoCountry" className="block text-gray-700 font-medium">Country</label>
                                <input type="text" id="ngoCountry" placeholder="Enter country" className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-amber-200 focus:border-amber-500 outline-none" required />
                            </div>
                        </div>
                        <div className="pt-4">
                            <button type="button" onClick={registerNGO} className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition duration-300 font-medium text-lg">
                                <i className="bi bi-shield-check mr-2"></i>Register NGO
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default NGORegisterSection;