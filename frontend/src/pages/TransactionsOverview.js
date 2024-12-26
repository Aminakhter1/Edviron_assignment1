
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Pagination, Form, Row, Col } from "react-bootstrap";
import Filters from "../components/Filters.js";

const TransactionsOverview = () => {
  const [transactions, setTransactions] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [schoolIdFilter, setSchoolIdFilter] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  // Fetch all transactions with applied filters
  const fetchTransactions = async () => {
    try {
      const params = {
        status: statusFilter,
        school_id: schoolIdFilter,
        search: search,
      };
      const response = await axios.get("https://adviron-assignment.vercel.app/api/transactions", { params });
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  // Run fetchTransactions whenever filters change
  useEffect(() => {
    fetchTransactions();
  }, [statusFilter, schoolIdFilter, search, currentPage]);

  const handleSearch = (e) => setSearch(e.target.value);

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch = t.custom_order_id
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus = statusFilter
      ? t.status.toLowerCase() === statusFilter.toLowerCase()
      : true;
    const matchesSchool = schoolIdFilter
      ? t.school_id === schoolIdFilter
      : true;
    return matchesSearch && matchesStatus && matchesSchool;
  });

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleFilterChange = ({ schoolId, status }) => {
    setSchoolIdFilter(schoolId);
    setStatusFilter(status);
    setCurrentPage(1); // Reset pagination on filter change
  };

  return (
    <div className="container mt-4">
      <h4 style={{ backgroundColor: "orange", padding: "1rem" }}>
        History
      </h4>
      <Row className="mb-3 align-items-center">
        {/* Search Input */}
        <Col sm={12} md={4} className="mb-2 mb-md-0">
          <Form.Control
            type="text"
            placeholder="Search by Custom Order ID"
            onChange={handleSearch}
          />
        </Col>

        {/* Filters Dropdowns (Status and School ID) */}
        <Col sm={12} md={4} className="d-flex mb-2 mb-md-0 ml-md-auto">
          {/* Status Filter */}
          <Filters
            onFilterChange={handleFilterChange}
            status={statusFilter}
            schoolId={schoolIdFilter}
          />
        </Col>
      </Row>

      <Table striped bordered hover>
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
          {paginatedTransactions.map((t) => (
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

      <Pagination className="justify-content-center">
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={currentPage === index + 1}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
};

export default TransactionsOverview;
