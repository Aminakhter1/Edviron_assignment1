
import express from "express";
import Transaction from "../model/transaction.js";


// Fetch all transactions
 export const allTransactions =async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Fetch transactions for a specific school
 export const fetchSpecificSchool =async (req, res) => {
    try {
      const transactions = await Transaction.find({ school_id: req.params.schoolId });
      res.json(transactions);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  // Check transaction status by custom_order_id
export const fetchByCustomerId =async (req, res) => {
  try {
    const { customOrderId } = req.params;
    console.log(customOrderId);

    const transaction = await Transaction.findOne({ custom_order_id: customOrderId });
    console.log(transaction);
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
    res.json({ status: transaction.status });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// default to update transaction status
export const updateTransaction= async (req, res) => {
    try {
      const { order_info } = req.body;
      const transaction = await Transaction.findOne({ collect_id: order_info.order_id.split('/')[0] });
      if (transaction) {
        transaction.status = req.body.status;
        await transaction.save();
        res.json({ message: 'Status updated' });
      } else {
        res.status(404).json({ message: 'Transaction not found' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  // Manually update transaction status
export const manuallyUpdate =async (req, res) => {
    try {
      const { order_id, new_status } = req.body;
      const transaction = await Transaction.findOne({custom_order_id: order_id});
      if (transaction) {
        transaction.status = new_status;
        await transaction.save();
        res.json({ message: 'Status updated manually' });
      } else {
        res.status(404).json({ message: 'Transaction not found' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  //fetch all transaction on basis of school_id
  export const allSchoolId =async (req, res) => {
    try {
      const schoolIds = await Transaction.distinct('school_id');
    res.json(schoolIds);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  


