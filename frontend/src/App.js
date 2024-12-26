
import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TransactionsOverview from "./pages/TransactionsOverview.js";

import TransactionStatusCheck from './pages/TransactionStatusCheck.js';
import TransactionDetailsBySchool from './pages/TranseactionDetailsBySchool.js';
import StatusSection from './components/StatusSection.js';
import TransactionStatusUpdate from './pages/TransactionStatusUpdate.js';


function App() {
  return (
    <>
      
      <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar Component */}
        <Navbar />
        <StatusSection/>

        {/* Main Content Area */}
        <main className="p-6">
          <Routes>
            {/* Transactions Overview Page */}
            <Route path="/" element={<TransactionsOverview />} />

            {/* Transactions by School Page */}
            <Route path="/school-transactions" element={<TransactionDetailsBySchool />} />

            {/* Transaction Status Check Page */}
            <Route path="/status-check" element={<TransactionStatusCheck />} />
            <Route path="/status-update" element={<TransactionStatusUpdate />} />
          </Routes>
        </main>
      </div>
    </Router>
    </>
  );
}

export default App;
