import { Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";
export function LeaseCard({ _id,tenantFullName,ownerFullName }) {
  const navigate = useNavigate();
  const viewDetail=()=>{
    navigate("/ownerLeaseAgreement", { state: { _id } })
  }
  return (
    <Card className="max-w-sm">
      <p className="text-2xl font-bold tracking-tight text-gray-400 dark:text-white">
       owner:{ownerFullName}
      </p>
      <p className="text-2xl font-bold tracking-tight text-gray-400 dark:text-white">
        tenant:{tenantFullName}
      </p>
     <button
            onClick={viewDetail}
            className="bg-emerald-500/90 hover:bg-emerald-600/90 text-white px-6 py-2 rounded-lg 
            transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-emerald-500/20
            focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transform hover:scale-105"
          >ViewLease</button>
    </Card>
  );
}
