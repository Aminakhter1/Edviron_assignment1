
import { useState } from "react";
import axios from "axios";
import { Table, Form, Row, Col } from "react-bootstrap";

const TransactionDetailsBySchool = () => {
  const [schoolId, setSchoolId] = useState("");
  const [transactions, setTransactions] = useState([]);

  const handleFetch = async () => {
    const response = await axios.get(`https://adviron-assignment.vercel.app/api/transactions/school/${schoolId}`);
    setTransactions(response.data);
  };

  return (
    <div className="container mt-3" style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
      <h3>Transaction Details by School</h3>
      
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Enter School ID"
          onChange={(e) => setSchoolId(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={handleFetch}>
          Fetch Transactions
        </button>
      </Form.Group>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Collect ID</th>
            <th>School ID</th>
            <th>Gateway</th>
            <th>Order Amount</th>
            <th>Transaction Amount</th>
            <th>Status</th>
            <th>Custom Order ID</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t._id}>
              <td>{t.collect_id}</td>
              <td>{t.school_id}</td>
              <td>{t.gateway}</td>
              <td>{t.order_amount}</td>
              <td>{t.transaction_amount}</td>
              <td>{t.status}</td>
              <td>{t.custom_order_id}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TransactionDetailsBySchool;
