import React from 'react';

const MobileMenu = ({ isOpen, showPage }) => {
    return (
        <div id="mobileMenu" className={`${isOpen ? '' : 'hidden'} bg-rose-600 text-white p-4 z-50 shadow-lg`}>
            <a href="#" onClick={() => showPage('home')} className="block py-3 border-b border-rose-500 hover:bg-rose-700 px-2 rounded transition">Home</a>
            <a href="#" onClick={() => showPage('ngo-register')} className="block py-3 border-b border-rose-500 hover:bg-rose-700 px-2 rounded transition">NGO Register</a>
            <a href="#" onClick={() => showPage('dashboard')} className="block py-3 border-b border-rose-500 hover:bg-rose-700 px-2 rounded transition">NGO Dashboard</a>
            <a href="#" onClick={() => showPage('about')} className="block py-3 border-b border-rose-500 hover:bg-rose-700 px-2 rounded transition">About Us</a>
            <a href="#" onClick={() => showPage('contact')} className="block py-3 hover:bg-rose-700 px-2 rounded transition">Contact</a>
        </div>
    );
};

export default MobileMenu;