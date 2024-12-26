
import React, { useState } from "react";
import axios from "axios";

const TransactionStatusUpdate = () => {
  const [orderId, setOrderId] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdate = async () => {
    if (!orderId || !newStatus) {
      setMessage("Please provide both Order ID and New Status.");
      return;
    }

    try {
      const response = await axios.post("https://adviron-assignment.vercel.app/api/transactions/manual-update", {
        order_id: orderId,
        new_status: newStatus,
      });

      if (response.status === 200) {
        setMessage("Transaction status updated successfully.");
      } else {
        setMessage("Failed to update transaction status.");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "600px", margin: "0 auto", border:"2px solid black" }}>
      <h4 className="text-center" style={{backgroundColor:"orange" ,padding:"1rem"}}>Manual Transaction Status Update</h4><hr/>
      <div className="mb-3">
        <label htmlFor="orderId" className="form-label">
          Order ID
        </label>
        <input
          type="text"
          id="orderId"
          className="form-control"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Enter Order ID"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="newStatus" className="form-label">
          New Status
        </label>
        <select
          id="newStatus"
          className="form-select"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="Success">Success</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
      </div>
      <button className="btn btn-primary" onClick={handleUpdate}>
        Update Status
      </button>
      {message && <div className="mt-3 alert alert-success">{message}</div>}
    </div>
  );
};

export default TransactionStatusUpdate;
