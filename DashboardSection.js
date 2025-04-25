import React from 'react';

const DashboardSection = ({ isLoggedIn, ngoData, loginNGO, logoutNGO, showPage, viewReportDetails, acceptCase, reports }) => {
    const totalCases = reports.length;
    const rescuedCount = reports.filter(r => r.status === 'rescued').length;
    const pendingCount = reports.filter(r => r.status === 'pending').length;
    
    return (
        <section id="dashboard" className="container mx-auto p-4 mt-8 mb-16">
            <div className="max-w-6xl mx-auto">
                {!isLoggedIn ? (
                    <div id="loginPrompt" className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="p-6 md:p-8 bg-teal-50 border-b border-teal-100">
                            <h2 className="text-3xl font-bold mb-2 text-teal-800">NGO Dashboard Login</h2>
                            <p className="text-gray-600">Access your dashboard to view and manage animal rescue cases</p>
                        </div>
                        <div className="p-6 md:p-8 space-y-6">
                            <div className="max-w-lg mx-auto">
                                <div className="bg-teal-50 p-4 rounded-lg mb-6">
                                    <div className="flex">
                                        <div className="mr-3 text-teal-600">
                                            <i className="bi bi-shield-lock-fill text-2xl"></i>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-teal-800 mb-1">Secure NGO Portal</h3>
                                            <p className="text-gray-600">Enter your credentials to access the dashboard</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label htmlFor="loginEmail" className="block text-gray-700 font-medium">Email Address</label>
                                        <input type="email" id="loginEmail" placeholder="Enter your registered email" className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-teal-200 focus:border-teal-500 outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="loginPassword" className="block text-gray-700 font-medium">Password</label>
                                        <input type="password" id="loginPassword" placeholder="Enter your password" className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-teal-200 focus:border-teal-500 outline-none" />
                                    </div>
                                    <div className="pt-2">
                                        <button onClick={loginNGO} className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition duration-300 font-medium">
                                            <i className="bi bi-box-arrow-in-right mr-2"></i>Login to Dashboard
                                        </button>
                                    </div>
                                    <p className="text-center text-gray-600 mt-4">
                                        Don't have an account? <a href="#" onClick={() => showPage('ngo-register')} className="text-teal-600 hover:underline">Register your NGO</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div id="dashboardContent" className="space-y-6">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="p-6 md:p-8 bg-teal-50 border-b border-teal-100 flex justify-between items-center">
                                <div>
                                    <h2 className="text-3xl font-bold mb-2 text-teal-800">NGO Dashboard</h2>
                                    <p className="text-gray-600">Manage animal rescue operations and view reports</p>
                                </div>
                                <button onClick={logoutNGO} className="bg-white text-teal-600 border border-teal-600 px-4 py-2 rounded-lg hover:bg-teal-600 hover:text-white transition duration-300">
                                    <i className="bi bi-box-arrow-right mr-1"></i> Logout
                                </button>
                            </div>
                            <div className="p-6 md:p-8">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                                    <div className="bg-blue-100 p-6 rounded-lg shadow-sm card-hover">
                                        <div className="flex items-center">
                                            <div className="bg-blue-200 p-3 rounded-full mr-4">
                                                <i className="bi bi-card-list text-blue-800 text-xl"></i>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-blue-800">Total Cases</h3>
                                                <p className="text-3xl font-bold text-blue-900">{totalCases}</p>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-green-100 p-6 rounded-lg shadow-sm card-hover">
                                        <div className="flex items-center">
                                            <div className="bg-green-200 p-3 rounded-full mr-4">
                                                <i className="bi bi-check-circle text-green-800 text-xl"></i>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-green-800">Rescued Animals</h3>
                                                <p className="text-3xl font-bold text-green-900">{rescuedCount}</p>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-orange-100 p-6 rounded-lg shadow-sm card-hover">
                                        <div className="flex items-center">
                                            <div className="bg-orange-200 p-3 rounded-full mr-4">
                                                <i className="bi bi-hourglass-split text-orange-800 text-xl"></i>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-orange-800">Pending Rescues</h3>
                                                <p className="text-3xl font-bold text-orange-900">{pendingCount}</p>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-rose-100 p-6 rounded-lg shadow-sm card-hover">
                                        <div className="flex items-center">
                                            <div className="bg-rose-200 p-3 rounded-full mr-4">
                                                <i className="bi bi-lightning-charge text-rose-800 text-xl"></i>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-rose-800">Response Time</h3>
                                                <p className="text-3xl font-bold text-rose-900">12<span className="text-base">min</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
                                    <h3 className="text-xl font-semibold mb-4"><i className="bi bi-building mr-2 text-teal-600"></i>NGO Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <p className="text-sm text-gray-600">NGO Name</p>
                                            <p id="dashboardNgoName" className="font-semibold text-gray-900">{ngoData?.name || '-'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Email</p>
                                            <p id="dashboardNgoEmail" className="font-semibold text-gray-900">{ngoData?.email || '-'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Phone</p>
                                            <p id="dashboardNgoPhone" className="font-semibold text-gray-900">{ngoData?.phone || '-'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Address</p>
                                            <p id="dashboardNgoAddress" className="font-semibold text-gray-900">{ngoData ? `${ngoData.address}, ${ngoData.city}, ${ngoData.state}, ${ngoData.zip}, ${ngoData.country}` : '-'}</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-4"><i className="bi bi-list-ul mr-2 text-teal-600"></i>Recent Reports</h3>
                                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full bg-white">
                                                <thead className="bg-gray-100">
                                                    <tr>
                                                        <th className="py-3 px-4 text-left text-gray-700">Date</th>
                                                        <th className="py-3 px-4 text-left text-gray-700">Reporter</th>
                                                        <th className="py-3 px-4 text-left text-gray-700">Location</th>
                                                        <th className="py-3 px-4 text-left text-gray-700">Status</th>
                                                        <th className="py-3 px-4 text-left text-gray-700">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {reports.map((report) => (
    <tr key={report.id} className="border-b hover:bg-gray-50">
        <td className="py-3 px-4 text-gray-800">{report.created_at}</td>
        <td className="py-3 px-4 text-gray-800">{report.reporter_name}</td>
        <td className="py-3 px-4 text-gray-800">{report.location}</td>
        <td className="py-3 px-4">
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                report.status === 'rescued'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-orange-100 text-orange-800'
            }`}>
                {report.status}
            </span>
        </td>
        <td className="py-3 px-4">
            <button className="text-blue-600 hover:underline font-medium" onClick={() => viewReportDetails(report.id)}>
                <i className="bi bi-eye mr-1"></i> View Details
            </button>
        </td>
    </tr>
))}

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default DashboardSection;