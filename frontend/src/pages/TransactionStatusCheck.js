
import { useState } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";

const TransactionStatusCheck = () => {
  const [customOrderId, setCustomOrderId] = useState("");
  const [status, setStatus] = useState("");

  const checkStatus = async () => {
    const response = await axios.get(`https://adviron-assignment.vercel.app/api/transactions/status/${customOrderId}`);
    setStatus(response.data.status);
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "600px", margin: "0 auto" ,border:"2px solid black"}}>
      <h4 className="text-center" style={{backgroundColor:"orange",padding:"1rem"}}>Transaction Status Check</h4><hr/>
      <Form.Control
        type="text"
        placeholder="Enter Custom Order ID"
        onChange={(e) => setCustomOrderId(e.target.value)}
      />
      <button className="btn btn-primary mt-2" onClick={checkStatus}>
        Check Status
      </button>
      {status && <p className="mt-3">Status: {status}</p>}
    </div>
  );
};

export default TransactionStatusCheck;
