import React from 'react';

const Footer = ({ showPage }) => {
    return (
        <footer className="bg-rose-800 text-white py-8 mt-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center">
                            <i className="bi bi-shield-fill-check mr-2"></i>Paw Patrol
                        </h3>
                        <p className="text-rose-200">Connecting injured animals with rescuers for immediate care and support.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" onClick={() => showPage('home')} className="text-rose-200 hover:text-white transition">Home</a></li>
                            <li><a href="#" onClick={() => showPage('ngo-register')} className="text-rose-200 hover:text-white transition">NGO Register</a></li>
                            <li><a href="#" onClick={() => showPage('dashboard')} className="text-rose-200 hover:text-white transition">NGO Dashboard</a></li>
                            <li><a href="#" onClick={() => showPage('about')} className="text-rose-200 hover:text-white transition">About Us</a></li>
                            <li><a href="#" onClick={() => showPage('contact')} className="text-rose-200 hover:text-white transition">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Contact Info</h3>
                        <ul className="space-y-2 text-rose-200">
                            <li><i className="bi bi-geo-alt-fill mr-2"></i>123 Animal Welfare Road, New Delhi, India</li>
                            <li><i className="bi bi-envelope-fill mr-2"></i>info@pawpatrol.org</li>
                            <li><i className="bi bi-telephone-fill mr-2"></i>+91 98765 43210</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-rose-700 pt-4 text-center">
                    <p className="text-rose-200">&copy; 2025 Paw Patrol. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;