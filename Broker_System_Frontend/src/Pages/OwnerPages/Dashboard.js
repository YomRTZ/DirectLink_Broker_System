import React, { useState } from 'react';
import AddProperty from './AddProperty';   
import Chat from '../ChatPage';    
import OwnerLeaseAgreement from './OwnerLeaseAgreement';

import AddAdress from './AddAddress';
import AddCategory from './AddCategory';
import Property from './Property';
import UserProfile from '../UserProfile';
import { FaHome, FaUser, FaFileAlt, FaPlusCircle, FaComments, FaFileContract } from 'react-icons/fa';
import TenantProfile from './TenantProfile';
import ViewAllLease from './ViewAllLease';

export default function Dashboard() {
  const [selectedSection, setSelectedSection] = useState('property');

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'Property':
        return <Property />;
        case 'TenantProfile':
          return <TenantProfile />;
      case 'Profile':
        return <UserProfile />;
      case 'view':
        return <ViewAllLease />;
      case 'addProperty':
        return <AddProperty />;
      case 'chat':
        return <Chat />;
      default:
        return <AddProperty />;
    }
  };

  const menuItems = [
    { id: 'Property', label: 'Property', icon: <FaHome /> },
    { id: 'Profile', label: 'Profile', icon: <FaUser /> },
    { id: 'TenantProfile', label: 'TenantProfile', icon: <FaUser /> },
    { id: 'view', label: 'View Documents', icon: <FaFileAlt /> },
    { id: 'addProperty', label: 'Add Property', icon: <FaPlusCircle /> },
    { id: 'chat', label: 'Chat', icon: <FaComments /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white shadow-xl">
        <div className="p-4 bg-gray-900">
          <h1 className="text-2xl font-bold text-emerald-500">DirectLink</h1>
          <p className="text-sm text-gray-400 mt-1">Property Management</p>
        </div>
        <nav className="mt-3">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id} className="px-4">
                <button
                  onClick={() => handleSectionChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    selectedSection === item.id
                      ? 'bg-emerald-500/90 text-white shadow-md'
                      : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-100">
        <div className="container mx-auto ">
          <div className="bg-white rounded-xl shadow-sm">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}
