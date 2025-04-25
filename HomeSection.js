import React from 'react';

const HomeSection = ({
    handleFile,
    imagePreview,
    isAnalyzingImage,
    isLoadingLocation,
    locationText,
    location,
    userFormVisible,
    submitReport
}) => {
    return (
        <section id="home" className="container mx-auto p-4 mt-4 md:mt-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6 md:p-8 bg-rose-50 border-b border-rose-100">
                    <h2 className="text-3xl font-bold mb-2 text-rose-800">Report Injured Animal</h2>
                    <p className="text-gray-600">Help an animal in need by reporting its condition and location</p>
                </div>
                <div className="p-6 md:p-8 space-y-6">
                    <div
                        id="dropZone"
                        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-rose-400 transition duration-300"
                        onClick={() => document.getElementById('fileInput').click()}
                        onDragOver={(e) => {
                            e.preventDefault();
                            e.currentTarget.classList.add('border-rose-500');
                        }}
                        onDragLeave={(e) => e.currentTarget.classList.remove('border-rose-500')}
                        onDrop={(e) => {
                            e.preventDefault();
                            e.currentTarget.classList.remove('border-rose-500');
                            handleFile(e.dataTransfer.files[0]);
                        }}
                    >
                        <i className="bi bi-cloud-upload text-5xl text-gray-400"></i>
                        <p className="mt-3 text-gray-600">Drag and drop image or click to upload</p>
                        <p className="text-sm text-gray-500 mt-2">Maximum file size: 10MB</p>
                        <input
                            type="file"
                            id="fileInput"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleFile(e.target.files[0])}
                        />
                    </div>

                    <div id="aiAnalysisLoading" className={`${isAnalyzingImage ? '' : 'hidden'} flex flex-col items-center justify-center p-4`}>
                        <div className="loading"><div></div><div></div></div>
                        <p className="mt-4 text-gray-600">Analyzing image with AI...</p>
                    </div>

                    <div id="previewContainer" className={`${imagePreview ? '' : 'hidden'} bg-gray-50 p-4 rounded-lg`}>
                        <h3 className="text-lg font-semibold mb-3 text-rose-700"><i className="bi bi-image mr-2"></i>Image Preview:</h3>
                        <div className="flex justify-center">
                            <img id="imagePreview" src={imagePreview} className="rounded-lg shadow-md border border-gray-200 max-h-[300px] object-contain" alt="Preview" />
                        </div>
                    </div>

                    <div id="loadingLocation" className={`${isLoadingLocation ? '' : 'hidden'} flex flex-col items-center justify-center py-4`}>
                        <div className="loading"><div></div><div></div></div>
                        <p className="mt-4 text-gray-600">Getting your location...</p>
                    </div>

                    <div id="locationDisplay" className={`${locationText ? '' : 'hidden'} bg-gray-50 p-4 rounded-lg`}>
                        <h3 className="text-lg font-semibold mb-3 text-rose-700"><i className="bi bi-geo-alt-fill mr-2"></i>Your Location:</h3>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <p id="locationText" className="text-gray-700 mb-3" dangerouslySetInnerHTML={{ __html: locationText }}></p>
                            <div id="locationMap" className="h-48 md:h-64 bg-gray-200 rounded-lg overflow-hidden">
                                {location && (
                                    <img
                                        src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+f00(${location.longitude},${location.latitude})/${location.longitude},${location.latitude},13,0/600x300@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw`}
                                        className="w-full h-full rounded-lg"
                                        alt="Location Map"
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    <div id="userForm" className={`${userFormVisible ? '' : 'hidden'} space-y-4 bg-gray-50 p-6 rounded-lg`}>
                        <h3 className="text-lg font-semibold mb-2 text-rose-700"><i className="bi bi-person-fill mr-2"></i>Your Information:</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="userName" className="block text-gray-700 font-medium">Your Name</label>
                                <input type="text" id="userName" placeholder="Enter your name" className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-rose-200 focus:border-rose-500 outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="userPhone" className="block text-gray-700 font-medium">Phone Number</label>
                                <input type="tel" id="userPhone" placeholder="Enter your phone number" className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-rose-200 focus:border-rose-500 outline-none" />
                            </div>
                        </div>
                        <div className="pt-2">
                            <button onClick={submitReport} className="w-full bg-rose-600 text-white py-3 rounded-lg hover:bg-rose-700 transition duration-300 font-medium text-lg btn-pulse">
                                <i className="bi bi-send-fill mr-2"></i>Submit Emergency Report
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-lg p-6 md:p-8">
                <h3 className="text-2xl font-bold text-rose-800 mb-6">How the Emergency Process Works</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-rose-50 p-5 rounded-lg card-hover">
                        <div className="bg-rose-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                            <i className="bi bi-camera text-rose-600 text-xl"></i>
                        </div>
                        <h4 className="text-lg font-semibold mb-2">1. Upload Photo</h4>
                        <p className="text-gray-600">Take a clear photo of the injured animal and upload it to our platform</p>
                    </div>
                    <div className="bg-rose-50 p-5 rounded-lg card-hover">
                        <div className="bg-rose-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                            <i className="bi bi-robot text-rose-600 text-xl"></i>
                        </div>
                        <h4 className="text-lg font-semibold mb-2">2. AI Verification</h4>
                        <p className="text-gray-600">Our AI verifies the image contains an animal in need of assistance</p>
                    </div>
                    <div className="bg-rose-50 p-5 rounded-lg card-hover">
                        <div className="bg-rose-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                            <i className="bi bi-geo-alt text-rose-600 text-xl"></i>
                        </div>
                        <h4 className="text-lg font-semibold mb-2">3. Location Detection</h4>
                        <p className="text-gray-600">Our system automatically detects your location to find nearby NGOs</p>
                    </div>
                    <div className="bg-rose-50 p-5 rounded-lg card-hover">
                        <div className="bg-rose-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                            <i className="bi bi-megaphone text-rose-600 text-xl"></i>
                        </div>
                        <h4 className="text-lg font-semibold mb-2">4. Immediate Alert</h4>
                        <p className="text-gray-600">Emergency alerts with real-time tracking sent to nearby NGOs</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeSection;