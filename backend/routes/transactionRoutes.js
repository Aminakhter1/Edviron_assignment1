import express from "express";

import { allTransactions ,fetchByCustomerId,fetchSpecificSchool,updateTransaction,allSchoolId,manuallyUpdate
} from "../controller/transactionController.js";


//router object
const router = express.Router();
//routing
//fetach all Transaction
router.get("/", allTransactions);
//fetch transaction on the basis of school_id
router.get("/school/:schoolId", fetchSpecificSchool);
//fetch by customerId
router.get("/status/:customOrderId", fetchByCustomerId);
//default update status
router.post("/webhook/status", updateTransaction);
//manuallu update status
router.post("/manual-update", manuallyUpdate);
//fetch all distinct school_id
router.get("/schools",allSchoolId)


export default router;
 