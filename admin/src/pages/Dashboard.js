import React, { useState } from 'react';
import Feedbacks from './Feedbacks';
import { FaChartBar, FaHome, FaUser, FaVoicemail} from 'react-icons/fa';
import Leases from './Leases';
import Email from './Email';
import Analytics from './Analitics';
export default function Dashboard() {
  const [selectedSection, setSelectedSection] = useState("");

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };
  const renderContent = () => {
    switch (selectedSection) {
        case 'Leases':
          return <Leases/>;
        case 'Feedback':
          return <Feedbacks />;
          case 'Email':
            return <Email />;
            case 'Analytics':
            return <Analytics />;
      default:
        return <Leases />;
    }
  };

  const menuItems = [
    { id: 'Leases', label: 'Leases', icon: <FaHome /> },
    { id: 'Feedback', label: 'Feedback', icon: <FaUser /> },
    { id: 'Email', label: 'Email', icon: <FaVoicemail /> },
    { id: 'Analytics', label: 'Analytics', icon: <FaChartBar/> },
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
