
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TenantFile from "../components/TenantFile";
import OwnerFile from "../components/OwnerFile";
import ViewPdf from "./ViewPdf";
import { FaBan,FaCheck } from "react-icons/fa";
import { getLease, updateLease } from "../repository/LeaseRepo";

export default function LeaseAgreement() {
  const { id } = useParams();
  const [activeFile, setActiveFile] = useState("tenant");
  const [leaseData, setLeaseData] = useState(null);
  const [allLeaseData, setAllLeaseData] = useState(null);

  useEffect(() => {
    const getLeasseDoc = async () => {
      try {
        const response = await getLease(id);
        console.log("responseData", response);
        setAllLeaseData(response);
        const base64pdf = response.leaseAgreementDocument;
        setLeaseData(base64pdf);
      } catch (error) {
        console.error("Error fetching lease data:", error);
      }
    };
    getLeasseDoc();
  }, [id]);
    const handleApprove = async () => {
      try {
        const leaseAgreementData = { status: "approve" };
        await updateLease(id, leaseAgreementData); 
        console.log("leaseAgreementData",leaseAgreementData);
        console.log("Lease Agreement approved!");
      } catch (error) {
        console.error("Error approving lease agreement:", error);
      }
    };
    const handleReject = async () => {
      try {
        const leaseAgreementData = { status: "rejected" };
        await updateLease(id, leaseAgreementData); 
        console.log("Lease Agreement rejected!");
      } catch (error) {
        console.error("Error rejecting lease agreement:", error);
      }
    };
  if (!allLeaseData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-full">
      {/* Left half */}
      <div className="w-1/2 p-4 border-r border-gray-200">
        <div className="flex justify-between items-center mb-4">
        <button
            onClick={handleApprove}
            className="px-4 py-2 bg-[#1E293B] text-white rounded-lg hover:bg-[#334155] transition-colors flex items-center gap-2"
          >
            <FaCheck className="text-lg" />
            Approve
          </button>
          <button
            onClick={handleReject}
            className="px-4 py-2 bg-[#1E293B] text-white rounded-lg hover:bg-[#334155] transition-colors flex items-center gap-2"
          >
            <FaBan className="text-lg" />
            Rejected
          </button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          {/* Lease Agreement PDF */}
          <h5 className="text-xl font-semibold text-gray-500 m-2">Lease Agreement</h5>
          <ViewPdf base64pdf={leaseData} />
        </div>
      </div>

      {/* Right half */}
      <div className="w-1/2 p-4">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveFile("tenant")}
            className={`px-6 py-2 rounded-lg ${
              activeFile === "tenant" ? "bg-[#1E293B] text-white" : "bg-gray-200 text-gray-700"
            } hover:bg-[#334155] transition-colors`}
          >
            Tenant File
          </button>
          <button
            onClick={() => setActiveFile("owner")}
            className={`px-6 py-2 rounded-lg ${
              activeFile === "owner" ? "bg-[#1E293B] text-white" : "bg-gray-200 text-gray-700"
            } hover:bg-[#334155] transition-colors`}
          >
            Owner File
          </button>
        </div>

        {/* Files Display */}
        <div>
          {activeFile === "tenant" ? (
            allLeaseData.tenantId ? (
              <TenantFile
                residenceId={allLeaseData.tenantId.residenceId}
                officeId={allLeaseData.tenantId.officeId}
              />
            ) : (
              <div>Tenant data is unavailable</div>
            )
          ) : (
            allLeaseData.ownerId ? (
              <OwnerFile
                residenceId={allLeaseData.ownerId.residenceId}
                officeId={allLeaseData.ownerId.officeId}
              />
            ) : (
              <div>Owner data is unavailable</div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
