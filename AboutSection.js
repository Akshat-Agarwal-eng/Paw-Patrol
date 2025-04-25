import React from 'react';

const AboutSection = () => {
    return (
        <section id="about" className="container mx-auto p-4 mt-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                    <div className="p-6 md:p-8 bg-amber-50 border-b border-amber-100">
                        <h2 className="text-3xl font-bold mb-2 text-amber-800">About Us</h2>
                        <p className="text-gray-600">Our mission, vision and how we help injured animals</p>
                    </div>
                    <div className="p-6 md:p-8">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
                            <div className="w-full md:w-1/3">
                                <img src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                                     alt="Animal Rescue" className="w-full h-auto rounded-lg shadow-md" />
                            </div>
                            <div className="w-full md:w-2/3">
                                <h3 className="text-2xl font-bold text-amber-700 mb-4">Our Mission</h3>
                                <p className="text-gray-700 mb-4">
                                    At Paw Patrol, we are dedicated to connecting injured animals with nearby NGOs for immediate rescue and care.
                                    Our platform enables quick response times and efficient communication between concerned citizens
                                    and animal welfare organizations.
                                </p>
                                <p className="text-gray-700">
                                    With our advanced AI-powered system, we aim to reduce the suffering of injured animals and provide them with the care they need as quickly as possible. Our real-time alert and tracking system ensures that NGOs are notified immediately when a case is reported in their vicinity.
                                </p>
                            </div>
                        </div>
                        <div className="bg-amber-50 p-6 rounded-lg mb-8">
                            <h3 className="text-xl font-semibold text-amber-800 mb-4">Our Impact</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                                <div>
                                    <div className="text-3xl font-bold text-amber-700 mb-2">500+</div>
                                    <p className="text-gray-700">Animals Rescued</p>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-amber-700 mb-2">50+</div>
                                    <p className="text-gray-700">NGO Partners</p>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-amber-700 mb-2">20+</div>
                                    <p className="text-gray-700">Cities Covered</p>
                                </div>
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-amber-700 mb-6">How It Works</h3>
                        <div className="space-y-6">
                            <div className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
                                <div className="bg-amber-100 rounded-full p-3 mr-4 flex-shrink-0">
                                    <span className="text-amber-600 font-bold text-lg">1</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg">Report an Injured Animal</h4>
                                    <p className="text-gray-600">Take a photo of the injured animal and upload it through our platform. Our AI verifies it's an animal in need before proceeding.</p>
                                </div>
                            </div>
                            <div className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
                                <div className="bg-amber-100 rounded-full p-3 mr-4 flex-shrink-0">
                                    <span className="text-amber-600 font-bold text-lg">2</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg">Automatic Location Detection</h4>
                                    <p className="text-gray-600">Our system automatically detects your location using GPS technology, ensuring the closest NGOs can be notified for a quicker response time.</p>
                                </div>
                            </div>
                            <div className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
                                <div className="bg-amber-100 rounded-full p-3 mr-4 flex-shrink-0">
                                    <span className="text-amber-600 font-bold text-lg">3</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg">Alert Nearby NGOs</h4>
                                    <p className="text-gray-600">The system sends immediate alerts with images and location details to all registered NGOs within a certain radius of the incident.</p>
                                </div>
                            </div>
                            <div className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
                                <div className="bg-amber-100 rounded-full p-3 mr-4 flex-shrink-0">
                                    <span className="text-amber-600 font-bold text-lg">4</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg">Real-time Tracking</h4>
                                    <p className="text-gray-600">Once an NGO accepts the request, both the reporter and the NGO can track each other's location in real-time for efficient rescue coordination.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-6 md:p-8 bg-amber-50 border-b border-amber-100">
                        <h2 className="text-2xl font-bold mb-2 text-amber-800">Our Team</h2>
                        <p className="text-gray-600">Meet the people behind Paw Patrol</p>
                    </div>
                    <div className="p-6 md:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center card-hover">
                                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                                     alt="Team Member" className="w-32 h-32 object-cover rounded-full mx-auto mb-4" />
                                <h4 className="font-semibold text-lg">Priya Sharma</h4>
                                <p className="text-gray-600">Founder & CEO</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center card-hover">
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                                     alt="Team Member" className="w-32 h-32 object-cover rounded-full mx-auto mb-4" />
                                <h4 className="font-semibold text-lg">Rahul Verma</h4>
                                <p className="text-gray-600">Operations Director</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center card-hover">
                                <img src="https://images.unsplash.com/photo-1629425733761-caae3b5f2e50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                                     alt="Team Member" className="w-32 h-32 object-cover rounded-full mx-auto mb-4" />
                                <h4 className="font-semibold text-lg">Aman Gupta</h4>
                                <p className="text-gray-600">Technology Lead</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;