import React, { useState, useEffect } from 'react';
export default function OwnerFile({ residenceId, officeId }) {
  const [ownerFile, setOwnerFile] = useState({ residenceId: [], officeId: [] });

  useEffect(() => {
    // Check if residenceId and officeId are available and set them in the state
    if (residenceId || officeId) {
      setOwnerFile({
        residenceId: residenceId
          ? [{ image: `http://localhost:3000${residenceId[0]}`, title: 'Residence' }]
          : [],
        officeId: officeId
          ? [{ image: `http://localhost:3000${officeId[0]}`, title: 'Office' }]
          : []
      });
    }
  }, [residenceId, officeId]);

  console.log('ownerFile', ownerFile);

  return (
    <div className="space-y-4">
      {/* Render Residence Images */}
      {ownerFile.residenceId.length > 0 ? (
        ownerFile.residenceId.map((doc, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <div className="mb-2">
              <img
                src={doc.image}
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
      {ownerFile.officeId.length > 0 ? (
        ownerFile.officeId.map((doc, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <div className="mb-2">
              <img
                src={doc.image} 
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
