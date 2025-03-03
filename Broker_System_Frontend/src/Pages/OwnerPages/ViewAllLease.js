import { AuthContext } from "../../context/AuthContext";
import { LeaseCard } from "../../components/LeaseCard";
import { getLeases } from "../../services/LeaseAgreement";
import React, { useContext, useEffect, useState } from "react";

function ViewAllLease() {
  const [leases, setLeases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { uid } = useContext(AuthContext);
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

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-6">
  {leases.length > 0 ? (
    leases.map((lease) => (
      lease.ownerId.uid === uid && (
        <div key={lease._id} className="w-full">
          <LeaseCard 
           _id={lease._id}
          tenantFullName={lease.tenantId.firstName + " " + 
          lease.tenantId.middleName + " " + lease.tenantId.lastName}
          ownerFullName={lease.ownerId.firstName + " " + 
            lease.ownerId.middleName + " " + lease.ownerId.lastName} />
        </div>
      )
    ))
  ) : (
    <div className="text-center py-8 bg-white rounded-lg shadow">
      <p className="text-gray-600 text-lg">No lease agreements found.</p>
    </div>
  )}
</div>

    </div>
  );
}

export default ViewAllLease;
