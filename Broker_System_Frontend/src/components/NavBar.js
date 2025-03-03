import { logoutService } from "../services/AuthService";
import React, { useState, useContext, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext"; 
import { getRoleNameById } from "../services/RoleService";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [roleName, setRoleName] = useState(" "); 
  const { role } = useContext(AuthContext); 
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchRoleName = async () => {
      if (role) {
        const fetchedRoleName = await getRoleNameById(role);
        setRoleName(fetchedRoleName);
        console.log("roleName",fetchedRoleName);
      }
    };

    fetchRoleName();
  }, [role]); 

  const handleLogOut = () => {
    console.log("logout click");
    logoutService();
  };

  return (
    <nav className="bg-black/90 backdrop-blur-sm text-white shadow-lg fixed top-0 w-full z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-3 px-4">
        <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
          DirectLink
        </div>

        <div>
          <ul className="hidden md:flex space-x-6 font-medium">
            <li>
              <a href="#home" className="hover:text-emerald-400 transition-all duration-300">Home</a>
            </li>
            <li>
              <button onClick={() => navigate('/profile')} className="hover:text-emerald-400 transition-all duration-300">Profile</button>
            </li>
            <li>
              <button onClick={() => navigate('/payment')} className="hover:text-emerald-400 transition-all duration-300">Payment</button>
            </li>
            <li>
              <button onClick={() => navigate('/favorites')} className="hover:text-emerald-400 transition-all duration-300">Favorites</button>
            </li>
            <li>
              <button onClick={() => navigate('/lease')} className="hover:text-emerald-400 transition-all duration-300">LeaseAgreement</button>
            </li>
          </ul>
        </div>

        <div className="hidden md:flex items-center space-x-3">
          <button className="bg-emerald-500/90 hover:bg-emerald-600/90 text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-emerald-500/20">
            Sign In
          </button>
          <button onClick={handleLogOut} className="bg-transparent border border-emerald-500/30 text-white px-4 py-2 rounded-lg hover:bg-emerald-500/10 transition-all duration-300 text-sm font-semibold">
            Logout
          </button>
         
          {roleName?.roleName === "Owner" ? (
            <button className="bg-gradient-to-r from-emerald-500/90 to-teal-600/90 text-white px-4 py-2 rounded-lg hover:from-emerald-600/90 hover:to-teal-700/90 transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-emerald-500/20" onClick={() => navigate('/dashboard')}> 
              Dashboard
            </button>
          ) : (
            <button className="bg-gradient-to-r from-emerald-500/90 to-teal-600/90 text-white px-4 py-2 rounded-lg hover:from-emerald-600/90 hover:to-teal-700/90 transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-emerald-500/20" onClick={() => navigate('/chat')}> 
              Chat
            </button>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white hover:text-emerald-400 transition-all duration-300" aria-label="Toggle Menu">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-sm border-t border-white/10">
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li>
              <a href="#home" className="hover:text-emerald-400 transition-all duration-300" onClick={toggleMenu}>
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-emerald-400 transition-all duration-300" onClick={toggleMenu}>
                About
              </a>
            </li>
            <li>
              <a href="#properties" className="hover:text-emerald-400 transition-all duration-300" onClick={toggleMenu}>
                Properties
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-emerald-400 transition-all duration-300" onClick={toggleMenu}>
                Contact
              </a>
            </li>
            <li className="w-full px-4">
              <button className="w-full bg-emerald-500/90 hover:bg-emerald-600/90 text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-emerald-500/20" onClick={toggleMenu}>
                Sign In
              </button>
            </li>
            <li className="w-full px-4">
              <button className="w-full bg-transparent border border-emerald-500/30 text-white px-4 py-2 rounded-lg hover:bg-emerald-500/10 transition-all duration-300 text-sm font-semibold" onClick={() => {toggleMenu(); handleLogOut();}}>
                Logout
              </button>
            </li>
            <li className="w-full px-4">
              {roleName?.roleName === "Owner" ? (
                <button className="w-full bg-gradient-to-r from-emerald-500/90 to-teal-600/90 text-white px-4 py-2 rounded-lg hover:from-emerald-600/90 hover:to-teal-700/90 transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-emerald-500/20" onClick={() => navigate('/dashboard')}> 
                  Dashboard
                </button>
              ) : (
                <button className="w-full bg-gradient-to-r from-emerald-500/90 to-teal-600/90 text-white px-4 py-2 rounded-lg hover:from-emerald-600/90 hover:to-teal-700/90 transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-emerald-500/20" onClick={() => navigate('/chat')}> 
                  Chat
                </button>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
