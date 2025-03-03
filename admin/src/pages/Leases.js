import { useNavigate } from 'react-router-dom';
import { getLeases } from '../repository/LeaseRepo';
import { FaChartBar, FaHome, FaUser, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import React, { useEffect, useState } from "react";

export default function Leases() {
  const navigate = useNavigate();
  const [leases, setLeases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchLeases = async () => {
      try {
        const data = await getLeases();
        setLeases(data);
        console.log("lease data:", data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchLeases();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleCardClick = (leaseId) => {
    navigate(`/leaseagreemnt/${leaseId}`);
  };

  return (
    <div className="p-6">
      <div className="grid gap-6">
        {leases.map((lease) => {
          if (lease.status === 'New') {
            return(
              <div 
                key={lease._id} 
                onClick={() => handleCardClick(lease._id)}
                className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all cursor-pointer hover:bg-gray-50 flex justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FaChartBar className="text-gray-700" />
                    <span className="font-semibold text-gray-700">Status:</span>
                    <span className="text-gray-600">{lease.status}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUser className="text-gray-700" />
                    <span className="font-semibold text-gray-700">Tenant:</span>
                    <span className="text-gray-600">{lease.tenantId.firstName + " " + 
                      lease.tenantId.middleName + " " + lease.tenantId.lastName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUser className="text-gray-700" />
                    <span className="font-semibold text-gray-700">Owner:</span>
                    <span className="text-gray-600">{lease.ownerId.firstName + " " + 
                      lease.ownerId.middleName + " " + lease.ownerId.lastName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-gray-700" />
                    <span className="font-semibold text-gray-700">Address:</span>
                    <span className="text-gray-600">{lease.propertyId.addressId.city + " " + 
                      lease.propertyId.addressId.subcity + " " + lease.propertyId.addressId.region}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-gray-700" />
                    <span className="font-semibold text-gray-700">Date:</span>
                    <span className="text-gray-600">
                      {new Date(lease.leaseDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                <div className="w-40 h-40 bg-gray-200 rounded-lg flex-shrink-0">


                  
                  {/* Placeholder for image */}
                </div>
              </div>
            )
          }
        })}
      </div>
    </div>
  );
}
