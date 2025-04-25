import React from 'react';

const Navbar = ({ showPage, toggleMenu }) => {
    return (
        <nav className="bg-rose-600 text-white p-4 sticky top-0 z-50 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <a href="#" onClick={() => showPage('home')} className="text-2xl font-bold flex items-center">
                    <i className="bi bi-shield-fill-check mr-2"></i>Paw Patrol
                </a>
                <div className="hidden md:flex space-x-6">
                    <a href="#" onClick={() => showPage('home')} className="hover:text-rose-200 transition duration-300 py-2">Home</a>
                    <a href="#" onClick={() => showPage('ngo-register')} className="hover:text-rose-200 transition duration-300 py-2">NGO Register</a>
                    <a href="#" onClick={() => showPage('dashboard')} className="hover:text-rose-200 transition duration-300 py-2">NGO Dashboard</a>
                    <a href="#" onClick={() => showPage('about')} className="hover:text-rose-200 transition duration-300 py-2">About Us</a>
                    <a href="#" onClick={() => showPage('contact')} className="hover:text-rose-200 transition duration-300 py-2">Contact</a>
                </div>
                <button className="md:hidden focus:outline-none" onClick={toggleMenu}>
                    <i className="bi bi-list text-2xl"></i>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;