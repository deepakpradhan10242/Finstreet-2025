import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white pt-10 pb-6 px-6 sm:px-10 md:px-16 lg:px-32 w-full">
      {/* Top Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        {/* About */}
        <div>
          <h5 className="text-xl font-semibold text-yellow-400 border-b border-yellow-500 pb-2 inline-block mb-3">
            About Us
          </h5>
          <p className="text-sm leading-relaxed text-gray-300 mb-4">
            Finstreet'25 at BIT Mesra brings together a thrilling mix of events and expert sessions. Test your skills, explore finance, and engage with industry leaders in this annual financial fest!
          </p>
          <a
            href="mailto:financeclub@bitmesra.ac.in"
            className="inline-block text-cyan-300 hover:text-lime-200 text-sm"
          >
            📧 financeclub@bitmesra.ac.in
          </a>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="text-xl font-semibold text-yellow-400 border-b border-yellow-500 pb-2 inline-block mb-3">
            Quick Links
          </h5>
          <ul className="space-y-2 text-sm">
            <li><a href="#home" className="text-cyan-300 hover:text-lime-200">Home</a></li>
            <li><a href="#about" className="text-cyan-300 hover:text-lime-200">About</a></li>
            <li><a href="/calendar" className="text-cyan-300 hover:text-lime-200">Calendar</a></li>
            <li><a href="/events" className="text-cyan-300 hover:text-lime-200">Events</a></li>
            <li><a href="#footer" className="text-cyan-300 hover:text-lime-200">Contact Us</a></li>
            <li>
              <Link to="/developer" className="text-cyan-300 hover:text-lime-200">Developer</Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h5 className="text-xl font-semibold text-yellow-400 border-b border-yellow-500 pb-2 inline-block mb-3">
            Contact Us
          </h5>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>📍 BIT Mesra, Ranchi - 835215, Jharkhand</li>
            <li>✉️ financeclub@bitmesra.ac.in</li>
            {/* Box starts here */}
            <div className="border border-yellow-400  bg-opacity-20 rounded-md p-3 mt-2">
              <li className="italic text-yellow-300 mb-1">For Technical Inquiries</li>
              <li>📞 Deepak Pradhan - 6204502571</li>
            </div>
          </ul>

        </div>
      </section>

      {/* Social Media */}
      {/* Social Media */}
<section className="mt-10 flex justify-center gap-5">
  {/* Facebook */}
  <a
    href="https://www.facebook.com/p/Finance-Club-BIT-Mesra-100065447111184/"
    target="_blank"
    rel="noreferrer"
    className="w-10 h-10 flex items-center justify-center border border-white rounded-full text-white hover:bg-blue-700 transition-colors duration-300"
  >
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 
        23.407.593 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 
        1.894-4.788 4.659-4.788 1.325 0 2.463.099 
        2.793.143v3.24h-1.916c-1.504 0-1.796.715-1.796 
        1.764v2.313h3.588l-.467 3.622h-3.121V24h6.116c.73 
        0 1.324-.593 1.324-1.326V1.326C24 
        .593 23.407 0 22.675 0z"
      />
    </svg>
  </a>

  {/* LinkedIn */}
  <a
    href="https://www.linkedin.com/company/financeclubbit"
    target="_blank"
    rel="noreferrer"
    className="w-10 h-10 flex items-center justify-center border border-white rounded-full text-white hover:bg-blue-600 transition-colors duration-300"
  >
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 
        2.761 2.239 5 5 5h14c2.761 0 5-2.239 
        5-5v-14c0-2.761-2.239-5-5-5zm-11.338 
        20.452h-2.5v-9.35h2.5v9.35zm-1.25-10.804c-.776 
        0-1.41-.635-1.41-1.41s.634-1.41 
        1.41-1.41c.775 0 1.41.634 
        1.41 1.41s-.635 1.41-1.41 
        1.41zm13.365 10.804h-2.5v-4.515c0-1.081-.02-2.47-1.505-2.47-1.506 
        0-1.736 1.176-1.736 2.39v4.595h-2.5v-9.35h2.4v1.276h.033c.334-.633 
        1.153-1.299 2.374-1.299 2.541 0 
        3.01 1.672 3.01 3.843v5.53z"
      />
    </svg>
  </a>

  {/* Instagram */}
  <a
    href="https://www.instagram.com/financeclub_bitm/"
    target="_blank"
    rel="noreferrer"
    className="w-10 h-10 flex items-center justify-center border border-white rounded-full text-white hover:bg-pink-600 transition-colors duration-300"
  >
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 
        4.85.07 1.366.062 2.633.333 
        3.608 1.308.975.975 1.246 
        2.243 1.308 3.608.058 
        1.267.069 1.646.069 
        4.85s-.012 3.584-.07 
        4.85c-.062 1.366-.333 
        2.633-1.308 3.608-.975.975-2.243 
        1.246-3.608 1.308-1.267.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.333-3.608-1.308-.975-.975-1.246-2.243-1.308-3.608-.058-1.267-.069-1.646-.069-4.85s.012-3.584.07-4.85c.062-1.366.333-2.633 1.308-3.608.975-.975 2.243-1.246 3.608-1.308 1.267-.058 1.646-.069 4.85-.069m0-2.163c-3.259 
        0-3.67.015-4.961.072-1.614.07-3.063.334-4.332 
        1.603C1.466 3.341 1.201 4.79 
        1.132 6.404.075 9.657.075 
        14.343 1.132 17.596c.07 
        1.614.334 3.063 1.603 
        4.332 1.269 1.269 2.718 
        1.533 4.332 1.603 1.206.048 
        1.629.068 4.901.068s3.695-.02 
        4.901-.068c1.614-.07 
        3.063-.334 4.332-1.603 
        1.269-1.269 1.533-2.718 
        1.603-4.332.048-1.206.068-1.629.068-4.901s-.02-3.695-.068-4.901c-.07-1.614-.334-3.063-1.603-4.332-1.269-1.269-2.718-1.533-4.332-1.603-1.291-.058-1.703-.072-4.926-.072zm0 
        5.838a6.162 6.162 0 106.162 
        6.162 6.165 6.165 0 00-6.162-6.162zm0 
        10.162a3.998 3.998 0 114-4 
        4 4 0 01-4 4zm6.406-11.845a1.44 
        1.44 0 11-1.44-1.44 
        1.441 1.441 0 011.44 1.44z"
      />
    </svg>
  </a>
</section>


      {/* Bottom Strip */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        © 2025 Finstreet Annual Fest — 
        <a
          href="https://financeclubbitm.in/"
          target="_blank"
          rel="noreferrer"
          className="ml-1 text-cyan-400 hover:text-yellow-300"
        >
          financeclubbitm.in
        </a>
      </div>
    </footer>
  );
};

export default Footer;
