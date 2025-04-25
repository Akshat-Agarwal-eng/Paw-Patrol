import React from 'react';

const DirectionsModal = ({ isOpen, closeModal, updateRescueStatus, location, rescueStatus }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6 md:p-8 m-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-rose-800">Rescue Navigation</h2>
                    <button onClick={closeModal} className="text-gray-600 hover:text-gray-800">
                        <i className="bi bi-x-lg text-xl"></i>
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-lg font-semibold text-rose-700 mb-4">Navigation Map</h3>
                        <div className="bg-gray-200 rounded-lg overflow-hidden h-64">
                            {location ? (
                                <img
                                    src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+f00(${location.longitude},${location.latitude})/${location.longitude},${location.latitude},13,0/600x300@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw`}
                                    className="w-full h-full object-cover rounded-lg"
                                    alt="Rescue Location Map"
                                />
                            ) : (
                                <p className="text-gray-600 flex items-center justify-center h-full">No location available</p>
                            )}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-rose-700 mb-4">Rescue Status</h3>
                        <div className="tracking-panel p-4">
                            <div className="tracking-timeline space-y-4">
                                <div className={`flex items-center ${rescueStatus[0] === 'active' ? 'active' : 'pending'}`}>
                                    <div className="dot mr-3"></div>
                                    <div className="line h-8"></div>
                                    <p className="ml-2 text-gray-700">Report Submitted</p>
                                </div>
                                <div className={`flex items-center ${rescueStatus[1] === 'active' ? 'active' : 'pending'}`}>
                                    <div className="dot mr-3"></div>
                                    <div className="line h-8"></div>
                                    <p className="ml-2 text-gray-700">NGO Assigned</p>
                                </div>
                                <div className={`flex items-center ${rescueStatus[2] === 'active' ? 'active' : 'pending'}`}>
                                    <div className="dot mr-3"></div>
                                    <div className="line h-8"></div>
                                    <p className="ml-2 text-gray-700">Arrived at Location</p>
                                </div>
                                <div className={`flex items-center ${rescueStatus[3] === 'active' ? 'active' : 'pending'}`}>
                                    <div className="dot mr-3"></div>
                                    <p className="ml-2 text-gray-700">Animal Rescued</p>
                                </div>
                            </div>
                            <div className="mt-6 space-y-4">
                                <button
                                    onClick={() => updateRescueStatus('arrived')}
                                    className={`w-full py-3 rounded-lg font-medium ${rescueStatus[2] === 'active' ? 'bg-gray-300 cursor-not-allowed' : 'bg-rose-600 text-white hover:bg-rose-700'}`}
                                    disabled={rescueStatus[2] === 'active'}
                                >
                                    Mark as Arrived
                                </button>
                                <button
                                    onClick={() => updateRescueStatus('rescued')}
                                    className={`w-full py-3 rounded-lg font-medium ${rescueStatus[3] === 'active' ? 'bg-gray-300 cursor-not-allowed' : 'bg-rose-600 text-white hover:bg-rose-700'}`}
                                    disabled={rescueStatus[3] === 'active'}
                                >
                                    Mark as Rescued
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DirectionsModal;