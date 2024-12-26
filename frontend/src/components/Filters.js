import React, { useState, useEffect } from "react";
import axios from "axios";

const Filters = ({ onFilterChange }) => {
  const [schoolIds, setSchoolIds] = useState([]);
  const [selectedSchoolId, setSelectedSchoolId] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchSchoolIds = async () => {
      try {
        const response = await axios.get("https://adviron-assignment.vercel.app/api/transactions/schools");
        setSchoolIds(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching school IDs:", error);
      }
    };

    fetchSchoolIds();
  }, []);

  const handleSchoolChange = (e) => {
    setSelectedSchoolId(e.target.value);
    onFilterChange({ schoolId: e.target.value, status });
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    onFilterChange({ schoolId: selectedSchoolId, status: e.target.value });
  };

  return (
    <div className="flex space-x-4 mb-4">
      {/* School ID Filter */}
      <select
        className="border border-gray-300 rounded-lg py-2 px-3"
        value={selectedSchoolId}
        onChange={handleSchoolChange}
      >
        <option value="">Select School</option>
        {schoolIds.map((schoolId) => (
          <option key={schoolId} value={schoolId}>
            {schoolId}
          </option>
        ))}
      </select>

      {/* Status Filter */}
      <select
        className="border border-gray-300 rounded-lg py-2 px-3"
        value={status}
        onChange={handleStatusChange}
      >
        <option value="">All Status</option>
        <option value="Success">Success</option>
        <option value="Pending">Pending</option>
        <option value="Failed">Failed</option>
      </select>
    </div>
  );
};

export default Filters;
