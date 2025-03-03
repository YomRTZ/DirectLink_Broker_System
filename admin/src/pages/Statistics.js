import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";  
import { BarChart } from "recharts";
import { useParams } from "react-router-dom";
import { getLeases } from "../repository/LeaseRepo";
// import { BarChart } from '@mui/material/BarChart';

const COLORS = ['#0088FE', '#00C49F'];

const renderCustomizedLabel = ({ x, y, name }) => {
  return (
    <text x={x + 10} y={y} fill="black" textAnchor="middle" dominantBaseline="central">
      {name}
    </text>
  );
};

export default function Statistics() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { title } = useParams(); 
  const [leases, setLeases] = useState();
  const [newLeasesCount, setNewLeasesCount] = useState(0);
  const [statuscount, setStatusCount] = useState(0);

  useEffect(() => {
    const fetchLeases = async () => {
      try {
        const data = await getLeases();
        setLeases(data);
        countNewLeases(data);
        console.log("lease data:", data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchLeases();
  }, []);

  const countNewLeases = (leases) => {
    let count = 0;
    let statusnewcount = 0;
    console.log("New Lease Count:", leases.status);
    leases?.forEach((lease) => {
      if (lease.status === "New" && lease.propertyId.addressId.subcity === title) {
        count++;
      }
      if (lease.status === "New") {
        statusnewcount++;
      }
    });
    setNewLeasesCount(count);
    setStatusCount(statusnewcount);
    console.log("New Lease Count:", count);
    console.log("All new status:", statusnewcount);
  };

  const data = [
    { name: 'Total Rented', value: statuscount },
    { name: `Rented Houses in ${title}`, value: newLeasesCount },
  ];

  return (
    <div className="flex flex-col m-5 p-5 justify-evenly">
      <div className="flex flex-row w-full">
        <div className="w-1/2 p-2">
          <div className="bg-white shadow-md rounded-lg">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="w-1/2 p-2">
          <div className="bg-white shadow-md rounded-lg">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                xAxis={[{ scaleType: 'band', data: [`Rented Houses in ${title}`, 'Total rented house in all subcity'] }]}
                series={[
                  { data: [newLeasesCount, statuscount], color: ['#0088FE', '#FFD700'] } // Different colors for each bar
                ]}
                width={500}
                height={300}
              />
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="p-6 bg-white shadow-md rounded-lg w-1/3 mt-5">
        <h2 className="text-2xl font-semibold text-gray-800">Statistics</h2>
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <p className="mt-2 text-gray-600">
            Number of{" "}
            <span className="font-semibold text-emerald-500">"New"</span> lease
            agreements:{" "}
            <span className="text-xl font-bold text-gray-900">
              {newLeasesCount}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}









































