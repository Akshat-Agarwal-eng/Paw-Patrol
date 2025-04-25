import React from 'react';

const ContactSection = ({ submitContact }) => {
    return (
        <section id="contact" className="container mx-auto p-4 mt-8 mb-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-6 md:p-8 bg-rose-50 border-b border-rose-100">
                        <h2 className="text-3xl font-bold mb-2 text-rose-800">Contact Us</h2>
                        <p className="text-gray-600">Get in touch with our team for any inquiries or support</p>
                    </div>
                    <div className="p-6 md:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center card-hover">
                                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className="bi bi-geo-alt-fill text-rose-600 text-xl"></i>
                                </div>
                                <h3 className="font-semibold text-lg mb-2">Our Address</h3>
                                <p className="text-gray-700">123 Animal Welfare Road, New Delhi, India - 110001</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center card-hover">
                                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className="bi bi-envelope-fill text-rose-600 text-xl"></i>
                                </div>
                                <h3 className="font-semibold text-lg mb-2">Email Us</h3>
                                <p className="text-gray-700">info@pawpatrol.org</p>
                                <p className="text-gray-700">support@pawpatrol.org</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center card-hover">
                                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className="bi bi-telephone-fill text-rose-600 text-xl"></i>
                                </div>
                                <h3 className="font-semibold text-lg mb-2">Call Us</h3>
                                <p className="text-gray-700">+91 98765 43210</p>
                                <p className="text-gray-700">24/7 Emergency Response</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <div className="bg-rose-50 p-4 rounded-lg mb-6">
                                    <h3 className="font-semibold text-rose-800 mb-2">Get in Touch</h3>
                                    <p className="text-gray-700">We value your feedback and questions. Fill out the form, and our team will get back to you as soon as possible.</p>
                                </div>
                                <form id="contactForm" className="space-y-4">
                                    <div className="space-y-2">
                                        <label htmlFor="contactName" className="block text-gray-700 font-medium">Your Name</label>
                                        <input type="text" id="contactName" placeholder="Enter your name" className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-rose-200 focus:border-rose-500 outline-none" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="contactEmail" className="block text-gray-700 font-medium">Email Address</label>
                                        <input type="email" id="contactEmail" placeholder="Enter your email" className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-rose-200 focus:border-rose-500 outline-none" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="contactPhone" className="block text-gray-700 font-medium">Phone Number</label>
                                        <input type="tel" id="contactPhone" placeholder="Enter your phone number" className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-rose-200 focus:border-rose-500 outline-none" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="contactMessage" className="block text-gray-700 font-medium">Message</label>
                                        <textarea id="contactMessage" placeholder="Enter your message" className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-rose-200 focus:border-rose-500 outline-none h-32" required></textarea>
                                    </div>
                                    <div className="pt-2">
                                        <button type="button" onClick={submitContact} className="w-full bg-rose-600 text-white py-3 rounded-lg hover:bg-rose-700 transition duration-300 font-medium">
                                            <i className="bi bi-send-fill mr-2"></i>Send Message
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div>
                                <div className="bg-gray-200 rounded-lg overflow-hidden shadow-md h-full min-h-[400px]">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224346.61367338035!2d77.0701108371566!3d28.527252736594583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37ffce30c87cc03f!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1624356495420!5m2!1sen!2sin" 
                                            width="100%" height="100%" style={{border:0}} allowFullScreen="" loading="lazy"></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;