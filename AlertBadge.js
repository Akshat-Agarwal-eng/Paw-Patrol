import React from 'react';

const AlertBadge = ({ isVisible, acceptEmergencyRequest }) => {
    return (
        <div id="alertBadge" className={`${isVisible ? '' : 'hidden'} alert-badge`}>
            <div className="bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center siren justify-between">
                <div className="flex items-center">
                    <i className="bi bi-exclamation-triangle-fill mr-2 text-xl"></i>
                    <span>Emergency Alert: Injured Animal Reported</span>
                </div>
                <button onClick={acceptEmergencyRequest} className="bg-white text-red-600 px-3 py-1 rounded-md font-medium text-sm hover:bg-gray-100 transition ml-3">
                    Accept Request
                </button>
            </div>
        </div>
    );
};

export default AlertBadge;