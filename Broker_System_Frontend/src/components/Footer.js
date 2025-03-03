import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black/90 backdrop-blur-sm text-white py-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
              About DirectLink
            </h2>
            <p className="text-sm text-gray-300 max-w-md">
              DirectLink is your trusted platform for finding and renting affordable housing. 
              Connect with property owners and tenants to find your perfect home.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-300">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-300">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-300">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-300">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
              Contact Us
            </h2>
            <div className="space-y-2">
              <p className="text-sm text-gray-300">Have questions? We're here to help.</p>
              <div className="space-y-1 text-sm text-gray-300">
                <p className="flex items-center space-x-2">
                  <span className="font-semibold text-emerald-400">Phone:</span>
                  <span>+251 123 4567</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span className="font-semibold text-emerald-400">Email:</span>
                  <a href="mailto:info@directlink.com" 
                     className="hover:text-emerald-400 transition-colors duration-300">
                    info@directlink.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-4 border-t border-gray-800">
          <p className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} DirectLink Housing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
