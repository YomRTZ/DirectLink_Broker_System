import React, { useState, useEffect } from 'react';
export default function TenantFile({ residenceId, officeId }) {
  const [tenantFile, setTenantFile] = useState({ residenceId: [], officeId: [] });

  useEffect(() => {
    // Check if residenceId and officeId are available and set them in the state
    if (residenceId || officeId) {
      setTenantFile({
        residenceId: residenceId
          ? [{ image: `http://localhost:3000${residenceId[0]}`, title: 'Residence' }]
          : [],
        officeId: officeId
          ? [{ image: `http://localhost:3000${officeId[0]}`, title: 'Office' }]
          : []
      });
    }
  }, [residenceId, officeId]);

  console.log('tenantFile', tenantFile);

  return (
    <div className="space-y-4">
      {/* Render Residence Images */}
      {tenantFile.residenceId.length > 0 ? (
        tenantFile.residenceId.map((doc, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <div className="mb-2">
              <img
                src={doc.image} // Use the full URL path here
                alt={doc.title}
                className="w-full h-64 object-cover rounded"
              />
            </div>
            <p className="text-gray-700 font-medium">{doc.title}</p>
          </div>
        ))
      ) : (
        <div>No residence data available</div>
      )}

      {/* Render Office Images */}
      {tenantFile.officeId.length > 0 ? (
        tenantFile.officeId.map((doc, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <div className="mb-2">
              <img
                src={doc.image} // Use the full URL path here
                alt={doc.title}
                className="w-full h-64 object-cover rounded"
              />
            </div>
            <p className="text-gray-700 font-medium">{doc.title}</p>
          </div>
        ))
      ) : (
        <div>No office data available</div>
      )}
    </div>
  );
}
